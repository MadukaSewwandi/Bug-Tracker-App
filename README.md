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

## 🧪 Testing

This project includes both manual and automated testing resources.

### 1. Test Documents
- [Test Plan](docs/test-plan.md)
- [Test Cases](docs/test-cases.md)
- [Test Report](docs/test-report.md)

### 2. Postman API Testing
- Import the collection: [`bug-tracker-collection.json`](postman/bug-tracker-collection.json)
- Import environment (optional): [`bug-tracker-environment.json`](postman/bug-tracker-environment.json)
- Step-by-step guide: [Postman Collection Guide](docs/postman-guide.md)



Author

Maduka Sewwandi

GitHub: https://github.com/MadukaSewwandi


License

This project is for learning purposes.
