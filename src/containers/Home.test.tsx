import React from 'react';
import TestRenderer  from 'react-test-renderer';
import Home from './Home';
import { MemoryRouter }from 'react-router-dom';

test('Home should be rendered', () => {
    const component = TestRenderer.create(<MemoryRouter><Home/></MemoryRouter>,);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});