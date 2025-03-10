
import React from 'react';
import { ScanIcon, FileUp, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center max-w-3xl mx-auto py-12 text-center">
        <ScanIcon size={80} className="text-jarvis-blue mb-6" />
        
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Welcome to JarvisAI
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          AI-powered document scanner for BSC Sales Representatives
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl">
          <Button 
            onClick={() => navigate('/upload')}
            size="lg"
            className="h-24 flex flex-col items-center justify-center gap-2 bg-jarvis-blue hover:bg-jarvis-lightBlue"
          >
            <FileUp size={24} />
            <span>Upload Documents</span>
          </Button>
          
          <Button 
            onClick={() => navigate('/documents')}
            size="lg"
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2 border-jarvis-blue text-jarvis-blue hover:bg-jarvis-blue/10"
          >
            <Search size={24} />
            <span>View Documents</span>
          </Button>
        </div>
        
        <div className="mt-12 p-4 bg-slate-50 rounded-lg border max-w-md">
          <h3 className="font-medium mb-2">About this POC</h3>
          <p className="text-sm text-muted-foreground">
            This is a web-based proof of concept for JarvisAI, designed to seamlessly 
            integrate with existing Node.js backend, AWS Textract for OCR, S3 for storage, 
            and Amazon RDS for structured data.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
