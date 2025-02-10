const db = require('../config/dbconfig');
const Train = require('../models/Train');


//Logic for add train by admin only 
exports.addTrain = async (req, res) => {
    let trains = req.body; 
    
    if (!Array.isArray(trains)) {
      trains = [trains];
    }
  
    // Check if the array has at least one train object
    if (trains.length === 0) {
      return res.status(400).json({ message: 'Please provide train data to add.' });
    }
  
    try {
      const trainIds = []; 
  
      for (const train of trains) {
        const { trainNumber, source, destination, totalSeats } = train;
  
        
        if (!trainNumber || !source || !destination || !totalSeats) {
          return res.status(400).json({ message: 'Train number, source, destination, and total seats are required for each train.' });
        }
  
        // Available seats are initialized to total seats when a new train is added
        const availableSeats = totalSeats;
  
        // Insert each train into the database
        const [result] = await db.query(
          'INSERT INTO trains (train_number, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?)',
          [trainNumber, source, destination, totalSeats, availableSeats]
        );
  
    
        trainIds.push({ trainNumber, trainId: result.insertId });
      }
  
    
      res.json({ message: 'Trains added successfully', trainIds });
    } catch (err) {
      res.status(500).json({ message: 'Error adding trains', error: err.message });
    }
  };
  




  //Logic of adding seats of train by admin only
  exports.updateTrainSeat = async (req, res) => {
    const { trainId } = req.params;
    const { totalSeats, availableSeats } = req.body; 
  
    if (totalSeats === undefined || availableSeats === undefined) {
      return res.status(400).json({ message: 'Total seat and available seats are required' });
    }

    if (availableSeats > totalSeats) {
        return res.status(400).json({ message: 'Available seats cannot be greater than total seats' });
      }
  
    try {
      
      const updated = await Train.updateSeats(trainId, totalSeats, availableSeats);
  
      if (updated) {
        res.status(200).json({ message: 'Seats updated successfully' });
      } else {
        res.status(404).json({ message: 'Train not found or seats not updated' });
      }
    } catch (err) {
      console.error('Error updating train seats:', err.message);
      res.status(500).json({ message: 'Error updating train seats', error: err.message });
    }
  };