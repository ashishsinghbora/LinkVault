#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const profilePath = path.resolve(__dirname, '../src/data/profile.json');

console.log('🔍 Validating LinkVault profile configuration...');

if (!fs.existsSync(profilePath)) {
  console.error(`❌ Error: ${profilePath} does not exist!`);
  process.exit(1);
}

try {
  const content = fs.readFileSync(profilePath, 'utf-8');
  const parsed = JSON.parse(content);

  // Validate basic schema structure
  if (!parsed.profile || !parsed.profile.name) {
    throw new Error('Profile must contain a profile.name field');
  }

  if (!Array.isArray(parsed.collections)) {
    throw new Error('collections must be an array');
  }

  if (!Array.isArray(parsed.projects)) {
    throw new Error('projects must be an array');
  }

  if (!Array.isArray(parsed.socials)) {
    throw new Error('socials must be an array');
  }

  console.log(`✅ Profile is valid!`);
  console.log(`   - Name: ${parsed.profile.name}`);
  console.log(`   - Socials: ${parsed.socials.length}`);
  console.log(`   - Collections: ${parsed.collections.length}`);
  console.log(`   - Projects: ${parsed.projects.length}`);
  console.log(`   - Accent: ${parsed.appearance?.accentColor || 'mint'}`);
  process.exit(0);
} catch (err) {
  console.error(`❌ Profile validation error:`, err.message);
  process.exit(1);
}
