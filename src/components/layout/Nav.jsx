import React, { useState } from "react";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import classNames from "classnames";

const Navbar = ({ homePageData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full z-50">
      <div className="mx-auto lg:px-16 px-8 flex justify-between">
        <a href="#">
          <div className="w-40">
            <img className="w-full" src="/img/mainLogo.png" alt="Logo" />
          </div>
        </a>
        <div
          className={classNames(
            "flex lg:flex-row flex-col lg:relative fixed lg:bg-transparent bg-gray-100 transition-all lg:right-0 ease-in-out duration-200 xl:w-8/12 lg:w-9/12 w-[100vw] top-0 lg:h-auto h-[100vh] items-center ms-0 xl:ms-2 justify-between px-4 z-50",
            {
              "right-0": isOpen,
              "-right-[100vw]": !isOpen,
            }
          )}
        >
          <Button
            variant="empty"
            onClick={() => setIsOpen(!isOpen)}
            icon={<Icon name="close" size={26} />}
            className="items-center self-start mt-4 px-0 lg:hidden block"
          ></Button>

          <div className="lg:flex lg:w-auto w-full lg:divide-none divide-y divide-gray-300">
            <Button className="w-full rounded-none" variant="menu">
              Home
            </Button>
            <Button className="w-full rounded-none" variant="menu">
              Mission
            </Button>
            <Button className="w-full rounded-none" variant="menu">
              Our Staff
            </Button>
            <Button className="w-full rounded-none" variant="menu">
              Services
            </Button>
            <Button className="w-full rounded-none" variant="menu">
              Insurance
            </Button>
          </div>
          <div className="self-center lg:mb-0 mb-40">
            <a href={`tel:${homePageData[0].data.phone}`}>
              <div className="flex gap-2 font-bold">
                <div className="bg-teal-500 flex items-center justify-center w-7 h-7 rounded-full text-white">
                  <Icon name="phone" size={12} />
                </div>
                {homePageData[0].data.phone}
              </div>
            </a>
          </div>
        </div>

        <div className="lg:hidden flex">
          <Button
            variant="empty"
            onClick={() => setIsOpen(!isOpen)}
            icon={<Icon name="menu" size={32} />}
            className="items-center justify-center p-2 flex !px-0 font-bold"
          >
            Menu
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
