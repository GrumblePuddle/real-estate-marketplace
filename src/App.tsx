import { BrowserRouter, Routes, Route } from "react-router";
import Start from "./pages/Start";
import Listings from "./pages/Listings";
import ListingDetails from "./pages/ListingDetails";
/*import Login from "./pages/Login"; 
import CreateListing from "./pages/CreateListing";
import Profile from "./pages/Profile"; */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        {/*
        <Route path="/login" element={<Login />} /> 
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
