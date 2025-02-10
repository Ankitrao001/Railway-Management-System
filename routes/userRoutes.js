const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const authController = require('../controllers/authControllers');
const authMiddleware = require('../middleware/authMiddleware');



router.get('/availabilitys', userController.getSeatAvailability);
router.post('/registers', authController.register);
router.post('/logins', authController.login);
router.post('/books',  authMiddleware, userController.bookSeat);
router.get('/getAllbookingss', authMiddleware, userController.getBookingDetails);


module.exports = router;
