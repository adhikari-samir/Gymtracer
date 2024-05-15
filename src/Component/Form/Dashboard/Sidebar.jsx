import React from "react";
import Logo from "../../../Photos/fitness_logo.png";
import { TbReportAnalytics } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { TbLogout } from "react-icons/tb";

const Sidebar = () => {
  const navigationItems = [
    {
      id: 1,
      label: "Dashboard",
      icon: <RxDashboard size={22} />,
    },
    {
      id: 2,
      label: "Report",
      icon: <TbReportAnalytics size={22} />,
    },
  ];
  return (
    <div className="flex h-screen ">
      <div className="shadow-2xl p-12 w-64 flex flex-col items-center]">
        <div className="mb-8">
          <img src={Logo} alt="logo hai" className="w-48" />
        </div>
        <div>
          <ul>
            {navigationItems.map((option) => (
              <li key={option.id} className="p-4 flex items-center space-x-2 ">
                {option.icon}
                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto p-4">
          <p className=" text-sm flex space-x-1 items-center">
            <TbLogout size={18} />
            <span>Log out</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
