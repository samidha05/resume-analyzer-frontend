import React, { useState } from 'react';
import { Search, MapPin, Briefcase, ExternalLink, Loader, IndianRupee, Clock } from 'lucide-react';
import { searchJobs } from '../services/api';

export default function FindJobs() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) { setError('Please enter a job title or domain (e.g. "Java Developer")'); return; }
    setLoading(true);
    setError('');
    setSearched(true);
    try {
      const res = await searchJobs(query.trim(), location.trim());
      setJobs(res.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch jobs. Please try again.');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-900/30 dark:to-sky-900/30 rounded-full text-blue-700 dark:text-blue-400 text-sm font-bold mb-4 border border-blue-200 dark:border-blue-800">
            <Briefcase className="h-4 w-4" />
            <span>Live Job Search</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3">Find Jobs</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Search real, live openings by role or domain — apply directly on the company's site
          </p>
        </div>

        {/* Search form */}
        <form onSubmit={handleSearch} className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-card p-6 mb-8 animate-slide-up">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            <div className="sm:col-span-3 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Java Developer, Data Analyst..."
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white outline-none transition-all"
              />
            </div>
            <div className="sm:col-span-1 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City (optional)"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="sm:col-span-1 py-3.5 px-6 bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {loading ? <Loader className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
              <span>{loading ? '' : 'Search'}</span>
            </button>
          </div>
          {error && <p className="text-sm text-red-600 dark:text-red-400 mt-3">{error}</p>}
        </form>

        {/* Results */}
        {loading && (
          <div className="text-center py-16">
            <Loader className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">Finding live openings...</p>
          </div>
        )}

        {!loading && searched && jobs.length === 0 && !error && (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            No jobs found for that search. Try a different title or location.
          </div>
        )}

        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-card p-6 hover:shadow-lg transition-all animate-slide-up">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">{job.title}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mt-0.5">{job.company}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center space-x-1"><MapPin className="h-3.5 w-3.5" /><span>{job.location}</span></span>
                    {job.postedAt && (
                      <span className="flex items-center space-x-1"><Clock className="h-3.5 w-3.5" /><span>{new Date(job.postedAt).toLocaleDateString()}</span></span>
                    )}
                    {job.salaryMin && (
                      <span className="flex items-center space-x-1"><IndianRupee className="h-3.5 w-3.5" /><span>{Math.round(job.salaryMin).toLocaleString()}{job.salaryMax ? ` - ${Math.round(job.salaryMax).toLocaleString()}` : '+'}</span></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">{job.description}...</p>
                </div>
                
                  <a href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 flex items-center justify-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl text-sm hover:scale-105 transition-all shadow-lg shadow-blue-500/20"
                >
                  <span>Apply</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}