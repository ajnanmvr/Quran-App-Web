import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import data from "../quran.json";
import Modal from "./Modal";

const SurathPage = () => {
  let { numberInSurah } = useParams();
  const navigation = useNavigate();

  const [pageData, setPageData] = useState(null);
  const [pageNumber, setpageNumber] = useState(null);
  const [surahName, setSurahName] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedAyahIndex, setSelectedAyahIndex] = useState(null);

  const onClose = () => {
    setIsOpen(false);
  };
  function convertToArabicNumber(number) {
    const easternArabicNumerals = [...String(number)].map((d) =>
      String.fromCharCode(1632 + parseInt(d))
    );
    return easternArabicNumerals.join("");
  }

  const handleNext = (currentPage) => {
    const totalAyahs = data.surahs[numberInSurah - 1].ayahs.length;
    if (currentPage < totalAyahs) {
      setpageNumber(currentPage + 1);
    } else {
      const nextSurah = parseInt(numberInSurah) + 1;
      if (nextSurah <= data.surahs.length) {
        navigation(`/${nextSurah}`);
      } else {
        console.log("No next surah available");
        // Handle any action if the end of the Quran is reached
      }
    }
  };

  const handleBack = (currentPage) => {
    if (pageData && pageData[0].numberInSurah === 1) {
      const prevSurah = parseInt(numberInSurah) - 1;
      if (prevSurah >= 1) {
        const prevSurahLastPage =
          data.surahs[prevSurah - 1].ayahs.slice(-1)[0].page;
        navigation(`/${prevSurah}`, {
          state: { pageNumber: prevSurahLastPage },
        });
      } else if (currentPage === 1) {
        console.log("No previous surah available");
      }
    } else if (pageData && pageData[0].numberInSurah !== 1) {
      setpageNumber(currentPage - 1);
    } else {
      console.log("prev");
    }
  };

  const getSurah = () => {
    const filteredData = data.surahs[numberInSurah - 1];
    setpageNumber(filteredData.ayahs[0].page);
  };
  const getData = (number, pageIndex) => {
    const filteredData = data.surahs[number - 1];
    const ayahsOfPage = filteredData.ayahs.filter((ayah) => {
      return ayah.page === pageIndex;
    });
    setPageData(ayahsOfPage);
    setSurahName(filteredData.name);
  };

  useEffect(() => {
    if (pageNumber !== null) {
      getData(numberInSurah, pageNumber);
    }
  }, [numberInSurah, pageNumber]);

  useEffect(() => {
    getSurah();
  }, [numberInSurah]);

  return (
    <div className="text-right w-3/4 mx-auto bg-light p-3 rounded">
      <h2 className="quran-text text-center bg-dark text-light p-3 rounded my-2">
        {surahName}
      </h2>

      {pageData &&
        pageData[0]?.text.includes(
          "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
        ) && (
          <p className="quran-text bismi my-2">
            {"بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"}
          </p>
        )}
      <div className="quran-text my-2">
        {pageData &&
          pageData.map((ayah, index) => {
            const ayath = ayah.text.replace(
              "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
              ""
            );

            return (
              <>
                {selectedAyahIndex === index ? (
                  <Modal
                    text={ayah.translation}
                    onClose={onClose}
                    isOpen={isOpen}
                  />
                ) : (
                  ""
                )}
                <span
                  key={index}
                  onClick={() => {
                    setSelectedAyahIndex(index);
                    setIsOpen(true);
                  }}
                  className="my-3"
                  style={{
                    cursor: "pointer",
                    color: selectedAyahIndex === index ? "#16716b" : "initial",
                  }}
                >
                  {ayath}
                  <span
                    style={{
                      backgroundColor: "#eee",
                      borderRadius: "50%",
                      // textAlign: "center",
                      margin: "2px 5px",
                      padding: "5px 10px",
                    }}
                  >
                    {convertToArabicNumber(ayah.numberInSurah)}
                  </span>
                </span>
              </>
            );
          })}
      </div>
      <div className="flex justify-between">
        <button
          className="bg-gray-900 text-white px-3 py-2 rounded hover:bg-transparent border border-gray-950 transition hover:text-black"
          onClick={() => handleBack(pageNumber)}
        >
          Previous
        </button>
        <h2 className="">{convertToArabicNumber(pageNumber)}</h2>
        <button
          className="bg-gray-900 text-white px-3 py-2 rounded hover:bg-transparent border border-gray-950 transition hover:text-black"
          onClick={() => handleNext(pageNumber)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SurathPage;
