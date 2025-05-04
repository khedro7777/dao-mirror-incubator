
import React from "react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "@/hooks/useTranslation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, MapPin, Phone } from "lucide-react";

const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Contact Us</h1>
        <p className="text-gray-300">
          Get in touch with the Mirror DAO team for questions, support, or partnership opportunities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Your Name
                </label>
                <input 
                  type="text" 
                  className="w-full bg-sidebar rounded-lg border border-sidebar-border px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your full name"
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
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Subject
                </label>
                <input 
                  type="text" 
                  className="w-full bg-sidebar rounded-lg border border-sidebar-border px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter subject"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea 
                  className="w-full bg-sidebar rounded-lg border border-sidebar-border px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your message"
                  rows={6}
                />
              </div>
            </div>
            
            <Button className="w-full md:w-auto">Send Message</Button>
          </Card>
        </div>
        
        <div>
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-300">Email</p>
                  <a href="mailto:contact@mirrordao.com" className="text-white hover:underline">
                    contact@mirrordao.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-300">Phone</p>
                  <a href="tel:+11234567890" className="text-white hover:underline">
                    +1 (123) 456-7890
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-300">Address</p>
                  <p className="text-white">
                    123 Blockchain Street<br />
                    Decentraland, Digital World<br />
                    Web3, 12345
                  </p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Business Hours</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Monday - Friday</span>
                <span className="text-white">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Saturday</span>
                <span className="text-white">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Sunday</span>
                <span className="text-white">Closed</span>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-400">
              All times are in UTC
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
