import Book from './Book';
import booksData from './BooksData';
import './Book.css';


function App() {
  return (
    <div className="App">
      <h1>Book List</h1>
      <div className="book-list">
  {booksData.map(book => <Book key={book.id}  book={book} name="Matti"/>)} 
      </div>
    </div>
  );
}


/*
function App() {
  return (
    <div className="App">
      <h1>Book List</h1>
      <div className="book-list">
        {
        booksData.map(
          (book) => (
          <Book book={book} />))
        }
      </div>
    </div>
  );
}
*/

export default App;