
import React from "react";
import { cn } from "@/lib/utils";

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  buttonLink: string;
  className?: string;
}

const RoleCard = ({
  title,
  description,
  icon,
  buttonText,
  buttonLink,
  className,
}: RoleCardProps) => {
  return (
    <div className={cn("card-modern group", className)}>
      <div className="h-16 w-16 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/30 transition-colors">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient-primary transition-colors">{title}</h3>
      
      <p className="text-gray-300 mb-6 min-h-[60px] leading-relaxed">{description}</p>
      
      <a 
        href={buttonLink}
        className="inline-block w-full px-4 py-3 bg-primary hover:bg-primary/80 active:bg-primary/70 rounded-lg text-white font-medium text-center transition-colors shadow-md hover:shadow-xl"
      >
        {buttonText}
      </a>
    </div>
  );
};

export default RoleCard;
