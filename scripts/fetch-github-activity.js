#!/usr/bin/env node
/**
 * scripts/fetch-github-activity.js
 * Generates a static public GitHub telemetry snapshot for LinkVault.
 * Safe, zero-secret, rate-limit resilient.
 */

import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_PATH = path.resolve(__dirname, '../src/data/github-activity.json');
const USERNAME = 'ashishsinghbora';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent': 'LinkVault-Activity-Snapshot/1.0',
          Accept: 'application/vnd.github.v3+json',
        },
        timeout: 8000,
      },
      (res) => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(new Error('Failed to parse JSON response'));
          }
        });
      }
    );

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
  });
}

async function main() {
  console.log(`[GitHub Telemetry] Fetching activity snapshot for @${USERNAME}...`);

  // Default fallback snapshot in case of failure or rate limit
  let existingData = {
    username: USERNAME,
    profileUrl: `https://github.com/${USERNAME}`,
    lastUpdated: new Date().toISOString(),
    isFallback: true,
    repositories: [
      {
        name: 'ETS',
        fullName: `${USERNAME}/ETS`,
        description: 'Client-side encrypted tiered cloud storage system for Linux with AES-256 and SSD caching.',
        url: `https://github.com/${USERNAME}/ETS`,
        language: 'Python',
        stars: 0,
        forks: 0,
        updatedAt: '2026-03-12T00:00:00Z',
      },
      {
        name: 'Samanvaya',
        fullName: `${USERNAME}/Samanvaya`,
        description: 'Computer-vision-based planetary image registration analyzing Chandrayaan-2 datasets.',
        url: `https://github.com/${USERNAME}/Samanvaya`,
        language: 'Python',
        stars: 0,
        forks: 0,
        updatedAt: '2026-02-28T00:00:00Z',
      },
      {
        name: 'EDA-Agent',
        fullName: `${USERNAME}/EDA-Agent`,
        description: 'Autonomous EDA verification framework using RTL linting, Yosys synthesis, and cocotb testbenches.',
        url: `https://github.com/${USERNAME}/EDA-Agent`,
        language: 'Python',
        stars: 0,
        forks: 0,
        updatedAt: '2026-01-15T00:00:00Z',
      },
      {
        name: 'ARL',
        fullName: `${USERNAME}/ARL`,
        description: 'Adaptive Reinforcement Learning research project investigating state adaptation paradigms.',
        url: `https://github.com/${USERNAME}/ARL`,
        language: 'Python',
        stars: 0,
        forks: 0,
        updatedAt: '2025-12-10T00:00:00Z',
      },
      {
        name: 'LinkVault',
        fullName: `${USERNAME}/LinkVault`,
        description: 'The Digital Observatory: Privacy-first personal digital identity, 3D WebGL core & zero-trust local Studio.',
        url: `https://github.com/${USERNAME}/LinkVault`,
        language: 'TypeScript',
        stars: 0,
        forks: 0,
        updatedAt: new Date().toISOString(),
      },
    ],
    recentEvents: [
      {
        type: 'PushEvent',
        repo: `${USERNAME}/LinkVault`,
        message: 'feat(observatory): 3D spatial navigation & telemetry system',
        timestamp: new Date().toISOString(),
      },
      {
        type: 'PushEvent',
        repo: `${USERNAME}/ETS`,
        message: 'feat(storage): AES-256 tiered caching and systemd hooks',
        timestamp: '2026-03-12T14:20:00Z',
      },
      {
        type: 'PushEvent',
        repo: `${USERNAME}/Samanvaya`,
        message: 'feat(cv): subpixel phase correlation pipeline',
        timestamp: '2026-02-28T10:15:00Z',
      },
    ],
  };

  // If previous snapshot exists, read it as initial fallback
  if (fs.existsSync(OUTPUT_PATH)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8'));
      if (parsed && parsed.repositories) {
        existingData = parsed;
      }
    } catch {
      // ignore
    }
  }

  try {
    const [reposRaw, eventsRaw] = await Promise.all([
      fetchJson(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=12`),
      fetchJson(`https://api.github.com/users/${USERNAME}/events/public?per_page=8`),
    ]);

    const repositories = reposRaw
      .filter((r) => !r.fork && r.name !== USERNAME)
      .slice(0, 6)
      .map((r) => ({
        name: r.name,
        fullName: r.full_name,
        description: r.description || 'Open-source software and research repository.',
        url: r.html_url,
        language: r.language || 'Code',
        stars: r.stargazers_count || 0,
        forks: r.forks_count || 0,
        updatedAt: r.updated_at,
      }));

    // If LinkVault is in repos, ensure it is highlighted
    const linkvaultRepo = reposRaw.find((r) => r.name.toLowerCase() === 'linkvault');
    if (linkvaultRepo && !repositories.some((r) => r.name.toLowerCase() === 'linkvault')) {
      repositories.unshift({
        name: linkvaultRepo.name,
        fullName: linkvaultRepo.full_name,
        description: linkvaultRepo.description || 'The Digital Observatory digital identity platform.',
        url: linkvaultRepo.html_url,
        language: linkvaultRepo.language || 'TypeScript',
        stars: linkvaultRepo.stargazers_count || 0,
        forks: linkvaultRepo.forks_count || 0,
        updatedAt: linkvaultRepo.updated_at,
      });
    }

    const recentEvents = (Array.isArray(eventsRaw) ? eventsRaw : [])
      .slice(0, 6)
      .map((ev) => {
        let msg = 'Public GitHub activity';
        if (ev.type === 'PushEvent' && ev.payload?.commits?.[0]?.message) {
          msg = ev.payload.commits[0].message.split('\n')[0];
        } else if (ev.type === 'CreateEvent') {
          msg = `Created ${ev.payload?.ref_type || 'repository'} ${ev.payload?.ref || ''}`.trim();
        } else if (ev.type === 'WatchEvent') {
          msg = `Starred repository`;
        }
        return {
          type: ev.type,
          repo: ev.repo?.name || `${USERNAME}`,
          message: msg,
          timestamp: ev.created_at || new Date().toISOString(),
        };
      });

    const snapshot = {
      username: USERNAME,
      profileUrl: `https://github.com/${USERNAME}`,
      lastUpdated: new Date().toISOString(),
      isFallback: false,
      repositories: repositories.length ? repositories : existingData.repositories,
      recentEvents: recentEvents.length ? recentEvents : existingData.recentEvents,
    };

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(snapshot, null, 2), 'utf8');
    console.log(`[GitHub Telemetry] Successfully updated ${OUTPUT_PATH} (${snapshot.repositories.length} repos, ${snapshot.recentEvents.length} events).`);
  } catch (error) {
    console.warn(`[GitHub Telemetry] API request failed (${error.message}). Preserving static fallback snapshot.`);
    existingData.isFallback = true;
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(existingData, null, 2), 'utf8');
  }
}

main().catch((err) => {
  console.warn('[GitHub Telemetry] Unexpected error:', err.message);
  process.exit(0); // Never fail the build
});
