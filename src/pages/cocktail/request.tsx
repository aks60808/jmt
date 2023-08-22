import { useUser } from "@clerk/nextjs";
import { Image } from "next/dist/client/image-component";
import { LoadingSpinner } from "~/components/loading";
import { RequestCocktailTable } from "~/components/requestcocktailtable";
import { api } from "~/utils/api";
const RequestCocktailPage = () => {
  const { data, isLoading: postsLoading } = api.cocktails.getAll.useQuery();
  const { isSignedIn, user } = useUser();
  if (postsLoading) return <LoadingSpinner />;
  if (!data) return null;
  if (!isSignedIn) return <div>sign in to request a cocktail</div>;
  return (
    <div className="flex h-full w-full flex-col gap-3 p-3">
      <span> Order from: </span>
      <div className="flex w-full  items-center gap-3 p-3">
        <Image
          src={user.profileImageUrl}
          alt="profile"
          className="h-14 w-14 rounded-full"
          width={56}
          height={56}
        />
        <span>{user.fullName}</span>
      </div>

      <RequestCocktailTable cocktailData={data} />
    </div>
  );
};

export default RequestCocktailPage;
