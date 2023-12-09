import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import { LpTokenInfo } from "../content";
import { columns } from "./data";
import { RenderCell } from "./render-cell";

type Props = {
  lpTokens: LpTokenInfo[]
}

/**
 * TableWrapper Component
 * @returns 
 */
export const TableWrapper = ({ lpTokens }: Props) => {
  console.log("lpTokens:", lpTokens)
  
  return (
    <div className=" w-full flex flex-col gap-4">
      <Table aria-label="pools table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody 
          items={lpTokens}
        >
          {(item) => (
            <TableRow>
              {(columnKey) => (
                <TableCell>
                  { item != undefined && 
                    <>
                      {RenderCell({ 
                        lpTokenInfo: item, 
                        columnKey: columnKey 
                      })}
                    </>
                  }
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};