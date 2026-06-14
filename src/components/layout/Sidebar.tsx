import { Link, useLocation } from 'react-router-dom';
import { Home, Flame, Star, Calendar, Film } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const navigationItems = [
    { 
      name: 'Home', 
      path: '/', 
      icon: Home,
      isActive: location.pathname === '/' 
    },
    { 
      name: 'Popular', 
      path: '/search?sort_by=popularity.desc', 
      icon: Flame,
      isActive: location.pathname === '/search' && location.search.includes('popularity.desc')
    },
    { 
      name: 'Top Rated', 
      path: '/search?sort_by=vote_average.desc', 
      icon: Star,
      isActive: location.pathname === '/search' && location.search.includes('vote_average.desc')
    },
    { 
      name: 'Upcoming', 
      path: '/search?sort_by=primary_release_date.desc', 
      icon: Calendar,
      isActive: location.pathname === '/search' && location.search.includes('primary_release_date.desc')
    },
  ];

  return (
    <aside className="w-64 border-r border-slate-100 bg-white h-screen sticky top-0 flex flex-col justify-between hidden md:flex z-20">
      <div className="flex flex-col flex-1 p-6">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 px-2 mb-8">
          <div className="p-2 bg-accent rounded-xl text-white shadow-md shadow-blue-500/20">
            <Film className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              Movie<span className="text-accent">Hub</span>
            </span>
          </div>
        </Link>

        {/* Menu Section */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase px-2">
            Discover
          </span>
          <nav className="mt-2 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    item.isActive
                      ? 'bg-accent/10 text-accent font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                    item.isActive ? 'text-accent' : 'text-slate-400 group-hover:text-slate-600'
                  }`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

    </aside>
  );
}
