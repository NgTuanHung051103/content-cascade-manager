import React from 'react';
import { Button } from '@/components/ui/button';
import { Content } from '@/data/mockData';
import { Pencil } from 'lucide-react';

interface TreeBranchEditorProps {
  branchNumber: number;
  branchContent: Content | null;
  childContents: { [key: string]: Content | null };
  isActive: boolean;
  onToggleActive: (key: string) => void;
  onPickContent: (position: string) => void;
  onPickChildContent: (position: string) => void;
  onPickAllChildContent: (position: string) => void;
}

export const TreeBranchEditor: React.FC<TreeBranchEditorProps> = ({
  branchNumber,
  branchContent,
  childContents,
  isActive,
  onToggleActive,
  onPickContent,
  onPickChildContent,
  onPickAllChildContent
}) => {
  const positionKey = `primary-${branchNumber}`;
  
  return (
    <div className={`border rounded p-2 ${isActive ? 'bg-gray-50' : 'bg-gray-200'}`}>
      <div className="flex justify-between items-center">
        <span className="text-sm flex items-center">
          Branch {branchNumber}
          <Button 
            variant="ghost" 
            size="sm"
            className="h-6 w-6 p-0 ml-1"
            onClick={() => onToggleActive(positionKey)}
          >
            <div className={`h-3 w-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          </Button>
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onPickContent(positionKey)}
        >
          <Pencil className="w-3 h-3 mr-1" />
          Pick
        </Button>
      </div>
      {branchContent && (
        <div className="mt-2 text-xs p-1 bg-violet-50 rounded border border-violet-100">
          Selected: {branchContent.translations[0]?.title || 'Untitled'}
        </div>
      )}
      
      <div className="mt-2 space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs">Sub-items</span>
          <Button 
            variant="outline" 
            size="sm"
            className="h-6 text-xs px-2"
            onClick={() => onPickAllChildContent(`${positionKey}-children`)}
          >
            <Pencil className="w-2 h-2 mr-1" />
            Pick All
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-1">
          {Object.keys(childContents).map((childKey, j) => {
            const isChildActive = !(childContents[childKey] === null);
            
            return (
              <div key={j} className={`border rounded p-1 ${isChildActive ? 'bg-white' : 'bg-gray-200'}`}>
                <div className="flex justify-between items-center">
                  <span className="text-xs flex items-center">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => onToggleActive(childKey)}
                    >
                      <div className={`h-2 w-2 rounded-full ${isChildActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    </Button>
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-5 text-xs px-1"
                    onClick={() => onPickChildContent(childKey)}
                  >
                    Pick
                  </Button>
                </div>
                {childContents[childKey] && (
                  <div className="mt-1 text-xs p-1 bg-violet-50 rounded border border-violet-100 text-[10px] truncate">
                    {childContents[childKey]?.translations[0]?.title || 'Untitled'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
