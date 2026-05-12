import { useState } from 'react'
import { Board as BoardType, Card } from '../types'
import Column from './Column'

interface Props {
  board: BoardType
  onAddCard: (colId: string, title: string) => void
  onDeleteCard: (colId: string, cardId: string) => void
  onUpdateCard: (colId: string, cardId: string, updates: Partial<Card>) => void
  onMoveCard: (cardId: string, toColId: string) => void
  onAddColumn: (title: string) => void
}

export default function Board({ board, onAddCard, onDeleteCard, onUpdateCard, onMoveCard, onAddColumn }: Props) {
  const [addingCol, setAddingCol] = useState(false)
  const [colTitle, setColTitle] = useState('')

  const totalCards = board.columns.reduce((acc, col) => acc + col.cards.length, 0)
  const doneCol = board.columns[board.columns.length - 1]
  const doneCount = doneCol?.cards.length || 0
  const progress = totalCards > 0 ? Math.round((doneCount / totalCards) * 100) : 0

  return (
    <div className="flex flex-col h-full">
      {/* Board header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{board.title}</h1>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{totalCards} cards · {doneCount} done</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="hidden sm:block w-32 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-2 rounded-full bg-violet-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">{progress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-4 p-4 sm:p-6 min-w-max">
          {board.columns.map((col, index) => (
            <Column
              key={col.id}
              column={col}
              isDoneCol={index === board.columns.length - 1}
              onAddCard={onAddCard}
              onDrop={onMoveCard}
              onDeleteCard={onDeleteCard}
              onUpdateCard={onUpdateCard}
            />
          ))}

          {/* Add column */}
          {addingCol ? (
            <div className="flex w-72 flex-shrink-0 flex-col rounded-2xl bg-gray-100 dark:bg-gray-900/50 p-3 h-fit">
              <input
                autoFocus
                value={colTitle}
                onChange={e => setColTitle(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && colTitle.trim()) { onAddColumn(colTitle.trim()); setColTitle(''); setAddingCol(false) }
                  if (e.key === 'Escape') setAddingCol(false)
                }}
                placeholder="Column name..."
                className="rounded-lg border border-violet-400 bg-white dark:bg-gray-700 px-3 py-2 text-sm
                           text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-violet-300"
              />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => { if (colTitle.trim()) { onAddColumn(colTitle.trim()); setColTitle(''); setAddingCol(false) } }}
                  className="flex-1 rounded-lg bg-violet-600 py-1.5 text-sm font-medium text-white hover:bg-violet-700"
                >
                  Add
                </button>
                <button
                  onClick={() => setAddingCol(false)}
                  className="rounded-lg px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setAddingCol(true)}
              className="flex h-fit w-72 flex-shrink-0 items-center gap-2 rounded-2xl border-2 border-dashed
                         border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-gray-400 dark:text-gray-500
                         hover:border-violet-400 hover:text-violet-500 transition-all"
            >
              + Add column
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
