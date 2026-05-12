import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { Board, Card } from '../types'

const DEFAULT_BOARDS: Board[] = [
  {
    id: 'board-1',
    title: 'My Project',
    columns: [
      {
        id: 'col-backlog', title: 'Backlog',
        cards: [
          { id: uuid(), title: 'Research competitors', tag: 'Research', priority: 'low', assignee: 'AK', dueDate: '2026-05-20', subtasks: { total: 3, done: 1 } },
          { id: uuid(), title: 'Define MVP scope', tag: 'Planning', priority: 'high', assignee: 'SR', dueDate: '2026-05-15' },
        ],
      },
      {
        id: 'col-inprogress', title: 'In Progress',
        cards: [
          { id: uuid(), title: 'Build auth flow', tag: 'Feature', priority: 'high', assignee: 'PM', dueDate: '2026-05-10', subtasks: { total: 4, done: 3 } },
          { id: uuid(), title: 'Design system tokens', tag: 'Design', priority: 'medium', assignee: 'AK', dueDate: '2026-05-18' },
        ],
      },
      {
        id: 'col-review', title: 'Review',
        cards: [
          { id: uuid(), title: 'API rate limiting', tag: 'Backend', priority: 'medium', assignee: 'SR', dueDate: '2026-05-12' },
        ],
      },
      {
        id: 'col-done', title: 'Done',
        cards: [
          { id: uuid(), title: 'Set up CI/CD pipeline', tag: 'DevOps', priority: 'high', assignee: 'PM', dueDate: '2026-05-05' },
          { id: uuid(), title: 'Write onboarding docs', tag: 'Docs', priority: 'low', assignee: 'AK', dueDate: '2026-05-08' },
        ],
      },
    ],
  },
]

function loadBoards(): Board[] {
  try {
    const raw = localStorage.getItem('kanban-boards-v2')
    return raw ? JSON.parse(raw) : DEFAULT_BOARDS
  } catch { return DEFAULT_BOARDS }
}

export function useBoards() {
  const [boards, setBoards] = useState<Board[]>(loadBoards)
  const [activeBoardId, setActiveBoardId] = useState<string>(() => {
    try { return localStorage.getItem('kanban-active-board') || boards[0]?.id || '' }
    catch { return '' }
  })

  useEffect(() => {
    try { localStorage.setItem('kanban-boards-v2', JSON.stringify(boards)) }
    catch {}
  }, [boards])

  useEffect(() => {
    try { localStorage.setItem('kanban-active-board', activeBoardId) }
    catch {}
  }, [activeBoardId])

  const activeBoard = boards.find(b => b.id === activeBoardId) || boards[0]

  function addBoard(title: string) {
    const newBoard: Board = {
      id: uuid(),
      title,
      columns: [
        { id: uuid(), title: 'Backlog', cards: [] },
        { id: uuid(), title: 'In Progress', cards: [] },
        { id: uuid(), title: 'Review', cards: [] },
        { id: uuid(), title: 'Done', cards: [] },
      ],
    }
    setBoards(prev => [...prev, newBoard])
    setActiveBoardId(newBoard.id)
  }

  function deleteBoard(boardId: string) {
    setBoards(prev => {
      const next = prev.filter(b => b.id !== boardId)
      if (activeBoardId === boardId && next.length > 0) setActiveBoardId(next[0].id)
      return next
    })
  }

  function renameBoard(boardId: string, title: string) {
    setBoards(prev => prev.map(b => b.id === boardId ? { ...b, title } : b))
  }

  function addCard(colId: string, title: string) {
    setBoards(prev => prev.map(board => {
      if (board.id !== activeBoardId) return board
      return {
        ...board,
        columns: board.columns.map(col =>
          col.id === colId
            ? { ...col, cards: [...col.cards, { id: uuid(), title, tag: 'Feature', priority: 'medium' }] }
            : col
        )
      }
    }))
  }

  function deleteCard(colId: string, cardId: string) {
    setBoards(prev => prev.map(board => {
      if (board.id !== activeBoardId) return board
      return {
        ...board,
        columns: board.columns.map(col =>
          col.id === colId ? { ...col, cards: col.cards.filter(c => c.id !== cardId) } : col
        )
      }
    }))
  }

  function updateCard(colId: string, cardId: string, updates: Partial<Card>) {
    setBoards(prev => prev.map(board => {
      if (board.id !== activeBoardId) return board
      return {
        ...board,
        columns: board.columns.map(col =>
          col.id === colId
            ? { ...col, cards: col.cards.map(c => c.id === cardId ? { ...c, ...updates } : c) }
            : col
        )
      }
    }))
  }

  function moveCard(cardId: string, toColId: string) {
    setBoards(prev => prev.map(board => {
      if (board.id !== activeBoardId) return board
      let card: Card | undefined
      const cleaned = board.columns.map(col => {
        const found = col.cards.find(c => c.id === cardId)
        if (found) card = found
        return { ...col, cards: col.cards.filter(c => c.id !== cardId) }
      })
      return {
        ...board,
        columns: cleaned.map(col =>
          col.id === toColId && card ? { ...col, cards: [...col.cards, card] } : col
        )
      }
    }))
  }

  function addColumn(title: string) {
    setBoards(prev => prev.map(board =>
      board.id === activeBoardId
        ? { ...board, columns: [...board.columns, { id: uuid(), title, cards: [] }] }
        : board
    ))
  }

  function resetBoards() {
    setBoards(DEFAULT_BOARDS)
    setActiveBoardId(DEFAULT_BOARDS[0].id)
  }

  return {
    boards,
    activeBoard,
    activeBoardId,
    setActiveBoardId,
    addBoard,
    deleteBoard,
    renameBoard,
    addCard,
    deleteCard,
    updateCard,
    moveCard,
    addColumn,
    resetBoards,
  }
}
