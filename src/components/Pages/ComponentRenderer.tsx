
import React from 'react';
import { Content } from '@/data/mockData';
import { PageComponent } from '@/types/page';
import { Button } from '@/components/ui/button';
import { Pencil, Plus } from 'lucide-react';
import { TreeBranchEditor } from './TreeBranchEditor';
import { BasicContentPicker } from './contentSections/BasicContentPicker';
import { FeaturedContentSection } from './contentSections/FeaturedContentSection';
import { GridContentSection } from './contentSections/GridContentSection';
import { HierarchyContentSection } from './contentSections/HierarchyContentSection';
import { TreeContentSection } from './contentSections/TreeContentSection';
import { HeroSection } from './contentSections/HeroSection';
import { StatsSection } from './contentSections/StatsSection';
import { ServicesSection } from './contentSections/ServicesSection';
import { CaseStudiesSection } from './contentSections/CaseStudiesSection';
import { NewsSection } from './contentSections/NewsSection';
import { navigateToContent } from '@/services/navigationService';

interface ComponentFunctions {
  addFeaturedItem: (component: PageComponent) => void;
  addGridRow: (component: PageComponent) => void;
  addTreeBranch: (component: PageComponent) => void;
  openContentPicker: (component: PageComponent, position: string, multiSelect?: boolean) => void;
  navigateToContent: (content: Content | null, options?: any) => void;
}

interface ComponentRendererProps {
  component: PageComponent;
  componentFunctions: ComponentFunctions;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  componentFunctions
}) => {
  switch(component.type) {
    case 'hero':
      const heroContent = component.contents?.['main'];
      return (
        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-sm text-gray-500">Hero Content</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => componentFunctions.openContentPicker(component, 'main')}
            >
              <Pencil className="w-3 h-3 mr-1" />
              {heroContent ? 'Change Content' : 'Select Content'}
            </Button>
          </div>
          
          {heroContent ? (
            <HeroSection
              title={heroContent.translations[0]?.title || 'Hero Title'}
              description={heroContent.translations[0]?.description || 'Hero description text goes here'}
              content={heroContent}
              onNavigate={(content) => {
                const navType = component.settings?.navigationType;
                const navUrl = component.settings?.navigationUrl;
                const navContentId = component.settings?.navigationContentId;
                
                componentFunctions.navigateToContent(content, {
                  type: navType || 'content_detail',
                  url: navUrl,
                  contentId: navContentId
                });
              }}
            />
          ) : (
            <div className="bg-gray-100 p-8 border rounded text-center text-gray-500">
              No hero content selected
            </div>
          )}
        </div>
      );
      
    case 'stats':
      return (
        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-sm text-gray-500">Stats Section</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => componentFunctions.openContentPicker(component, 'stats', true)}
            >
              <Pencil className="w-3 h-3 mr-1" />
              Configure Stats
            </Button>
          </div>
          
          <StatsSection
            stats={[
              {
                value: '20+',
                label: 'Projects completed',
                content: component.contents?.['stat-1'] || null
              },
              {
                value: '20',
                label: 'Team members',
                content: component.contents?.['stat-2'] || null
              },
              {
                value: '16+',
                label: 'Hours trained per month',
                content: component.contents?.['stat-3'] || null
              },
              {
                value: '90%',
                label: 'Customer retention rate',
                content: component.contents?.['stat-4'] || null
              }
            ]}
            onNavigate={(content) => {
              if (content) {
                const contentKey = Object.entries(component.contents || {}).find(
                  ([_, c]) => c?.id === content.id
                )?.[0];
                
                if (contentKey) {
                  const navType = component.settings?.[`${contentKey}-navigationType`];
                  const navUrl = component.settings?.[`${contentKey}-navigationUrl`];
                  
                  componentFunctions.navigateToContent(content, {
                    type: navType || 'content_detail',
                    url: navUrl
                  });
                } else {
                  componentFunctions.navigateToContent(content);
                }
              }
            }}
          />
        </div>
      );
    
    case 'services':
      return (
        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-sm text-gray-500">Services Section</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => componentFunctions.openContentPicker(component, 'services', true)}
            >
              <Pencil className="w-3 h-3 mr-1" />
              Select Services
            </Button>
          </div>
          
          <ServicesSection
            title={component.settings?.title || "Services"}
            services={[
              {
                title: "Offshore Development",
                description: component.contents?.['service-1']?.translations[0]?.description || 
                  "We offer offshore development that maximizes the benefits of overseas development.",
                image: component.contents?.['service-1']?.featured_image || 
                  "https://images.unsplash.com/photo-1661956602868-6ae368943878",
                content: component.contents?.['service-1'] || null
              },
              {
                title: "System Development",
                description: component.contents?.['service-2']?.translations[0]?.description || 
                  "Our company develops systems ranging from web pages to ecosystems and business applications.",
                image: component.contents?.['service-2']?.featured_image || 
                  "https://images.unsplash.com/photo-1581092921461-eab62e97a780",
                content: component.contents?.['service-2'] || null
              },
              {
                title: "App Development",
                description: component.contents?.['service-3']?.translations[0]?.description || 
                  "At DST Solution, we have been involved in the development and operation of numerous iPhone and Android applications.",
                image: component.contents?.['service-3']?.featured_image || 
                  "https://images.unsplash.com/photo-1581092160607-ee22731cf05c",
                content: component.contents?.['service-3'] || null
              },
              {
                title: "Game Development",
                description: component.contents?.['service-4']?.translations[0]?.description || 
                  "Game development is one of our company's strengths. Our team has been involved in the development of games with budgets in the millions.",
                image: component.contents?.['service-4']?.featured_image || 
                  "https://images.unsplash.com/photo-1585504197606-5f2f7a599454",
                content: component.contents?.['service-4'] || null
              }
            ]}
            onNavigate={(content) => {
              componentFunctions.navigateToContent(content);
            }}
          />
        </div>
      );
      
    case 'case-studies':
      return (
        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-sm text-gray-500">Case Studies Section</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => componentFunctions.openContentPicker(component, 'case-studies', true)}
            >
              <Pencil className="w-3 h-3 mr-1" />
              Select Case Studies
            </Button>
          </div>
          
          <CaseStudiesSection
            title={component.settings?.title || "Case Studies"}
            description="At DST Solution, we undertake a wide range of system development projects, leveraging some of the best technical expertise in Vietnam to provide high-quality services that meet our clients' needs."
            categories={["WEB SYSTEM", "APPLICATION", "GAME"]}
            caseStudies={[
              {
                title: "Word Game",
                image: component.contents?.['case-1']?.featured_image || 
                  "https://images.unsplash.com/photo-1511512578047-dfb367046420",
                category: "GAME",
                content: component.contents?.['case-1'] || null
              },
              {
                title: "Analytics Dashboard",
                image: component.contents?.['case-2']?.featured_image || 
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
                category: "WEB SYSTEM",
                content: component.contents?.['case-2'] || null
              },
              {
                title: "Hotel Booking App",
                image: component.contents?.['case-3']?.featured_image || 
                  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
                category: "APPLICATION",
                content: component.contents?.['case-3'] || null
              }
            ]}
            onNavigate={(content) => {
              componentFunctions.navigateToContent(content);
            }}
          />
        </div>
      );
      
    case 'news':
      return (
        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-sm text-gray-500">News Section</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => componentFunctions.openContentPicker(component, 'news', true)}
            >
              <Pencil className="w-3 h-3 mr-1" />
              Select News
            </Button>
          </div>
          
          <NewsSection
            title={component.settings?.title || "Latest News"}
            news={[
              {
                title: "DST COMPANY Initiatives To Drive AI Development In 2025",
                date: "April 15, 2025",
                category: "Technology",
                image: component.contents?.['news-1']?.featured_image || 
                  "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
                content: component.contents?.['news-1'] || null
              },
              {
                title: "Offshore Development Partnerships",
                date: "April 10, 2025",
                category: "Business",
                image: component.contents?.['news-2']?.featured_image || 
                  "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
                content: component.contents?.['news-2'] || null
              },
              {
                title: "New Mobile Framework Released",
                date: "April 5, 2025",
                category: "Development",
                image: component.contents?.['news-3']?.featured_image || 
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
                content: component.contents?.['news-3'] || null
              },
              {
                title: "DST Opens New Office in Singapore",
                date: "April 1, 2025",
                category: "Company",
                image: component.contents?.['news-4']?.featured_image || 
                  "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2",
                content: component.contents?.['news-4'] || null
              }
            ]}
            onNavigate={(content) => {
              componentFunctions.navigateToContent(content);
            }}
          />
        </div>
      );

    case 'text':
      return <BasicContentPicker 
        component={component} 
        onPickContent={(position) => componentFunctions.openContentPicker(component, position)} 
      />;
      
    case 'featured':
      return <FeaturedContentSection 
        component={component}
        onPickContent={(position) => componentFunctions.openContentPicker(component, position)}
        onPickMultiple={() => componentFunctions.openContentPicker(component, 'featured', true)}
        onAddItem={() => componentFunctions.addFeaturedItem(component)}
      />;
      
    case 'grid':
      return <GridContentSection 
        component={component}
        onPickContent={(position) => componentFunctions.openContentPicker(component, position)}
        onPickMultiple={() => componentFunctions.openContentPicker(component, 'grid', true)}
        onAddRow={() => componentFunctions.addGridRow(component)}
      />;

    case 'hierarchy':
      return <HierarchyContentSection 
        component={component}
        onPickContent={(position) => componentFunctions.openContentPicker(component, position)}
        onPickMultiple={(position) => componentFunctions.openContentPicker(component, position, true)}
      />;
      
    case 'tree':
      return <TreeContentSection 
        component={component}
        onPickContent={(position) => componentFunctions.openContentPicker(component, position)}
        onPickMultiple={(position) => componentFunctions.openContentPicker(component, position, true)}
        onAddBranch={() => componentFunctions.addTreeBranch(component)}
      />;
      
    default:
      return (
        <div className="p-2 bg-gray-50 rounded text-sm text-gray-500">
          No content configuration needed for this component type
        </div>
      );
  }
};
