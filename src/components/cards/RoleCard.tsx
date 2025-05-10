
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
    <div className={cn("bg-card rounded-lg p-6 border border-sidebar-border", className)}>
      <div className="h-14 w-14 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-5">
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      
      <p className="text-gray-300 mb-6 min-h-[48px]">{description}</p>
      
      <a 
        href={buttonLink}
        className="inline-block w-full px-4 py-3 bg-primary hover:bg-primary/80 rounded-lg text-white font-medium text-center transition-colors shadow-md hover:shadow-lg"
      >
        {buttonText}
      </a>
    </div>
  );
};

export default RoleCard;
