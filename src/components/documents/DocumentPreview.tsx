
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDocuments } from '@/context/DocumentContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DocumentPreview = () => {
  const { selectedDocument, setSelectedDocument } = useDocuments();

  if (!selectedDocument) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-center">
        <div>
          <h3 className="text-lg font-medium text-muted-foreground">No document selected</h3>
          <p className="text-sm text-muted-foreground mt-1">Select a document to view its contents</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <CardTitle className="text-lg">{selectedDocument.name}</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setSelectedDocument(null)}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4">
        <div className="bg-slate-50 p-4 rounded-md whitespace-pre-wrap font-mono text-sm">
          {selectedDocument.extractedText || 'No extracted text available.'}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentPreview;
