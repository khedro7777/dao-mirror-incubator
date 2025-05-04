
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "@/hooks/useTranslation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { FileText, Upload, CheckCircle } from "lucide-react";

const KycVerification = () => {
  const { t } = useTranslation();
  const [kycTab, setKycTab] = useState("individual");
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  
  const totalSteps = 3;

  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      setProgress(((step + 1) / totalSteps) * 100);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setProgress(((step - 1) / totalSteps) * 100);
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">{t('kycStatus')}</h1>
        <p className="text-gray-300">
          Complete your verification process to get full access to all features
        </p>
      </div>

      <div className="mb-8">
        <div className="bg-card rounded-lg p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">
                {step === 1 ? "Personal Information" : step === 2 ? "Document Verification" : "Review & Submit"}
              </span>
              <span className="text-sm text-gray-300">
                {step}/{totalSteps}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Tabs defaultValue="individual" className="w-full" onValueChange={setKycTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="individual">Individual (KYCE)</TabsTrigger>
              <TabsTrigger value="business">Business (KYCB)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="individual" className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Full Name
                        </label>
                        <input 
                          type="text" 
                          className="w-full bg-sidebar rounded-lg border border-sidebar-border px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Date of Birth
                        </label>
                        <input 
                          type="date" 
                          className="w-full bg-sidebar rounded-lg border border-sidebar-border px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          className="w-full bg-sidebar rounded-lg border border-sidebar-border px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Phone Number
                        </label>
                        <input 
                          type="tel" 
                          className="w-full bg-sidebar rounded-lg border border-sidebar-border px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Residential Address
                        </label>
                        <textarea 
                          className="w-full bg-sidebar rounded-lg border border-sidebar-border px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter your address"
                          rows={3}
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-lg font-medium mb-4">Document Verification</h3>
                    
                    <div className="space-y-6">
                      <div className="border border-dashed border-gray-500 rounded-lg p-6 text-center">
                        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                        <div className="text-sm font-medium text-gray-300 mb-1">
                          Upload ID Document (Passport/ID Card)
                        </div>
                        <p className="text-xs text-gray-400 mb-4">
                          Supported formats: JPG, PNG, PDF (max 5MB)
                        </p>
                        <Button className="flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          Upload Document
                        </Button>
                      </div>
                      
                      <div className="border border-dashed border-gray-500 rounded-lg p-6 text-center">
                        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                        <div className="text-sm font-medium text-gray-300 mb-1">
                          Upload Proof of Address
                        </div>
                        <p className="text-xs text-gray-400 mb-4">
                          Utility bill, bank statement (not older than 3 months)
                        </p>
                        <Button className="flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          Upload Document
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <Card className="p-6">
                    <h3 className="text-lg font-medium mb-4">Review & Submit</h3>
                    
                    <div className="bg-sidebar-accent rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 text-white">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span>All required information has been provided</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-1">Personal Information</h4>
                        <div className="bg-sidebar rounded-lg p-4">
                          <p className="text-sm text-white">Full Name: John Doe</p>
                          <p className="text-sm text-white">Date of Birth: 01/01/1990</p>
                          <p className="text-sm text-white">Email: john@example.com</p>
                          <p className="text-sm text-white">Phone: +1 234-567-8900</p>
                          <p className="text-sm text-white">Address: 123 Main St, City, Country</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-1">Uploaded Documents</h4>
                        <div className="bg-sidebar rounded-lg p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-gray-300" />
                              <span className="text-sm text-white">passport.jpg</span>
                            </div>
                            <Button variant="ghost" size="sm">View</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-gray-300" />
                              <span className="text-sm text-white">utility_bill.pdf</span>
                            </div>
                            <Button variant="ghost" size="sm">View</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex items-center mb-4">
                        <input type="checkbox" id="terms" className="mr-2" />
                        <label htmlFor="terms" className="text-sm text-gray-300">
                          I confirm that all information provided is accurate and documents are genuine
                        </label>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
              
              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <Button variant="outline" onClick={handlePrevStep}>
                    Previous
                  </Button>
                )}
                
                <div className="ml-auto">
                  {step < totalSteps ? (
                    <Button onClick={handleNextStep}>
                      Continue
                    </Button>
                  ) : (
                    <Button>
                      Submit Verification
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="business" className="space-y-6">
              {/* Similar structure as individual, but with business-specific fields */}
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Business KYC Coming Soon</h3>
                <p className="text-gray-300">
                  The business verification process will be available shortly. Please check back later.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default KycVerification;
