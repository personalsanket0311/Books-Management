# 📚 Lumina Books — Book Management System

A polished React book management app with full CRUD, search, filtering, and JSON Server integration. Built for the React Assignment.

## ✨ Features

- **View** all books in a beautiful card grid
- **Add** new books via a validated modal form
- **Edit** existing book details
- **Delete** books with a confirmation dialog
- **Search** by title or author (debounced)
- **Filter** by genre (Fiction, Science, History, Biography, Philosophy, Art)
- **Sort** by Recently Added, Title, Author, or Year
- **Loading skeletons** while data fetches
- **Error handling** with user-friendly messages
- **Toast notifications** for all actions
- Responsive layout (mobile + desktop)

## 🛠 Tech Stack

- React 18
- Tailwind CSS
- Axios
- JSON Server (mock REST API)

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/personalsanket0311/Books-Management.git
cd Books-Management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Create a `.env` file in the root of the project:

```
REACT_APP_API_URL=http://localhost:3001
```

### 4. Run the app

```bash
# Start both React app and JSON Server together
npm run dev
```

This starts:
- ⚛️ React app → http://localhost:3000
- 🗄️ JSON Server → http://localhost:3001

### Or run separately

```bash
# Terminal 1 - JSON Server
npm run server

# Terminal 2 - React app
npm start
```

## 🏗 Project Structure

```
Books-Management/
├── db.json                  # JSON Server database (auto-saves changes)
├── src/
│   ├── components/
│   │   ├── TopBar.jsx        # Header with search + Add Book button
│   │   ├── Sidebar.jsx       # Left navigation
│   │   ├── BookCard.jsx      # Individual book card
│   │   ├── SkeletonCard.jsx  # Loading placeholder
│   │   ├── BookModal.jsx     # Add / Edit form modal
│   │   ├── DeleteModal.jsx   # Delete confirmation modal
│   │   └── Toast.jsx         # Notification toasts
│   ├── hooks/
│   │   ├── useBooks.js       # CRUD logic + state management
│   │   └── useDebounce.js    # Search debounce
│   ├── pages/
│   │   └── Dashboard.jsx     # Main page
│   ├── services/
│   │   └── api.js            # Axios + bookService (API calls)
│   ├── App.jsx
│   └── index.js
└── package.json
```

## ☁️ Deployment

### 1. Deploy JSON Server API → Railway (free)

1. Push your repo to GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Set start command:
   ```
   npx json-server --watch db.json --port $PORT --host 0.0.0.0
   ```
4. Copy the deployed URL e.g. `https://books-management-api.up.railway.app`

### 2. Deploy React App → Vercel (free)

1. Go to [vercel.com](https://vercel.com) → New Project → Import your GitHub repo
2. Add environment variable:
   ```
   REACT_APP_API_URL = https://books-management-api.up.railway.app
   ```
3. Click Deploy ✅

## 📋 API Endpoints

| Method | Endpoint        | Description          |
|--------|-----------------|----------------------|
| GET    | `/books`        | Fetch all books      |
| GET    | `/books?q=`     | Full-text search     |
| GET    | `/books?genre=` | Filter by genre      |
| POST   | `/books`        | Create a book        |
| PUT    | `/books/:id`    | Update a book        |
| DELETE | `/books/:id`    | Delete a book        |

## 📝 License

MIT