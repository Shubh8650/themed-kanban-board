import { useState } from 'react'
import { Board } from '../types'

interface Props {
  boards: Board[]
  activeBoardId: string
  onSelect: (id: string) => void
  onAdd: (title: string) => void
  onDelete: (id: string) => void
  onClose: () => void
}

export default function Sidebar({ boards, activeBoardId, onSelect, onAdd, onDelete, onClose }: Props) {
  const [adding, setAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  function handleAdd() {
    if (newTitle.trim()) {
      onAdd(newTitle.trim())
      setNewTitle('')
      setAdding(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-30 bg-black/20 dark:bg-black/40 lg:hidden" onClick={onClose} />

      <aside className="fixed left-0 top-0 z-40 flex h-full w-64 flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-xl lg:relative lg:shadow-none lg:z-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-violet-600 flex items-center justify-center text-white text-xs font-bold">K</div>
            <span className="font-semibold text-gray-800 dark:text-gray-100">KanbanApp</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 lg:hidden">✕</button>
        </div>

        {/* Boards list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Boards
          </p>
          {boards.map(board => (
            <div
              key={board.id}
              className={`group flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer transition-colors
                ${board.id === activeBoardId
                  ? 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
              onClick={() => { onSelect(board.id); onClose() }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-base">📋</span>
                <span className="truncate text-sm font-medium">{board.title}</span>
              </div>
              {boards.length > 1 && (
                <button
                  onClick={e => { e.stopPropagation(); onDelete(board.id) }}
                  className="hidden group-hover:block text-gray-300 hover:text-red-500 text-xs ml-1 flex-shrink-0"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {/* Add board */}
          {adding ? (
            <div className="px-2 pt-1">
              <input
                autoFocus
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleAdd(); if (e.key === 'Escape') setAdding(false) }}
                placeholder="Board name..."
                className="w-full rounded-lg border border-violet-400 bg-white dark:bg-gray-800 dark:border-violet-500
                           px-2 py-1.5 text-sm text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-violet-300"
              />
              <div className="mt-1.5 flex gap-1.5">
                <button
                  onClick={handleAdd}
                  className="flex-1 rounded-md bg-violet-600 py-1 text-xs font-medium text-white hover:bg-violet-700"
                >
                  Create
                </button>
                <button
                  onClick={() => setAdding(false)}
                  className="rounded-md px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setAdding(true)}
              className="mt-1 flex w-full items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-gray-500 dark:text-gray-400
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="text-base leading-none">+</span>
              <span>New board</span>
            </button>
          )}
        </div>
      </aside>
    </>
  )
}
