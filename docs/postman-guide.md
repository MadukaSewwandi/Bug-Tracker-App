# 📬 Postman API Testing Guide for Bug Tracker App

This document explains how to run API tests for the **Bug Tracker App** using **Postman (Web Version)**.

---

## 🔹 1. Open Postman Web
1. Go to [https://web.postman.co](https://web.postman.com) in Chrome.
2. Sign in with your Postman account (or create a free one).
3. From the **Workspaces** dashboard, click **Import**.

---

## 🔹 2. Import the Collection
1. In this repository, you’ll find the file:  
   **`docs/postman/BugTracker.postman_collection.json`**  
   (exported collection of API tests).
2. Download this file to your computer.
3. In Postman Web, click **Import → Upload Files**.
4. Select the JSON file.  
   ✅ The collection will appear in the left sidebar.

---

## 🔹 3. Setup Environment
1. Create a new Postman **Environment** with variables:
   - `baseUrl` → `http://localhost:5000/api` (or your server URL if deployed)
   - `authToken` → (leave empty, will be auto-filled after login)
2. Save the environment and select it from the top-right dropdown.

---

## 🔹 4. Run the Requests
The collection includes these requests:
- **Register User** → `POST {{baseUrl}}/auth/register`
- **Login User** → `POST {{baseUrl}}/auth/login`
- **Get All Bugs** → `GET {{baseUrl}}/bugs`
- **Create Bug** → `POST {{baseUrl}}/bugs`
- **Edit Bug** → `PUT {{baseUrl}}/bugs/:id`
- **Delete Bug** → `DELETE {{baseUrl}}/bugs/:id`

---

## 🔹 5. Testing Steps
1. Start your local server:
   ```bash
   npm start
