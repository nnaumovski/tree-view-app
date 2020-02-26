import React from 'react';
import './TreeViewApp.css';

import { TreeViewContextProvider } from './context/tree-view';
import TreeView from './component/component/Tree-View';

const TreeViewApp = () => {
  return (
    <div className="TreeViewApp">
      <TreeViewContextProvider>

        <TreeView />

      </TreeViewContextProvider>
    </div>
  );
}

export default TreeViewApp;
