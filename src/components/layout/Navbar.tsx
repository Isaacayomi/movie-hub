import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Search, Menu, X, Home, Flame, Star, Calendar, Film } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const query = searchParams.get('q') || '';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const currentParams = new URLSearchParams(searchParams);
    
    if (value) {
      currentParams.set('q', value);
    } else {
      currentParams.delete('q');
    }
    
    navigate(`/search?${currentParams.toString()}`);
  };

  const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Popular', path: '/search?sort_by=popularity.desc', icon: Flame },
    { name: 'Top Rated', path: '/search?sort_by=vote_average.desc', icon: Star },
    { name: 'Upcoming', path: '/search?sort_by=primary_release_date.desc', icon: Calendar },
  ];

  return (
    <header className="sticky top-0 bg-white border-b border-slate-100 h-16 flex items-center justify-between px-6 z-30">
      {/* Mobile Branding / Hamburger Toggle */}
      <div className="flex items-center gap-3 md:hidden">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 -ml-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <Film className="w-6 h-6 text-accent" />
          <span className="font-bold text-lg text-slate-900">MovieHub</span>
        </Link>
      </div>

      {/* Search Input Section */}
      <div className="flex-1 max-w-md md:max-w-xl mx-4 md:mx-0 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 h-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search for movies, genres..."
          value={query}
          onChange={handleSearchChange}
          className="block w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm transition-all duration-200"
        />
      </div>

      {/* Right Navbar Actions */}
      <div className="flex items-center gap-4">
      </div>

      {/* Mobile Menu Backdrop & Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 w-72 bg-white p-6 shadow-xl flex flex-col justify-between">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Film className="w-6 h-6 text-accent" />
                  <span className="font-bold text-lg text-slate-900">MovieHub</span>
                </Link>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-slate-400" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>


          </div>
        </div>
      )}
    </header>
  );
}
