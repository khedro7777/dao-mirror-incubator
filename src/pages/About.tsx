
import React from "react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "@/hooks/useTranslation";
import { Card } from "@/components/ui/card";

const About = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">About Mirror DAO</h1>
        <p className="text-gray-300">
          Learn about our mission, vision, and the team behind Mirror DAO
        </p>
      </div>

      <div className="space-y-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-300 mb-4">
            Mirror DAO is a decentralized platform designed to facilitate transparent, democratic, and efficient business operations through three main gateways: Group Buying, Funding, and Freelance contracts.
          </p>
          <p className="text-gray-300">
            Our mission is to create a fair business ecosystem where participants can collaborate, fund projects, and work together with clear terms, transparent governance, and mutual benefits.
          </p>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">What We Do</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="border border-sidebar-border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2 text-primary">Group Buying</h3>
              <p className="text-gray-300 text-sm">
                We help businesses pool their resources to negotiate better deals with suppliers, reducing costs and gaining access to premium products through collective purchasing power.
              </p>
            </div>
            
            <div className="border border-sidebar-border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2 text-primary">Funding</h3>
              <p className="text-gray-300 text-sm">
                We connect projects with investors through a transparent funding system with clear terms, democratic governance, and fair distribution of benefits.
              </p>
            </div>
            
            <div className="border border-sidebar-border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2 text-primary">Freelance</h3>
              <p className="text-gray-300 text-sm">
                We provide a platform for freelancers and businesses to collaborate with transparent contracts, fair payment terms, and built-in dispute resolution.
              </p>
            </div>
          </div>
          
          <p className="text-gray-300">
            All contracts on Mirror DAO are governed by transparent voting and consensus, ensuring that every participant has a say in the terms and conditions that affect them.
          </p>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Our Team</h2>
          <p className="text-gray-300 mb-6">
            Mirror DAO is built by a team of experts in blockchain technology, business operations, and contract law. We are committed to creating a fair and transparent business ecosystem for all participants.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="h-24 w-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">JD</span>
              </div>
              <h3 className="text-lg font-medium text-white">John Doe</h3>
              <p className="text-gray-400">Founder & CEO</p>
            </div>
            
            <div className="text-center">
              <div className="h-24 w-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">JS</span>
              </div>
              <h3 className="text-lg font-medium text-white">Jane Smith</h3>
              <p className="text-gray-400">CTO</p>
            </div>
            
            <div className="text-center">
              <div className="h-24 w-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">RJ</span>
              </div>
              <h3 className="text-lg font-medium text-white">Robert Johnson</h3>
              <p className="text-gray-400">Head of Operations</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-300">
            We envision a future where business operations are transparent, democratic, and efficient. A world where participants can collaborate, fund projects, and work together without intermediaries, with clear terms and mutual benefits.
          </p>
        </Card>
      </div>
    </Layout>
  );
};

export default About;
