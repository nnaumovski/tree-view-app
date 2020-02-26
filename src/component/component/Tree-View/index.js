import React, { useContext } from 'react';

import { TreeViewContext } from '../../../context/tree-view';

import List from './List';
import './index.css';

const TreeView = (props) => {

    let treeViewContext = useContext(TreeViewContext);

    return (
        <div className="TreeView">
            <div>
                <p>
                    <b>Preloaded data: </b> {JSON.stringify(treeViewContext.inputProps.nodes)}
                </p>
                <p>
                    <b>Parent nodes (helper array containing only parents): </b> {JSON.stringify(treeViewContext.inputProps.parentNodes)}
                </p>
            </div>
            <div>
                {
                    treeViewContext.inputProps.isExpanded ? (
                        <button onClick={() => { treeViewContext.actionProps.update(undefined, false) }}>Collapse all ></button>
                    ) : (
                            <button onClick={() => { treeViewContext.actionProps.update(undefined, true) }}>Expand all ></button>
                        )
                }

                <List
                    inputProps={{ nodes: treeViewContext.inputProps.nodes, parentNodes: treeViewContext.inputProps.parentNodes }}
                    actionProps={{ update: treeViewContext.actionProps.update }} />
            </div>
        </div>
    )
}

export default TreeView;
