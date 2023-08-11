import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-hot-toast";

import { CocktailTable } from "~/components/cocktailtable";

import { LoadingSpinner } from "~/components/loading";
import { api } from "~/utils/api";

const CocktailView = (props: {
  addButtonClicked: boolean;
  setAddButtonClicked: Dispatch<SetStateAction<boolean>>;
}) => {
  const { addButtonClicked, setAddButtonClicked } = props;
  const { data, isLoading: postsLoading } = api.cocktails.getAll.useQuery();
  if (postsLoading) return <LoadingSpinner />;
  if (!data) return null;
  const addCocktailHandler = () => {
    setAddButtonClicked(!addButtonClicked);
    console.log("add button clicked", addButtonClicked);
  };
  console.log("data", data);
  return (
    <div className="flex ">
      <div className="flex h-screen w-full p-3">
        <CocktailTable
          cocktailData={data}
          addClickedHandler={addCocktailHandler}
          addIsClicked={addButtonClicked}
        />
      </div>
      {/* <div className=" flex  justify-evenly">
        {data?.map((cocktail) => {
          return <CocktailCard cocktail={cocktail} key={cocktail.id} />;
        })}
      </div> */}
    </div>
  );
};

const CusineView = () => {
  return <div></div>;
};

const AdminPage = () => {
  const { user, isLoaded } = useUser();
  const [view, setView] = useState<string>("cocktail");
  const [addButtonClicked, setAddButtonClicked] = useState<boolean>(false);
  if (!isLoaded) return <div>loading...</div>;
  if (!user) return <div>Please sign-in</div>;
  console.log("tyes");
  if (user.publicMetadata.role !== "admin" && isLoaded) {
    toast.error("You are not admin");
    return <>null</>;
  }
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex  flex-wrap gap-3 bg-slate-600 p-3 text-slate-100">
        <button
          onClick={() => {
            setView("cocktail");
          }}
        >
          Cocktails
        </button>
        <button
          onClick={() => {
            setView("cusine");
          }}
        >
          Cusines
        </button>
      </div>
      <div className="w-full ">
        {view === "cusine" && <CusineView />}
        <div className="flex flex-col">
          {view === "cocktail" && (
            <CocktailView {...{ addButtonClicked, setAddButtonClicked }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
