
import React from "react";
import Layout from "@/components/layout/Layout";
import RoleCard from "@/components/cards/RoleCard";
import GatewayCard from "@/components/cards/GatewayCard";
import ProposalCard from "@/components/cards/ProposalCard";
import KycStatusCard from "@/components/cards/KycStatusCard";
import { Users, ShoppingBag, FileText } from "lucide-react";

const Index = () => {
  // Sample data for role cards
  const roleCards = [
    {
      title: "Join as Supplier",
      description: "Access open B2B deals and collaborate with buyers for group purchases",
      icon: <ShoppingBag size={24} />,
      buttonText: "See Open B2B Deals",
      buttonLink: "/gateway/group-buying",
    },
    {
      title: "Join as Investor",
      description: "Discover verified funding requests and contribute to promising projects",
      icon: <Users size={24} />,
      buttonText: "See Funding Opportunities",
      buttonLink: "/gateway/funding",
    },
    {
      title: "Join as Freelancer",
      description: "Find open jobs and contribute your skills to ongoing projects",
      icon: <FileText size={24} />,
      buttonText: "See Open Jobs",
      buttonLink: "/gateway/freelance",
    },
  ];

  // Sample data for gateway cards
  const gatewayCards = [
    {
      title: "Group Buying",
      description: [
        "Pool resources with other businesses to negotiate better deals with suppliers.",
        "Reduce costs and gain access to premium products through collective purchasing power.",
        "Join transparent, democratic buying groups with clear terms and conditions.",
      ],
      buttonText: "Explore Group Buying",
      buttonLink: "/gateway/group-buying",
    },
    {
      title: "Funding",
      description: [
        "Get your projects funded through a community of interested investors.",
        "Transparent terms and democratic governance for all funding contracts.",
        "Connect with verified investors looking to support promising ventures.",
      ],
      buttonText: "Explore Funding",
      buttonLink: "/gateway/funding",
    },
    {
      title: "Freelance",
      description: [
        "Find freelance opportunities or hire skilled professionals for your projects.",
        "Clear terms, fair payments, and dispute resolution built into every contract.",
        "Build your reputation and grow your network within our trusted community.",
      ],
      buttonText: "Explore Freelance",
      buttonLink: "/gateway/freelance",
    },
  ];

  // Sample data for hot contracts
  const hotContracts = [
    {
      title: "Office Supplies Group Purchase",
      author: "TechCorp",
      authorRole: "Supplier",
      description: "Joint purchase of office supplies for Q3 2023. Looking for 5 more participants to reach volume discount.",
      status: "Active",
      votes: { yes: 12, no: 2, abstain: 1 },
      endDate: "Jun 15, 2023",
      category: "Group Buying",
    },
    {
      title: "Mobile App Development",
      author: "StartupX",
      authorRole: "Investor",
      description: "Seeking funding for final development phase of our innovative mobile application.",
      status: "Active",
      votes: { yes: 8, no: 3, abstain: 0 },
      endDate: "Jun 20, 2023",
      category: "Funding",
    },
    {
      title: "Website Redesign Project",
      author: "DesignPro",
      authorRole: "Freelancer",
      description: "Professional UI/UX designer needed for complete website redesign. 3-week project.",
      status: "Pending",
      votes: { yes: 0, no: 0, abstain: 0 },
      endDate: "Jun 25, 2023",
      category: "Freelance",
    },
  ] as const;

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome to Mirror DAO</h1>
        <p className="text-gray-300">
          A decentralized platform for group buying, funding, and freelance contracts
        </p>
      </div>

      {/* KYC Status Section */}
      <section className="mb-10">
        <KycStatusCard status="Not Started" />
      </section>

      {/* Role Cards Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-6">Get Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roleCards.map((card) => (
            <RoleCard
              key={card.title}
              title={card.title}
              description={card.description}
              icon={card.icon}
              buttonText={card.buttonText}
              buttonLink={card.buttonLink}
            />
          ))}
        </div>
      </section>

      {/* Gateway Cards Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-6">Explore Gateways</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gatewayCards.map((card) => (
            <GatewayCard
              key={card.title}
              title={card.title}
              description={card.description}
              buttonText={card.buttonText}
              buttonLink={card.buttonLink}
            />
          ))}
        </div>
      </section>

      {/* Hot Contracts Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Hot Contracts Now</h2>
          <a href="/explore" className="text-primary hover:text-primary/80 font-medium">
            View All
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotContracts.map((contract) => (
            <ProposalCard
              key={contract.title}
              title={contract.title}
              author={contract.author}
              authorRole={contract.authorRole}
              description={contract.description}
              status={contract.status}
              votes={contract.votes}
              endDate={contract.endDate}
              category={contract.category}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
