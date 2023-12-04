import { XummContext } from '@/context/XummProvider';
import { useContext, useState } from "react";
import InputNumberBox from "../../common/inputBox/InputNumberBox";
import styles from "./CreateForm.module.css";

/**
 * CreateForm Component
 */
export const CreateForm = () => {
  const [tokenName, setTokenName] = useState("");
  const [initAmount, setInitAmount] = useState("");
  
  const xumm = useContext(XummContext);

  /**
   * issueNewToken method
   */
  const issueNetToken = async() => {
    // issueNewTokenメソッドを呼び出す
    await xumm.issueNewToken(tokenName, initAmount) 
    // TODO insert to DB
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