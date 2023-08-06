import React, { useState } from "react";
import RemovalAmount from "../MainQuoteComponents/RemovalAmount";
import SkinType from "../MainQuoteComponents/SkinType";
import TattooAge from "../MainQuoteComponents/TattooAge";
// import TattooColor from "./TattooColor";
import TattooInkAmount from "../MainQuoteComponents/TattooInkAmount";
import TattooLayering from "../MainQuoteComponents/TattooLayering";
import TattooScarring from "../MainQuoteComponents/TattooScarring";
import TattooSize from "../MainQuoteComponents/TattooSize";
import TattooColor from "../MainQuoteComponents/TattooColor";
import DisplayTotal from "../MainQuoteComponents/DisplayTotal";
import "../../css/mainQuote.css";
import "../../css/card.css";
import "../../css/radios.css";
import "../../css/tattooColor.css";
import "../../css/displayTotal.css";

export default function MainQuote() {
  const initialFormState = {
    removalamount: "",
    skintype: "",
    age: "",
    size: "",
    color: "",
    inkamount: "",
    scarring: "",
    layering: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [spot, setSpot] = useState(0);
  //const [clickState, setClickState] = useState(-1); // 1,2,3,4 // -1

  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  // function handleColorChange({ target }, n) {
  //   setClickState(n);
  //   setFormData({
  //     ...formData,
  //     [target.getAttribute("name")]: target.getAttribute("value"),
  //   });
  //   console.log(clickState);
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted:", formData);
    setFormData({ ...initialFormState });
  };

  let cards = [
    <RemovalAmount formData={formData} handleChange={handleChange} />,
    <SkinType formData={formData} handleChange={handleChange} />,
    <TattooAge formData={formData} handleChange={handleChange} />,
    <TattooSize formData={formData} handleChange={handleChange} />,
    <TattooColor formData={formData} handleChange={handleChange} />,
    <TattooInkAmount formData={formData} handleChange={handleChange} />,
    <TattooScarring formData={formData} handleChange={handleChange} />,
    <TattooLayering formData={formData} handleChange={handleChange} />,
  ];

  function next() {
    if (spot < cards.length - 1) {
      setSpot(spot + 1);
    }
  }

  function prev() {
    if (spot > 0) {
      setSpot(spot - 1);
    }
  }

  return (
    <>
      {spot === 4 ? (
        <>
          <div className='test-flexbox-container'>{cards[spot]}</div>
          <div>
            {spot !== 0 ? (
              <button className='btn btn-prev' onClick={prev}>
                Previous
              </button>
            ) : null}
            {spot !== cards.length - 1 ? (
              <button className='btn btn-nxt' onClick={next}>
                Next
              </button>
            ) : null}
          </div>
        </>
      ) : (
        <div className='card-container col-12'>
          {cards[spot]}
          <div className='test-div-btn'>
            {spot === cards.length - 1 ? (
              <DisplayTotal formData={formData} handleSubmit={handleSubmit} />
            ) : null}
          </div>
          <div>
            {spot !== 0 ? (
              <button className='btn btn-prev' onClick={prev}>
                Previous
              </button>
            ) : null}
            {spot !== cards.length - 1 ? (
              <button className='btn btn-nxt' onClick={next}>
                Next
              </button>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
