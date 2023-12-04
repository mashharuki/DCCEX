import { XummContext } from '@/context/XummProvider';
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import React, { useContext } from "react";

interface Props {
  children: React.ReactNode;
}

/**
 * NavbarWrapper Component
 * @param param0 
 * @returns 
 */
export const NavbarWrapper = ({ children }: Props) => {
  const xumm = useContext(XummContext);

  const logIn = async() => {
    await xumm.login();
  }

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden md:p-6">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent></NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          {xumm.address == null && (
            <NavbarItem>
              <button 
                type="button" 
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={logIn}
              >
                Login
              </button>
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
