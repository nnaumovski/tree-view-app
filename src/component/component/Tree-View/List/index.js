import React from 'react'
import Item from '../Item';

const List = (props) => {
    return (
        <div>
            <ul>
                {
                    props.inputProps.nodes.map((v, i) => {
                        return (
                            <Item
                                key={i}
                                inputProps={{ node: v, childNodes: v.childNodes, parentNodes: props.inputProps.parentNodes }}
                                actionProps={{ update: props.actionProps.update }}>
                            </Item>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default List;
