export interface Appointment {
  id: number
  firstName: string
  lastName: string
  phone: string
  email: string
  date: string
  time: string
  endTime: string
  dateCreated: string
  datetimeCreated: string
  datetime: string
  price: string
  priceSold: string
  paid: string
  amountPaid: string
  type: string
  appointmentTypeID: number
  classID: null
  addonIDs: any[]
  category: string
  duration: string
  calendar: string
  calendarID: number
  certificate: null
  confirmationPage: string
  location: string
  notes: string
  timezone: string
  calendarTimezone: string
  canceled: boolean
  canClientCancel: boolean
  canClientReschedule: boolean
  labels: null
  forms: Form[]
  formsText: string
}

export interface Form {
  id: number
  name: string
  values: Value[]
}

export interface Value {
  id: number
  fieldID: number
  value: string
  name: string
}
