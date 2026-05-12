# Kanban Board

A production-grade Kanban board built with **React**, **TypeScript**, and **Tailwind CSS** — designed to demonstrate clean component architecture, custom state management, and polished UI/UX.

🔗 **Live Demo:** https://your-app.vercel.app
💻 **GitHub:** https://github.com/Shubh8650/kanban-board

---

## Features

- **Multi-board support** — Create, switch between, and delete multiple boards from a persistent sidebar
- **Drag & drop** — Move cards between columns using the HTML5 Drag API
- **Add & edit cards** — Inline card creation with a full edit modal (title, tag, priority, assignee, due date)
- **Dark / Light mode** — One-click theme toggle, preference saved to localStorage
- **Mobile responsive** — Sidebar works as a slide-in drawer on small screens; fully usable on mobile
- **Add columns** — Extend any board with custom columns on the fly
- **Overdue indicators** — Cards past their due date are highlighted with a warning
- **Subtask progress bars** — Visual progress indicator per card
- **localStorage persistence** — All boards, cards, and settings survive page refresh

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI rendering and component architecture |
| TypeScript | Type safety across all components and hooks |
| Tailwind CSS | Utility-first styling with dark mode support |
| Vite | Fast dev server and build tool |
| HTML5 Drag API | Native drag-and-drop between columns |
| localStorage | Client-side persistence |

---

## Project Structure

```
src/
├── components/
│   ├── Board.tsx          # Board layout, column renderer, add column
│   ├── Column.tsx         # Column with drag-over state and card list
│   ├── Card.tsx           # Card UI with priority, tag, assignee, due date
│   ├── AddCardForm.tsx    # Inline card creation form
│   ├── EditCardModal.tsx  # Full card edit modal
│   └── Sidebar.tsx        # Board list, add/delete board, mobile drawer
├── hooks/
│   └── useBoards.ts       # All state logic — boards, cards, persistence
├── context/
│   └── ThemeContext.tsx   # Dark/light mode context and toggle
├── types/
│   └── index.ts           # TypeScript interfaces (Board, Column, Card)
├── App.tsx                # Root layout, wires sidebar + board + header
└── main.tsx               # Entry point
```

---

## Architecture Decisions

**Custom hook for all state (`useBoards`)** — Every mutation (add, delete, update, move) lives in one hook, not scattered across components. Components only call functions; they never manage board state directly.

**Component-level UI state** — Things like "is this column showing the add form?" live in the component itself with `useState`. Only shared data goes into the hook. This is the key distinction between junior and senior React code.

**Dark mode via Tailwind `darkMode: 'class'`** — A `ThemeContext` adds/removes the `dark` class on `<html>`. Every component uses `dark:` variants, so the entire UI switches in one operation.

**No external drag library** — The HTML5 Drag API is used directly. `dragstart` sets the card ID, `dragover` enables the drop target, and `drop` calls `moveCard()`. Simple, zero-dependency, and easy to explain in an interview.

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/Shubh8650/kanban-board.git
cd kanban-board/kanban

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

---

## Deployment

This project is deployed on **Vercel**. Every push to `main` triggers an automatic redeploy.

To deploy your own copy:
1. Push the repo to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Set **Root Directory** to `kanban`
4. Click Deploy — done

---

## Author

**Shubham** — 4 years of frontend experience specializing in React and component architecture.
