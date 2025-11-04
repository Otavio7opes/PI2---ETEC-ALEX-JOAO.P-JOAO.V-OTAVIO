export interface InventoryItem {
  id: string
  name: string
  category: 'equipment' | 'reagent' | 'glassware' | 'other'
  quantity: number
  unit: string
  minQuantity: number
  location?: string
  notes?: string
}

