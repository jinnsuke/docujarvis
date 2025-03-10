
export type DocumentType = 'caseLists' | 'chargeForms' | 'monthlyReviews';

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  uploadDate: string;
  url?: string;
  extractedText?: string;
}
