import { AmmInfo, TokenInfo, XummContext } from "@/context/XummProvider";
import { useContext, useState } from "react";
import { MdAdd } from "react-icons/md";
import InputDropBox from "../../common/inputBox/InputDropBox";
import styles from "./SelectTab.module.css";

type Props = {
    tokens: TokenInfo[]
}
  

/**
 * Withdraw Component
 * @param param0 
 */
export default function Withdraw({ tokens }: Props) {

    const [amountOfToken0, setAmountOfToken0] = useState("");
    const [amountOfToken1, setAmountOfToken1] = useState("");
    const [token0, setToken0] = useState<TokenInfo | undefined>(tokens[0]);
    const [token1, setToken1] = useState<TokenInfo | undefined>(tokens[1]);
    const [amountOfMaxShare, setAmountOfMaxShare] = useState<string>();

    const xumm = useContext(XummContext);

    /**
     * LPトークンを渡してその分のトークンを受け取るメソッド
     */
    const withdraw = async() => {
        // create AMM Info
        const ammRequstInfo: AmmInfo = {
            "command": "amm_info",
            "asset": {
              "currency": token0?.currency != null ? token0.currency : "XRP",
              "issuer": token0?.issuer!,
            },
            "asset2": {
              "currency": token1?.currency != null ? token1.currency : "XRP",
              "issuer": token1?.issuer!,
            },
            "ledger_index": "validated"
        }
        // withdraw
        await xumm.withdrawAmm(
            ammRequstInfo, 
            token0, 
            amountOfToken0, 
            token1, 
            amountOfToken1
        );   
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
            <div className={styles.bottomDiv}>
                <div 
                    className={styles.btn} 
                    onClick={withdraw}
                >
                    Withdraw
                </div>
            </div>
        </div>
    );
}