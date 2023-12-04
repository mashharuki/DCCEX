import { Card, CardBody } from "@nextui-org/react";

type Props = {
  balance: string
}

/**
 * BalanceComponent
 * @returns 
 */
export const Balance = (props : Props) => {
  return (
    <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <span className="text-white text-xl font-semibold">Balance:</span>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-xl font-semibold">{props.balance}{" "} XRP</span>
        </div>
      </CardBody>
    </Card>
  );
};
