import { GlobalContext } from '@/context/GlobalProvider';
import { XummContext } from '@/context/XummProvider';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import Image from 'next/image';
import { useContext, useState } from "react";
import iconImage from "../../public/DCCEX.png";
import { PageHeader } from "../common/pageHeader";
import Spinner from '../common/spinner';

export type Currency = {
  name: string;
  currency: number;
}

/**
 * FaucetContent Component
 * @returns 
 */
export const FaucetContent = () => {
  const [token, setToken] = useState<Currency>({
    name: "XRP",
    currency: 0
  });

  const xumm = useContext(XummContext);
  const globalContext = useContext(GlobalContext);

  return (
    <div className="h-full">
      <div className="flex justify-center gap-4 xl:gap-12 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
        <div className="mt-6  gap-6 flex flex-col w-full">
          {globalContext.loading ? (
            <Spinner/>
          ) : (
            <>
              {xumm.address == null ? (
                <h2 className='justify-center text-center'>Please Login!</h2>
              ) : (
                <>
                  {/* PageHeader */}
                  <PageHeader/>
                  <div className="h-full flex flex-col gap-2">
                    <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 text-center">
                      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                          <Image 
                            className="mx-auto h-20 w-auto" 
                            src={iconImage}
                            alt="DECCEX"
                          />
                          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white-900">
                            Faucet Page
                          </h2>
                        </div>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                          <form className="space-y-6" action="#" method="POST">
                            <div>
                              <label htmlFor="token" className="block font-medium leading-6 text-white-900 p-4">
                                <h2>You can get Test XRP!!</h2>
                              </label>
                              <Dropdown
                                classNames={{
                                  base: "w-full min-w-[260px]",
                                }}
                              >
                                <DropdownTrigger className="cursor-pointer">
                                  <div className="items-center gap-2 bg-gray-700">
                                    <div className="flex-col gap-4 bg-gray-700">
                                      <h3 className="text-xl font-medium m-0 text-white -mb-4 whitespace-nowrap">
                                        {token.name}
                                      </h3>
                                    </div>
                                  </div>
                                </DropdownTrigger>
                                <DropdownMenu
                                  className="bg-gray-900"
                                  onAction={(e) => {
                                    if (e === "0") {
                                      setToken({
                                        name: "XRP",
                                        currency: 0,
                                      });
                                    }
                                  }}
                                  aria-label="Avatar Actions"
                                >
                                  <DropdownSection 
                                    title="tokens"
                                    className="bg-gray-900"
                                  >
                                    <DropdownItem
                                      key="0"
                                      className="py-4 text-base font-semibold text-white"
                                    >
                                      XRP
                                    </DropdownItem>
                                  </DropdownSection>
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                            <div>
                              <button 
                                type="button" 
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={async () => {await xumm.sendFaucet(xumm.address)}}
                              >
                                Get 5 XRP
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
