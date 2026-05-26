# 📚 Lumina Books — Book Management System

A polished React book management app with full CRUD, search, filtering, and MockAPI integration. Built for the React Assignment.

![Lumina Books Screenshot](./screenshot.png)

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
- Tailwind CSS (with Lumina design system)
- Axios
- MockAPI.io (hosted REST mock)

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/lumina-books.git
cd lumina-books
```

### 2. Set up MockAPI

1. Go to [mockapi.io](https://mockapi.io) and create a free account
2. Create a new project (name it anything)
3. Add a resource called **`books`** with these fields:

| Field      | Type   |
|------------|--------|
| title      | String |
| author     | String |
| genre      | String |
| year       | Number |
| coverUrl   | String |

4. Copy your endpoint URL — it looks like:  
   `https://64abc123.mockapi.io/api/v1`

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and paste your MockAPI URL:

```
REACT_APP_API_URL=https://YOUR-PROJECT-ID.mockapi.io/api/v1
```

### 4. Install & run

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
src/
├── components/
│   ├── TopBar.jsx        # Header with search + Add Book button
│   ├── Sidebar.jsx       # Left navigation
│   ├── BookCard.jsx      # Individual book card
│   ├── SkeletonCard.jsx  # Loading placeholder
│   ├── BookModal.jsx     # Add / Edit form modal
│   ├── DeleteModal.jsx   # Delete confirmation modal
│   └── Toast.jsx         # Notification toasts
├── hooks/
│   ├── useBooks.js       # CRUD logic + state management
│   └── useDebounce.js    # Search debounce
├── pages/
│   └── Dashboard.jsx     # Main page
├── services/
│   └── api.js            # Axios + bookService (API calls)
├── App.jsx
└── index.js
```

## ☁️ Deployment

### Deploy to Vercel (recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import your repo
3. Add environment variable:  
   `REACT_APP_API_URL` = your MockAPI URL
4. Click Deploy ✅

### Deploy to Netlify

1. Run `npm run build`
2. Drag the `build/` folder to [netlify.com/drop](https://app.netlify.com/drop)
3. Add environment variable in Site Settings → Build & Deploy → Environment

## 📋 API Endpoints Used

| Method | Endpoint        | Description     |
|--------|-----------------|-----------------|
| GET    | `/books`        | Fetch all books |
| GET    | `/books?search=`| Search books    |
| GET    | `/books?genre=` | Filter by genre |
| POST   | `/books`        | Create book     |
| PUT    | `/books/:id`    | Update book     |
| DELETE | `/books/:id`    | Delete book     |

## 📝 License

MIT
