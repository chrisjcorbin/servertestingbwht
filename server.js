const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(CORS());

let howtos = [
  {
    id: 0,
    title: "DIY Life Straw",
    category: "Survival",
    description: "Add charcoal in a big straw to filter.",
  },
  {
    id: 1,
    title: "Heating Driveway",
    category: "Home Exterior",
    description: "Add heating elements to under driveway. ",
  },
  {
    id: 2,
    title: "Alternative Pot & Pan Cleaner",
    category: "Home Interior",
    description: "Use tin foil as a substitute for a normal pot & pan cleaner.",
  },
  {
    id: 3,
    title: "Easy Lawn Care",
    category: "Home Exterior",
    description: "Pay someone to do it.",
  },
  {
    id: 4,
    title: "Paint Walls Fast!",
    category: "Home Interior",
    description: "Throw a bucket of paint toward the unfinished wall.",
  },
  {
    id: 5,
    title: "Quick Ripped Shirt Fix",
    category: "Clothing",
    description: "Use Flex Tape!",
  },
];

let howtoId = howtos.length;

app.get("/api/howtos", (req, res) => {
  res.send(howtos);
});

app.get("/api/howtos/:id", (req, res) => {
  const howto = howtos.filter(howto => `${howto.id}` === req.params.id)[0];
  res.status(200).json(howto);
});

app.post("/api/howtos", (req, res) => {
  if (req.body.title !== undefined) {
    const newhowto = req.body;
    newhowto["id"] = howtoId;
    howtos.push(newhowto);
  }
  ++howtoId;
  res.status(201).json(howtos);
});

app.put("/api/howtos/:id", (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the howto id");
  if (
    req.body.id === undefined ||
    !req.body.title ||
    !req.body.category ||
    !req.body.description
  ) {
    res
      .status(422)
      .send("Make sure your request body has all the fields it needs");
  }
  howtos = howtos.map(howto => {
    if (`${howto.id}` === req.params.id) {
      return req.body;
    }
    return howto;
  });
  res.status(200).send(req.body);
});

app.delete("/api/howtos/:id", (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the howto id");
  howtos = howtos.filter(howto => `${howto.id}` !== req.params.id);
  res.status(202).send(req.params.id);
});

app.get("/", function(req, res) {
  res.send("App is working 👍");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
