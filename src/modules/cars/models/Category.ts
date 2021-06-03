import { v4 } from 'uuid'

class Category {
  id?: string
  name: string
  description: string
  created_at?: Date

  constructor() {
    if (!this.id) {
      this.id = v4()
    }

    if (!this.created_at) {
      this.created_at = new Date()
    }
  }
}

export { Category }
