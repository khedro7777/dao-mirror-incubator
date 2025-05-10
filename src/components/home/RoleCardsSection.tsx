
import React from "react";
import RoleCard from "@/components/cards/RoleCard";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users, ShoppingBag, FileText, Megaphone } from "lucide-react";

const RoleCardsSection: React.FC = () => {
  const { direction } = useLanguage();
  
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
    {
      title: "Join as Marketer",
      description: "Collaborate on marketing campaigns and share costs with other businesses",
      icon: <Megaphone size={24} />,
      buttonText: "See Marketing Opportunities",
      buttonLink: "/gateway/group-marketing",
    },
  ];

  return (
    <section className="mb-6">
      <h2 className={cn("text-2xl font-semibold text-white mb-4 px-1", direction === "rtl" ? "text-right" : "")}>Get Started</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {roleCards.map((card, index) => (
          <RoleCard
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
            buttonText={card.buttonText}
            buttonLink={card.buttonLink}
            className="glass-card hover-lift"
          />
        ))}
      </div>
    </section>
  );
};

export default RoleCardsSection;
