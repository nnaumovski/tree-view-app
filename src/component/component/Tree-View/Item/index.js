import React from 'react'

import List from '../List';

const Item = (props) => {
    let presentOpt;
    let presentList;

    if (props.inputProps.childNodes !== undefined && props.inputProps.childNodes.length > 0) {
        presentOpt = <button onClick={() => { props.actionProps.update(props.inputProps.node.index, undefined) }}>{props.inputProps.node.text}</button>

        // check whether the node is expanded
        props.inputProps.parentNodes.forEach((v, i) => {
            if (v.index === props.inputProps.node.index) {
                if (v.isExpanded) {
                    presentList = (
                        <List
                            inputProps={{ nodes: props.inputProps.node.childNodes, parentNodes: props.inputProps.parentNodes }}
                            actionProps={{ update: props.actionProps.update }}></List>
                    );
                }
            }
        });
    } else {
        presentOpt = props.inputProps.node.text
    }

    return (
        <li>
            {presentOpt}
            {presentList}
        </li>
    )
}

export default Item;
