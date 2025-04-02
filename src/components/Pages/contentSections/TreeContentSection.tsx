
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Plus } from 'lucide-react';
import { Content } from '@/data/mockData';
import { PageComponent } from '@/types/page';
import { TreeBranchEditor } from '../TreeBranchEditor';

interface TreeContentSectionProps {
  component: PageComponent;
  onPickContent: (position: string) => void;
  onPickMultiple: (position: string) => void;
  onAddBranch: () => void;
}

export const TreeContentSection: React.FC<TreeContentSectionProps> = ({
  component,
  onPickContent,
  onPickMultiple,
  onAddBranch
}) => {
  const primaryBranchKeys = Object.keys(component.contents || {})
    .filter(key => key.startsWith('primary-') && !key.includes('child'))
    .sort((a, b) => {
      const numA = parseInt(a.split('-')[1]);
      const numB = parseInt(b.split('-')[1]);
      return numA - numB;
    });
    
  const branchCount = primaryBranchKeys.length > 0 
    ? primaryBranchKeys.length
    : 4;
    
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">Main Content</div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onPickContent('main')}
          >
            <Pencil className="w-3 h-3 mr-1" />
            Pick Content
          </Button>
        </div>
        <div className="border rounded p-2 bg-gray-50">
          {component.contents?.main ? (
            <div className="text-xs p-1 bg-violet-50 rounded border border-violet-100">
              Selected: {component.contents.main.translations[0]?.title || 'Untitled'}
            </div>
          ) : (
            <div className="text-xs text-gray-500 p-1">No content selected</div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium">Primary Branches ({branchCount} items)</div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onPickMultiple('primary')}
            >
              <Pencil className="w-3 h-3 mr-1" />
              Pick Multiple
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onAddBranch}
            >
              <Plus className="w-3 h-3 mr-1" />
              Add Branch
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {primaryBranchKeys.length > 0 ? (
            primaryBranchKeys.map(key => {
              const branchNumber = parseInt(key.split('-')[1]);
              const branchContent = component.contents?.[key];
              const isActive = component.settings?.[`${key}-active`] !== false;
              
              const childContents: { [key: string]: Content | null } = {};
              for (let j = 1; j <= 4; j++) {
                const childKey = `${key}-child-${j}`;
                childContents[childKey] = component.contents?.[childKey] || null;
              }
              
              return (
                <TreeBranchEditor
                  key={key}
                  branchNumber={branchNumber}
                  branchContent={branchContent || null}
                  childContents={childContents}
                  isActive={isActive}
                  onToggleActive={(toggleKey) => {
                    // This is handled in the parent component
                  }}
                  onPickContent={(position) => onPickContent(position)}
                  onPickChildContent={(position) => onPickContent(position)}
                  onPickAllChildContent={(position) => onPickMultiple(`${key}-children`)}
                />
              );
            })
          ) : (
            Array.from({ length: 4 }).map((_, i) => {
              const positionKey = `primary-${i + 1}`;
              return (
                <div key={i} className="border rounded p-2 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Branch {i + 1}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onPickContent(positionKey)}
                    >
                      <Pencil className="w-3 h-3 mr-1" />
                      Pick
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500 p-1">No content selected</div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
