import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { CocktailTable } from "~/components/cocktailtable";

import { LoadingSpinner } from "~/components/loading";
import { api } from "~/utils/api";
import { useUploadThing } from "~/utils/uploadthing";

interface createCocktailContext {
  name: string;
  base: string;
  ingredients: string;
  recipe: string;
  story: string;
  imageUrl: string;
}
const initialCocktailContext = {
  name: "",
  base: "",
  ingredients: "",
  recipe: "",
  story: "",
  imageUrl: "",
};
const CreateCocktailWizzard = () => {
  const [input, setInput] = useState<createCocktailContext>(
    initialCocktailContext
  );
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ["image"] ? generateClientDropzoneAccept(["image"]) : undefined,
  });

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      console.log("uploaded file", res);
      alert("uploaded successfully!");
      setFiles([]);
    },
    onUploadError: () => {
      toast.error("error occurred while uploading");
      // alert("error occurred while uploading");
      setFiles([]);
    },
  });

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.cocktails.create.useMutation({
    onSuccess: () => {
      setInput(initialCocktailContext);
      void ctx.cocktails.getAll.invalidate();
      toast.success("Cocktail added");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors;
      if (errorMessage) {
        if (errorMessage.name) {
          toast.error(`${errorMessage.name[0]}`);
        }
        if (errorMessage.base) {
          toast.error(`${errorMessage.base[0]}`);
        }
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  // if (!user) return null;
  return (
    <div className="flex h-full w-screen flex-col overflow-auto">
      <div className="flex-col items-center gap-2 space-y-2  p-2">
        <span>Name</span>
        <Input
          type="cocktail-name"
          placeholder="cocktail name"
          value={input?.name}
          onChange={(e) => setInput({ ...input, name: e.target.value })}
        />
        <span>Base</span>
        <Input
          type="cocktail-base"
          placeholder="base alcohol (Gin,Run,Whiskey...)"
          value={input?.base}
          onChange={(e) => setInput({ ...input, base: e.target.value })}
        />
        <span>Ingredients</span>
        <Textarea
          rows={2}
          className=""
          placeholder="Lemon juice, sugar syrup, mint leaves, soda water..."
          value={input?.ingredients}
          onChange={(e) => setInput({ ...input, ingredients: e.target.value })}
          disabled={isPosting}
        />
        <span>Recipe</span>
        <Textarea
          rows={5}
          className=""
          placeholder="How to make this lovely cocktail?"
          value={input?.recipe}
          onChange={(e) => setInput({ ...input, recipe: e.target.value })}
          disabled={isPosting}
        />
        <span>Story</span>
        <Textarea
          rows={10}
          className=""
          placeholder="Leave your review here :)"
          value={input?.story}
          onChange={(e) => setInput({ ...input, story: e.target.value })}
          disabled={isPosting}
        />
        <span>Cocktail Image</span>
        <div className="flex w-full justify-center rounded-md  border p-3 text-sm">
          <div>
            <div {...getRootProps()}>
              <div>
                Drop files here!
                <input {...getInputProps()} />
              </div>
              <div className="flex flex-col">
                {files.length > 0 && <span>Upload {files.length} files</span>}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            variant="outline"
            className=" border border-slate-600 px-2 hover:bg-slate-400"
            onClick={() => {
              if (files.length > 0) {
                const result = startUpload(files);
                const _ = result.then((res) => {
                  if (res) {
                    const imageUrl = res[0]?.url;
                    if (imageUrl) mutate({ ...input, imageUrl: imageUrl });
                  }
                });
              } else {
                mutate({ ...input });
              }
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

const CocktailView = () => {
  const { data, isLoading: postsLoading } = api.cocktails.getAll.useQuery();
  if (postsLoading) return <LoadingSpinner />;
  if (!data) return null;

  return (
    <div className="flex flex-col">
      <div className="flex h-screen w-full p-3">
        <CocktailTable cocktailData={data} />
      </div>
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
  // console.log("tyes");
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
            <div>
              <div className="flex justify-end p-3">
                <Button
                  onClick={() => {
                    setAddButtonClicked(!addButtonClicked);
                  }}
                  className=" border border-slate-600 px-2 hover:bg-slate-400"
                >
                  {addButtonClicked ? "CANCEL" : "ADD"}
                </Button>
              </div>

              <div className="flex flex-col">
                {addButtonClicked && (
                  <div className="flex">
                    <CreateCocktailWizzard />
                  </div>
                )}
              </div>
            </div>
          )}
          {view === "cocktail" && <CocktailView />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
