import { Card as CardType } from '../types'

const priorityDot: Record<string, string> = {
  high: 'bg-red-400',
  medium: 'bg-amber-400',
  low: 'bg-green-400',
}

const tagColors: Record<string, string> = {
  Feature: 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300',
  Design: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
  Backend: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  Research: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300',
  Planning: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  DevOps: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  Docs: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  Bug: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
}

interface Props {
  card: CardType
  isDone?: boolean
  onDelete: () => void
  onClick: () => void
}

export default function Card({ card, isDone, onDelete, onClick }: Props) {
  const isOverdue = card.dueDate && new Date(card.dueDate) < new Date() && !isDone
  const tagClass = tagColors[card.tag] || 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'

  return (
    <div
      draggable
      onDragStart={e => e.dataTransfer.setData('cardId', card.id)}
      onClick={onClick}
      className={`group relative cursor-grab rounded-xl border bg-white dark:bg-gray-800 p-3 text-sm
                  transition-all active:cursor-grabbing hover:shadow-md hover:border-violet-300 dark:hover:border-violet-500
                  dark:border-gray-700 ${isDone ? 'opacity-60' : ''}`}
    >
      {/* Delete button */}
      <button
        onClick={e => { e.stopPropagation(); onDelete() }}
        className="absolute right-2 top-2 hidden group-hover:flex items-center justify-center
                   h-5 w-5 rounded-full bg-red-100 dark:bg-red-900 text-red-500 text-xs hover:bg-red-200"
      >
        ✕
      </button>

      {/* Tag */}
      <span className={`mb-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${tagClass}`}>
        {card.tag}
      </span>

      {/* Title */}
      <p className={`font-medium text-gray-800 dark:text-gray-100 leading-snug ${isDone ? 'line-through text-gray-400' : ''}`}>
        {card.title}
      </p>

      {/* Subtasks */}
      {card.subtasks && (
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Subtasks</span>
            <span>{card.subtasks.done}/{card.subtasks.total}</span>
          </div>
          <div className="h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-1 rounded-full bg-violet-500 transition-all"
              style={{ width: `${(card.subtasks.done / card.subtasks.total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className={`h-2 w-2 flex-shrink-0 rounded-full ${priorityDot[card.priority]}`} />
          {card.assignee && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-200 dark:bg-violet-800 text-[10px] font-bold text-violet-700 dark:text-violet-200">
              {card.assignee[0]}
            </span>
          )}
        </div>
        {card.dueDate && (
          <span className={`text-xs ${isOverdue ? 'text-red-500 font-semibold' : 'text-gray-400 dark:text-gray-500'}`}>
            {isOverdue ? '⚠ ' : ''}{card.dueDate}
          </span>
        )}
      </div>
    </div>
  )
}
