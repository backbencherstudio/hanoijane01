// ── Get User Transactions ─────────────────────────────────────────────

export type TransactionStatus = "pending" | "succeeded" | "refunded" | string;

export interface Transaction {
  id: string;
  status: TransactionStatus;
  amount: string;
  paidAmount: string | null;
  referenceNumber: string;
  bookingId: string;
  createdAt: string;
  standId: string;
  standTitle: string;
  standNumber: string;
  standSlug: string | null;
}

export interface TransactionMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface GetUserTransactionsResponse {
  success: boolean;
  message: string;
  data: Transaction[];
  metaData: TransactionMeta;
}
