import React, { useEffect, useState } from "react";
import "./Card.scss";
import { FiPlus } from "react-icons/fi";
import masterCardLogo from "./../../img/Logo.svg";
import visa from "./../../img/Logo (1).svg";
// import { format } from "date-fns";
import visaCard from "./../../img/visa.svg";

const Card = ({ dark, setDark }) => {
  const [comfirmed, setComfirmed] = useState(false);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("");

  const getDataFromLocalStorage = () => {
    const cardData = localStorage.getItem("cardData");

    if (cardData) {
      const parsedData = JSON.parse(cardData);
      setName(parsedData.name);
      setCardNumber(parsedData.cardNumber);
      setDate(parsedData.date);
      setComfirmed(true);
    }

    const darkMode = localStorage.getItem("darkMode");
    if (darkMode !== null) {
      const isDark = JSON.parse(darkMode);
      setDark(isDark);
    }
  };

  const saveDataToLocalStorage = () => {
    if (name.length > 0 && date.length > 0 && cardNumber.length > 0) {
      setComfirmed(true);

      const cardData = {
        name,
        cardNumber,
        date,
      };

      localStorage.setItem("cardData", JSON.stringify(cardData));
    } else {
      alert("Please fill in the fields");
    }
  };

  const handleDeleteClike = () => {
    const visaDiv = document.querySelector(".visa");
    if (visaDiv) {
      visaDiv.remove();
      localStorage.setItem("visaStatus", "hidden");
    }
  };

  // const getDeleteFromLocalStorage = () => {
  //   const visaStatus = localStorage.getItem("visaStatus");

  //   if (visaStatus !== "hidden") {
  //     setComfirmed(true);
  //   } else {
  //     setComfirmed(false);
  //   }
  // };

  // useEffect(() => {
  //   getDeleteFromLocalStorage();
  // }, []);

  const handleDarkModeToglle = () => {
    setDark(!dark);
    localStorage.setItem("darkMode", !dark);
  };

  const handleCardNumberChange = (e) => {
    const sanitizedValue = e.target.value.replace(/\D/g, "");
    const limitedValue = sanitizedValue.slice(0, 16);
    setCardNumber(limitedValue);
  };

  useEffect(() => {
    getDataFromLocalStorage();
  }, []);

  return (
    <div id="Card">
      <div className="container">
        <div className="Card">
          <div className="chekout">
            <h1 className="chek">Checkout</h1>
            <p className="price">€ 300,00</p>
            <div className="cards">
              <h3 className="saved">Saved Cards</h3>
              <div className="plusAdd">
                <FiPlus className="plus" /> Add New
              </div>
            </div>
            <div className="masterCard">
              <img src={masterCardLogo} alt="logo" />
              <h3>5142 - 8164 - 6526 - 2563</h3>
              <div className="masterBlock">
                <div className="name">
                  <p>NAME</p>
                  <h2>jenner anne</h2>
                </div>
                <div className="valid">
                  <p>Valid Till</p>
                  <h2>05/34</h2>
                </div>
              </div>
            </div>
            <div
              style={{ display: comfirmed ? "block" : "none" }}
              className="visa"
            >
              <img src={visaCard} alt="visa" />
              <h3>{cardNumber}</h3>
              <div className="masterBlock">
                <div className="name">
                  <p>NAME</p>
                  <h2>{name}</h2>
                </div>
                <div className="valid">
                  <p>Valid Till</p>
                  {/* <h2>{format(new Date(date), "MM/yy")}</h2> */}
                  <h2>{date}</h2>
                </div>
              </div>
            </div>
            <button onClick={handleDeleteClike}>Delete</button>
          </div>
          <div className="addNew">
            <h1>Add new card</h1>
            <div className="addBlock">
              <p className="enter">Enter details</p>
              <div className="name">
                <p>Name</p>
                {!comfirmed && (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}
              </div>
              <div className="cardNumber">
                <p>Card number</p>
                {!comfirmed && (
                  <div className="number">
                    <input
                      type="text"
                      value={cardNumber
                        .replace(/\s/g, "")
                        .replace(/(\d{4})/g, "$1 ")
                        .trim()}
                      onChange={handleCardNumberChange}
                    />
                    <img src={visa} alt="visa" />
                  </div>
                )}
              </div>
              <div className="date">
                <p>Expiry date</p>
                {!comfirmed && (
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    maxLength="5"
                    placeholder="MM/yy"
                  />
                )}
              </div>
              <div className="dark">
                <p>dark</p>
                <label class="ui-switch">
                  <input onClick={handleDarkModeToglle} type="checkbox" />
                  <div class="slider">
                    <div class="circle"></div>
                  </div>
                </label>
              </div>
            </div>
            <button onClick={saveDataToLocalStorage}>SAVE</button>
          </div>
          {comfirmed && <ThankYou setComfirmed={setComfirmed} />}
        </div>
      </div>
    </div>
  );
};

function ThankYou({ setComfirmed }) {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setComfirmed(false);
  //   }, 3000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [setComfirmed]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-slate-800 text-3xl mb-6 uppercase text-center">
          Thank You!
        </h1>
        <p className="text-slate-400 text-center">
          We've added your card details
        </p>
      </div>
    </>
  );
}

export default Card;
