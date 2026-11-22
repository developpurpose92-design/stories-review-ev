import React from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';

export default function FilterBar({ 
  activeFilter, 
  onFilterChange, 
  searchQuery, 
  onSearchChange,
  counts 
}) {
  const tabs = [
    { id: 'all', label: 'All Stories', count: counts.all },
    { id: 'LFHP', label: 'LFHP', count: counts.LFHP },
    { id: 'EHF', label: 'EHF', count: counts.EHF },
    { id: '2-Day Live Workshop', label: '2-Day Live Workshop', count: counts['2-Day Live Workshop'] },
    { id: 'other', label: 'Other Programs', count: counts.other },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800/90 backdrop-blur-md shadow-lg flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-slate-400 uppercase tracking-wider mr-1">
            <Filter className="w-3.5 h-3.5 text-blue-400" />
            Filter:
          </span>

          {tabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onFilterChange(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 border border-blue-400/50'
                    : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                    isActive ? 'bg-blue-800 text-blue-100' : 'bg-slate-900 text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search Input Box */}
        <div className="relative min-w-[240px] sm:min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by student name, college, or role..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-slate-950/80 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-slate-500 outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
