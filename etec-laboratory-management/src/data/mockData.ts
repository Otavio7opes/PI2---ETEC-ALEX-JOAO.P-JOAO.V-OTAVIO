import { Reservation } from '../types/reservation'
import { User } from '../types/user'
import { InventoryItem } from '../types/inventory'

export const mockReservations: Reservation[] = [
  {
    id: '1',
    professor: 'Prof. Ana Silva',
    date: '23/08/2025',
    time: '10:00 - 12:00',
    laboratory: 'Laboratório 3',
    materials: [
      { id: 'm1', name: 'Béquer 50 ml', checked: false },
      { id: 'm2', name: 'Ácido cloridrico', checked: false },
      { id: 'm3', name: 'Pipeta', checked: false },
      { id: 'm4', name: 'Erlenmyer 250ml', checked: false },
    ],
    confirmed: false,
  },
  {
    id: '2',
    professor: 'Prof. Carlos Santos',
    date: '24/08/2025',
    time: '14:00 - 16:00',
    laboratory: 'Laboratório 1',
    materials: [
      { id: 'm5', name: 'Bureta 50ml', checked: false },
      { id: 'm6', name: 'NaOH 0.1M', checked: false },
      { id: 'm7', name: 'Fenolftaleína', checked: false },
    ],
    confirmed: false,
  },
  {
    id: '3',
    professor: 'Prof. Maria Oliveira',
    date: '25/08/2025',
    time: '08:00 - 10:00',
    laboratory: 'Laboratório 2',
    materials: [
      { id: 'm8', name: 'Termômetro', checked: false },
      { id: 'm9', name: 'Balança analítica', checked: false },
      { id: 'm10', name: 'Proveta 100ml', checked: false },
    ],
    confirmed: false,
  },
]

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Prof. Ana Silva',
    email: 'ana.silva@etec.sp.gov.br',
    role: 'teacher',
    active: true,
  },
  {
    id: 'u2',
    name: 'Prof. Carlos Santos',
    email: 'carlos.santos@etec.sp.gov.br',
    role: 'teacher',
    active: true,
  },
  {
    id: 'u3',
    name: 'Técnico João Pereira',
    email: 'joao.pereira@etec.sp.gov.br',
    role: 'lab_technician',
    active: true,
  },
  {
    id: 'u4',
    name: 'Administrador Sistema',
    email: 'admin@etec.sp.gov.br',
    role: 'admin',
    active: true,
  },
]

export const mockInventory: InventoryItem[] = [
  {
    id: 'i1',
    name: 'Béquer 50 ml',
    category: 'glassware',
    quantity: 25,
    unit: 'unidades',
    minQuantity: 10,
    location: 'Armário A1',
  },
  {
    id: 'i2',
    name: 'Ácido clorídrico',
    category: 'reagent',
    quantity: 5,
    unit: 'litros',
    minQuantity: 3,
    location: 'Estoque químico',
  },
  {
    id: 'i3',
    name: 'Pipeta',
    category: 'glassware',
    quantity: 15,
    unit: 'unidades',
    minQuantity: 8,
    location: 'Armário A2',
  },
  {
    id: 'i4',
    name: 'Erlenmeyer 250ml',
    category: 'glassware',
    quantity: 20,
    unit: 'unidades',
    minQuantity: 10,
    location: 'Armário A1',
  },
  {
    id: 'i5',
    name: 'Bureta 50ml',
    category: 'glassware',
    quantity: 8,
    unit: 'unidades',
    minQuantity: 5,
    location: 'Armário A3',
  },
  {
    id: 'i6',
    name: 'NaOH 0.1M',
    category: 'reagent',
    quantity: 2,
    unit: 'litros',
    minQuantity: 3,
    location: 'Estoque químico',
    notes: 'Estoque crítico',
  },
  {
    id: 'i7',
    name: 'Balança analítica',
    category: 'equipment',
    quantity: 3,
    unit: 'unidades',
    minQuantity: 2,
    location: 'Laboratório 1',
  },
]

