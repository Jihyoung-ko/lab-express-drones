const express = require('express');
const Drone = require('../models/Drone.model');

// require the Drone model here

const router = express.Router();

router.get('/', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  Drone.find()
    .then(drones => {
      // console.log('All drones:', drones);
      res.render('drones/list', { drones });
    })
    .catch(error =>{
      next(error);
    });
});

router.get('/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render('drones/create-form');
});

router.post('/', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  const { name, propellers, maxSpeed } = req.body;
  Drone.create({ name, propellers, maxSpeed })
    .then(drone => {
      // console.log(`New drone created: ${drone.name}`);
      res.redirect('/drones');
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const { id } = req.params;
  Drone.findById(id)
    .then(drone => {
      res.render('drones/update-form', { drone })
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body;

  Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed }, { new : true} )
    .then(drone =>{
      res.redirect('/drones');
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  const { id } = req.params;
  Drone.findByIdAndDelete(id)
    .then(drone =>{
      res.redirect('/drones');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
