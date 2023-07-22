/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { FiSend } from 'react-icons/fi';
import { Input } from './ui/input';
import { getFromLocalStorage } from '../utils/localstorage';
import { useAddReviewMutation } from '../redux/features/book/bookApi';
import { Notification } from './ui/notification';
import { Textarea } from './ui/textarea';

export default function BookReview(book: any) {
  const [inputValue, setInputValue] = useState<string>('');
  const [addReview, { data, isError, error, isLoading, isSuccess }] =
    useAddReviewMutation();
  const user = JSON.parse(getFromLocalStorage('user_Information')!);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      Notification('Please login in to add review.', "error")
    }

    if (inputValue?.length === 0) {
      return;
    }

    const options = {
      id: book?.book?._id,
      data: {
        userName: user?.name,
        review: inputValue,
        userEmail: user?.email,
      },
    };

    addReview(options);
    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      Notification(data?.message, "success")
    }
    if (isError === true && error) {
      if (user && 'data' in error) {
        Notification((error as any).data!.message, "error")
      }
    }
  }, [isLoading, isSuccess, error, isError, data]);

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea
          className="border-2 border-[#0B666A] h-24"
          onChange={handleChange}
          value={inputValue}
          placeholder="write your review here"
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-3 text-[25px] bg-blue-500 hover:bg-indigo-600"
        >
          <FiSend />
        </Button>
      </form>
      <div className="mt-10 mb-16">
        {book?.book?.reviews?.map(
          (
            review: { userName: string; review: string; userEmail: string },
            index: number
          ) => (
            <div key={index} className="flex gap-3 items-center mb-5 pb-3 border-b-2 border-[#0B666A]">
              <Avatar>
                <AvatarImage src="https://res.cloudinary.com/dpjht4etk/image/upload/v1689801515/avatar-7_mavjxk.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{review?.review}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
