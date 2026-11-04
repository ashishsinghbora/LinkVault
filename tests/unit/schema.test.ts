import { describe, it, expect } from 'vitest';
import {
  safeUrlSchema,
  validateProfile,
  sanitizeProfileData,
  DEFAULT_PROFILE,
} from '../../src/lib/schema';
import type { ProfileData } from '../../src/types/profile';

describe('Profile Schema & Validation', () => {
  it('validates the default profile successfully', () => {
    const result = validateProfile(DEFAULT_PROFILE);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.profile.name).toBe('Ashish Singh Bora');
      expect(result.data.collections.length).toBeGreaterThan(0);
    }
  });

  it('rejects profiles missing mandatory name', () => {
    const invalidProfile = {
      ...DEFAULT_PROFILE,
      profile: {
        ...DEFAULT_PROFILE.profile,
        name: '',
      },
    };
    const result = validateProfile(invalidProfile);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.some((e) => e.includes('profile.name'))).toBe(true);
    }
  });

  it('rejects unsafe script URLs in safeUrlSchema', () => {
    const dangerousUrls = [
      'javascript:alert(1)',
      'JAVASCRIPT:alert(document.cookie)',
      'vbscript:msgbox("hacked")',
      'data:text/html,<script>alert(1)</script>',
      'data:application/javascript,alert(1)',
    ];

    dangerousUrls.forEach((url) => {
      const parsed = safeUrlSchema.safeParse(url);
      expect(parsed.success).toBe(false);
    });
  });

  it('accepts valid http, https, and mailto URLs', () => {
    const safeUrls = [
      'https://github.com/ashishsinghbora',
      'http://localhost:5173',
      'mailto:test@example.com',
      '/local/asset.png',
      '',
    ];

    safeUrls.forEach((url) => {
      const parsed = safeUrlSchema.safeParse(url);
      expect(parsed.success).toBe(true);
    });
  });

  it('gracefully handles missing optional content without errors', () => {
    const minimalProfile = {
      schemaVersion: 1,
      profile: {
        name: 'Jane Doe',
      },
      metadata: {
        title: 'Jane Doe Profile',
      },
    };

    const result = validateProfile(minimalProfile);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.profile.avatar).toBe('');
      expect(result.data.profile.headline).toBe('');
      expect(result.data.socials).toEqual([]);
      expect(result.data.collections).toEqual([]);
      expect(result.data.projects).toEqual([]);
      expect(result.data.appearance.defaultTheme).toBe('dark');
    }
  });

  it('filters out disabled socials, links, and projects in sanitizeProfileData', () => {
    const testData: ProfileData = {
      ...DEFAULT_PROFILE,
      socials: [
        { id: '1', platform: 'gh', label: 'GH', url: 'https://gh.com', order: 1, enabled: true },
        { id: '2', platform: 'x', label: 'X', url: 'https://x.com', order: 2, enabled: false },
      ],
      collections: [
        {
          id: 'col-1',
          title: 'Active Col',
          order: 1,
          enabled: true,
          items: [
            { id: 'l1', title: 'Link 1', url: 'https://a.com', order: 1, enabled: true },
            { id: 'l2', title: 'Link 2', url: 'https://b.com', order: 2, enabled: false },
          ],
        },
        {
          id: 'col-2',
          title: 'Disabled Col',
          order: 2,
          enabled: false,
          items: [],
        },
      ],
      projects: [
        { id: 'p1', title: 'Proj 1', description: 'Desc 1', tags: [], status: 'Active', order: 1, enabled: true },
        { id: 'p2', title: 'Proj 2', description: 'Desc 2', tags: [], status: 'Beta', order: 2, enabled: false },
      ],
    };

    const sanitized = sanitizeProfileData(testData);

    expect(sanitized.socials.length).toBe(1);
    expect(sanitized.socials[0].id).toBe('1');

    expect(sanitized.collections.length).toBe(1);
    expect(sanitized.collections[0].id).toBe('col-1');
    expect(sanitized.collections[0].items.length).toBe(1);
    expect(sanitized.collections[0].items[0].id).toBe('l1');

    expect(sanitized.projects.length).toBe(1);
    expect(sanitized.projects[0].id).toBe('p1');
  });

  it('sorts items according to order field in sanitizeProfileData', () => {
    const testData: ProfileData = {
      ...DEFAULT_PROFILE,
      socials: [
        { id: '3', platform: 'p3', label: 'P3', url: 'https://3.com', order: 3, enabled: true },
        { id: '1', platform: 'p1', label: 'P1', url: 'https://1.com', order: 1, enabled: true },
        { id: '2', platform: 'p2', label: 'P2', url: 'https://2.com', order: 2, enabled: true },
      ],
    };

    const sanitized = sanitizeProfileData(testData);
    expect(sanitized.socials.map((s) => s.id)).toEqual(['1', '2', '3']);
  });
});
