import { Link } from 'react-router-dom';
import {
  IoCheckmarkDoneCircleOutline,
  IoCheckmarkDoneCircleSharp,
} from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IBook } from '../types/globalTypes';
import { getFromLocalStorage } from '../utils/localstorage';
import { useFinishedReadingMutation } from '../redux/features/readSoon/readSoonApi';

const Book = ({ data }: { data: IBook[] }) => {
  const user = JSON.parse(getFromLocalStorage('user-info')!);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [
    finishedReading,
    { isError, isLoading, isSuccess, data: finishedData, error },
  ] = useFinishedReadingMutation();

  useEffect(() => {
    console.log(selectedBook);
    if (selectedBook && user) {
      const object = {
        bookId: selectedBook?._id,
        data: {
          finished: !selectedBook?.finishedReading,
          userId: user?._id,
        },
      };
      console.log(object, 'object');
      finishedReading(object);
    }
  }, [selectedBook]);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      toast.success('Finished reading status updated successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
    if (isError === true && error) {
      toast.error(`Something went wrong! Please try again.`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, [isLoading, error, isError, isSuccess]);

  console.log(isError, isLoading, finishedData, error);

  return (
    <section className="text-gray-600 body-font">
      <div className="pb-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {data?.map((book: IBook, i: number) => (
            <div key={i} className="lg:w-1/4 md:w-1/2 p-4 w-full relative">
              <Link
                to={`/book-details/${book?._id}`}
                className="block  cursor-pointer h-48 rounded overflow-hidden"
              >
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={book.image}
                />
              </Link>
              <h3 className="text-gray-500 absolute p-1 backdrop-blur-xl text-stone-50 bg-red-500 top-4 left-4 text-xs tracking-widest title-font mb-1">
                @{book.genre}
              </h3>
              <div className="mt-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {book.title}
                  </h2>
                  <h2 className="text-gray-900 title-font text-base font-medium">
                    @{book.author}
                  </h2>
                </div>
                <div className="flex justify-between items-end">
                  <p className="mt-1 font-semibold">
                    Published: {new Date(book.publication_date).toDateString()}
                  </p>
                  {book?.finishedReading === false ? (
                    <button
                      onClick={() => {
                        setSelectedBook(book);
                      }}
                    >
                      <IoCheckmarkDoneCircleOutline className="text-3xl" />
                    </button>
                  ) : (
                    book?.finishedReading === true && (
                      <button
                        onClick={() => {
                          setSelectedBook(book);
                        }}
                      >
                        <IoCheckmarkDoneCircleSharp className="text-3xl text-green-500" />
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Book;
