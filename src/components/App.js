import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./loginPage";
import Signup from "./signupPage";
import Home from "./Home";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the backend API
    axios.get("http://localhost:8000/users")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home users={users} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
