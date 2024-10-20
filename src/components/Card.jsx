// import React from "react";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import { useState, useEffect } from "react";
// import { useFirebase } from "../context/Firebase";

// const MyCard = (props) => {
//   const [url, setURL] = useState(null)
//   const firebase = useFirebase()
//   useEffect(()=>{
//     firebase.getImageURL(props.imageURL).then((url)=>setURL(url))

//   },[])
//   return (
//     <Card style={{ width: "18rem",  margin:"25px" }}>
//       <Card.Img variant="top"  src={url} />
//       <Card.Body>
//         <Card.Title>{props.name}</Card.Title>
//         <Card.Text>
//           This book has a title {props.name} sold by {props.displayName}
//         </Card.Text>
//         <Button variant="primary">Go somewhere</Button>
//       </Card.Body>
//     </Card>
//   );
// };

// export default MyCard;
import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import "./Mycard.css";
// Import custom CSS for animations

export const MyCard = (props) => {
  const [url, setURL] = useState(null);
  const firebase = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    firebase.getImageURL(props.imageURL).then((url) => setURL(url));
  }, [props.imageURL]);

  return (
    <div className="card custom-card h-100">
      <div className="card-img-container">
        {url ? (
          <img src={url} alt={props.name} className="card-img-top" />
        ) : (
          <div className="placeholder animate-pulse"></div>
        )}
      </div>
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">
          This book has a title {props.name} sold by {props.displayName}.
        </p>
        <button
          onClick={(e) => navigate(props.link)}
          className="btn btn-primary w-100"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default MyCard;
