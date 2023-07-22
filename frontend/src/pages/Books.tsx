import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import PulseLoading from '../components/PulseLoading';

const Books = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showingBooks, setShowingBooks] = useState<IBook[]>([]); // Explicitly define the type as an array of Book
  const [searchQuery, setSearchQuery] = useState({
    queryString: '',
    genre: '',
    year: '',
    page: 1,
    limit: 8,
  });
  const searchQueryUrl = () => {
    let url = '';
    if (searchQuery.genre && searchQuery.queryString && searchQuery.year) {
      url = `genre=${searchQuery.genre}&searchTerm=${searchQuery.queryString}&publication_year=${searchQuery.year}&limit=${searchQuery.limit}`;
    } else if (searchQuery.genre && searchQuery.queryString) {
      url = `genre=${searchQuery.genre}&searchTerm=${searchQuery.queryString}&limit=${searchQuery.limit}`;
    } else if (searchQuery.genre && searchQuery.year) {
      url = `genre=${searchQuery.genre}&publication_year=${searchQuery.year}&limit=${searchQuery.limit}`;
    } else if (searchQuery.queryString && searchQuery.year) {
      url = `searchTerm=${searchQuery.queryString}&publication_year=${searchQuery.year}&limit=${searchQuery.limit}`;
    } else if (searchQuery.genre) {
      url = `genre=${searchQuery.genre}&limit=${searchQuery.limit}`;
    } else if (searchQuery.queryString) {
      url = `searchTerm=${searchQuery.queryString}&limit=${searchQuery.limit}`;
    } else if (searchQuery.year) {
      url = `publication_year=${searchQuery.year}&limit=${searchQuery.limit}`;
    } else if (searchQuery.page) {
      url = `page=${searchQuery.page}&limit=${searchQuery.limit}`;
    }
    return url;
  };

  const url = searchQueryUrl();
  console.log(url);

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

  useEffect(() => {
    console.log('Route changed:', location.pathname);
    setShowingBooks([])
  }, [location.pathname, searchQuery.genre, searchQuery.queryString, searchQuery.year]);

  useEffect(() => {
    if (data) {
      setShowingBooks((prevBooks) => [...prevBooks, ...data?.data ?? "default value"])
    }
  }, [data]);

  /* book loading for next 10 pice */
  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        // setLoading(true);
        setSearchQuery({
          ...searchQuery,
          page: searchQuery.page + 1,
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  if (isLoading) {
    <div>Loading...</div>;
  }
  console.log(showingBooks);
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
            <button
              type="submit"
              onClick={() => navigate('/add-new-book')}
              className="flex items-end self-end mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg mb-10"
            >
              Add Book
            </button>
          </div>
          <Book data={showingBooks ?? []} />
          {isLoading && <PulseLoading />}
        </div>
      )}
    </>
  );
};

export default Books;
