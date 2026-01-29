// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";

/* Pages */
import Home from "./Pages/Home/Home";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Book from "./Pages/Book/Book";
import ExploreNow from "./Pages/ExploreNow/ExploreNow";
import OnlineMode from "./Pages/OnlineMode/OnlineMode";
import Login from "./Pages/Login";
import SignIn from "./Pages/SignIn";

function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
        {/* Main pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/explorenow" element={<ExploreNow />} />
        <Route path="/book" element={<Book />} />
        <Route path="/online-mode" element={<OnlineMode />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
