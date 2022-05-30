import React from 'react';
import Editor from './Editor';
import { MemoryRouter }from 'react-router-dom';
import '@testing-library/jest-dom';
import {render, fireEvent, screen} from '@testing-library/react'


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
    state: {product: []}
    })
}));

test('Editor should be rendered when mode is edit', () => {
    const component = render(
    <MemoryRouter>
        <Editor isEdit={true} />
    </MemoryRouter>);
    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent('Edit Product');
});

test('Editor should be rendered when mode is create a new product', () => {
    const component = render(
    <MemoryRouter>
        <Editor isEdit={false} />
    </MemoryRouter>);
    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent('New Product');
});

