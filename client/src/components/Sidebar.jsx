import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logo, sun } from "../assets";
import { navlinks } from "../constants";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center ${
      isActive === name
        ? "bg-[#2c2f32] shadow-[0_0_10px_rgba(255,255,255,0.8),0_0_20px_rgba(0,255,255,0.5)]"
        : "bg-transparent"
    } ${
      !disabled && "cursor-pointer"
    } ${styles} transition-all duration-300 hover:scale-110`}
    onClick={handleClick}
  >
    <img
      src={imgUrl}
      alt={name}
      className={`w-1/2 h-1/2 ${
        isActive !== name ? "grayscale opacity-70" : "opacity-100"
      } transition-all duration-300`}
    />
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon
          styles="w-[52px] h-[52px] bg-[#2c2f32] shadow-[0_0_10px_rgba(255,255,255,0.8),0_0_20px_rgba(0,255,255,0.5)]"
          imgUrl={logo}
        />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12 shadow-inner">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        <Icon
          styles="bg-[#1c1c24] shadow-[0_0_15px_rgba(255,255,255,0.7),0_0_25px_rgba(0,255,255,0.6)] hover:scale-110"
          imgUrl={sun}
        />
      </div>
    </div>
  );
};

export default Sidebar;
