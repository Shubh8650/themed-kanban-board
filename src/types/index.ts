export type Priority = 'low' | 'medium' | 'high'

export interface Card {
  id: string
  title: string
  tag: string
  priority: Priority
  dueDate?: string
  assignee?: string
  subtasks?: { total: number; done: number }
}

export interface Column {
  id: string
  title: string
  cards: Card[]
}

export interface Board {
  id: string
  title: string
  columns: Column[]
}
