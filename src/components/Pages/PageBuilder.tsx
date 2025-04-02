
const addTreeBranch = (component: PageComponent) => {
  const branchKeys = Object.keys(component.contents || {})
    .filter(key => key.startsWith('primary-') && !key.includes('child'))
    .sort((a, b) => {
      const numA = parseInt(a.split('-')[1]);
      const numB = parseInt(b.split('-')[1]);
      return numA - numB;
    });
  
  const currentBranchCount = branchKeys.length > 0 
    ? Math.max(...branchKeys.map(key => parseInt(key.split('-')[1])))
    : 0;
  const newBranchNumber = currentBranchCount + 1;
  const newBranchKey = `primary-${newBranchNumber}`;
  
  setComponents(components.map(c => {
    if (c.id === component.id) {
      const updatedContents = { ...c.contents };
      const updatedSettings = { ...c.settings || {} };
      
      // Add new branch to contents
      updatedContents[newBranchKey] = null;
      
      // Add child items for the new branch
      for (let i = 1; i <= 4; i++) {
        updatedContents[`${newBranchKey}-child-${i}`] = null;
      }
      
      // Set active status for new branch
      updatedSettings[`${newBranchKey}-active`] = true;
      
      // Set active status for child items
      for (let i = 1; i <= 4; i++) {
        updatedSettings[`${newBranchKey}-child-${i}-active`] = true;
      }
      
      return {
        ...c,
        contents: updatedContents,
        settings: updatedSettings
      };
    }
    return c;
  }));
  
  toast({
    title: "Branch Added",
    description: `A new branch with sub-items has been added to the tree.`,
  });
};
