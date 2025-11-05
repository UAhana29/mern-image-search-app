# MERN Image Search & OAuth Project

This project is a full-stack MERN application built for an internship task. It allows authenticated users to search for images using the Unsplash API, view their search history, and see top searches across all users.

## 🚀 Features
* **Authentication (Req #1):** Secure OAuth login using Google via Passport.js.
* **Top Searches (Req #2):** A dynamic banner showing the top 5 most frequent search terms across all users.
* **Search & Grid (Req #3):** A 4-column image grid of results from the Unsplash API, with a checkbox overlay on each image.
* **Multi-Select Counter (Req #4):** A client-side counter that tracks "Selected: X images" in real-time.
* **Search History (Req #5):** A real-time sidebar showing the logged-in user's personal search history with timestamps.

---

## 📸 Final App Screenshots

![Main search interface](https://raw.githubusercontent.com/UAhana29/mern-image-search-app/main/screenshots/Screenshot%202025-11-05%20113614.png)

![Login Page Screenshot](https://raw.githubusercontent.com/UAhana29/mern-image-search-app/main/screenshots/Screenshot%202025-11-05%20114759.png)


---

## 🛠️ Tech Stack
* **M**ongoDB (M0 Atlas Cluster)
* **E**xpress.js
* **R**eact.js (Create React App)
* **N**ode.js
* **Passport.js** (for OAuth)
* **Mongoose** (for MongoDB object modeling)
* **Axios** (for API requests)
* **Unsplash API** (for image data)

---

## 📁 Folder Structure
/image-search-project /client (React Frontend) /src /components /pages App.js /server (Node.js/Express Backend) /middlewares /models /routes /services .env (Must be created manually) index.js .gitignore (Hides node_modules and .env) README.md (This file)


---

## ⚙️ Setup and Installation

1.  **Clone Repository:**
    ```bash
    git clone [https://github.com/your-username/mern-image-search-app.git](https://github.com/your-username/mern-image-search-app.git)
    cd mern-image-search-app
    ```
    *(Replace with your actual GitHub repo URL)*

2.  **Server Setup:**
    ```bash
    cd server
    npm install
    ```

3.  **Client Setup:**
    ```bash
    cd ../client
    npm install
    ```

4.  **Create `.env` File:**
    In the `/server` directory, create a `.env` file and add your secret keys:

    ```ini
    MONGO_URI=your_mongodb_connection_string
    UNSPLASH_ACCESS_KEY=your_unsplash_access_key
    COOKIE_KEY=your_random_cookie_session_key

    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```
    *Note: You must also add `http://localhost:5000/auth/google/callback` to your Google Cloud credentials and `http://localhost:3000/search` as the redirect in `authRoutes.js`.*

5.  **Run the Application:**
    From the `/server` directory:
    ```bash
    npm run dev
    ```
    This will start the backend on `http://localhost:5000` and the frontend on `http://localhost:3000`.

---

## 📋 API Endpoints (Postman Collection)

* `GET /auth/google` - Initiates Google OAuth login.
* `GET /api/logout` - Logs the user out and redirects to home.
* `GET /api/current_user` - Returns the currently logged-in user (or null).
* `GET /api/top-searches` - (Public) Returns the top 5 most frequent search terms.
* `GET /api/history` - (Protected) Returns the logged-in user's search history.
* `POST /api/search` - (Protected) Requires `{ "term": "your_search" }`. Saves the term an