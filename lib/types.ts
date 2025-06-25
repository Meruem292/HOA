export interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  role: "admin" | "homeowner"
  is_approved: boolean
  created_at: string
  updated_at: string
}

export interface Block {
  id: string
  block_number: string
  description?: string
  created_at: string
}

export interface Lot {
  id: string
  block_id: string
  lot_number: string
  area?: number
  owner_id?: string
  owner_type: "lessor" | "lessee"
  created_at: string
  block?: Block
  owner?: User
}

export interface Payment {
  id: string
  homeowner_id: string
  lot_id: string
  amount: number
  payment_type: "monthly" | "quarterly" | "annually"
  payment_date?: string
  due_date: string
  status: "paid" | "pending" | "overdue"
  months_covered: number
  reference_number?: string
  notes?: string
  created_at: string
  homeowner?: User
  lot?: Lot
}

export interface Policy {
  id: string
  title: string
  content: string
  created_by: string
  is_active: boolean
  created_at: string
  updated_at: string
  creator?: User
}

export interface DueComputation {
  id: string
  payment_type: "monthly" | "quarterly" | "annually"
  amount: number
  effective_date: string
  created_by: string
  is_active: boolean
  created_at: string
}

export interface RegistrationApplication {
  id: string
  email: string
  full_name: string
  phone?: string
  requested_lot_id?: string
  owner_type: "lessor" | "lessee"
  status: "pending" | "approved" | "rejected"
  admin_notes?: string
  reviewed_by?: string
  reviewed_at?: string
  created_at: string
  requested_lot?: Lot
  reviewer?: User
}
