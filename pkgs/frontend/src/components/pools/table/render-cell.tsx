import React from "react";
import { lpTokens } from "./data";

interface Props {
  lpToken: (typeof lpTokens)[number];
  columnKey: string | React.Key;
}

/**
 * RenderCell Component
 * @param param0 
 * @returns 
 */
export const RenderCell = ({ 
  lpToken, 
  columnKey 
}: Props) => {
  // @ts-ignore
  const cellValue = lpToken[columnKey];

  // todo get LP Token info by XRPL API

  switch (columnKey) {
    case "lpToken":
      return (
        <div>
          <div className="text-left">
            <span>{cellValue}</span>
          </div>
        </div>
      );
    case "lpTokenBalance":
      return (
        <div>
          <div className="text-left">
            <span>{cellValue}</span>
          </div>
        </div>
      );
    case "token1":
      return (
        <div>
          <div className="text-left">
            <span>{cellValue}</span>
          </div>
        </div>
      );
    case "token1Balance":
      return (
        <div>
          <div className="text-left">
            <span>{cellValue}</span>
          </div>
        </div>
      );
    case "token2":
      return (
        <div>
          <div className="text-left">
            <span>{cellValue}</span>
          </div>
        </div>
      );
    case "token2Balance":
      return (
        <div>
          <div className="text-left">
            <span>{cellValue}</span>
          </div>
        </div>
      );
    default:
      return cellValue;
  }
};