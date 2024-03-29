//https://codepen.io/Raphab/pen/LYVgVLp

import React, { useEffect, useState } from "react";
import "../stylesheets/BookShelf.css";
import Swal from "sweetalert2";
import { Info, Pencil } from "lucide-react";
import { Tooltip } from "react-tooltip";
//import withReactContent from 'sweetalert2-react-content'

function BookShelf() {
  interface Book {
    bookName: string;
    bookRating: number;
    bookRead: number;
    bookReadYear: number;
    id: number;
    imgURL: string;
    userId: number;
  }

  interface BookNotes {
    bookNote: string;
    bookShelfId: number;
    id: number;
  }

  type BooksByYear = Record<string, Book[]>;

  const [books, setBooks] = useState<BooksByYear[]>([]);

  const [showBoard, setShowBoard] = useState<boolean>(false);
  const [showBook, setShowBook] = useState<Book[]>([]);
  const [showBookNotes, setShowBookNotes] = useState<BookNotes[]>([]);

  const user = localStorage.getItem("userName");

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetch(
          `${serverUrl}/get/books/${localStorage.getItem("userId")}`
        );
        const data = await response.json();
        console.log(data, "data");

        const bookByYear = data.reduce((sameYear: Book, year: Book) => {
          const bookYear = year.bookReadYear;
          if (!sameYear[bookYear]) {
            sameYear[bookYear] = [] as BooksByYear[];
          }
          sameYear[bookYear].push(year);
          return sameYear;
        }, {});
        const bookByYearArray = Object.entries(bookByYear);
        console.log("hvaderdu", bookByYearArray);
        const recentBooks = bookByYearArray.sort(
          (a: any, b: any) => b[0] - a[0]
        );
        setBooks(recentBooks as any);
        console.log(books);
      } catch (error) {
        console.error("Fejl ved hentning af bøger:", error);
      }
    };

    getBooks();
    console.log(books);
  }, []);

  const displayBoard = () => {
    setShowBoard(!showBoard);
  };

  const handleShowBoard = (book) => {
    fetch(`${serverUrl}/get/booknotes/${book.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setShowBook(book as Book[]);
        setShowBookNotes(data as BookNotes[]);
        displayBoard();
      });
  };

  const addBook = () => {
    Swal.fire({
      title: "Add a new book",
      html: `
       <div className='grid'>
          <input id="bookName" class="swal2-input" placeholder="Book Name">
          <input id="bookRating" class="swal2-input" type="number" placeholder="Book Rating">
          <br /> <label for="bookRating">Rate between 1-5</label> <br />
          <input id="bookRead" class="swal2-input" type="number" placeholder="Book Read">
          <br /> <label for="bookRead">1 = Read 2 = Need to read</label> <br />
          <input id="bookReadYear" class="swal2-input" type="number" placeholder="Book Read Year">
          <br /> <label for="bookReadYear">If read, What year did you read</label> <br />
          <input id="imgURL" class="swal2-input" placeholder="Image URL">
          <br /> <label for="imgURL">Copy image url from <a className='text-blue-700' href="https://www.goodreads.com" target="_blank" rel="noopener noreferrer"><b style='color: darkblue; font: bold;' >GoodReads</b></a></label> <br />
       </div>
      `,
      preConfirm: () => {
        return {
          bookName: document.getElementById("bookName").value,
          bookRating: Number(document.getElementById("bookRating").value),
          bookRead: Number(document.getElementById("bookRead").value),
          bookReadYear: Number(document.getElementById("bookReadYear").value),
          imgURL: document.getElementById("imgURL").value,
          userId: localStorage.getItem("userId"),
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Book added!",
          text: "Book is now on your bookshelf!",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        fetch(`${serverUrl}/post/book`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(result.value),
        }).then((response) => response.json());
      }
    });
  };

  /*   Swal.fire({
    title: "Journal Posted!",
    text: "Remember to check in tomorrow!",
    icon: "success",
    confirmButtonText: "OK",
  });
} catch (error) {
  console.log(error);
  Swal.fire({
    title: "Journal not posted",
    text: "Something went wrong, please try again later.",
    icon: "error",
    confirmButtonText: "OK",
  }); */

  const editBook = (book) => {
    Swal.fire({
      title: "Edit book",
      html: `
        <input id="bookName" class="swal2-input" placeholder="Book Name" value="${book.bookName}">
        <input id="bookRating" class="swal2-input" type="number" placeholder="Book Rating" value="${book.bookRating}">
        <input id="bookRead" class="swal2-input" type="number" placeholder="Book Read" value="${book.bookRead}">
        <input id="bookReadYear" class="swal2-input" type="number" placeholder="Book Read Year" value="${book.bookReadYear}">
        <input id="imgURL" class="swal2-input" placeholder="Image URL" value="${book.imgURL}">
      `,
      preConfirm: () => {
        return {
          bookShelfId: book.id,
          bookName: document.getElementById("bookName").value,
          bookRating: Number(document.getElementById("bookRating").value),
          bookRead: Number(document.getElementById("bookRead").value),
          bookReadYear: Number(document.getElementById("bookReadYear").value),
          imgURL: document.getElementById("imgURL").value,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Book Edited!",
          text: "Book is now on your bookshelf!",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
        console.log(result.value); // Process the values here
        fetch(`${serverUrl}/put/book/${book.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(result.value),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            window.location.reload();
          });
      }
    });
  };

  const postNote = (book) => {
    Swal.fire({
      title: "Add a new note",
      html: `
      <input id="bookNote" class="swal2-input" placeholder="Book Note">
    `,
      preConfirm: () => {
        return {
          bookNote: document.getElementById("bookNote").value,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(result.value); // Process the values here
        fetch(`${serverUrl}/post/booknote/${book.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(result.value),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            window.location.reload();
          });
      }
    });
  };

  return (
    <div>
      <div className="bookShelfBody min-h-[100vh] ">
        <div className="bg-gray-900 p-4 bg-opacity-50 pt-6">
          <h1 className="text-gray-100 text-3xl mb-6">
            Hi <b className="text-green-400">{user}!</b> welcome to your
            personal Bookshelf
          </h1>
          <button onClick={() => addBook()} className="m-auto bg-green-700 ">
            Add Book
          </button>
        </div>
        {books.map((book: any) => {
          return (
            <div key={book.id} className="bookshelf">
              <div className="book-grid">
                <h1 className="text-4xl text-gray-100 my-8">{book[0]}</h1>
                <ul>
                  {book[1].map((book: any) => {
                    return (
                      <div className="w-fit">
                        {book.bookRead === 1 ? (
                          <div key={book.id}>
                            <li>
                              {" "}
                              <img src={book.imgURL} />
                            </li>
                            <div className="bg-gray-600 bg-opacity-80 p-2 rounded-lg text-gray-100">
                              <li>
                                {[...Array(book.bookRating)].map((e, i) => (
                                  <span className="text-xl">⭐</span>
                                ))}
                              </li>
                              <div className="flex gap-4 justify-center mt-2">
                                <Info
                                  className="cursor-pointer"
                                  onClick={() => handleShowBoard(book)}
                                  size={30}
                                  data-tooltip-id="info"
                                  data-tooltip-content="Se dine noter om bogen"
                                />
                                <Tooltip id="info" />
                                <Pencil
                                  className="cursor-pointer"
                                  onClick={() => editBook(book)}
                                  size={30}
                                  data-tooltip-id="edit"
                                  data-tooltip-content="Rediger bogen"
                                />
                                <Tooltip id="edit" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div key={book.id}>
                            <h1>Need To Read</h1>
                            <li>
                              {" "}
                              <img src={book.imgURL} />
                            </li>
                            <div className="bg-gray-600 bg-opacity-80 p-2 rounded-lg text-gray-100">
                              <li>
                                {[...Array(book.bookRating)].map((e, i) => (
                                  <span className="text-xl">⭐</span>
                                ))}
                              </li>
                              <div className="flex gap-4 justify-center mt-2">
                                <Info
                                  className="cursor-pointer"
                                  onClick={() => handleShowBoard(book)}
                                  size={30}
                                  data-tooltip-id="info"
                                  data-tooltip-content="Se dine noter om bogen"
                                />
                                <Tooltip id="info" />
                                <Pencil
                                  className="cursor-pointer"
                                  onClick={() => editBook(book)}
                                  size={30}
                                  data-tooltip-id="edit"
                                  data-tooltip-content="Rediger bogen"
                                />
                                <Tooltip id="edit" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </ul>
              </div>
              <div className="shelf-shadows"></div>
              <div className="shelf"></div>
            </div>
          );
        })}

        {showBoard && showBook ? (
          <div className="bg-gray-800 fixed inset-20 z-50 p-6">
            <h1 className="text-2xl">Book name {showBook.bookName} </h1>
            <h3>
              {[...Array(showBook.bookRating)].map((e, i) => (
                <span className="text-xl">⭐</span>
              ))}
            </h3>
            <div className="grid grid-cols-4">
              {showBookNotes.map((note) => {
                return (
                  <div className="bg-gray-600 bg-opacity-80 p-2 m-4 rounded-lg text-gray-100">
                    <p>{note.bookNote}</p>
                  </div>
                );
              })}
            </div>
            <button onClick={() => displayBoard()}>Close</button>
            <button onClick={() => postNote(showBook)}>Add Note</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default BookShelf;
