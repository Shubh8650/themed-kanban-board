import { useState } from 'react'
import { useBoards } from './hooks/useBoards'
import { useTheme } from './context/ThemeContext'
import BoardComp from './components/Board'
import Sidebar from './components/Sidebar'

export default function App() {
  const {
    boards, activeBoard, activeBoardId,
    setActiveBoardId, addBoard, deleteBoard,
    addCard, deleteCard, updateCard, moveCard, addColumn, resetBoards,
  } = useBoards()

  const { theme, toggle } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!activeBoard) return null

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">

      {/* Sidebar — always visible on lg, drawer on mobile */}
      <div className={`hidden lg:flex`}>
        <Sidebar
          boards={boards}
          activeBoardId={activeBoardId}
          onSelect={setActiveBoardId}
          onAdd={addBoard}
          onDelete={deleteBoard}
          onClose={() => {}}
        />
      </div>

      {sidebarOpen && (
        <Sidebar
          boards={boards}
          activeBoardId={activeBoardId}
          onSelect={setActiveBoardId}
          onAdd={addBoard}
          onDelete={deleteBoard}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top nav */}
        <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="font-semibold text-gray-700 dark:text-gray-200 truncate max-w-[180px] sm:max-w-none">
              {activeBoard.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetBoards}
              className="hidden sm:block rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Reset demo
            </button>
            <button
              onClick={toggle}
              className="rounded-lg border border-gray-200 dark:border-gray-700 p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Toggle dark mode"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        {/* Board */}
        <div className="flex-1 overflow-hidden">
          <BoardComp
            board={activeBoard}
            onAddCard={addCard}
            onDeleteCard={deleteCard}
            onUpdateCard={updateCard}
            onMoveCard={moveCard}
            onAddColumn={addColumn}
          />
        </div>
      </div>
    </div>
  )
}
