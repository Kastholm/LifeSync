import React, { useEffect, useState } from "react";

function BookWidget() {
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = () => {
      fetch(`${serverUrl}/get/books/${localStorage.getItem("userId")}`)
        .then((res) => res.json())
        .then((data) => setBooks(data));
    };
    getBooks();
  }, []);

  return (
    <div className="bg-gray-900 p-4 mx-2 mt-3 rounded-xl relative z-0 overflow-x-scroll">
         <h1 className="text-gray-100 text-xl mb-4">Need To Read</h1>
      {books.map((book: any) => (
         <div >
               {
                    book.bookRead === 2 ? (
                         <div key={book.id}>
               <img className="w-40 rounded-lg " src={book.imgURL} />
           </div>
                    ) : null
               }
         </div>
      ))}
    </div>
  );
}

export default BookWidget;
