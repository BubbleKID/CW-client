import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import TestRenderer  from 'react-test-renderer';
import Table from './Table';

test('Table should be rendered', () => {
    const component = TestRenderer.create(
    <MemoryRouter>
      <Table products={[]}/>
    </MemoryRouter>,);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});