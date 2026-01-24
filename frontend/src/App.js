// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import SignIn from "./Pages/SignIn";
import Login from "./Pages/Login";

// New imports for pages
import Book from "./Pages/Book/Book";
import ExploreNow from "./Pages/ExploreNow/ExploreNow";
import OnlineMode from "./Pages/OnlineMode/OnlineMode";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/login" element={<Login />} />

        {/* New routes */}
        <Route path="/book" element={<Book />} />
        <Route path="/about-us" element={<ExploreNow />} />
        <Route path="/online-mode" element={<OnlineMode />} />
      </Routes>
    </Router>
  );
}

export default App;
