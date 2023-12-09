import { TokenInfo } from "@/context/XummProvider";
import { useState } from "react";
import CreateAmm from './createAmm';
import Provide from "./provide";
import Swap from "./swap";
import Withdraw from "./withdraw";

type Props = {
  tokens: TokenInfo[]
}


/**
 * SelectTab Component
 */
export const SelectTab = ({ tokens }: Props) => {
  const [activeTab, setActiveTab] = useState("Swap");
  
  /**
   * changeTab メソッド
   * @param tab 
   */
  const changeTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex items-center justify-center flex-col rounded-b-lg p-5 mx-auto">
      <div className="flex justify-between mx-auto mt-10 bg-gray-900 w-500 rounded-t-lg px-5">
        <div
          className={
            "flex items-center justify-center bg-gray-900 rounded-lg w-3/10 p-2 mt-10 cursor-pointer text-white" +
            " " +
            (activeTab === "Swap" ? "bg-blue-500 hover:bg-blue-700 text-white flex items-center justify-center text-base w-24 h-10 rounded-md" : "")
          }
          onClick={() => changeTab("Swap")}
        >
          Swap
        </div>
        <div
          className={
            "flex items-center justify-center bg-gray-900 rounded-lg w-3/10 p-2 mt-10 cursor-pointer text-white" +
            " " +
            (activeTab === "Provide" ? "bg-blue-500 hover:bg-blue-700 text-white flex items-center justify-center text-base w-24 h-10 rounded-md" : "")
          }
          onClick={() => changeTab("Provide")}
        >
          Provide
        </div>
        <div
          className={
            "flex items-center justify-center bg-gray-900 rounded-lg w-3/10 p-2 mt-10 cursor-pointer text-white" +
            " " +
            (activeTab === "Withdraw" ? "bg-blue-500 hover:bg-blue-700 text-white flex items-center justify-center text-base w-24 h-10 rounded-md" : "")
          }
          onClick={() => changeTab("Withdraw")}
        >
          Withdraw
        </div>
        <div
          className={
            "flex items-center justify-center bg-gray-900 rounded-lg w-3/10 p-2 mt-10 cursor-pointer text-white" +
            " " +
            (activeTab === "CreateAmm" ? "bg-blue-500 hover:bg-blue-700 text-white flex items-center justify-center text-base w-24 h-10 rounded-md" : "")
          }
          onClick={() => changeTab("CreateAmm")}
        >
          CreateAmm
        </div>
      </div>
      {activeTab === "Swap" && (
        <>{ tokens != undefined && <Swap tokens={tokens!} /> }</>
      )}
      {activeTab === "Provide" && (
        <>{ tokens != undefined && <Provide tokens={tokens!} /> }</>
      )}
      {activeTab === "Withdraw" && (
        <>{ tokens != undefined && <Withdraw tokens={tokens!} /> }</>
      )}
      {activeTab === "CreateAmm" && (
        <>{ tokens != undefined && <CreateAmm tokens={tokens!} /> }</>
      )}
    </div>
  );
}