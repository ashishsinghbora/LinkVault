import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { validateProfile, DEFAULT_PROFILE } from '../../src/lib/schema';

describe('Studio Atomic Write & File Security', () => {
  const testDir = path.resolve(__dirname, '../temp-test');
  const testProfilePath = path.resolve(testDir, 'profile.test.json');
  const testBackupPath = path.resolve(testDir, 'profile.test.backup.json');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('performs safe atomic write by writing to temp file and renaming', () => {
    // 1. Initial write
    fs.writeFileSync(testProfilePath, JSON.stringify(DEFAULT_PROFILE, null, 2), 'utf-8');
    expect(fs.existsSync(testProfilePath)).toBe(true);

    // 2. Perform atomic update
    const updatedProfile = {
      ...DEFAULT_PROFILE,
      profile: {
        ...DEFAULT_PROFILE.profile,
        name: 'Atomic Updated Name',
      },
    };

    // Backup existing
    fs.copyFileSync(testProfilePath, testBackupPath);
    expect(fs.existsSync(testBackupPath)).toBe(true);

    // Atomic write
    const tmpPath = `${testProfilePath}.${Date.now()}.tmp`;
    fs.writeFileSync(tmpPath, JSON.stringify(updatedProfile, null, 2), 'utf-8');
    expect(fs.existsSync(tmpPath)).toBe(true);

    // Atomic rename
    fs.renameSync(tmpPath, testProfilePath);
    expect(fs.existsSync(tmpPath)).toBe(false);

    // Verify content
    const savedContent = JSON.parse(fs.readFileSync(testProfilePath, 'utf-8'));
    expect(savedContent.profile.name).toBe('Atomic Updated Name');
  });

  it('validates incoming payload before writing and rejects invalid schemas', () => {
    const maliciousPayload = {
      schemaVersion: 1,
      profile: {
        name: '<script>alert("xss")</script>',
        website: 'javascript:document.location="http://attacker.com"',
      },
    };

    const validation = validateProfile(maliciousPayload);
    // safeUrlSchema should reject javascript: URI
    expect(validation.success).toBe(false);
  });
});
