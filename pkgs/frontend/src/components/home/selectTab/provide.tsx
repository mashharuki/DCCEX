import InputDropBox from "@/components/common/inputBox/InputDropBox";
import { TokenInfo, XummContext } from "@/context/XummProvider";
import { useContext, useState } from "react";
import { MdAdd } from "react-icons/md";
import styles from "./SelectTab.module.css";

type Props = {
    tokens: TokenInfo[]
}
  

/**
 * Provide component
 * @param param0 
 */
export default function Provide({ tokens }: Props) {

    const [amountOfToken0, setAmountOfToken0] = useState<string>("");
    const [amountOfToken1, setAmountOfToken1] = useState<string>("");
    const [token0, setToken0] = useState<TokenInfo | undefined>(tokens[0]);
    const [token1, setToken1] = useState<TokenInfo | undefined>(tokens[1]);
    const [activePool, setActivePool] = useState(true);

    const xumm = useContext(XummContext);

    /**
     * 流動性を提供するメソッド
     */
    const depositAmm = async() => {
        await xumm.depositAmm(
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
                inputs={tokens}
                value={amountOfToken0}
                token={token0!}
                onChange={setAmountOfToken0}
                setToken={setToken0}
            />
            <div className={styles.swapIcon}>
                <MdAdd />
            </div>
            <InputDropBox
                leftHeader={"Amount of token2"}
                inputs={tokens}
                value={amountOfToken1}
                token={token1!}
                onChange={setAmountOfToken1}
                setToken={setToken1}
            />
            {!activePool && (
                <div className={styles.error}>
                    Message: Empty pool. Set the initial conversion rate.
                </div>
            )}
            <div className={styles.bottomDiv}>
                <div 
                    className={styles.btn} 
                    onClick={depositAmm}
                >
                    Provide
                </div>
            </div>
        </div>
    );
}