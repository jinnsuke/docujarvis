
import React from 'react';
import { Upload, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import DocumentList from '@/components/documents/DocumentList';
import DocumentPreview from '@/components/documents/DocumentPreview';

const DocumentsPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your Documents</h1>
          <p className="text-muted-foreground">View and manage your scanned documents</p>
        </div>
        <Button 
          onClick={() => navigate('/upload')}
          className="bg-jarvis-blue hover:bg-jarvis-lightBlue"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Upload New
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DocumentList />
        </div>
        <div className="lg:col-span-2 h-[calc(100vh-14rem)]">
          <DocumentPreview />
        </div>
      </div>
    </Layout>
  );
};

export default DocumentsPage;
