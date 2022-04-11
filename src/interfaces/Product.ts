export interface Product {
  id: number
  name: string
  description: string
  price: number
  type: Type
  kind: Kind
  hidden: boolean
  unavailable: boolean
  expires: null
  appointmentTypeIDs: number[]
  appointmentTypeCounts: string
  minutes: null
  value: null
  isGiftCertificate: boolean
}

export enum Kind {
  Package = 'package',
  Subscription = 'subscription',
}

export enum Type {
  Appointments = 'appointments',
}
