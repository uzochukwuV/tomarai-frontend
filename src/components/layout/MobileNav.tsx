import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BarChart2, Menu, LineChart, Activity, PieChart, MessageSquare } from 'lucide-react';
import { NavItem } from '@/types';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

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

const MobileNav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex items-center md:hidden fixed top-0 left-0 right-0 h-14 border-b border-border/40 bg-background/95 backdrop-blur z-40 px-4">
      <div className="flex items-center space-x-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <div className="flex items-center space-x-2">
                  <BarChart2 className="h-6 w-6" />
                  <span className="font-bold">Token Metrics AI</span>
                </div>
              </div>
              <nav className="flex-1 overflow-auto py-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center py-3 px-4 text-sm hover:bg-muted/50 transition-colors",
                        isActive ? "bg-muted font-medium" : ""
                      )}
                      onClick={() => setOpen(false)}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center">
          <BarChart2 className="h-6 w-6 mr-2" />
          <span className="font-bold">Token Metrics AI</span>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;