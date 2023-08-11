import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RouterOutputs } from "~/utils/api";
import { Button } from "@/components/ui/button";

import type { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { ActionDropdownMenu } from "./dropdownmenu";

const CreateCocktailWizzard = () => {
  return (
    <div className="flex h-full w-screen flex-col overflow-auto">
      <div className="flex-col items-center gap-2 space-y-2  p-2">
        <span>Name</span>
        <Input type="cocktail-name" placeholder="cocktail name" />
        <span>Base</span>
        <Input
          type="cocktail-base"
          placeholder="base alcohol (Gin,Run,Whiskey...)"
        />
        <span>Ingredients</span>
        <Textarea
          rows={2}
          className=""
          placeholder="Lemon juice, sugar syrup, mint leaves, soda water..."
          // value={input}
          // onChange={(e) => setInput(e.target.value)}
          // disabled={isPosting}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
            }
          }}
        />
        <span>Recipe</span>
        <Textarea
          rows={5}
          className=""
          placeholder="How to make this lovely cocktail?"
          // value={input}
          // onChange={(e) => setInput(e.target.value)}
          // disabled={isPosting}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
            }
          }}
        />
        <span>Story</span>
        <Textarea
          rows={10}
          className=""
          placeholder="Leave your review here :)"
          // value={input}
          // onChange={(e) => setInput(e.target.value)}
          // disabled={isPosting}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
            }
          }}
        />
        <span>Cocktail Image</span>
      </div>
    </div>
  );
};

type CocktailCollection = RouterOutputs["cocktails"]["getAll"];
export const CocktailTable = (props: {
  cocktailData: CocktailCollection;
  addClickedHandler: () => void;
  addIsClicked: boolean;
}) => {
  const { addIsClicked, cocktailData, addClickedHandler } = props;

  console.log("cocktails", cocktailData);
  console.log("time add butn set to", addIsClicked);
  //   [...cocktailData.recipe].map((recipe) => {console.log(recipe[0]))});
  return (
    <div className="flex h-full w-full flex-col ">
      {addIsClicked && (
        <div className="flex">
          <CreateCocktailWizzard />
        </div>
      )}
      <div className="flex">
        <Table>
          <TableCaption>
            <div className="flex justify-between">
              <span className="">A list of your cocktails.</span>
              <Button
                onClick={addClickedHandler}
                className="  border border-slate-600 px-2 hover:bg-slate-400"
              >
                ADD
              </Button>
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
                  <Button className="border border-slate-600 px-2 font-medium hover:bg-slate-400">
                    {cocktail.name}
                  </Button>
                </TableCell>
                <TableCell>{cocktail.base}</TableCell>

                {/* <TableCell>
                <Button className="  border border-slate-600 px-2 hover:bg-slate-400">
                  Show
                </Button>
              </TableCell> */}
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
