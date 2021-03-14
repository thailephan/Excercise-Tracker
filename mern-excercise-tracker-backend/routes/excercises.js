const router = require('express').Router();
const Excercise = require('../models/excercise.model');

router.get('/', (req, res) => {
  Excercise.find()
    .then((excercises) => res.json(excercises))
    .catch((err) => res.status(400).json('Error: ', err));
});

router.post('/add', (req, res) => {
  const {duration, username, description, date} = req.body;

  const newExcercise = new Excercise({
    username,
    description,
    duration: Number(duration),
    date: Date.parse(date),
  });

  console.log(newExcercise);
  newExcercise
    .save()
    .then(() => res.json('Excercise added'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  Excercise.findById(id)
    .then((excercise) => res.json(excercise))
    .catch((err) => res.status(400).json('Error: ', err));
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  Excercise.findByIdAndDelete(id)
    .then(() => res.json('Excercise deleted'))
    .catch((err) => res.status(400).json('Error: ', err));
});

router.post('/update/:id', (req, res) => {
  const {id} = req.params;
  Excercise.findById(id)
    .then((excercise) => {
      const {username, description, date, duration} = req.body;
      excercise.username = username;
      excercise.description = description;
      excercise.date = Date.parse(date);
      excercise.duration = Number(duration);

      excercise
        .save()
        .then(() => res.json('Excercise updated'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
