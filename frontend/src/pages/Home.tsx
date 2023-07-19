import Book from "../components/book";
import { useGetBooksQuery } from "../redux/features/book/bookApi";

export default function Home() {
  const { data, isLoading } = useGetBooksQuery(undefined);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center mt-16 mb-5 h-96">
          {' '}
          <h2> Loading...</h2>
        </div>
      ) : (
        <div className="container">
          <div className="flex justify-between items-center h-[calc(100vh-80px)] max-w-7xl mx-auto ">
            <div className="relative w-[40%] flex-1 bg-[#fff] border-[3px] border-[#0B666A]">
              <img className="w-full  " src="https://source.unsplash.com/CEMh4JRiSOI" alt="" />
            </div>
            <div className='flex-1 pl-10'>
              <h1 className="text-6xl font-black text-primary mb-2">
                Welcome to,
                <br />
                Read Wise
              </h1>
              <p className="text-secondary font-semibold text-xl">
                Dive into our vast collection of books across all genres, from timeless classics to the latest bestsellers.
              </p>
              <div className="text-primary font-semibold mt-10">
                <p>Explore 20,000+ books for free.</p>
                <p>Read from anywhere in over the world.</p>
              </div>
            </div>
          </div>
          <Book data={data?.data ?? []} />
        </div>
      )}
    </>
  );
}
