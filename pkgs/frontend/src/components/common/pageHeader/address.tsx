import { EXPLORER } from "@/utils/consts";
import { Card, CardBody } from "@nextui-org/react";

type Props = {
  address: string
}

/**
 * AddressComponent
 * @returns 
 */
export const Address = (props : Props) => {
  return (
    <Card className="xl:max-w-sm bg-success rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5">
        <span className="text-white text-xl font-semibold">Address:</span>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-xl font-semibold">
            <a
              href={EXPLORER + `/accounts/` + props.address}
              target="blank"
            >
              {props.address}
            </a>
          </span>
        </div>
      </CardBody>
    </Card>
  );
};
