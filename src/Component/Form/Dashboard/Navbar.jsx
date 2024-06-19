import React from "react";
import { FaReact } from "react-icons/fa";
import { RiReactjsLine } from "react-icons/ri";
import { SiReact } from "react-icons/si";
import gymlogo from "../../../Photos/fitness_logo.png";
import { MdSunny } from "react-icons/md";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { BsFillBellFill } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="pt-2 pr-2 bg-red-50 ">
      <nav className=" p-8 flex justify-between  shadow-md rounded-xl bg-white">
        <div className="flex flex-row gap-2 ">
          <div className="">
            <i>
              <MdSunny size={20} color="yellow" />
            </i>
          </div>
          Good morning , sameer
        </div>
        <div className="flex space-x-4">
          <div className="bell-logo">
            <i>
              <BsFillBellFill size={22} color="lightblue" />
            </i>
          </div>
          <div className="text-white">
            <i>
              <RiAccountPinCircleFill size={24} color="#ED8E63" />
            </i>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

{
  /* <div className="text-white mt-1">
            <div>
              <i>
                <IoIosArrowDown size={20} color="black" />
              </i>
            </div>
          </div> */
}
