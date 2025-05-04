
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GatewayCardProps {
  title: string;
  description: string[];
  buttonText: string;
  buttonLink: string;
  className?: string;
}

const GatewayCard = ({
  title,
  description,
  buttonText,
  buttonLink,
  className,
}: GatewayCardProps) => {
  const [currentDescIndex, setCurrentDescIndex] = useState(0);

  const nextDescription = () => {
    setCurrentDescIndex((prev) => (prev + 1) % description.length);
  };

  const prevDescription = () => {
    setCurrentDescIndex((prev) => 
      prev === 0 ? description.length - 1 : prev - 1
    );
  };

  return (
    <div className={cn("bg-card rounded-lg overflow-hidden", className)}>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
        
        <div className="min-h-[100px] mb-4 relative">
          {description.length > 1 && (
            <>
              <button 
                onClick={prevDescription}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-1 rounded-full bg-sidebar-accent text-gray-300 hover:text-white"
                aria-label="Previous description"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={nextDescription}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-full bg-sidebar-accent text-gray-300 hover:text-white"
                aria-label="Next description"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}
          
          <p className="text-gray-300 px-6 text-center">
            {description[currentDescIndex]}
          </p>
        </div>
        
        <div className="text-center">
          <a 
            href={buttonLink}
            className="inline-block px-6 py-2 bg-primary hover:bg-primary/80 rounded text-white font-medium transition-colors"
          >
            {buttonText}
          </a>
        </div>
        
        {description.length > 1 && (
          <div className="flex justify-center mt-4 space-x-1">
            {description.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentDescIndex(i)}
                className={cn(
                  "w-2 h-2 rounded-full",
                  i === currentDescIndex ? "bg-primary" : "bg-gray-500"
                )}
                aria-label={`Go to description ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GatewayCard;
