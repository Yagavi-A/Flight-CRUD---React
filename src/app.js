const express = require("express")
const { User, Flight } = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/", cors(), (req, res) => {

})

app.post("/", async (req, res) => {
  const { name, email, password } = req.body

  try {
    const check = await User.findOne({ email: email })

    if (check) {
      res.json("exist")
    } else {
      res.json("notexist")
    }

  } catch (e) {
    res.json("fail")
  }

});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json({ error: "Failed to fetch users" });
  }
});


app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body

  try {
    const check = await User.findOne({ email: email })

    if (check) {
      res.json("exist")
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });
      await newUser.save();
      res.json("notexist");
    }

  } catch (e) {
    res.json("fail")
  }

})

app.get("/flights", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch flights" });
  }
});


app.post("/flights", async (req, res) => {
  const flightData = req.body;
  console.log(flightData);

  try {
    const newFlight = new Flight({
      name: flightData.name,
      age: flightData.age,
      source: flightData.source,
      startDate: flightData.startDate,
      destination: flightData.destination,
      arrivalDate: flightData.arrivalDate
    });

    await newFlight.save();
    res.json({message: "Flight booked successfully",flight: newFlight});
  } catch (error) {
    res.status(500).json("Failed to book flight");
  }
});

app.listen(8000, () => {
  console.log("Port connected");
});