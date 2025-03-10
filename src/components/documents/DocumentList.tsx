
import React, { useState } from 'react';
import { FileText, Search, Calendar, FileSpreadsheet, FileCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDocuments } from '@/context/DocumentContext';
import { Document, DocumentType } from '@/types/document';

const getDocumentTypeIcon = (type: DocumentType) => {
  switch (type) {
    case 'caseLists':
      return <FileSpreadsheet className="h-5 w-5 text-jarvis-blue" />;
    case 'chargeForms':
      return <FileCheck className="h-5 w-5 text-jarvis-green" />;
    case 'monthlyReviews':
      return <Calendar className="h-5 w-5 text-jarvis-lightBlue" />;
    default:
      return <FileText className="h-5 w-5 text-muted-foreground" />;
  }
};

const DocumentList = () => {
  const { documents, setSelectedDocument } = useDocuments();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectDocument = (document: Document) => {
    setSelectedDocument(document);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documents..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="divide-y">
        {filteredDocuments.length === 0 ? (
          <div className="py-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mt-2 text-sm font-medium">No documents found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {searchQuery ? "Try a different search term" : "Upload your first document to get started"}
            </p>
          </div>
        ) : (
          filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="p-4 hover:bg-slate-50 cursor-pointer"
              onClick={() => handleSelectDocument(doc)}
            >
              <div className="flex items-center gap-3">
                {getDocumentTypeIcon(doc.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(doc.uploadDate).toLocaleDateString()} · {doc.type === 'caseLists' ? 'Case Lists' : doc.type === 'chargeForms' ? 'Charge Forms' : 'Monthly Review'}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DocumentList;
