import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/signup", {
          name,
          email,
          password,
        })
        .then((res) => {
          if (res.data === "exist") {
            alert("User already exists");
          } else if (res.data === "notexist") {
            navigate("/home", { state: { id: name } });
          }
        })
        .catch((e) => {
          alert("Wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function bookFlight() {
    try {
      // Flight booking logic here...

      // After successful booking, navigate to the home page with bookingSuccess set to true
      navigate("/home", { state: { bookingSuccess: true } });
    } catch (error) {
      // Handle error case
    }
  }

  return (
    <div className="signup">
      <h1>Signup</h1>
      <form action="POST">
        <input
          type="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input type="submit" onClick={submit} />
      </form>
      <p>OR</p>
      <p>
      <span className="new-user">Already a User?</span>{" "}
      <Link to="/">Login Page</Link>
      </p>
    </div>
  );
}

export default Signup;

const styles = `
.signup {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  margin-top: 100px;
}

.signup h1 {
  text-align: center;
}

.signup form {
  display: flex;
  flex-direction: column;
}

.signup input[type="name"],
.signup input[type="email"],
.signup input[type="password"],
.signup input[type="submit"] {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.signup input[type="submit"] {
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}

.signup p {
  text-align: center;
}

.signup .new-user {
  display: inline;
}

`;

// Add the CSS styles to the document
const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
