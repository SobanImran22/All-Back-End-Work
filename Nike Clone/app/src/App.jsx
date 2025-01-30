import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import Shoe1 from "./assets/Shoe1 (1).webp";
import Shoe2 from "./assets/Shoe1 (2).webp";
import Shoe3 from "./assets/Shoe1 (3).webp";
import "./App.css";


const Shoes = {
  "air-jordan-3-valor-blue": {
    name: "VALOUR BLUE",
    img: Shoe1,
  },
  "jordan-mars-270-london": {
    name: "JORDAN MARS 270 LONDON",
    img: Shoe2,
  },
  "air-jordan-1-zoom-racer-blue": {
    name: "RACER BLUE",
    img: Shoe3,
  },
};


function App() {
  return (
    <div>
      <Router>
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/launch" className="nav-link">Launch</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/launch" element={<Launch />} />
          {/* Define a dynamic route for shoe details */}
          <Route path="/launch/:slug" element={<LaunchShoe />} />
        </Routes>
      </Router>
    </div>
  );
}


function Home() {
  return (
    <div className="home">
      <h1>WELCOME TO HOME PAGE</h1>
    </div>
  );
}


function Launch() {
  return (
    <div className="launch">
      <h1>WELCOME TO LAUNCH PAGE</h1>
      <LaunchIndex />
    </div>
  );
}


function LaunchIndex() {
  return (
    <div className="items-list">
      <ul>
        {Object.entries(Shoes).map(([slug, { name, img }]) => (
          <li key={slug} className="item-card">
            <Link to={`/launch/${slug}`} className="item-link">
              <h2>{name}</h2>
              <img src={img} alt={name} className="item-image" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


function LaunchShoe() {
  const { slug } = useParams(); 
  const shoe = Shoes[slug];

  if (!shoe) {
    return <h2>Shoe not found!</h2>; 
  }

  return (
    <div className="shoe-detail">
      <h2>{shoe.name}</h2>
      <img src={shoe.img} alt={shoe.name} className="item-image" />
    </div>
  );
}

export default App;
