export interface Material {
  id: string
  name: string
  checked?: boolean
}

export interface Reservation {
  id: string
  professor: string
  date: string
  time: string
  laboratory: string
  materials: Material[]
  confirmed?: boolean
}

