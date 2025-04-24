import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

const Layout: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <Header />
      <Sidebar />
      <MobileNav />
      <main className="flex-1 pb-8 pt-14 md:ml-64">
        <div className="container max-w-screen-2xl p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;