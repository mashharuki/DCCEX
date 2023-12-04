import { TokenInfo } from "@/context/XummProvider";
import { useState } from "react";
import InputDropBox from "../../common/inputBox/InputDropBox";
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
    }
]

/**
 * Withdraw Component
 * @param param0 
 */
export default function Withdraw() {

    const [amountOfToken0, setAmountOfToken0] = useState("");
    const [amountOfToken1, setAmountOfToken1] = useState("");
    const [amountOfShare, setAmountOfShare] = useState("");
    const [lpToken, setLpToken] = useState<TokenInfo>(testData[0]);
    const [amountOfMaxShare, setAmountOfMaxShare] = useState<string>();

    return (
        <div className={styles.tabBody}>
            <InputDropBox
                leftHeader={"token of share:"}
                inputs={testData}
                value={amountOfShare}
                token={lpToken}
                onChange={setAmountOfShare}
                setToken={setLpToken}
            />
            <div className={styles.bottomDiv}>
                <div className={styles.btn} onClick={() => {}}>
                    Max
                </div>
            </div>
            <div className={styles.estimate}>
                <div>
                    <h3>
                        Amount of XRP: {amountOfToken0}
                    </h3>
                    <h3>
                        Amount of FOO: {amountOfToken1}
                    </h3>
                </div>
            </div>
            <div className={styles.bottomDiv}>
                <div 
                    className={styles.btn} 
                    onClick={() => {}}
                >
                    Withdraw
                </div>
            </div>
        </div>
    );
}