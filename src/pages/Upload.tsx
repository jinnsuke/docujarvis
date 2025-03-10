
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/components/Layout';
import DocumentTypeSelector from '@/components/upload/DocumentTypeSelector';
import FileUpload from '@/components/upload/FileUpload';
import { DocumentType } from '@/types/document';
import { useDocuments } from '@/context/DocumentContext';

const UploadPage = () => {
  const navigate = useNavigate();
  const { isLoading } = useDocuments();
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState<DocumentType>('caseLists');
  const [uploaded, setUploaded] = useState(false);

  const handleDocumentTypeChange = (value: DocumentType) => {
    setDocumentType(value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentName(e.target.value);
  };

  const handleUploadComplete = () => {
    setUploaded(true);
  };

  const handleNextClick = () => {
    navigate('/documents');
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Document Upload</h1>
          <p className="text-muted-foreground">Upload documents for analysis</p>
        </div>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <DocumentTypeSelector value={documentType} onChange={handleDocumentTypeChange} />
            
            <div className="space-y-2">
              <Label htmlFor="document-name">Document Name</Label>
              <Input
                id="document-name"
                placeholder="Enter document name"
                value={documentName}
                onChange={handleNameChange}
              />
            </div>
          </div>
          
          <FileUpload 
            documentName={documentName}
            documentType={documentType}
            onComplete={handleUploadComplete}
          />
          
          {uploaded && (
            <div className="flex justify-center">
              <Button 
                onClick={handleNextClick}
                className="bg-jarvis-blue hover:bg-jarvis-lightBlue"
              >
                View All Documents
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UploadPage;
