import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../quran.json";

const SurathPage = () => {
  let { numberInSurah } = useParams();
  const [pageData, setPageData] = useState(null);
  const [surahData, setSurahData] = useState(null);
  const [page, setPage] = useState(surahData);

  const [selectedAyahIndex, setSelectedAyahIndex] = useState(null);

  function convertToArabicNumber(number) {
    const easternArabicNumerals = [...String(number)].map((d) =>
      String.fromCharCode(1632 + parseInt(d))
    );
    return easternArabicNumerals.join("");
  }
  const handleNext = () => {
    setPageData(pageData + 1);
  };
  const handleBack = () => {
    setPageData(pageData - 1);
  };
  const filteredData = data.surahs[numberInSurah - 1];
  const ayahsOfPage = filteredData.ayahs.filter((ayah) => {
    return ayah.page === surahData;
  });
  useEffect(() => {
    setPageData(ayahsOfPage);
    setSurahData(filteredData.ayahs[0].page);
  }, [numberInSurah, surahData, page]);

  return (
    <div className="max-w-35p absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h2 className="quran-text bg-[#389c99] text-white p-3 rounded-full my-2">
        {filteredData.name}
      </h2>
      <p className="quran-text bismi my-2">
        {"بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"}
      </p>
      <p className="quran-text my-2">
        {pageData &&
          pageData.map((ayah, index) => {
            const ayath = ayah.text.replace(
              "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
              ""
            ); // Extracting the fruit name

            return (
              <span
                key={index}
                onClick={() => setSelectedAyahIndex(index)}
                className="my-3"
                style={{
                  cursor: "pointer",
                  color: selectedAyahIndex === index ? "#16716b" : "initial",
                }}
              >
                {/* <p className="quran-text"> {ayath}</p> */}
                {ayath}{" "}
                <span
                  style={{
                    backgroundColor: "#eee",
                    // display: "inline-block",
                    borderRadius: "50%",
                    // width: "25px",
                    // height: "25px",
                    textAlign: "center",
                    // lineHeight: "25px",
                    margin: "2px 5px",
                    padding: "5px 10px",
                  }}
                >
                  {convertToArabicNumber(index + 1)}
                </span>
              </span>
            );
          })}
      </p>
      <div className="flex justify-between">
        <button
          className="bg-gray-900 text-white px-3 py-2 rounded-full hover:bg-transparent border border-gray-950 transition hover:text-black"
          onClick={handleBack}
        >
          Previous
        </button>
        <h2 className="">{convertToArabicNumber(surahData)}</h2>
        <button
          className="bg-gray-900 text-white px-3 py-2 rounded-full hover:bg-transparent border border-gray-950 transition hover:text-black"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SurathPage;
