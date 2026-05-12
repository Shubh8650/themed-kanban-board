import { useState } from 'react'
import { Column as ColType, Card as CardType } from '../types'
import CardComp from './Card'
import AddCardForm from './AddCardForm'
import EditCardModal from './EditCardModal'

interface Props {
  column: ColType
  isDoneCol?: boolean
  onAddCard: (colId: string, title: string) => void
  onDrop: (cardId: string, colId: string) => void
  onDeleteCard: (colId: string, cardId: string) => void
  onUpdateCard: (colId: string, cardId: string, updates: Partial<CardType>) => void
}

export default function Column({ column, isDoneCol, onAddCard, onDrop, onDeleteCard, onUpdateCard }: Props) {
  const [adding, setAdding] = useState(false)
  const [isOver, setIsOver] = useState(false)
  const [editingCard, setEditingCard] = useState<CardType | null>(null)

  return (
    <div
      className={`flex w-72 flex-shrink-0 flex-col rounded-2xl p-3 transition-colors
        ${isOver ? 'bg-violet-50 dark:bg-violet-900/20' : 'bg-gray-100 dark:bg-gray-900/50'}`}
      onDragOver={e => { e.preventDefault(); setIsOver(true) }}
      onDragLeave={() => setIsOver(false)}
      onDrop={e => { setIsOver(false); onDrop(e.dataTransfer.getData('cardId'), column.id) }}
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between px-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {column.title}
        </span>
        <span className="rounded-full bg-white dark:bg-gray-700 border dark:border-gray-600 px-2 py-0.5 text-xs text-gray-400 dark:text-gray-300">
          {column.cards.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2 min-h-[2rem]">
        {column.cards.map(card => (
          <CardComp
            key={card.id}
            card={card}
            isDone={isDoneCol}
            onDelete={() => onDeleteCard(column.id, card.id)}
            onClick={() => setEditingCard(card)}
          />
        ))}
      </div>

      {/* Add card */}
      {adding ? (
        <AddCardForm
          onAdd={title => { onAddCard(column.id, title); setAdding(false) }}
          onCancel={() => setAdding(false)}
        />
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="mt-3 flex items-center gap-1 rounded-xl border border-dashed border-gray-300 dark:border-gray-600
                     px-3 py-2 text-sm text-gray-400 dark:text-gray-500
                     hover:border-gray-400 dark:hover:border-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition-all"
        >
          + Add card
        </button>
      )}

      {/* Edit modal */}
      {editingCard && (
        <EditCardModal
          card={editingCard}
          onSave={updates => onUpdateCard(column.id, editingCard.id, updates)}
          onDelete={() => onDeleteCard(column.id, editingCard.id)}
          onClose={() => setEditingCard(null)}
        />
      )}
    </div>
  )
}
