
import React from 'react';
import { Button } from '@/components/ui/button';
import { Content } from '@/data/mockData';
import { Pencil, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TreeBranchProps {
  branchNumber: number;
  branchContent: Content | null;
  childContents: { [key: string]: Content | null };
  isActive: boolean;
  settings: any;
  onPickContent: (position: string) => void;
  onToggleActive: (position: string) => void;
  fontSize: string;
  animation: string;
}

export const TreeBranch: React.FC<TreeBranchProps> = ({
  branchNumber,
  branchContent,
  childContents,
  isActive,
  settings,
  onPickContent,
  onToggleActive,
  fontSize,
  animation
}) => {
  const primaryKey = `primary-${branchNumber}`;

  return (
    <div className={cn(
      "w-full max-w-md transition-all duration-300",
      !isActive ? "opacity-50 grayscale" : "",
      animation === "fade" ? "animate-fade-in" : "",
      animation === "slide" ? "animate-slide-in-right" : "",
      animation === "scale" ? "animate-scale-in" : ""
    )}>
      <div className={`border rounded-lg overflow-hidden ${!isActive ? 'bg-gray-100' : ''}`}>
        <div className="flex p-4 gap-4 items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0">
            {branchContent && branchContent.translations && branchContent.translations[0] && (
              branchContent.featured_image || (branchContent.translations[0] && branchContent.translations[0].image) ? (
                <img 
                  src={branchContent.featured_image || (branchContent.translations[0] && branchContent.translations[0].image)} 
                  alt={branchContent.translations[0]?.title || ''} 
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                  No img
                </div>
              )
            )}
          </div>
          <div>
            <h4 className={`font-medium ${fontSize === 'large' ? 'text-xl' : fontSize === 'small' ? 'text-sm' : 'text-base'}`}>
              {branchContent?.translations[0]?.title || `Branch ${branchNumber}`}
            </h4>
            {branchContent?.translations[0]?.description && (
              <p className={`text-gray-600 ${fontSize === 'large' ? 'text-base' : fontSize === 'small' ? 'text-xs' : 'text-sm'}`}>
                {branchContent.translations[0].description.substring(0, 60)}...
              </p>
            )}
            {isActive && branchContent && <Button size="sm" variant="outline" className="mt-2">View</Button>}
          </div>
        </div>
        
        {isActive && (
          <div className="p-2 border-t">
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(childContents).map(([childKey, childContent], j) => {
                const isChildActive = settings?.[`${childKey}-active`] !== false;
                
                return (
                  <div key={j} className={`flex items-center p-2 border rounded ${!isChildActive ? 'bg-gray-100 opacity-50 grayscale' : ''}`}>
                    <ChevronRight className="h-3 w-3 mr-1 flex-shrink-0" />
                    <div className="truncate">
                      <p className={`font-medium truncate ${fontSize === 'large' ? 'text-sm' : 'text-xs'}`}>
                        {childContent?.translations[0]?.title || `Child item ${j + 1}`}
                      </p>
                      {isChildActive && fontSize !== 'small' && childContent?.translations[0]?.description && (
                        <p className="text-xs text-gray-500 truncate">
                          {childContent.translations[0].description.substring(0, 25)}...
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
