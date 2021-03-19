import React, { useState } from 'react'
import axios from 'axios';
import { Logo, Flag } from "./assets/img/images";

import { TextField } from "@material-ui/core";

import "./App.scss";

const App = () => {

  const [email, setEmail] = useState('')
  
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
        <form onSubmit={sendEmail}>
          <TextField
            fullWidth
            label="Enter email for updates"
            name="email"
            onChange={handleChange}
            size="medium"
            type="text"
            value={email}
            variant="outlined"
          />
        </form>
        <div className="flag-wrapper">
          <div className="text">
            <div>2021</div>
            <div>cour.studio</div>
          </div>
          <img className="flag" src={Flag} alt="Cour Flag" />
        </div>
        
      </div>
      <footer>
        <span>cour studio</span>
        <span>taste + simplicity</span>
      </footer>
    </div>
  );
};

export default App;
