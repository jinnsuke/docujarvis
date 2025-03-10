import React, { createContext, useContext, useState, useEffect } from 'react';
import { Document, DocumentType } from '@/types/document';
import { toast } from 'sonner';

// Sample document data for the POC
const sampleDocuments: Document[] = [
  {
    id: '1',
    name: '01/01/25 Case 1 KTPH Endo Charge Forms',
    type: 'chargeForms',
    uploadDate: '2025-01-01',
    extractedText: 'Sample extracted text for charge forms. Patient ID: 12345, Procedure: Endoscopy, Hospital: KTPH, Date: 01/01/2025'
  },
  {
    id: '2',
    name: 'Jan 2025 Week 2 Cases',
    type: 'caseLists',
    uploadDate: '2025-01-08',
    extractedText: 'Week 2 Cases: \n- Case 1: Patient A, Gastroscopy, Dr. Lee\n- Case 2: Patient B, Colonoscopy, Dr. Tan\n- Case 3: Patient C, ERCP, Dr. Wong'
  },
  {
    id: '3',
    name: 'Jan 2025 Monthly Review',
    type: 'monthlyReviews',
    uploadDate: '2025-01-31',
    extractedText: 'Monthly Review January 2025\nTotal Cases: 45\nRevenue: $67,890\nNew Clients: 5\nHighlights: Successfully introduced new procedure X at Singapore General Hospital'
  }
];

interface DocumentContextType {
  documents: Document[];
  selectedDocument: Document | null;
  setSelectedDocument: (document: Document | null) => void;
  addDocument: (document: Document) => void;
  removeDocument: (id: string) => void;
  isLoading: boolean;
  uploadProgress: number;
  uploadFile: (file: File, name: string, type: DocumentType) => Promise<void>;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>(sampleDocuments);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const addDocument = (document: Document) => {
    setDocuments((prev) => [...prev, document]);
  };

  const removeDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  // Simulated file upload that would interact with backend in production
  const uploadFile = async (file: File, name: string, type: DocumentType) => {
    setIsLoading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    try {
      // Simulate API call to backend
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      // Create a new document
      const newDocument: Document = {
        id: Date.now().toString(),
        name,
        type,
        uploadDate: new Date().toISOString().split('T')[0],
        extractedText: `Example extracted text for ${name} of type ${type}. This would be the result from AWS Textract in the production app.`
      };
      
      addDocument(newDocument);
      toast.success('Document uploaded successfully');
      
      setUploadProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setUploadProgress(0);
      }, 500);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload document');
      setIsLoading(false);
      setUploadProgress(0);
      return Promise.reject(error);
    } finally {
      clearInterval(interval);
    }
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        selectedDocument,
        setSelectedDocument,
        addDocument,
        removeDocument,
        isLoading,
        uploadProgress,
        uploadFile
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
}
