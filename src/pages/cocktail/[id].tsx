import { useRouter } from "next/router";
import { LoadingPage } from "~/components/loading";
import { api } from "~/utils/api";
import Image from "next/image";
const CocktailPage = () => {
  const router = useRouter();
  const { data, isLoading: postsLoading } = api.cocktails.getById.useQuery({
    id: router.query.id as string,
  });
  if (postsLoading) return <LoadingPage />;
  console.log("cocktails", data);
  return (
    <div className=" flex h-full w-full flex-col gap-2 sm:flex-row">
      <div className="flex justify-center  p-2 ">
        <Image width={200} height={400} src={data?.imageUrl} />
      </div>
      <div className="flex-col p-3 text-center sm:text-left">
        <h1 className=" text-4xl ">{data?.name}</h1>
        <span className="ml-2 text-xl italic">{data?.base} based</span>
        {data?.story && (
          <div>
            <h2 className="text-3xl">story</h2>
            <p className="ml-2 italic">{data?.story}</p>
          </div>
        )}
        {data?.ingredients && (
          <div>
            <h2 className="text-3xl">Ingredients</h2>
            <p className="ml-2 italic">{data?.ingredients}</p>
          </div>
        )}
        {data?.recipe && (
          <div>
            <h2 className="text-3xl">Recipe</h2>
            <p className="ml-2 italic">{data?.recipe}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CocktailPage;
