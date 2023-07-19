/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Link } from 'react-router-dom';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import { AiOutlineFileDone } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { IBook } from '../types/globalTypes';
import { getFromLocalStorage } from '../utils/localstorage';
import { useFinishedReadingMutation } from '../redux/features/readSoon/readSoonApi';
import { Notification } from './ui/notification';

const Book = ({ data }: { data: IBook[] }) => {
  const user = JSON.parse(getFromLocalStorage('user_Information')!);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [
    finishedReading,
    { isError, isLoading, isSuccess, data: finishedData, error },
  ] = useFinishedReadingMutation();

  useEffect(() => {
    if (selectedBook && user) {
      const object = {
        bookId: selectedBook?._id,
        data: {
          finished: !selectedBook?.finishedReading,
          userId: user?._id,
        },
      };
      finishedReading(object);
    }
  }, [selectedBook]);


  useEffect(() => {
    if (isSuccess && !isLoading) {
      Notification(finishedData?.message, "success")
    }
    if (isError === true && error) {
      Notification(`Something went wrong! Please try again.`, "error")
    }
  }, [isLoading, error, isError, isSuccess]);

  // console.log(isError, isLoading, finishedData, error);

  return (
    <section className="text-gray-600 body-font">
      <div className="pb-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {data?.map((book: IBook, i: number) => (
            <div key={i} className="lg:w-1/4 md:w-1/2 p-4 w-full relative">
              <Link
                to={`/book-details/${book?._id}`}
                className="block cursor-pointer h-48 rounded overflow-hidden"
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
                  <p className="mt-1 font-semibold text-gray-900">
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
                        <AiOutlineFileDone className="text-3xl text-green-500" />
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
