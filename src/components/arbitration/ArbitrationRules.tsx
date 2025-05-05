
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

/**
 * Component displaying arbitration rules and procedures
 */
const ArbitrationRules: React.FC = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Arbitration Rules and Procedures</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-primary mb-2">1. General Principles</h3>
          <p className="text-gray-300">
            All arbitration proceedings conducted through the Mirror DAO Arbitration Center adhere to principles of fairness, transparency, and efficiency. Cases are reviewed by qualified arbitrators with expertise in the relevant field.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-primary mb-2">2. Filing a Case</h3>
          <p className="text-gray-300 mb-2">
            Any party to a contract executed through Mirror DAO may file for arbitration if they believe the terms of the contract have been violated. To file a case:
          </p>
          <ul className="list-disc pl-5 text-gray-300">
            <li>Navigate to the "File a Case" tab</li>
            <li>Complete the required information</li>
            <li>Submit any relevant supporting documentation</li>
            <li>Pay the filing fee (refundable if your case is successful)</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-primary mb-2">3. Case Review Process</h3>
          <p className="text-gray-300 mb-2">
            Once filed, cases follow this process:
          </p>
          <ol className="list-decimal pl-5 text-gray-300">
            <li>Initial review (1-2 business days)</li>
            <li>Notification to the other party (respondent)</li>
            <li>Response period (5 business days)</li>
            <li>Arbitrator assignment</li>
            <li>Evidence collection and review</li>
            <li>Decision issuance</li>
          </ol>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-primary mb-2">4. Decisions and Enforcement</h3>
          <p className="text-gray-300">
            All arbitration decisions are binding and final. Mirror DAO's smart contract infrastructure automatically enforces arbitration decisions, including refunds, payment releases, or other remedies as determined by the arbitrator.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-primary mb-2">5. Fees</h3>
          <p className="text-gray-300">
            Filing Fee: 2% of disputed amount (minimum $50, maximum $500)<br />
            Winning party's filing fee is refunded from the losing party
          </p>
        </div>
      </div>
      
      <Button className="mt-6">
        <FileText className="h-4 w-4 mr-2" />
        Download Full Rulebook
      </Button>
    </Card>
  );
};

export default ArbitrationRules;
