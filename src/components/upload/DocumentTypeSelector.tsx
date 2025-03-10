
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { DocumentType } from '@/types/document';

interface DocumentTypeSelectorProps {
  value: DocumentType;
  onChange: (value: DocumentType) => void;
}

const DocumentTypeSelector = ({ value, onChange }: DocumentTypeSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="document-type">Document Type</Label>
      <Select
        value={value}
        onValueChange={(val) => onChange(val as DocumentType)}
      >
        <SelectTrigger id="document-type" className="w-full">
          <SelectValue placeholder="Select document type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="caseLists">Case Lists</SelectItem>
          <SelectItem value="chargeForms">Charge Forms</SelectItem>
          <SelectItem value="monthlyReviews">Monthly Review Reports</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DocumentTypeSelector;
