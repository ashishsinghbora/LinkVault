import type { Plugin, ViteDevServer } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
import { ProfileDataSchema, DEFAULT_PROFILE } from '../src/lib/schema';

const MAX_PAYLOAD_BYTES = 5 * 1024 * 1024; // 5MB

export function studioPlugin(): Plugin {
  return {
    name: 'linkvault-studio-api',
    apply: 'serve', // DEVELOPMENT ONLY
    configureServer(server: ViteDevServer) {
      const profilePath = path.resolve(process.cwd(), 'src/data/profile.json');
      const backupPath = path.resolve(process.cwd(), 'src/data/profile.backup.json');

      server.middlewares.use(async (req, res, next) => {
        // Only handle /api/studio routes
        if (!req.url?.startsWith('/api/studio')) {
          return next();
        }

        // Restrict to loopback / localhost only
        const clientIp = req.socket.remoteAddress || '';
        const isLocalhost =
          clientIp === '127.0.0.1' ||
          clientIp === '::1' ||
          clientIp === '::ffff:127.0.0.1' ||
          clientIp.includes('127.0.0.1');

        if (!isLocalhost) {
          res.statusCode = 403;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Access denied: Studio API only accessible via 127.0.0.1' }));
          return;
        }

        const url = new URL(req.url, `http://${req.headers.host}`);
        const pathname = url.pathname;

        // GET /api/studio/status
        if (req.method === 'GET' && pathname === '/api/studio/status') {
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              status: 'ready',
              version: '1.0.0',
              env: 'development',
              profilePath,
            })
          );
          return;
        }

        // GET /api/studio/profile
        if (req.method === 'GET' && pathname === '/api/studio/profile') {
          try {
            if (!fs.existsSync(profilePath)) {
              fs.writeFileSync(profilePath, JSON.stringify(DEFAULT_PROFILE, null, 2), 'utf-8');
            }
            const data = fs.readFileSync(profilePath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
          } catch (err: unknown) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Failed to read profile', details: String(err) }));
          }
          return;
        }

        // POST /api/studio/profile
        if (req.method === 'POST' && pathname === '/api/studio/profile') {
          let body = '';
          let totalBytes = 0;

          req.on('data', (chunk) => {
            totalBytes += chunk.length;
            if (totalBytes > MAX_PAYLOAD_BYTES) {
              req.destroy();
              res.statusCode = 413;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Payload exceeds maximum allowed size (5MB)' }));
              return;
            }
            body += chunk;
          });

          req.on('end', () => {
            try {
              const parsedJson = JSON.parse(body);
              const validation = ProfileDataSchema.safeParse(parsedJson);

              if (!validation.success) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                const errors = validation.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
                res.end(JSON.stringify({ error: 'Validation failed', errors }));
                return;
              }

              // Create backup before writing
              if (fs.existsSync(profilePath)) {
                fs.copyFileSync(profilePath, backupPath);
              }

              // Atomic write: write to temporary file, then rename
              const tmpPath = `${profilePath}.${Date.now()}.tmp`;
              const formattedJson = JSON.stringify(validation.data, null, 2);
              fs.writeFileSync(tmpPath, formattedJson, 'utf-8');
              fs.renameSync(tmpPath, profilePath);

              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: true,
                  message: 'Profile saved and verified successfully',
                  timestamp: new Date().toISOString(),
                })
              );
            } catch (err: unknown) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Failed to save profile', details: String(err) }));
            }
          });
          return;
        }

        // POST /api/studio/reset
        if (req.method === 'POST' && pathname === '/api/studio/reset') {
          try {
            if (fs.existsSync(profilePath)) {
              fs.copyFileSync(profilePath, backupPath);
            }
            const tmpPath = `${profilePath}.${Date.now()}.tmp`;
            fs.writeFileSync(tmpPath, JSON.stringify(DEFAULT_PROFILE, null, 2), 'utf-8');
            fs.renameSync(tmpPath, profilePath);

            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                success: true,
                message: 'Profile reset to default demo template',
                data: DEFAULT_PROFILE,
              })
            );
          } catch (err: unknown) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Failed to reset profile', details: String(err) }));
          }
          return;
        }

        next();
      });
    },
  };
}
