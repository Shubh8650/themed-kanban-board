import { useState, useRef, useEffect } from 'react'

interface Props {
  onAdd: (title: string) => void
  onCancel: () => void
}

export default function AddCardForm({ onAdd, onCancel }: Props) {
  const [value, setValue] = useState('')
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { ref.current?.focus() }, [])

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (value.trim()) onAdd(value.trim()) }
    if (e.key === 'Escape') onCancel()
  }

  return (
    <div className="mt-2">
      <textarea
        ref={ref}
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKey}
        placeholder="Card title... (Enter to save, Esc to cancel)"
        className="w-full resize-none rounded-lg border border-violet-400 bg-white dark:bg-gray-700 dark:border-violet-500
                   p-2 text-sm text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-violet-300"
        rows={2}
      />
      <div className="mt-1 flex gap-2">
        <button
          onClick={() => value.trim() && onAdd(value.trim())}
          className="rounded-md bg-violet-600 px-3 py-1 text-sm font-medium text-white hover:bg-violet-700 active:scale-95 transition-transform"
        >
          Add card
        </button>
        <button
          onClick={onCancel}
          className="rounded-md px-3 py-1 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
