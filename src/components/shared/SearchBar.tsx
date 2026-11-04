import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search links, tags, and projects...',
  className = '',
}) => {
  return (
    <div className={`relative w-full max-w-md mx-auto ${className}`}>
      <label htmlFor="search-input" className="sr-only">
        Search links and projects
      </label>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-signal-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        id="search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 text-xs md:text-sm bg-signal-900/80 dark:bg-signal-900/80 light:bg-white text-signal-100 dark:text-signal-100 light:text-slate-900 placeholder-signal-500 rounded-lg border border-white/10 dark:border-white/10 light:border-slate-300 focus:border-mint-400 dark:focus:border-mint-400 focus:ring-1 focus:ring-mint-400 transition-all outline-none font-mono"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search query"
          className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-signal-400 hover:text-signal-100 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
