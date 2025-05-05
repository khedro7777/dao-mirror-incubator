import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/utils/api";

const KycVerification = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [kycType, setKycType] = useState<"individual" | "business">("individual");
  const [status, setStatus] = useState<
    "not_started" | "in_progress" | "in_review" | "verified" | "rejected"
  >("not_started");
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [addressProof, setAddressProof] = useState<File | null>(null);
  const [businessRegistration, setBusinessRegistration] = useState<File | null>(null);
  const [otherDocument, setOtherDocument] = useState<File | null>(null);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [kycData, setKycData] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      toast({
        title: "Not authenticated.",
        description: "Please log in to access KYC verification.",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [user, navigate, toast]);

  useEffect(() => {
    const fetchKycData = async () => {
      if (user) {
        try {
          const response = await api.get(`/api/kyc?userId=${user.id}`);
          if (response.data) {
            setKycData(response.data);
            setKycType(response.data.type);
            setStatus(response.data.status);

            // Set personal info
            setFullName(response.data.personalInfo?.fullName || "");
            setDateOfBirth(response.data.personalInfo?.dateOfBirth || "");
            setAddress(response.data.personalInfo?.address || "");
            setPhoneNumber(response.data.personalInfo?.phoneNumber || "");

            // Set business info
            setCompanyName(response.data.businessInfo?.companyName || "");
            setRegistrationNumber(response.data.businessInfo?.registrationNumber || "");
            setBusinessAddress(response.data.businessInfo?.businessAddress || "");
            setBusinessType(response.data.businessInfo?.businessType || "");
          }
        } catch (error) {
          console.error("Error fetching KYC data:", error);
          toast({
            title: "Error",
            description: "Failed to load KYC data.",
            variant: "destructive",
          });
        }
      }
    };

    fetchKycData();
  }, [user, toast]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFile: (file: File | null) => void) => {
    const file = event.target.files && event.target.files[0];
    setFile(file || null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!termsAgreed) {
      toast({
        title: "Agreement required.",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("type", kycType);
    formData.append("status", "in_progress"); // Set status to "in progress" upon submission
    formData.append("termsAgreed", String(termsAgreed));

    // Personal Info
    formData.append("fullName", fullName);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("address", address);
    formData.append("phoneNumber", phoneNumber);

    // Business Info
    formData.append("companyName", companyName);
    formData.append("registrationNumber", registrationNumber);
    formData.append("businessAddress", businessAddress);
    formData.append("businessType", businessType);

    // Documents
    if (idDocument) formData.append("idDocument", idDocument);
    if (addressProof) formData.append("addressProof", addressProof);
    if (businessRegistration) formData.append("businessRegistration", businessRegistration);
    if (otherDocument) formData.append("otherDocument", otherDocument);

    try {
      // Determine if it's an update or create operation
      const url = kycData ? `/api/kyc/${kycData.id}` : "/api/kyc";
      const method = kycData ? 'put' : 'post';

      const response = await api[method](url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast({
          title: "KYC Submission Successful",
          description: "Your KYC information has been submitted for review.",
        });
        // Refresh KYC data
        const updatedKycDataResponse = await api.get(`/api/kyc?userId=${user.id}`);
        if (updatedKycDataResponse.data) {
          setKycData(updatedKycDataResponse.data);
          setStatus(updatedKycDataResponse.data.status);
        }
      } else {
        toast({
          title: "KYC Submission Failed",
          description: "There was an error submitting your KYC information.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("KYC submission error:", error);
      toast({
        title: "KYC Submission Error",
        description: error.message || "Failed to submit KYC data.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto mt-8 p-8 bg-secondary rounded shadow-md text-white">
        <h1 className="text-2xl font-bold text-white mb-4">KYC Verification</h1>
        <p className="mb-6">
          Please complete the KYC verification process to access all features.
        </p>

        {kycData && (
          <div className="mb-6">
            <h3 className="font-medium text-gray-400 mb-1">KYC Status</h3>
            <p className={`font-semibold ${
                status === "verified" ? "text-green-500" :
                status === "rejected" ? "text-red-500" :
                "text-yellow-500"
              }`}>
              {status === "not_started" ? "Not Started" :
               status === "in_progress" ? "In Progress" :
               status === "in_review" ? "In Review" :
               status === "verified" ? "Verified" : "Rejected"}
            </p>
            {status === "rejected" && kycData.rejectionReason && (
              <p className="text-red-400 mt-2">
                Rejection Reason: {kycData.rejectionReason}
              </p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              KYC Type
            </label>
            <Select value={kycType} onValueChange={value => setKycType(value as "individual" | "business")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select KYC Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual (KYCE)</SelectItem>
                <SelectItem value="business">Business (KYCB)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Individual KYC Form */}
          {kycType === "individual" && (
            <Card className="p-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-sidebar border-sidebar-border text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Date of Birth
                  </label>
                  <Input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="bg-sidebar border-sidebar-border text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Address
                  </label>
                  <Textarea
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-sidebar border-sidebar-border text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-sidebar border-sidebar-border text-white"
                    required
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Business KYC Form */}
          {kycType === "business" && (
            <Card className="p-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Business Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Company Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="bg-sidebar border-sidebar-border text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Registration Number
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter registration number"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    className="bg-sidebar border-sidebar-border text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Business Address
                  </label>
                  <Textarea
                    placeholder="Enter business address"
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    className="bg-sidebar border-sidebar-border text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Business Type
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter business type"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="bg-sidebar border-sidebar-border text-white"
                    required
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Document Upload Section */}
          <Card className="p-4">
            <h2 className="text-xl font-semibold text-white mb-4">
              Document Upload
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  ID Document
                </label>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, setIdDocument)}
                  className="bg-sidebar border-sidebar-border text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Proof of Address
                </label>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, setAddressProof)}
                  className="bg-sidebar border-sidebar-border text-white"
                  required
                />
              </div>
              {kycType === "business" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Business Registration
                    </label>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, setBusinessRegistration)}
                      className="bg-sidebar border-sidebar-border text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Other Document (Optional)
                    </label>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(e, setOtherDocument)}
                      className="bg-sidebar border-sidebar-border text-white"
                    />
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={termsAgreed}
              onCheckedChange={(checked) => setTermsAgreed(!!checked)}
              className="bg-sidebar border-sidebar-border text-primary"
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium text-gray-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the terms and conditions
            </label>
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit KYC Information"}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default KycVerification;
