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
type CocktailCollection = RouterOutputs["cocktails"]["getAll"];
export const CocktailTable = (props: { cocktailData: CocktailCollection }) => {
  const { cocktailData } = props;

  return (
    <div className="flex h-full w-full flex-col ">
      <div className="flex">
        <Table>
          <TableCaption>
            <div className="flex justify-between">
              <span className="">A list of your cocktails.</span>
            </div>
          </TableCaption>

          <TableHeader>
            <TableRow className="">
              <TableHead className="">Name</TableHead>
              <TableHead className="">Base</TableHead>

              <TableHead className=" text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cocktailData.map((cocktail) => (
              <TableRow key={cocktail.id}>
                <TableCell>
                  <Link href={`/cocktail/id/${cocktail.id}`}>
                    <Button className="border border-slate-600 px-2 font-medium hover:bg-slate-400">
                      {cocktail.name}
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>{cocktail.base}</TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <ActionDropdownMenu />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
