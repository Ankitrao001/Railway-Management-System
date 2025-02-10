# IRCTC Railway Management System

## Problem Statement
Hey there, Mr. X. You have been appointed to design a railway management system like IRCTC, where users can come on the platform and
check if there are any trains available between 2 stations.
The app will also display how many seats are available between any 2 stations and the user can book a seat if the availability > 0 after
logging in. Since this has to be real-time and multiple users can book seats simultaneously, your code must be optimized enough to handle
large traffic and should not fail while doing any bookings.
If more than 1 users simultaneously try to book seats, only either one of the users should be able to book. Handle such race conditions
while booking.

---
This Railway Management System simulates key features of the IRCTC platform. It allows users to check train availability, book seats, and update train details while ensuring role-based access for both users and admins. The backend is built with Node.js, Express.js, and MySQL.

## Features

- User registration and login
- JWT-based authentication for secure access
- Check available trains between source and destination
- Book train seats with race condition handling
- Admin functionalities: add new trains, update seat availability, etc.
- Role-based access (admin/user)
- Error handling and input validation

---

## Project Setup

### Prerequisites

To run this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14 or later)
- [MySQL](https://www.mysql.com/) (Database setup)
- [Postman](https://www.postman.com/) (for API testing)

### Environment Variables

You need to create a `.env` file in the root of your project with the following environment variables:

``` bash
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=irctc_db
JWT_SECRET=your_jwt_secret
API_KEY=your_admin_api_key
```

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/Anshg6130/IRCTC_API_WorkIndia.git
   cd irctc-railway-management
   ```
   
2. Install all necessary dependencies using npm:
   
   ```bash
    npm install 
   ```
4. Set up your MySQL database:
  * Create a MySQL database named irctc_db.
  * Run the SQL scripts in database/schema.sql to create necessary tables (users, trains, bookings).

 Example:
 ``` bash
 CREATE DATABASE irctc_database;
USE irctc_database;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    train_number VARCHAR(50) NOT NULL,
    source VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    total_seats INT NOT NULL,
    available_seats INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    train_id INT,
    seats INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (train_id) REFERENCES trains(id)
);
```

### Starting the Server
Once the setup is complete, start the server using npm:

```bash
npm start

```
#### Note :- By default, the server will run on port 3000. You can access the API at http://localhost:3000.

### API Endpoints

#### User Routes
    1. Register a new user
       * HTTP Method :- POST
       * Endpoint :- http://localhost:3000/user/register
       * Body:
       
``` bash
       {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password"
      }

```

  2. Login
       * HTTP Method :- POST
       * Endpoint :- http://localhost:3000/user/login
       * Body:
       
``` bash
    {
  "email": "john@example.com",
  "password": "password"
    }
 ```


  3. Check train availability
   
       * HTTP Method :- GET
       * Endpoint :- http://localhost:3000/user/availability?source=Ranchi&destination=Delhi
       * Query Parameters
          * source: Source station (e.g., "Ranchi")
          * destination: Destination station (e.g., "Delhi")
       * Response:
``` bash
{
  "available": true,
  "availableTrainCount": 1,
  "trains": [
    {
      "trainNumber": "123123",
      "availableSeats": 600
    }
  ]
}

```

 4. Book Seats
       * HTTP Method :- POST
       * Endpoint :- http://localhost:3000/user/book
       * Request Body:
       
``` bash
  {
  "trainId": 1,
  "seatsToBook": 2
}

```
 * Response:

```bash
{
  "message": "Seats booked successfully"
}
```

Note :- Requires JWT authentication.

5.  Booking Details

       * HTTP Method :- GET
       * Endpoint :- http://localhost:3000/user/getAllbookings

       * Response:
  
    
```bash
[
    {
        "booking_id": 17,
        "number_of_seats": 50,
        "train_number": "123123",
        "source": "Ranchi",
        "destination": "Delhi"
    }
]


```

#### Admin Routes

1.   Add a new train

       * HTTP Method :- POST
       * Endpoint :- http://localhost:3000/admin/addTrain

       * Request Body:
  
    
```bash
{
    "message": "Trains added successfully",
    "trainIds": [
        {
            "trainNumber": "172622",
            "trainId": 21
        }
    ]
  }
```

         * Headers :
             * x-api-key: Your admin API key which is stored in .env


  2. Update seat availability

       * HTTP Method :- PUT
       * Endpoint :- http://localhost:3000/admin/update-seats/10
       * Request Body:
```bash
 {
  "totalSeats": 200,
  "availableSeats": 150
 }
```
       * Response:

       
```bash
{
  "message": "Seats updated successfully"
}
 ```
        * Headers:
            * x-api-key:  Your admin API key which is stored in .env 

### Running Tests

You can test all the available APIs using Postman. The endpoints are well-structured and follow RESTful conventions.

```bash
[
  {
    "trainNumber": "123123",
    "source": "Ranchi",
    "destination": "Delhi",
    "totalSeats": 300
  },
  {
    "trainNumber": "124124",
    "source": "Ranchi",
    "destination": "Delhi",
    "totalSeats": 350
  },
  {
    "trainNumber": "125125",
    "source": "Ranchi",
    "destination": "Delhi",
    "totalSeats": 400
  },
  {
    "trainNumber": "126126",
    "source": "Ranchi",
    "destination": "Delhi",
    "totalSeats": 500
  },
  {
    "trainNumber": "127127",
    "source": "Ranchi",
    "destination": "Delhi",
    "totalSeats": 600
  }
]
```




      

      


      









   
   













