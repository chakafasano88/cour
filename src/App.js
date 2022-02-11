import React, { useState, useEffect } from "react";
import axios from "axios";
import { LogoFull } from "./assets/img/images";

import { TextField } from "@material-ui/core";

import WindowsPopup from "./components/WindowsPopup/WindowsPopup";

import { windowData } from "./data/data";

import "./App.scss";

const App = () => {
  const [email, setEmail] = useState("");
  const [hiddenWindows, setHiddenWindows] = useState([]);

  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();

    const difference = +new Date(`09/01/${year}`) - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, i) => {
    timerComponents.push(
      <span key={i}>
        {timeLeft[interval]}
        {i < 3 && " /"}
      </span>
    );
  });

  const handleChange = ({ target }) => setEmail(target.value);

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/email`, { email });
      setEmail("");
    } catch (e) {
      console.error(e);
    }
  };

  const handleOnCloseWindow = (name) => {
    setHiddenWindows([name, ...hiddenWindows]);
  };

  return (
    <div className="App">
      <div className="bio">
        <div className="story">[story]</div>
        <p>
          Story goes here blah blah blah blah loyalty blah blah blah de bloo de
          blah blah blockchain, other words, stuff, hey is anyone even reading
          this? we need to fill all of this with conscious marketing words that
          will help us appeal to our demographics and get them to buy a F$%*load
          of cour products instead of spending their money on crypto.
          Alright..cour products are designed with conscious intention to break
          down complex social structures by changing the world of furniture
          design. viability becomes an afterthought
        </p>
      </div>
      <h1 id="spinner">Will Coursen</h1>
      <div className="wrapper">
        <img className="logo" src={LogoFull} alt="Cour Logo" />
        <form onSubmit={sendEmail}>
          <TextField
            fullWidth
            label="enter email for updates"
            name="email"
            onChange={handleChange}
            size="medium"
            type="text"
            value={email}
          />
        </form>
        <div className="flag-wrapper">
          <div className="text">
            <div>cour.studio</div>
            <div>S1. 2021</div>
          </div>
          <div className="countdown">
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
          </div>
        </div>
      </div>
      {windowData.map(({ id, images, title }, i) => (
        <WindowsPopup
          title={title}
          key={`window-${id}`}
          onClose={() => handleOnCloseWindow(id)}
          // onClickContent={() => handleOnCloseWindow(id)}
          className={`${
            hiddenWindows.find((window) => window === id) ? "hide" : ""
          } ${id}`}
        >
          {images.map(({ src, alt }) => (
            <img className="window-image" src={src} alt={alt} />
          ))}
        </WindowsPopup>
      ))}
    </div>
  );
};

export default App;
