Bug Tracker App 🐞

A Bug Tracker App built to practice real-world defect reporting and tracking, just like QA teams do in professional environments. This project helped me enhance my Software Quality Assurance skills, learn defect lifecycle management, and gain hands-on experience with React, Node.js, Express, and MongoDB.

Features

✅ Add, edit, and delete bug reports

✅ Track bug statuses: Open, In-Progress, Resolved, Blocked, Closed

✅ Assign bugs to specific team members

✅ Simple and clean UI with responsive design

✅ Role-based secure login and logout functionality

✅ API endpoints tested using Postman

Tech Stack

Frontend: React, CSS

Backend: Node.js, Express

Database: MongoDB Atlas

API Testing: Postman

Version Control: Git & GitHub

Getting Started
1. Clone the Repo
git clone https://github.com/MadukaSewwandi/Bug-Tracker-App.git
cd Bug-Tracker-App/server

2. Install Dependencies
npm install

3. Setup Environment Variables

Create a .env file in the server folder:

MONGO_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING
PORT=5000

4. Run the Server
npm run dev


The backend server will run on: http://localhost:5000

5. Run the Frontend

Go to the client folder (if separated) and run:

npm start


The frontend will run on: http://localhost:3000

API Endpoints (Tested with Postman)
Method	Endpoint	Description
POST	/api/bugs	Create a new bug report
GET	/api/bugs	Get all bug reports
GET	/api/bugs/:id	Get a specific bug by ID
PUT	/api/bugs/:id	Update a bug (status or assignment)
DELETE	/api/bugs/:id	Delete a bug report

A Postman collection is included in /postman-collection for easy API testing.

Demo

Add screenshots or GIFs of the app UI here

Optionally, add a link to a screen recording video

Contributing

Contributions are welcome! Please submit a pull request or open an issue for improvements or bug fixes.

Author

Maduka Sewwandi

GitHub: https://github.com/MadukaSewwandi

LinkedIn: [Your LinkedIn Profile URL]

License

This project is for learning purposes.
