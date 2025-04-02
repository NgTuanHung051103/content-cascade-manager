
import React from 'react';
import { LayoutGrid } from 'lucide-react';

export const EmptyComponentsPlaceholder = () => (
  <div className="border border-dashed rounded p-8 text-center text-gray-500">
    <LayoutGrid className="w-12 h-12 mx-auto mb-2 opacity-50" />
    <p>Drag and drop components here to build your page</p>
    <p className="text-sm mt-2">Start by adding a component from the left sidebar</p>
  </div>
);
