export interface Appointment {
  id: number;
  time: Date;
  patientId: number;
  staffId: number;
  status: string;
  place: string;
}

export interface Bill {
  id: number;
  patientId: number;
  createdTime: Date;
  dueDate: Date;
  description: string;
  billingItemList: BillingItem[];
}

export interface BillingItem {
  id: number;
  price: number;
  description: string;
  status: string;
}

export interface PaymentInvoice {
  id: number;
  paymentCreateTime: Date;
  paymentPaidTime: Date;
  empCreatedId: number;
  billingItemList: BillingItem[];
  recipient: string;
  createdTime: Date;
  dueDate: Date;
}
