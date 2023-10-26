import React from "react";
import QuranCardsGrid from "./components/QuranCardGrid";
import SurathPage from "./components/SurathPage";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      {/* <h1 className="text-center font-bold text-3xl text-teal-700 my-5 quran-text">
        القران الكريم
      </h1> */}
      <Routes>
        <Route path="/" element={<QuranCardsGrid />} />
        <Route path="/:numberInSurah" element={<SurathPage />} />
      </Routes>
    </div>
  );
}

export default App;
