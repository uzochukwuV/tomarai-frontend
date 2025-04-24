import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BarChart2, LineChart, Activity, PieChart, MessageSquare } from 'lucide-react';
import { NavItem } from '@/types';

const navItems: NavItem[] = [
  {
    name: 'Dashboard',
    path: '/',
    icon: BarChart2,
  },
  {
    name: 'Market Prediction',
    path: '/market-prediction',
    icon: LineChart,
  },
  {
    name: 'Trading Signals',
    path: '/trading-signals',
    icon: Activity,
  },
  {
    name: 'Market Metrics',
    path: '/market-metrics',
    icon: PieChart,
  },
  {
    name: 'AI Chatbot',
    path: '/chatbot',
    icon: MessageSquare,
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border/40 bg-background pb-10 pt-14 md:flex md:flex-col">
      <div className="flex flex-1 flex-col overflow-hidden px-3">
        <nav className="flex-1 space-y-1 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-150",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className={cn("mr-3 h-5 w-5 shrink-0", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;