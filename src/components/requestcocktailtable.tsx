import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { RouterOutputs } from "~/utils/api";
import { Button } from "@/components/ui/button";
import { ActionDropdownMenu } from "./dropdownmenu";
import Link from "next/dist/client/link";
import { Input } from "@/components/ui/input";
import { Image } from "next/dist/client/image-component";
import React from "react";
import { Toggle } from "@/components/ui/toggle";
import ImageToggleIcon from "./icons";
import { LoadingSpinner } from "./loading";
type CocktailCollection = RouterOutputs["cocktails"]["getAll"];
type CocktailContext = RouterOutputs["cocktails"]["getAll"][number];
type CocktailOrderType = Record<string, CocktailOrderDetail>;
interface CocktailOrderDetail {
  name: string;
  amount: number;
  showImage: boolean;
}

export const RequestCocktailTable = (props: {
  cocktailData: CocktailCollection;
}) => {
  const { cocktailData } = props;
  const [proceedButtonClick, setProceedButtonClick] = React.useState(false);
  const initialOrder: CocktailOrderType = {};
  cocktailData.forEach((cocktail) => {
    initialOrder[cocktail.id] = {
      name: cocktail.name,
      amount: 0,
      showImage: false,
    };
  });
  const [order, setOrder] = React.useState(initialOrder);
  const orderImageHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cocktail: CocktailContext
  ) => {
    event.preventDefault();
    setOrder({
      ...order,
      [cocktail.id]: {
        name: cocktail.name,
        amount: order[cocktail.id]?.amount ?? 0,
        showImage: !order[cocktail.id]?.showImage ?? true,
      },
    });
  };
  return (
    <div className="flex h-full w-full flex-col ">
      <div className="flex flex-col">
        <h1 className="space-y-2 text-4xl font-bold">MENU</h1>
        <Table>
          <TableCaption></TableCaption>

          <TableHeader>
            <TableRow className="">
              <TableHead className="">Name</TableHead>
              <TableHead className="">Base</TableHead>

              <TableHead className=" text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cocktailData.map((cocktail) => (
              <TableRow key={cocktail.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      {cocktail.name}
                      <Button
                        onClick={(e) => {
                          orderImageHandler(e, cocktail);
                        }}
                      >
                        <ImageToggleIcon />
                      </Button>
                    </div>

                    {order[cocktail.id]?.showImage && (
                      <Image
                        alt={`image of ${cocktail.name}`}
                        width={100}
                        height={400}
                        src={cocktail.imageUrl}
                        className="block"
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell>{cocktail.base}</TableCell>

                <TableCell className="w-20 sm:w-40">
                  <Input
                    disabled={proceedButtonClick}
                    min={0}
                    type="number"
                    placeholder="0"
                    onChange={(e) => {
                      e.preventDefault();
                      setOrder({
                        ...order,
                        [cocktail.id]: {
                          name: cocktail.name,
                          amount: Number(e.target.value),
                          showImage: order[cocktail.id]?.showImage ?? false,
                        },
                      });
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex  flex-col  ">
          <h1 className="mb-2 text-4xl font-bold">Your Order</h1>
          <div className="flex  flex-col gap-2">
            <div className="flex  justify-between italic">
              <span>Cocktail</span>
              <span>Amount</span>
            </div>
            {Object.entries(order).map(([key, value]) => {
              if (value.amount > 0) {
                return (
                  <div className="flex  justify-between" key={key}>
                    <span>{value.name}</span>
                    <span>{value.amount}</span>
                  </div>
                );
              }
            })}
          </div>
          <div className="flex justify-center">
            <Button
              onClick={() => {
                setProceedButtonClick(!proceedButtonClick);
              }}
              disabled={
                proceedButtonClick ||
                Object.values(order).every((value) => value.amount <= 0)
              }
              className="flex h-10 w-20 justify-center rounded-md border-2 border-slate-400 bg-slate-100"
            >
              {proceedButtonClick ? <LoadingSpinner /> : "Proceed"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
