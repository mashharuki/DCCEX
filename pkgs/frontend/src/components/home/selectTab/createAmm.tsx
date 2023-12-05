import InputDropBox from "@/components/common/inputBox/InputDropBox";
import { TokenInfo, XummContext } from "@/context/XummProvider";
import { useContext, useState } from "react";
import { MdAdd } from "react-icons/md";
import styles from "./SelectTab.module.css";

// testData 
const testData: TokenInfo[] = [
    {
        id: 0,
        currency: null,
        value: "1000",
        issuer: null
    },
    {
        id: 1,
        currency: "rer",
        value: "1000",
        issuer: "rwRE2wE6YmMBqTVhf739KohrreCn3kNy6x"
    },
    {
        id: 2,
        currency: "IUT",
        value: "1000",
        issuer: "rBMVwUjt2k7kvJB3Kkadrz6Yh9pygB8MsY"
    }
]

/**
 * CreateAmm component
 * @param param0 
 */
export default function CreateAmm() {

    const [amountOfToken0, setAmountOfToken0] = useState<string>("");
    const [amountOfToken1, setAmountOfToken1] = useState<string>("");
    const [token0, setToken0] = useState<TokenInfo>(testData[0]);
    const [token1, setToken1] = useState<TokenInfo>(testData[1]);

    const xumm = useContext(XummContext);

    /**
     * AMMペアを新しく作成するメソッド
     */
    const createAmm = async() => {
        await xumm.createAmm(
            token0,
            amountOfToken0, 
            token1,
            amountOfToken1
        )
    }

    return (
        <div className={styles.tabBody}>
            <InputDropBox
                leftHeader={"Amount of token1"}
                inputs={testData}
                value={amountOfToken0}
                token={token0}
                onChange={setAmountOfToken0}
                setToken={setToken0}
            />
            <div className={styles.swapIcon}>
                <MdAdd />
            </div>
            <InputDropBox
                leftHeader={"Amount of token2"}
                inputs={testData}
                value={amountOfToken1}
                token={token1}
                onChange={setAmountOfToken1}
                setToken={setToken1}
            />
            <div className={styles.bottomDiv}>
                <div 
                    className={styles.btn} 
                    onClick={createAmm}
                >
                    Create
                </div>
            </div>
        </div>
    );
}