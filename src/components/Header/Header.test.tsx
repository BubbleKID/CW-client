import React from 'react';
import TestRenderer  from 'react-test-renderer';
import Header from './Header';

test('Header should be rendered', () => {
    const component = TestRenderer.create(<Header/>,);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});