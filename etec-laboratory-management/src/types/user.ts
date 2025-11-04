export type UserRole = 'teacher' | 'lab_technician' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  active: boolean
}

