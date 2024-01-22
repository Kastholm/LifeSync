//https://codepen.io/Raphab/pen/LYVgVLp

import React from 'react'
import '../stylesheets/BookShelf.css'

function BookShelf() {
  return (
    <div >

    <div className='bookShelfBody'>
         <div className="bookshelf first">
           <div className="book-grid">
             <ul>
               <li> <img src="https://images-na.ssl-images-amazon.com/images/I/51aBcwHY7aL._SX351_BO1,204,203,200_.jpg"/></li>
               <li> <img src="https://images-na.ssl-images-amazon.com/images/I/51QLLBtcCFL._SX345_BO1,204,203,200_.jpg"/></li>
               <li> <img src="https://m.media-amazon.com/images/I/51FAsEhj1vL.jpg"/></li>
             </ul>
           </div>
           <div className="shelf-shadows"></div>
           <div className="shelf"></div>
         </div>
         
         
         <div className="bookshelf">
           <div className="book-grid">
             <ul>
               <li> <img src="https://images-na.ssl-images-amazon.com/images/I/516ewsQg54L._SX319_BO1,204,203,200_.jpg"/></li>
               <li> <img src="https://images-na.ssl-images-amazon.com/images/I/51%2BEaerSnvL.jpg"/></li>
               <li> <img src="https://images-na.ssl-images-amazon.com/images/I/51THhz9nw7L._SY346_.jpg"/></li>
             </ul>
           </div>
           <div className="shelf-shadows"></div>
           <div className="shelf"></div>
         </div>
         
         
         
         
         <div className="bookshelf">
           <div className="book-grid">
             <ul>
               <li> <img src="https://images-na.ssl-images-amazon.com/images/I/41%2BSusntjEL._SX320_BO1,204,203,200_.jpg"/></li>
               <li> <img src="https://images-na.ssl-images-amazon.com/images/I/51F1n%2BuxxBL._SX320_BO1,204,203,200_.jpg"/></li>
               <li> <img src="https://images-na.ssl-images-amazon.com/images/I/51Qy21yVG3L._SX329_BO1,204,203,200_.jpg "/></li>
             </ul>
           </div>
           <div className="shelf-shadows"></div>
           <div className="shelf"></div>
         </div>
         
         <div className="bookshelf">
           <div className="book-grid">
             <ul>
               <li> <img src="https://images-na.ssl-images-amazon.com/images/I/51CVR5XT01L._SX315_BO1,204,203,200_.jpg"/></li>
               <li> <img src="https://images-eu.ssl-images-amazon.com/images/I/51d8PQZzvNL.jpg"/></li>
               <li> <img src="https://images-na.ssl-images-amazon.com/images/I/41vw%2BRmEi4L._SX327_BO1,204,203,200_.jpg"/></li>
             </ul>
           </div>
           <div className="shelf-shadows"></div>
           <div className="shelf"></div>
         </div>
    </div>
   
   
   
    </div>
  )
}

export default BookShelf