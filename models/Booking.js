
const db = require('../config/dbconfig');



const Boking = {
  create: async (userId, trainId, seats, connection) => { 
   
    try {
      const query = `
        INSERT INTO bookings (user_id, train_id, seats)
        VALUES (?, ?, ?)
      `;
      const [result] = await connection.query(query, [userId, trainId, seats]); 
     // console.log('Booking created, ID:', result.insertId); // Log the booking ID
      return result.insertId; // Return the new booking's ID
    } catch (err) {
     // console.error('Error creating booking:', err.message); // Log the error message
      throw new Error('Error creating booking: ' + err.message);
    }
  },
};



module.exports = Boking;

