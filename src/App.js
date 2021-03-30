import React, { useState, useEffect } from "react";
import axios from "axios";
import { Logo, LogoSmall } from "./assets/img/images";

import { TextField } from "@material-ui/core";

import "./App.scss";

const App = () => {
  const [email, setEmail] = useState("");

  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();

    const difference = +new Date(`09/01/${year}`) - +new Date();

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
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
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  const handleChange = ({ target }) => setEmail(target.value)
  
  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/email`, { email })
      setEmail('')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="App">
      <div className="wrapper">
        <img className="logo" src={Logo} alt="Cour Logo" />
        <img className="logo-small" src={LogoSmall} alt="Cour Logo" />
        <form onSubmit={sendEmail}>
          <TextField
            fullWidth
            label="Enter email for updates"
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
            {timerComponents.length ? (timerComponents) : (<span>Time's up!</span>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
