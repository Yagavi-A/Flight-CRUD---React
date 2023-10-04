import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const bookingSuccess = location.state && location.state.bookingSuccess;
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: location.state.id || "", // Set the default name value from the location state
    age: "",
    source: "",
    startDate: "",
    destination: "",
    arrivalDate: ""
  });
  


  useEffect(() => {
    // Fetch existing users from the database
    axios.get("http://localhost:8000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  useEffect(() => {
    // Fetch existing flights from the database
    axios.get("http://localhost:8000/flights")
      .then((response) => {
        setFlights(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  function handleLogout() {
    // Implement your logout functionality here
    navigate("/");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }


  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:8000/flights", formData)
      .then((response) => {
        console.log(response.data); // Success message from the backend
        // Reset the form data if needed
        setFormData({
          name: location.state.id || "",
          age: "",
          source: "",
          startDate: "",
          destination: "",
          arrivalDate: ""
        });
        navigate(".", { state: { bookingSuccess: true } });
      })
      
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchFlights() {
    axios
      .get("http://localhost:8000/flights") // Use the correct endpoint "/flights" instead of "/flight"
      .then((response) => {
        setFlights(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  useEffect(() => {
    fetchFlights(); // Fetch flights when the component mounts
  }, [bookingSuccess]);
  

  return (
    <div className="homepage">
      <nav
        className="navbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          backgroundColor: "#f8f8f8",
          borderBottom: "1px solid #ccc",
        }}
      >
        <div className="navbar-brand">Welcome, {location.state.id}</div>
        <button
          className="logout-button"
          style={{
            padding: "10px",
            borderRadius: "7px",
            backgroundColor: "#4caf50",
            color: "white",
            cursor: "pointer",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      <div className="content" style={{ padding: "20px" }}>
        <h1>Existing Users</h1>
        <ul>
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.email}>
                <span>Name: {user.name}, Email: {user.email}</span>
              </li>
            ))
          ) : (
            <li>No existing users found.</li>
          )}
        </ul>

        <div className="form-container">
        <h1>Book a Flight</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
          />
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            placeholder="Source"
          />
          <input
            type="text"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            placeholder="Start Date"
          />
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Destination"
          />
          <input
            type="text"
            name="arrivalDate"
            value={formData.arrivalDate}
            onChange={handleChange}
            placeholder="Arrival Date"
          />
          <button type="submit">Book Flight</button>
          {bookingSuccess && <p>Flight booking is successful.</p>}
        </form>
        </div>
        <h1>Booked Flights</h1>
        {flights.length > 0 ? (
          flights.map((flight) => (
          <div key={flight._id}>
            <p>Name: {flight.name}</p>
            <p>Age: {flight.age}</p>
            <p>Source: {flight.source}</p>
            <p>Start Date: {flight.startDate}</p>
            <p>Destination: {flight.destination}</p>
            <p>Arrival Date: {flight.arrivalDate}</p>
            <hr />
          </div>
          ))
          ) : (
          <p>No booked flights found.</p>
        )}

      </div>
    </div>
  );
}

export default Home;
