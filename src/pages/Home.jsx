// import React from "react";
// import { useEffect, useState } from "react";
// import { useFirebase } from "../context/Firebase";
// import MyCard, { BookGrid } from "../components/Card";
// import CardGroup from "react-bootstrap/CardGroup";

// const Home = () => {
//   const firebase = useFirebase();
//   const [books, setBooks] = useState([]);
//   useEffect(() => {
//     firebase.listAllBooks().then((books) => setBooks(books.docs));
//   }, []);
//   return (
//     <div className="container mt-5">
//       <CardGroup>
//       <BookGrid>
//         {books.map((book) => (
//           <MyCard key={book.id} {...book.data()} />
//         ))}
//       </BookGrid>
//       </CardGroup>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import MyCard from "../components/Card";

const Home = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, []);

  return (
    <div className="container my-5">
      <div className="row g-4">
        {books.map((book) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={book.id}>
            <MyCard 
            link={`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
