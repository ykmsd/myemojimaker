import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, Info, HelpCircle } from 'lucide-react';

export const MenuBar: React.FC = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${
                  isActive ? 'text-purple-600 dark:text-purple-400' : ''
                }`
              }
            >
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Emoji Maker</span>
            </NavLink>
            
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${
                  isActive ? 'text-purple-600 dark:text-purple-400' : ''
                }`
              }
            >
              <Info className="w-5 h-5" />
              <span className="font-medium">About</span>
            </NavLink>

            <NavLink
              to="/faq"
              className={({ isActive }) =>
                `flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${
                  isActive ? 'text-purple-600 dark:text-purple-400' : ''
                }`
              }
            >
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">FAQ</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};