import React, { useState, useEffect } from 'react';

import data from './../../data/tree-view-data.json';

const TreeViewContext = React.createContext();

const TreeViewContextProvider = (props) => {
    const [state, updateState] = useState({ nodes: [], parentNodes: [], isExpanded: false });

    const initialize = () => {
        getTreeViewData().then(data => {
            let parentNodes = [];

            getParentNodes(data, parentNodes);

            updateState({
                nodes: data,
                parentNodes: parentNodes,
                isExpanded: false
            });
        });
    }

    const getTreeViewData = () => {
        return new Promise((resolve, reject) => {
            resolve(data)
        });
    }

    // return only parent nodes
    const getParentNodes = (data, parentNodes) => {
        if (parentNodes === undefined) {
            parentNodes = [];
        }

        data.forEach(node => {
            if (node.childNodes !== undefined && node.childNodes.length > 0) {
                parentNodes.push({ index: node.index, text: node.text, isExpanded: node.isExpanded, position: undefined });

                getParentNodes(node.childNodes, parentNodes);
            }
        });
    }

    // initial method to sync the state helper property state.parentNodes
    // triggered by: collapseAll/expandAll or just by expanding single parent node
    const update = (index, isExpanded) => {
        let parentNodes = state.parentNodes;

        if (index !== undefined) {
            updateParentNode(parentNodes, index);
        } else {
            updateParentNodes(parentNodes, isExpanded);
        }
    }

    // update specific parentNode isExpanded property
    // called by: update function, on specific parent node at index
    const updateParentNode = (parentNodes, index) => {
        let isExpandedAllLevels = true;

        parentNodes.findIndex((v, i) => {
            if (v.index === index) {
                v.isExpanded = v.isExpanded === true ? false : true;
                return true;
            }
            return false;
        });

        parentNodes.findIndex((v, i) => {
            if (!v.isExpanded) {
                isExpandedAllLevels = false;
                return true;
            }
            return false;
        });

        updateState({
            nodes: state.nodes,
            parentNodes: parentNodes,
            isExpanded: isExpandedAllLevels
        });
    }

    // update parentNodes isExpanded property
    // called by: updated function, on ExpandAll/CollapseAll
    const updateParentNodes = (parentNodes, isExpanded) => {
        parentNodes.forEach((v, i) => {
            v.isExpanded = isExpanded;
        });

        updateState({
            nodes: state.nodes,
            parentNodes: parentNodes,
            isExpanded: isExpanded
        });
    }

    const printState = () => {
        console.log(state);
    }

    useEffect(() => {
        initialize();
    }, []);

    return (
        <TreeViewContext.Provider value={{
            inputProps: { nodes: state.nodes, parentNodes: state.parentNodes, isExpanded: state.isExpanded },
            actionProps: { initialize: initialize, update: update, printState: printState }
        }}>
            {props.children}
        </TreeViewContext.Provider>
    )
}

export {
    TreeViewContextProvider,

    TreeViewContext
};