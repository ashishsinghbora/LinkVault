import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProfileHero } from '../../src/components/profile/ProfileHero';
import { LinkCollections } from '../../src/components/links/LinkCollections';
import { ContactSection } from '../../src/components/profile/ContactSection';
import { SearchBar } from '../../src/components/shared/SearchBar';

describe('Frontend UI Components', () => {
  it('renders ProfileHero with fallback initials when avatar is empty', () => {
    const handleShare = vi.fn();
    render(
      <ProfileHero
        profile={{
          name: 'Ashish Singh Bora',
          headline: 'Systems Engineer',
          bio: 'Building systems',
          avatar: '',
          initialsFallback: 'AB',
        }}
        socials={[]}
        onOpenShare={handleShare}
      />
    );

    // Verify name
    expect(screen.getByText('Ashish Singh Bora')).toBeInTheDocument();
    // Verify initials fallback
    expect(screen.getByText('AB')).toBeInTheDocument();
    // Verify headline
    expect(screen.getByText('Systems Engineer')).toBeInTheDocument();

    // Verify share button triggers callback
    const shareBtn = screen.getByRole('button', { name: /share profile/i });
    fireEvent.click(shareBtn);
    expect(handleShare).toHaveBeenCalled();
  });

  it('filters collections and links in LinkCollections based on searchQuery', () => {
    const collections = [
      {
        id: 'c1',
        title: 'Development Tools',
        order: 1,
        enabled: true,
        items: [
          {
            id: 'l1',
            title: 'Neovim Config',
            description: 'My Lua configuration',
            url: 'https://github.com',
            order: 1,
            enabled: true,
          },
          {
            id: 'l2',
            title: 'Docker Setup',
            description: 'Container templates',
            url: 'https://docker.com',
            order: 2,
            enabled: true,
          },
        ],
      },
    ];

    const { rerender } = render(
      <LinkCollections collections={collections} searchQuery="" />
    );

    expect(screen.getByText('Neovim Config')).toBeInTheDocument();
    expect(screen.getByText('Docker Setup')).toBeInTheDocument();

    // Now search for "Neovim"
    rerender(<LinkCollections collections={collections} searchQuery="neovim" />);
    expect(screen.getByText('Neovim Config')).toBeInTheDocument();
    expect(screen.queryByText('Docker Setup')).not.toBeInTheDocument();

    // Search for non-existent item
    rerender(<LinkCollections collections={collections} searchQuery="kubernetes" />);
    expect(screen.getByText(/no links found matching/i)).toBeInTheDocument();
  });

  it('renders ContactSection channels and handles copy', () => {
    render(
      <ContactSection
        profile={{
          name: 'Ashish',
          headline: 'Engineer',
          bio: '',
          email: 'ashish@example.com',
          website: 'https://ashish.dev',
          gpgFingerprint: 'ABCD 1234 EFGH 5678',
        }}
        showGpg={true}
      />
    );

    expect(screen.getByText('ashish@example.com')).toBeInTheDocument();
    expect(screen.getByText('https://ashish.dev')).toBeInTheDocument();
    expect(screen.getByText('ABCD 1234 EFGH 5678')).toBeInTheDocument();
  });

  it('SearchBar triggers onChange and clears query on reset', () => {
    const handleChange = vi.fn();
    render(<SearchBar value="search term" onChange={handleChange} />);

    const clearBtn = screen.getByRole('button', { name: /clear search query/i });
    fireEvent.click(clearBtn);
    expect(handleChange).toHaveBeenCalledWith('');
  });
});
