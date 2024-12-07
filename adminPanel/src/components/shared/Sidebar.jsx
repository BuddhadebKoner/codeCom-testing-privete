import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sections } from '../../constant';

const Sidebar = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  
  return (
    <div className="h-screen w-64 bg-gray-800 text-gray-200 overflow-y-auto overflow-x-hidden pb-10">
      <div className="p-4 text-xl font-bold text-white">Admin Dashboard</div>
      <nav className="space-y-4 px-4">
        <Link to="/" className="block hover:bg-gray-700 p-2 rounded">
          Home
        </Link>
        {sections.map((section, index) => (
          <div key={index}>
            <div
              onClick={() => toggleSection(section.title)}
              className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-700 rounded"
            >
              <span>{section.title}</span>
              <span>
                {openSections[section.title] ? '<-' : '->'}
              </span>
            </div>
            {openSections[section.title] && (
              <div className="ml-4 space-y-2">
                {section.links.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.path}
                    className="block hover:bg-gray-700 p-2 rounded"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
