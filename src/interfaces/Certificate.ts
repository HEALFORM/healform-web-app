export interface Certificate {
  id: number
  certificate: string
  productID: number
  orderID: null
  appointmentTypeIDs: number[]
  appointmentTypes: { [key: string]: string }
  name: string
  email: string
  type: string
  remainingCounts: { [key: string]: number }
  remainingMinutes: null
  remainingValue: null
  remainingValueLocal: null
  expiration: null | string
}
