export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  publication_year: string;
  image: string;
  finishedReading?: boolean;
}
