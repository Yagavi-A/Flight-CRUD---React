import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedUp, setSignedUp] = useState(false); // Track sign-up status

  async function submit(e) {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/", {
          name,
          email,
          password,
        })
        .then((res) => {
          if (res.data === "exist") {
            history("/home", { state: { id: name } });
          } else if (res.data === "notexist") {
            alert("User has not signed up");
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

  return (
    <div className="login">
      <h1>Login</h1>
      <form action="POST">
        {signedUp ? (
          <input type="name" placeholder="Name" disabled />
        ) : (
          <input
            type="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Name"
          />
        )}
        {signedUp ? null : (
          <>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            />
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
          </>
        )}
        <input type="submit" onClick={submit} />
      </form>
      <p>OR</p>
      <p>
      <span className="new-user">New User?</span>{" "}
      <Link to="/signup">Signup Page</Link>
      </p>
    </div>
  );
}

export default Login;

const styles = `
.login {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  margin-top: 100px;
}


.login h1 {
  text-align: center;
}

.login form {
  display: flex;
  flex-direction: column;
}

.login input[type= "name"],
.login input[type="email"],
.login input[type="password"],
.login input[type="submit"] {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.login input[type="submit"] {
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}

.login p {
  text-align: center;
}


.login .new-user {
  display: inline;
}



`;

// Add the CSS styles to the document
const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
