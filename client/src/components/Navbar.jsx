import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ activetab }) {
  const linkClass = (tab) =>
    `px-4 py-2 text-sm font-medium ${
      activetab === tab
        ? 'text-blue-600 border-b-2 border-blue-600'
        : 'text-gray-700 hover:text-blue-500'
    }`;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center space-x-6">
          <Link to="/blog" className={linkClass('blog')}>
            Blog
          </Link>
          <Link to="/drafts" className={linkClass('drafts')}>
            Drafts
          </Link>
          <Link to="/Myblog" className={linkClass('Myblog')}>
            My Blogs
          </Link>
        </div>
      </div>
    </nav>
  );
}
