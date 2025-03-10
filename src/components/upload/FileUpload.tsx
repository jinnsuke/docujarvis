
import React, { useState, useRef } from 'react';
import { Camera, FileUp, X, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useDocuments } from '@/context/DocumentContext';
import { DocumentType } from '@/types/document';

interface FileUploadProps {
  documentName: string;
  documentType: DocumentType;
  onComplete: () => void;
}

const FileUpload = ({ documentName, documentType, onComplete }: FileUploadProps) => {
  const { uploadFile, isLoading, uploadProgress } = useDocuments();
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !documentName) return;
    
    try {
      await uploadFile(file, documentName, documentType);
      onComplete();
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="border border-dashed rounded-lg p-8 bg-white">
        {!file ? (
          <>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex flex-col items-center text-center">
                <FileUp size={64} className="text-jarvis-blue mb-4" />
                <h3 className="text-lg font-medium">Upload a document</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Click to browse or drag and drop your file
                </p>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  onClick={() => fileInputRef.current?.click()} 
                  className="bg-jarvis-blue hover:bg-jarvis-lightBlue"
                >
                  <FileUp className="mr-2 h-4 w-4" />
                  Browse Files
                </Button>
                <Button variant="outline">
                  <Camera className="mr-2 h-4 w-4" />
                  Use Camera
                </Button>
              </div>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*,.pdf"
                className="hidden"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-full bg-slate-50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-lg bg-jarvis-lightBlue flex items-center justify-center text-white">
                    {file.name.split('.').pop()?.toUpperCase() || 'DOC'}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium truncate max-w-[150px] sm:max-w-[200px]">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeFile}
                  disabled={isLoading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {isLoading ? (
                <div className="w-full">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              ) : (
                <div className="flex gap-4 w-full">
                  <Button
                    onClick={handleUpload}
                    className="w-full bg-jarvis-green hover:bg-jarvis-green/90"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={removeFile}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
