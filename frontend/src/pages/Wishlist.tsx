/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Book from "../components/book";
import { useGetWishlistQuery } from "../redux/features/wishlist/wishlistApi";
import { getFromLocalStorage } from "../utils/localStorage.ts";


const Wishlist = () => {
  const user = JSON.parse(getFromLocalStorage('user_Information')!);
  const { data: wishlist } = useGetWishlistQuery(user?._id);
  return (
    <div className="container mt-16 min-h-[60vh]">
      <h1 className="text-4xl mb-16 text-center underline font-medium text-primary">Wishlist</h1>
      <Book data={wishlist?.data?.wishlist ?? []} />
    </div>
  );
};

export default Wishlist;
