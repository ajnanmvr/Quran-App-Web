import React from "react";
import quranData from "../quran.json";
import { Link } from "react-router-dom";

function convertToArabicNumber(number) {
  const easternArabicNumerals = [...String(number)].map((d) =>
    String.fromCharCode(1632 + parseInt(d))
  );
  return easternArabicNumerals.join("");
}
const QuranCard = ({ number, name, page, ayahCount,  }) => {
  return (
    <Link to={`/${number}`}>
      <div className="bg-white shadow-md p-6 m-2 rounded-lg cursor-pointer hover:bg-gray-200 transition">
        <h2 className="text-xl font-bold mb-2 quran-text">
          {name} {convertToArabicNumber(number)}{" "}
        </h2>
        <div className="flex justify-between items-center bg-gray-100 py-2 px-4 rounded-full">
          <p className="text-gray-700 mb-2 quran-text" style={{ fontSize: 17 }}>
            صفحة {convertToArabicNumber(page)}
          </p>
          <p
            className="text-gray-700 quran-text"
            style={{
              fontSize: 17,
            }}
          >
            الآيات {convertToArabicNumber(ayahCount)}
          </p>
        </div>
      </div>
    </Link>
  );
};

const QuranCardsGrid = () => {
  return (
    <div
      className="lg:grid lg:grid-cols-3 gap-2 p-4"
      style={{
        direction: "rtl",
      }}
    >
      {quranData.surahs.map((item) => (
        <QuranCard
          key={item.number}
          number={item.number}
          name={item.name}
          page={item.ayahs[0].page}
          ayahCount={item.ayahs.length}
        />
      ))}
    </div>
  );
};

export default QuranCardsGrid;
