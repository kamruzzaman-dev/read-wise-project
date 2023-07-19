import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { IBook } from '../types/globalTypes';
import { useGetBooksQuery } from '../redux/features/book/bookApi';
import { Input } from '../components/ui/input';
import Book from '../components/book';

const Books = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState({
    queryString: '',
    genre: '',
    year: '',
  });
  const searchQueryUrl = () => {
    let url = '';
    if (searchQuery.genre && searchQuery.queryString && searchQuery.year) {
      url = `genre=${searchQuery.genre}&searchTerm=${searchQuery.queryString}&publication_year=${searchQuery.year}`;
    } else if (searchQuery.genre && searchQuery.queryString) {
      url = `genre=${searchQuery.genre}&searchTerm=${searchQuery.queryString}`;
    } else if (searchQuery.genre && searchQuery.year) {
      url = `genre=${searchQuery.genre}&publication_year=${searchQuery.year}`;
    } else if (searchQuery.queryString && searchQuery.year) {
      url = `searchTerm=${searchQuery.queryString}&publication_year=${searchQuery.year}`;
    } else if (searchQuery.genre) {
      url = `genre=${searchQuery.genre}`;
    } else if (searchQuery.queryString) {
      url = `searchTerm=${searchQuery.queryString}`;
    } else if (searchQuery.year) {
      url = `publication_year=${searchQuery.year}`;
    }
    return url;
  };

  const url = searchQueryUrl();

  const { data, isLoading } = useGetBooksQuery(url);
  const { data: filterData } = useGetBooksQuery('');

  const genre: IBook[] | undefined = filterData?.data
    ?.filter((item: IBook, index: number, array: IBook[]) => {
      return (
        array.findIndex((element) => element.genre === item.genre) === index
      );
    })
    .sort((a: IBook, b: IBook) => a.genre.localeCompare(b.genre));

  const year: IBook[] | undefined = filterData?.data
    ?.filter((item: IBook, index: number, array: IBook[]) => {
      return (
        array.findIndex(
          (element) => element?.publication_year === item.publication_year
        ) === index
      );
    })
    .sort((a: IBook, b: IBook) =>
      b.publication_year.localeCompare(a.publication_year)
    );

  if (isLoading) {
    <div>Loading...</div>;
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center mt-16 mb-5 h-96">
          {' '}
          <h2> Loading...</h2>
        </div>
      ) : (
        <div className="container">
          <h1 className='text-xl font-black text-primary mt-14'>Filters</h1>
          <div className="flex mt-2 mb-5">
            <Input
              type="text"
              className="w-[400px] mr-3"
              onChange={(e) =>
                setSearchQuery({
                  ...searchQuery,
                  queryString: e.target.value,
                })
              }
              placeholder="Search by Title, Author, or Genre."
            />
            <Select
              onValueChange={(value) =>
                setSearchQuery({
                  ...searchQuery,
                  genre: value,
                })
              }
            >
              <SelectTrigger className="w-[300px] mr-3">
                <SelectValue placeholder="Filter by genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="" className="font-bold">
                    Genre
                  </SelectItem>
                  {genre?.map((item) => (
                    <SelectItem value={item?.genre}>{item?.genre}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                setSearchQuery({
                  ...searchQuery,
                  year: value,
                })
              }
            >
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Filter by publication year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="">Publication year</SelectItem>
                  {year?.map((item) => (
                    <SelectItem value={item?.publication_year}>
                      {item?.publication_year}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Book data={data?.data ?? []} />
          <button
            type="submit"
            onClick={() => navigate('/add-new-book')}
            className="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg mb-10"
          >
            Add Book
          </button>
        </div>
      )}
    </>
  );
};

export default Books;
