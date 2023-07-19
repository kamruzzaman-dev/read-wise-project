import Book from "../components/book";
import { useGetReadSoonListQuery } from "../redux/features/readSoon/readSoonApi";
import { getFromLocalStorage } from "../utils/localstorage";

const ReadSoon = () => {
  const user = JSON.parse(getFromLocalStorage('user_Information')!);
  const { data: readSoonList } = useGetReadSoonListQuery(user?._id);

  return (
    <div className="container mt-16">
      <h1 className="text-3xl mb-8 text-center font-semibold">
        Read Soon List
      </h1>
      <Book data={readSoonList?.data?.readSoonList ?? []} />
    </div>
  );
};

export default ReadSoon;
