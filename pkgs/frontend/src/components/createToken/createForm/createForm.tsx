import { XummContext } from '@/context/XummProvider';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from "@nextui-org/react";
import { useContext, useState } from "react";
import InputNumberBox from "../../common/inputBox/InputNumberBox";
import styles from "./CreateForm.module.css";

export type FrameworkInfo = {
  "id": number | null;
  "framework": string | null;
}

type Props = {
  "frameworks": FrameworkInfo[]
}

/**
 * CreateForm Component
 */
export const CreateForm = ({ frameworks }: Props) => {
  const [tokenName, setTokenName] = useState("");
  const [initAmount, setInitAmount] = useState("");
  const [framework, setFramework] = useState<FrameworkInfo>(frameworks[0]);
  const [inputs, setInputs] = useState<FrameworkInfo[]>(frameworks);
  
  const xumm = useContext(XummContext);

  /**
   * issueNewToken method
   */
  const issueNetToken = async() => {
    // issueNewTokenメソッドを呼び出す
    await xumm.issueNewToken(tokenName, initAmount, framework.framework) 
  }

  return (
    <div className="flex items-center justify-center flex-col rounded-b-lg p-5 mx-auto">
      <div className=" mx-auto mt-10 bg-gray-900 w-500 rounded-t-lg px-5">
        <div className="text-center bg-gray-900 text-white rounded-lg p-2 mt-10 cursor-pointer text-4xl">
          Create New CarbonFT
        </div>
      </div>
      <div className={styles.tabBody}>
        <InputNumberBox
          leftHeader={"TokenName"}
          right={""}
          value={tokenName}
          onChange={(e: any) => setTokenName(e.target.value)}
        />
        <br/>
        <InputNumberBox
          leftHeader={"Init Amount"}
          right={""}
          value={initAmount}
          onChange={(e: any) => setInitAmount(e.target.value)}
        />
        <br/>
        <div className="flex items-center justify-center text-2xl font-bold mt-3">
          <Dropdown
            classNames={{
              base: "w-full min-w-[260px]",
            }}
          >
            <DropdownTrigger className="cursor-pointer">
              <div className="items-center m-2 gap-2 bg-gray-700">
                <div className="flex-col m-2 gap-4 bg-gray-700">
                  <h3 className="text-xl font-medium m-0 text-white whitespace-nowrap ">
                    {framework.framework}
                  </h3>
                </div>
              </div>
            </DropdownTrigger>
            <DropdownMenu
              className="bg-gray-900"
              onAction={(e: any) => {
                if (e >= 0 && e < inputs.length) {
                  const selectedFramework = inputs[e];
                  setFramework(selectedFramework);
                }
              }}
              aria-label="Avatar Actions"
              items={inputs}
            >
              {(item: any) => (
                <DropdownItem
                  key={item.id}
                  className="py-4 text-base font-semibold text-white"
                >
                  {item!.framework}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className={styles.bottomDiv}>
          <div 
            className={styles.btn} 
            onClick={issueNetToken}
          >
            Create
          </div>
        </div>
      </div>
    </div>
  );
}