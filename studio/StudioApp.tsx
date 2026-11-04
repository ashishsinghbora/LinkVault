import { useState, useEffect, useCallback } from 'react';
import initialProfileJson from '../src/data/profile.json';
import { validateProfile, DEFAULT_PROFILE } from '../src/lib/schema';
import type { ProfileData } from '../src/types/profile';
import type { StudioTab } from './types';
import { StudioSidebar } from './components/StudioSidebar';
import { DevicePreview } from './components/DevicePreview';
import { OverviewTab } from './pages/OverviewTab';
import { IdentityTab } from './pages/IdentityTab';
import { SocialsTab } from './pages/SocialsTab';
import { CollectionsTab } from './pages/CollectionsTab';
import { ProjectsTab } from './pages/ProjectsTab';
import { AppearanceTab } from './pages/AppearanceTab';
import { SeoTab } from './pages/SeoTab';
import { ExportTab } from './pages/ExportTab';
import { RawJsonTab } from './pages/RawJsonTab';
import {
  Save,
  Undo2,
  Redo2,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

export function StudioApp() {
  const [activeTab, setActiveTab] = useState<StudioTab>('overview');
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    const validated = validateProfile(initialProfileJson);
    return validated.success ? validated.data : DEFAULT_PROFILE;
  });

  // Undo / Redo history
  const [history, setHistory] = useState<ProfileData[]>([profileData]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [isApiConnected, setIsApiConnected] = useState(true);
  const [showPreviewOnMobile, setShowPreviewOnMobile] = useState(false);

  // Check Vite Dev Studio API on mount
  useEffect(() => {
    fetch('/api/studio/status')
      .then((res) => {
        if (res.ok) {
          setIsApiConnected(true);
          // Also fetch fresh profile
          fetch('/api/studio/profile')
            .then((r) => r.json())
            .then((data) => {
              const val = validateProfile(data);
              if (val.success) {
                setProfileData(val.data);
                setHistory([val.data]);
                setHistoryIndex(0);
              }
            })
            .catch(() => {});
        } else {
          setIsApiConnected(false);
        }
      })
      .catch(() => {
        setIsApiConnected(false);
      });
  }, []);

  // Update profile data and record in history
  const handleDataChange = useCallback(
    (newData: ProfileData) => {
      setProfileData(newData);
      setHasUnsavedChanges(true);
      setSaveStatus('idle');

      // Append to history stack
      const nextHistory = history.slice(0, historyIndex + 1);
      nextHistory.push(newData);
      // Keep max 30 history states
      if (nextHistory.length > 30) {
        nextHistory.shift();
      }
      setHistory(nextHistory);
      setHistoryIndex(nextHistory.length - 1);
    },
    [history, historyIndex]
  );

  // Undo
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setProfileData(history[newIndex]);
      setHasUnsavedChanges(true);
    }
  }, [history, historyIndex]);

  // Redo
  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setProfileData(history[newIndex]);
      setHasUnsavedChanges(true);
    }
  }, [history, historyIndex]);

  // Keyboard shortcut listener for Ctrl+Z, Ctrl+Shift+Z, Ctrl+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        handleRedo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Save to disk via Vite Studio middleware
  const handleSave = async () => {
    const validation = validateProfile(profileData);
    if (!validation.success) {
      setSaveStatus('error');
      setStatusMessage(`Validation failed: ${validation.errors[0]}`);
      return;
    }

    setSaveStatus('saving');
    setStatusMessage('Saving profile directly to disk...');

    try {
      const res = await fetch('/api/studio/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validation.data),
      });

      if (res.ok) {
        setSaveStatus('saved');
        setHasUnsavedChanges(false);
        setStatusMessage('Saved to src/data/profile.json successfully!');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Failed to save configuration');
      }
    } catch (err: unknown) {
      console.warn('Vite Studio API unavailable, offering JSON download fallback:', err);
      // Fallback: trigger download
      const jsonStr = JSON.stringify(validation.data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'profile.json';
      a.click();
      URL.revokeObjectURL(url);

      setSaveStatus('saved');
      setHasUnsavedChanges(false);
      setStatusMessage('Downloaded profile.json (API unavailable). Place in src/data/profile.json');
      setTimeout(() => setSaveStatus('idle'), 4000);
    }
  };

  const handleResetToDemo = async () => {
    try {
      const res = await fetch('/api/studio/reset', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setProfileData(data.data || DEFAULT_PROFILE);
      } else {
        setProfileData(DEFAULT_PROFILE);
      }
    } catch {
      setProfileData(DEFAULT_PROFILE);
    }
    setHasUnsavedChanges(true);
    setHistory([DEFAULT_PROFILE]);
    setHistoryIndex(0);
  };

  return (
    <div className="flex h-screen w-screen bg-signal-950 text-signal-100 overflow-hidden font-sans">
      {/* Left Sidebar */}
      <StudioSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        data={profileData}
        isApiConnected={isApiConnected}
      />

      {/* Main Center Editor Panel */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-signal-900/60">
        {/* Top Control Bar */}
        <header className="h-14 px-6 border-b border-white/10 bg-signal-950/80 flex items-center justify-between gap-4 select-none">
          <div className="flex items-center gap-3">
            {/* Tab title badge */}
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-signal-300">
              // STUDIO: {activeTab.toUpperCase()}
            </span>

            {/* Unsaved indicator */}
            {hasUnsavedChanges ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                UNSAVED CHANGES
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-mint-500/10 text-mint-400">
                <CheckCircle className="w-3 h-3" />
                SYNCED
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Undo / Redo */}
            <div className="flex items-center gap-1 bg-signal-850 p-1 rounded-lg border border-white/10">
              <button
                onClick={handleUndo}
                disabled={historyIndex <= 0}
                title="Undo (Ctrl+Z)"
                aria-label="Undo"
                className="p-1 rounded text-signal-400 hover:text-signal-200 disabled:opacity-20 transition-colors"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
                title="Redo (Ctrl+Shift+Z)"
                aria-label="Redo"
                className="p-1 rounded text-signal-400 hover:text-signal-200 disabled:opacity-20 transition-colors"
              >
                <Redo2 className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile preview toggle */}
            <button
              onClick={() => setShowPreviewOnMobile(!showPreviewOnMobile)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-signal-850 hover:bg-signal-800 text-signal-300 text-xs font-mono border border-white/10"
            >
              {showPreviewOnMobile ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showPreviewOnMobile ? 'Editor' : 'Preview'}</span>
            </button>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-mint-500 hover:bg-mint-400 text-signal-950 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-signal-glow disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saveStatus === 'saving' ? 'Saving...' : 'Save Profile'}</span>
            </button>
          </div>
        </header>

        {/* Status Toast */}
        {statusMessage && (
          <div
            className={`px-6 py-2 text-xs font-mono border-b flex items-center gap-2 animate-fadeIn ${
              saveStatus === 'error'
                ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                : 'bg-mint-500/15 text-mint-300 border-mint-500/30'
            }`}
          >
            {saveStatus === 'error' ? (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            ) : (
              <CheckCircle className="w-4 h-4 flex-shrink-0 text-mint-400" />
            )}
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Editor Body */}
        <div className="flex-1 overflow-y-auto p-6 max-w-4xl w-full mx-auto">
          {activeTab === 'overview' && (
            <OverviewTab
              data={profileData}
              onNavigate={setActiveTab}
              onSave={handleSave}
              hasUnsavedChanges={hasUnsavedChanges}
            />
          )}

          {activeTab === 'identity' && (
            <IdentityTab data={profileData} onChange={handleDataChange} />
          )}

          {activeTab === 'socials' && (
            <SocialsTab data={profileData} onChange={handleDataChange} />
          )}

          {activeTab === 'collections' && (
            <CollectionsTab data={profileData} onChange={handleDataChange} />
          )}

          {activeTab === 'projects' && (
            <ProjectsTab data={profileData} onChange={handleDataChange} />
          )}

          {activeTab === 'appearance' && (
            <AppearanceTab data={profileData} onChange={handleDataChange} />
          )}

          {activeTab === 'seo' && (
            <SeoTab data={profileData} onChange={handleDataChange} />
          )}

          {activeTab === 'export' && (
            <ExportTab
              data={profileData}
              onImport={handleDataChange}
              onResetToDemo={handleResetToDemo}
            />
          )}

          {activeTab === 'raw' && (
            <RawJsonTab data={profileData} onChange={handleDataChange} />
          )}
        </div>
      </main>

      {/* Right Panel: Live Interactive Device Preview */}
      <div className={`lg:flex ${showPreviewOnMobile ? 'flex absolute inset-0 z-50' : 'hidden'}`}>
        <DevicePreview data={profileData} />
      </div>
    </div>
  );
}
export default StudioApp;
