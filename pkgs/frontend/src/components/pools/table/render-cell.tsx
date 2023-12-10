import Router from 'next/router';
import React from "react";
import styles from "./../../createToken/createForm/CreateForm.module.css";

interface Props {
  lpTokenInfo: any;
  columnKey: string | React.Key;
}

/**
 * RenderCell Component
 * @param param0 
 * @returns 
 */
export const RenderCell = ({ 
  lpTokenInfo, 
  columnKey 
}: Props) => {
  
  /**
   * 文字列を表示用に加工する
   * @param inputString 
   * @returns 
   */
  const outPutChar = (inputString: string) => {
    if (inputString.length < 4) {
      console.error('文字列が短すぎます');
      return;
    }
  
    const firstFourChars = inputString.slice(0, 4);
    const lastFourChars = inputString.slice(-4);
  
    return firstFourChars + '...' + lastFourChars;
  }

  /**
   * 詳細画面への遷移
   */
  const linkToDetail = () => {
    Router.push({
      pathname: '/poolDetail',
      query: {
        token1Currency: lpTokenInfo.token1currency,
        token1Issuer: lpTokenInfo.token1issuer,
        token2Currency: lpTokenInfo.token2currency,
        token2Issuer: lpTokenInfo.token2issuer,
      }
    })
  }

  switch (columnKey) {
    case "lpTokenCode":
      return (
        <div>
          <div className="text-left">
            <span>{outPutChar(lpTokenInfo.lptokencode)}</span>
          </div>
        </div>
      );
    case "token1Currency":
      return (
        <div>
          <div className="text-left">
            <span>{lpTokenInfo.token1currency}</span>
          </div>
        </div>
      );
    case "token2Currency":
      return (
        <div>
          <div className="text-left">
            <span>{lpTokenInfo.token2currency}</span> 
          </div>
        </div>
      );
    case "detail":
      return (
        <div>
          <div className="text-left">
            <div className={styles.detailBottomDiv}>
              <div 
                className={styles.btn} 
                onClick={linkToDetail}
              >
                Detail
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return "";
  }
};