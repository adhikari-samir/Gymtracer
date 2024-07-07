import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../Photos/fitness_logo.png";
import { TbReportAnalytics } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { TbLogout } from "react-icons/tb";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard"); // Initially active item is Dashboard

  // Define navigation items with their labels, icons, and paths
  const navigationItems = [
    {
      id: 1,
      label: "Dashboard",
      icon: <RxDashboard size={27} />,
      path: "/dashboard",
    },
    {
      id: 2,
      label: "Track Workout",
      icon: <TbReportAnalytics size={27} />,
      path: "/report",
    },
    {
      id: 3,
      label: "Routine",
      icon: <TbReportAnalytics size={27} />,
      path: "/routine",
    },
    {
      id: 4,
      label: "Add details",
      icon: <TbReportAnalytics size={27} />,
      path: "/add_details",
    },
  ];

  // Function to handle click on navigation item and update active state
  const handleItemClick = (label) => {
    setActiveItem(label);
  };

  return (
    <div className="p-2 bg-red-50 flex h-screen">
      <div className="shadow-xl flex flex-col bg-white rounded-xl p-5">
        <div className="mb-8">
          <img src={Logo} alt="Logo" className="w-full" />
        </div>
        <div>
          <ul>
            {navigationItems.map((option) => (
              <li
                key={option.id}
                className={`p-4 flex items-center space-x-2 text-base font-medium ${
                  activeItem === option.label ? "text-red-500" : ""
                }`}
                onClick={() => handleItemClick(option.label)}
              >
                <NavLink
                  to={option.path}
                  className="flex items-center space-x-2"
                >
                  {option.icon}
                  <span>{option.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto">
          <NavLink to="#" className="flex ml-5 space-x-1 text-md items-center">
            <TbLogout size={18} />
            <span>Logout</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
