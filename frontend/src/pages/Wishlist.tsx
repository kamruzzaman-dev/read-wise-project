import Book from "../components/book";
import { useGetWishlistQuery } from "../redux/features/wishlist/wishlistApi";
import { getFromLocalStorage } from "../utils/localstorage";


const Wishlist = () => {
  const user = JSON.parse(getFromLocalStorage('user_Information')!);
  const { data: wishlist } = useGetWishlistQuery(user?._id);
  return (
    <div className="container mt-16">
      <h1 className="text-3xl mb-8 text-center font-semibold">Wishlist</h1>
      <Book data={wishlist?.data?.wishlist ?? []} />
    </div>
  );
};

export default Wishlist;
