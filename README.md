# 📘 MERN To-Do App – README & Architecture Guide

---

## 🌟 Overview

This is a full-featured, beautifully designed **To-Do App** built using the **MERN stack**:

* **MongoDB** (Compass)
* **Express.js** (Backend API)
* **React** (Frontend via Vite)
* **Node.js** (Runtime)
* **Custom CSS** (UI Styling)
* **Axios** (Frontend → Backend communication)
* **Mongoose** (MongoDB ORM)

Anonymous users can manage tasks locally using a persistent `userId` stored in `localStorage`.

---

## 🚀 Project Setup Instructions

### 🖥️ Backend Setup

1. Go to `backend/` folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

4. Start the server:

```bash
npm run dev
```

5. You should see:

```
Server running on http://localhost:5000
MongoDB Connected ✅
```

### 🧑‍🎨 Frontend Setup

1. Go to `todo-frontend/` folder:

```bash
cd todo-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React dev server:

```bash
npm run dev
```

4. App will be live at:

```
http://localhost:5173
```

---

## 🧱 Folder Structure

### 📂 Project Root:

```
project-root/
├── backend/
├── todo-frontend/
```

### 📁 Backend:

```
backend/
├── controllers/
│   └── taskController.js
├── models/
│   └── Task.js
├── routes/
│   └── taskRoutes.js
├── utils/
│   └── priorityMap.js (optional)
├── server.js
├── .env
```

### 📁 Frontend (Vite):

```
todo-frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── assets/styles.css
│   ├── App.jsx
│   └── main.jsx
├── index.css
```

---

## 🧠 Execution Flow Diagram (High-Level)

```
[ React Frontend ]
       ↓ Axios
[ Express Server (Node.js) ]
       ↓
[ taskController.js (Business Logic) ]
       ↓
[ Mongoose Model (Task.js) ]
       ↓
[ MongoDB Compass ]
       ↓
[ Response → Frontend ]
```

---

## 🔐 ID Management

* **Anonymous `userId`**: Created using `uuidv4()` on first visit, saved in `localStorage`
* **`taskId`**: Auto-generated by MongoDB (`_id`)

---

## 📬 API Endpoints

| Method | Endpoint                              | Description                   |
| ------ | ------------------------------------- | ----------------------------- |
| POST   | `/api/tasks`                          | Create new task               |
| GET    | `/api/tasks/:userId?filter=all`       | Get all active tasks          |
| GET    | `/api/tasks/:userId?filter=completed` | Get completed tasks           |
| GET    | `/api/tasks/:userId?filter=trashed`   | Get trashed tasks             |
| PUT    | `/api/tasks/toggle/:id`               | Toggle done/undone            |
| PUT    | `/api/tasks/trash/:id`                | Soft delete task (trash)      |
| PUT    | `/api/tasks/restore/:id`              | Restore from trash            |
| DELETE | `/api/tasks/:id`                      | Permanently delete from trash |

---

## 🧩 Backend Components Explained

### 🛠️ server.js

Sets up Express server, connects to MongoDB, and uses routes.

### 📄 taskRoutes.js

Maps HTTP methods and endpoints to controller functions.

### ⚙️ taskController.js

Contains business logic for task creation, updating, filtering, sorting, and deletion.

#### ✅ Updated Sorting Logic:

* In `getTasks`, tasks are sorted like this:

  1. Incomplete tasks appear first
  2. Sorted by priority: **High → Medium → Low → Lowest**
  3. Completed tasks are pushed to the end

```js
const priorityOrder = { High: 1, Medium: 2, Low: 3, Lowest: 4 };

exports.getTasks = async (req, res) => {
  try {
    const { userId } = req.params;
    const { filter } = req.query;

    let query = { userId };

    if (filter === "completed") query.completed = true;
    else if (filter === "trashed") query.trashed = true;
    else query.trashed = false;

    let tasks = await Task.find(query);

    tasks.sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
```

---

## 🔄 Task Sorting (Visual)

```
[ Sorted List → Returned to Frontend ]
├── Task A (Incomplete, High)
├── Task B (Incomplete, Medium)
├── Task C (Incomplete, Low)
├── Task D (Completed, High)
├── Task E (Completed, Medium)
```

---

## 🎨 Frontend UX

* Full page layout
* Top Left: 👤 userId (first 8 chars)
* Center: 📝 App Name
* Top Right: ➕ Add Task button

### Task Modal Includes:

* Title (required)
* Priority (dropdown)
* Description (optional)
* Submit button triggers popup confirmation

### Task Card Shows:

* Title, description
* Priority pill
* Action buttons: Done/Undone, Trash, Restore, Delete

---

## 🔄 Flow of a Task Creation

```
[User opens modal and submits task]
      ↓
[POST /api/tasks] ← React uses Axios
      ↓
[Express route handler calls controller]
      ↓
[taskController.createTask() saves to MongoDB]
      ↓
[Returns saved task to frontend]
      ↓
[React updates task list with new item]
```

---

## 🧠 Filtering Logic

```js
GET /api/tasks/:userId?filter=completed
```

---

## 🖼️ Architecture Diagram (Textual)

```
+------------+        +-------------+        +-------------+        +-----------+
| React App  | <----> | Express API | <----> | Mongoose ORM | <----> | MongoDB   |
+------------+        +-------------+        +-------------+        +-----------+
```

---

## 🧭 Flowchart – Full Interaction Example

```
+---------------------+
| User fills Task Form|
+---------------------+
          |
          v
+----------------------+
| Frontend sends POST  |
| via Axios to Express |
+----------------------+
          |
          v
+-----------------------------+
| Express receives the POST   |
| route /api/tasks            |
+-----------------------------+
          |
          v
+-----------------------------+
| taskController.createTask() |
+-----------------------------+
          |
          v
+--------------------------+
| Mongoose saves to MongoDB |
+--------------------------+
          |
          v
+----------------------+
| Send response back   |
+----------------------+
          |
          v
+----------------------+
| React updates UI     |
+----------------------+
```