
import React from "react";
import GatewayCard from "@/components/cards/GatewayCard";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const GatewayCardsSection: React.FC = () => {
  const { direction } = useLanguage();
  
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
    {
      title: "Group Marketing",
      description: [
        "Join forces with other businesses for collaborative marketing campaigns.",
        "Share costs and expand your reach through collective marketing efforts.",
        "Transparent budget management and clear performance metrics for all participants.",
      ],
      buttonText: "Explore Group Marketing",
      buttonLink: "/gateway/group-marketing",
    },
  ];

  return (
    <section className="mb-6">
      <h2 className={cn("text-2xl font-semibold text-white mb-4", direction === "rtl" ? "text-right" : "")}>Explore Gateways</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {gatewayCards.map((card, index) => (
          <GatewayCard
            key={index}
            title={card.title}
            description={card.description}
            buttonText={card.buttonText}
            buttonLink={card.buttonLink}
          />
        ))}
      </div>
    </section>
  );
};

export default GatewayCardsSection;
