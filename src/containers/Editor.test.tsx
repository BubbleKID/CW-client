import React from 'react';
import TestRenderer  from 'react-test-renderer';
import Editor from './Editor';
import { MemoryRouter }from 'react-router-dom';

test('Editor should be rendered', () => {
    const component = TestRenderer.create(<MemoryRouter><Editor isEdit={false}/></MemoryRouter>,);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});