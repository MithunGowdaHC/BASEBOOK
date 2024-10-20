import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { RegisterPage } from "./pages/Register";
import { LoginPage } from "./pages/Login";
import  MyNavbar  from "./pages/Navbar";
import ListingPage from "./pages/List";
import Home from "./pages/Home";
import Details from "./pages/Details";
import ViewOrders from "./pages/ViewOrders";
import ViewOrderdetails from "./pages/ViewOrderdetail";
function App() {
  return (
    <div>
      <MyNavbar />

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/book/list" element={<ListingPage/>}/>
        <Route path="/book/view/:bookID" element={<Details/>}/>
        <Route path="/book/orders/" element={<ViewOrders/>}/>
        <Route path="/book/orders/:bookID" element={<ViewOrderdetails/>}/>


      </Routes>
    </div>
  );
}

export default App;
