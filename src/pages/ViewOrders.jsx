// import React, { useState } from "react";
// import { useEffect } from "react";
// import { useFirebase } from "../context/Firebase";
// import MyCard from "../components/Card";
// import "../components/MyCard.css"; // Adjust the path if needed


// const ViewOrders = () => {
//   const firebase = useFirebase();
//   const [books, setBooks] = useState([]);
//   useEffect(() => {
//     if (firebase.isLoggedIn)
//       firebase
//         .fetchMyBooks(firebase.user.uid)
//         ?.then((books) => setBooks(books.docs));
//   }, [firebase]);
//   console.log(books);
//   if (!firebase.isLoggedIn) return <h1>Please log in</h1>;

//   return (
//     <div>
//       {books.map((book) => (
//         <MyCard key={book.id} id={book.id} {...book.data()} />
//       ))}
//     </div>
//   );
// };

// export default ViewOrders;

import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import MyCard from "../components/Card";
import "../components/MyCard.css"; // Ensure path is correct
import "./ViewOrders.css"; // New CSS file for layout

const ViewOrders = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (firebase.isLoggedIn) {
      firebase
        .fetchMyBooks(firebase.user.uid)
        ?.then((books) => setBooks(books.docs));
    }
  }, [firebase]);

  console.log(books);

  if (!firebase.isLoggedIn) return <h1 className="login-message">Please log in</h1>;

  return (
    <div className="view-orders-container">
      <h1 className="orders-heading"> Orders</h1>
      <div className="orders-grid">
        {books.map((book) => (
          <MyCard link={`/books/orders/${book.id}`} key={book.id} id={book.id} {...book.data()} />
        ))}
      </div>
    </div>
  );
};

export default ViewOrders;
