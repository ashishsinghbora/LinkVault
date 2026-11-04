import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CommandPalette } from '../../src/components/shared/CommandPalette';
import { SkillsConstellation, VERIFIED_SKILLS } from '../../src/components/skills/SkillsConstellation';
import { GitHubActivitySection } from '../../src/components/github/GitHubActivitySection';
import { SPATIAL_NODES } from '../../src/scenes/spatialNodes';
import { DEFAULT_PROFILE } from '../../src/lib/schema';

describe('The Digital Observatory — Features & Telemetry', () => {
  it('defines all 7 required spatial navigation nodes with target IDs', () => {
    expect(SPATIAL_NODES).toHaveLength(7);
    const targetIds = SPATIAL_NODES.map((n) => n.targetId);
    expect(targetIds).toContain('signal-hero');
    expect(targetIds).toContain('projects-section');
    expect(targetIds).toContain('collections-section');
    expect(targetIds).toContain('github-activity-section');
    expect(targetIds).toContain('media-section');
    expect(targetIds).toContain('credentials-section');
    expect(targetIds).toContain('contact-section');
  });

  it('renders CommandPalette and filters items dynamically', () => {
    const handleClose = vi.fn();
    const handleToggleTheme = vi.fn();
    const handleOpenShare = vi.fn();

    render(
      <CommandPalette
        isOpen={true}
        onClose={handleClose}
        profileData={DEFAULT_PROFILE}
        themeMode="dark"
        onToggleTheme={handleToggleTheme}
        onOpenShare={handleOpenShare}
      />
    );

    // Dialog is visible
    expect(screen.getByRole('dialog', { name: /command palette/i })).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/type a command or search/i);
    expect(input).toBeInTheDocument();

    // Search for Projects
    fireEvent.change(input, { target: { value: 'projects' } });
    expect(screen.getByText('Engineering Projects')).toBeInTheDocument();

    // Close on Escape
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalled();
  });

  it('renders SkillsConstellation with categories and toggles semantic view', () => {
    render(<SkillsConstellation />);

    // Section title
    expect(screen.getByText(/engineering & technical domain map/i)).toBeInTheDocument();

    // At least some verified skills should be in the document
    expect(screen.getAllByText(VERIFIED_SKILLS[0].name).length).toBeGreaterThan(0);

    // Toggle to semantic table view
    const toggleBtn = screen.getByRole('button', { name: /accessible table view/i });
    fireEvent.click(toggleBtn);

    // Semantic table headers should now be in the document
    expect(screen.getByText('Domain Area')).toBeInTheDocument();
    expect(screen.getByText('Competency')).toBeInTheDocument();
    expect(screen.getByText('Verified Project Evidence')).toBeInTheDocument();
  });

  it('renders GitHubActivitySection with repository highlights and commit telemetry', () => {
    const mockActivity = {
      username: 'ashishsinghbora',
      profileUrl: 'https://github.com/ashishsinghbora',
      lastUpdated: '2026-11-04T08:00:00Z',
      isFallback: false,
      repositories: [
        {
          name: 'ETS',
          fullName: 'ashishsinghbora/ETS',
          description: 'Client-side encrypted tiered cloud storage',
          url: 'https://github.com/ashishsinghbora/ETS',
          language: 'Python',
          stars: 12,
          forks: 2,
          updatedAt: '2026-03-12T00:00:00Z',
        },
      ],
      recentEvents: [
        {
          type: 'PushEvent',
          repo: 'ashishsinghbora/ETS',
          message: 'feat(storage): enhance AES-256 tiered caching',
          timestamp: '2026-03-12T14:20:00Z',
        },
      ],
    };

    render(<GitHubActivitySection activityData={mockActivity} />);

    expect(screen.getByText(/developer activity & repositories/i)).toBeInTheDocument();
    expect(screen.getAllByText('ETS').length).toBeGreaterThan(0);
    expect(screen.getByText('feat(storage): enhance AES-256 tiered caching')).toBeInTheDocument();
    expect(screen.getByText(/view @ashishsinghbora/i)).toBeInTheDocument();
  });
});
