import InputDropBox from "@/components/common/inputBox/InputDropBox";
import { TokenInfo, XummContext } from "@/context/XummProvider";
import { useContext, useState } from "react";
import { MdSwapVert } from "react-icons/md";
import { xrpToDrops } from "xrpl";
import styles from "./SelectTab.module.css";

// testData 
const testData: TokenInfo[] = [
    {
        id: 0,
        currency: "XRP",
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
 * Swap Component
 * @param param0 
 */
export default function Swap() {

    const [amountIn, setAmountIn] = useState("");
    const [amountOut, setAmountOut] = useState("");
    const [token0, setToken0] = useState<TokenInfo>(testData[0]);
    const [token1, setToken1] = useState<TokenInfo>(testData[1]);

    const xumm = useContext(XummContext);

    /**
     * swap処理を実行するメソッド
     */
    const swap = async() => {
        // swapを行う
        if(token0.currency != null && token1.currency != null) {
            await xumm.swap(token1, token0, amountIn, amountOut)
        } else if (token0.currency != null) {
            await xumm.swap(token1, token0, xrpToDrops(amountIn), amountOut)
        } else {
            await xumm.swap(token1, token0, amountIn, xrpToDrops(amountOut))
        }
    }

    /**
     * トークンをトレードするメソッド
     */
    const tradeToken = async() => {
        setToken0(token1);
        setToken1(token0);
    }

    return (
        <div className={styles.tabBody}>
            <InputDropBox
                leftHeader={"From"}
                inputs={testData}
                value={amountOut}
                token={token0}
                onChange={setAmountOut}
                setToken={setToken0}
            />
            <div 
                className={styles.swapIcon} 
                onClick={tradeToken}
            >
                <MdSwapVert />
            </div>
            <InputDropBox
                leftHeader={"To"}
                inputs={testData}
                value={amountIn}
                token={token1}
                onChange={setAmountIn}
                setToken={setToken1}
            />
            <div className={styles.bottomDiv}>
                <div 
                    className={styles.btn} 
                    onClick={swap}
                >
                    Swap
                </div>
            </div>
        </div>
    );
}