export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  imageUri?: string
  latitude?: number
  longitude?: number
  createdAt: Date
  updatedAt: Date
}