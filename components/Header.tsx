import React from "react";
import Image from "next/image";
import BgHeaderDesktop from "@/public/bg-header-desktop.svg";
import BgHeaderMobile from "@/public/bg-header-mobile.svg";

interface HeaderProps {
  headerText?: string;
}

const Header: React.FC<HeaderProps> = ({
  headerText = "Welcome to JobLista",
}) => {
  return (
    <div className="relative w-full h-[150px] overflow-hidden">
      {/* Mobile Header Image */}
      <div className="block md:hidden">
        <Image
          src={BgHeaderMobile}
          alt="Mobile Background Header"
          fill
          className="object-cover"
        />
      </div>

      {/* Desktop Header Image */}
      <div className="hidden md:block">
        <Image
          src={BgHeaderDesktop}
          alt="Desktop Background Header"
          fill
          className="object-cover"
        />
      </div>

      {/* Overlay with Dynamic Header Text */}
      <div className="absolute inset-0 bg-primary opacity-75 flex items-center justify-center">
        <h1 className="text-white text-2xl md:text-4xl font-bold">
          {headerText}
        </h1>
      </div>
    </div>
  );
};

export default Header;
