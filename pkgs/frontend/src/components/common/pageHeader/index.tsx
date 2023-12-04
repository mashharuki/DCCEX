import { XummContext } from '@/context/XummProvider';
import { useContext } from 'react';
import { Address } from "./address";
import { Balance } from "./balance";

/**
 * PageHeader Component
 * @returns 
 */
export const PageHeader = () => {
  const xumm = useContext(XummContext)
 
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-semibold">Your Info</h3>
      <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5 justify-center w-full">
      <Address address={xumm.address} />
      <Balance balance={xumm.balance} />
      </div>
    </div>
  );
}