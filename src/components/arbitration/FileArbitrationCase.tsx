
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText } from "lucide-react";

/**
 * Form component for filing a new arbitration case
 */
const FileArbitrationCase: React.FC = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-white mb-4">File a New Arbitration Case</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Case Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Contract Reference ID
            </label>
            <Input placeholder="Enter contract ID" className="bg-sidebar border-sidebar-border text-white" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Case Title
            </label>
            <Input placeholder="Brief description of the dispute" className="bg-sidebar border-sidebar-border text-white" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Dispute Category
            </label>
            <select className="w-full bg-sidebar rounded-lg border border-sidebar-border text-white px-4 py-2">
              <option value="">Select category</option>
              <option value="payment">Payment Dispute</option>
              <option value="terms">Contract Terms Violation</option>
              <option value="deliverables">Quality of Deliverables</option>
              <option value="ip">Intellectual Property</option>
              <option value="delivery">Delivery Timeline</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Dispute Description
            </label>
            <textarea 
              className="w-full bg-sidebar rounded-lg border border-sidebar-border text-white px-4 py-2 min-h-[120px]"
              placeholder="Describe the nature of the dispute in detail..."
            ></textarea>
          </div>
        </div>
        
        {/* Party & Evidence Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Respondent Name
            </label>
            <Input placeholder="Name of the other party" className="bg-sidebar border-sidebar-border text-white" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Disputed Amount
            </label>
            <div className="flex">
              <select className="bg-sidebar rounded-l-lg border border-r-0 border-sidebar-border text-white px-2 py-2 w-20">
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
              <Input 
                type="number" 
                placeholder="0.00" 
                className="rounded-l-none bg-sidebar border-sidebar-border text-white" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Supporting Evidence
            </label>
            <div className="border-2 border-dashed border-sidebar-border rounded-lg p-6 text-center">
              <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-400 mb-2">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-xs text-gray-500">
                Accepts PDF, DOC, JPG, PNG (max 10MB each)
              </p>
              <input type="file" className="hidden" />
              <Button variant="outline" className="mt-4">Browse Files</Button>
            </div>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="terms" 
              className="h-4 w-4 text-primary bg-sidebar border-sidebar-border rounded focus:ring-primary" 
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
              I agree to the arbitration rules and acknowledge that the decision will be binding
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-4 mt-6">
        <Button variant="outline">Save Draft</Button>
        <Button>Submit Case</Button>
      </div>
    </Card>
  );
};

export default FileArbitrationCase;
