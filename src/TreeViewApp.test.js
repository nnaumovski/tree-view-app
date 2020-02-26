import React from 'react';
import renderer from 'react-test-renderer';

import { TreeViewContext } from './context/tree-view';
import TreeView from './component/component/Tree-View';

// main initial focus during the development was to enable initial checks
// in later phase i would do a reasearch related to using mocks, using spies to mock a method and biggest focus is to enable mock for provider
describe('tree view', () => {
  // beforeEach(() => {})
  // afterEach(() => {})

  it('should be presented and fully collapsed', () => {
    const contextValues = {
      inputProps: { nodes: data, parentNodes: [{ "index": 0, "text": "TR_0", "isExpanded": false }, { "index": 2, "text": "TR_2", "isExpanded": false }, { "index": 5, "text": "TR_5", "isExpanded": false }, { "index": 10, "text": "TR_10", "isExpanded": false }, { "index": 3, "text": "TR_3", "isExpanded": false }, { "index": 17, "text": "TR_17", "isExpanded": false }], isExpanded: false },
      actionProps: { initialize: () => { }, update: () => { }, printState: () => { } }
    };

    let componentFixture = initialize(contextValues);

    expect(componentFixture.root.findAllByType('li').length).toEqual(2);
    expect(componentFixture.root.findAllByType('button')[0].children[0]).toEqual("Expand all >");
  })

  it('should be presented and fully expanded, if all levels are opened / in case when all single nodes are clicked or clicked from the main point Expand all >', () => {
    const contextValues = {
      inputProps: { nodes: data, parentNodes: [{ "index": 0, "text": "TR_0", "isExpanded": true }, { "index": 2, "text": "TR_2", "isExpanded": true }, { "index": 5, "text": "TR_5", "isExpanded": true }, { "index": 10, "text": "TR_10", "isExpanded": true }, { "index": 3, "text": "TR_3", "isExpanded": true }, { "index": 17, "text": "TR_17", "isExpanded": true }], isExpanded: true },
      actionProps: { initialize: () => { }, update: () => { }, printState: () => { } }
    };

    let componentFixture = initialize(contextValues);

    expect(componentFixture.root.findAllByType('li').length).toEqual(19);
    expect(componentFixture.root.findAllByType('button')[0].children[0]).toEqual("Collapse all >");
  })

  it('should expand at single node button click', () => {
    const contextValues = {
      inputProps: { nodes: data, parentNodes: [{ "index": 0, "text": "TR_0", "isExpanded": false }, { "index": 2, "text": "TR_2", "isExpanded": false }, { "index": 5, "text": "TR_5", "isExpanded": false }, { "index": 10, "text": "TR_10", "isExpanded": false }, { "index": 3, "text": "TR_3", "isExpanded": false }, { "index": 17, "text": "TR_17", "isExpanded": false }], isExpanded: false },
      actionProps: { initialize: () => { }, update: () => { }, printState: () => { } }
    };

    let componentFixture = initialize(contextValues);

    expect(componentFixture.root.findAllByType('li')[0].children[0].props.onClick).toBeDefined();
  })

  it('should expand all, when clicked on expand all button click', () => {
    const contextValues = {
      inputProps: { nodes: data, parentNodes: [{ "index": 0, "text": "TR_0", "isExpanded": false }, { "index": 2, "text": "TR_2", "isExpanded": false }, { "index": 5, "text": "TR_5", "isExpanded": false }, { "index": 10, "text": "TR_10", "isExpanded": false }, { "index": 3, "text": "TR_3", "isExpanded": false }, { "index": 17, "text": "TR_17", "isExpanded": false }], isExpanded: false },
      actionProps: { initialize: () => { }, update: () => { }, printState: () => { } }
    };

    let componentFixture = initialize(contextValues);

    expect(componentFixture.root.findAllByType('button')[0].props.onClick).toBeDefined();
  })

  it('should collapse all, when clicked on collapse all button click', () => {
    const contextValues = {
      inputProps: { nodes: data, parentNodes: [{ "index": 0, "text": "TR_0", "isExpanded": true }, { "index": 2, "text": "TR_2", "isExpanded": true }, { "index": 5, "text": "TR_5", "isExpanded": true }, { "index": 10, "text": "TR_10", "isExpanded": true }, { "index": 3, "text": "TR_3", "isExpanded": true }, { "index": 17, "text": "TR_17", "isExpanded": true }], isExpanded: true },
      actionProps: { initialize: () => { }, update: () => { }, printState: () => { } }
    };

    let componentFixture = initialize(contextValues);

    expect(componentFixture.root.findAllByType('button')[0].props.onClick).toBeDefined();
  })
})

const initialize = (contextValues) => {

  const componentFixture = renderer.create(
    <TreeViewContext.Provider value={contextValues}>
      <TreeView></TreeView>
    </TreeViewContext.Provider>,
  );

  return componentFixture;
}

// due to the need that data over we do tests should be isolated
const data = [{ "index": 0, "text": "TR_0", "childNodes": [{ "index": 1, "text": "TR_1" }, { "index": 2, "text": "TR_2", "childNodes": [{ "index": 4, "text": "TR_4" }] }, { "index": 5, "text": "TR_5", "childNodes": [{ "index": 6, "text": "TR_6" }, { "index": 7, "text": "TR_7" }, { "index": 8, "text": "TR_8" }, { "index": 9, "text": "TR_9" }, { "index": 10, "text": "TR_10", "childNodes": [{ "index": 11, "text": "TR_11" }, { "index": 12, "text": "TR_12" }, { "index": 13, "text": "TR_13" }, { "index": 14, "text": "TR_14" }, { "index": 15, "text": "TR_15" }] }] }] }, { "index": 3, "text": "TR_3", "childNodes": [{ "index": 16, "text": "TR_16" }, { "index": 17, "text": "TR_17", "childNodes": [{ "index": 18, "text": "TR_18" }] }] }];

