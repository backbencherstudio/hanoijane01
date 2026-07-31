// ── Get User Transactions ─────────────────────────────────────────────

export type TransactionStatus = "pending" | "succeeded" | "refunded" | string;

export interface Transaction {
  id: string;
  referenceNumber: string;
  status: TransactionStatus;
  provider: string;
  amount: string;
  currency: string;
  paidAmount: string | null;
  paidCurrency: string | null;
  createdAt: string;
  updatedAt: string;
  bookingId?: string;
  standId?: string;
  standTitle?: string;
  standNumber?: string;
  standSlug?: string | null;
}

export interface TransactionMeta {
  total: number;
  page: number;
  limit: number;
}

export interface GetUserTransactionsResponse {
  success: boolean;
  message: string;
  data: Transaction[];
  metaData: TransactionMeta;
}
