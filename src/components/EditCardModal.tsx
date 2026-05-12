import { useState, useEffect } from 'react'
import { Card, Priority } from '../types'

const TAGS = ['Feature', 'Design', 'Backend', 'Research', 'Planning', 'DevOps', 'Docs', 'Bug']
const ASSIGNEES = ['AK', 'SR', 'PM', 'JD', 'LM']
const PRIORITIES: Priority[] = ['low', 'medium', 'high']

interface Props {
  card: Card
  onSave: (updates: Partial<Card>) => void
  onDelete: () => void
  onClose: () => void
}

export default function EditCardModal({ card, onSave, onDelete, onClose }: Props) {
  const [title, setTitle] = useState(card.title)
  const [tag, setTag] = useState(card.tag)
  const [priority, setPriority] = useState<Priority>(card.priority)
  const [assignee, setAssignee] = useState(card.assignee || '')
  const [dueDate, setDueDate] = useState(card.dueDate || '')

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  function handleSave() {
    if (!title.trim()) return
    onSave({ title: title.trim(), tag, priority, assignee: assignee || undefined, dueDate: dueDate || undefined })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 shadow-2xl p-6 space-y-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">Edit Card</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl leading-none">✕</button>
        </div>

        {/* Title */}
        <div>
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Title</label>
          <textarea
            value={title}
            onChange={e => setTitle(e.target.value)}
            rows={2}
            className="mt-1 w-full resize-none rounded-lg border border-gray-200 dark:border-gray-600
                       bg-gray-50 dark:bg-gray-700 p-2 text-sm text-gray-800 dark:text-gray-100
                       outline-none focus:ring-2 focus:ring-violet-300"
          />
        </div>

        {/* Tag */}
        <div>
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Tag</label>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {TAGS.map(t => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors
                  ${tag === t ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
              >{t}</button>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Priority</label>
          <div className="mt-1 flex gap-2">
            {PRIORITIES.map(p => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`flex-1 rounded-lg py-1.5 text-xs font-medium capitalize transition-colors
                  ${priority === p
                    ? p === 'high' ? 'bg-red-500 text-white'
                      : p === 'medium' ? 'bg-amber-500 text-white'
                      : 'bg-green-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >{p}</button>
            ))}
          </div>
        </div>

        {/* Assignee */}
        <div>
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Assignee</label>
          <div className="mt-1 flex gap-2">
            {ASSIGNEES.map(a => (
              <button
                key={a}
                onClick={() => setAssignee(a === assignee ? '' : a)}
                className={`h-8 w-8 rounded-full text-xs font-bold transition-all
                  ${assignee === a ? 'bg-violet-600 text-white scale-110' : 'bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-200 hover:scale-105'}`}
              >{a}</button>
            ))}
          </div>
        </div>

        {/* Due date */}
        <div>
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-600
                       bg-gray-50 dark:bg-gray-700 p-2 text-sm text-gray-800 dark:text-gray-100 outline-none focus:ring-2 focus:ring-violet-300"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleSave}
            className="flex-1 rounded-lg bg-violet-600 py-2 text-sm font-medium text-white hover:bg-violet-700 transition-colors"
          >
            Save changes
          </button>
          <button
            onClick={() => { onDelete(); onClose() }}
            className="rounded-lg border border-red-200 dark:border-red-800 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
