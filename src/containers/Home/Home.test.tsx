import React from 'react';
import Home from './Home';
import { MemoryRouter }from 'react-router-dom';
import '@testing-library/jest-dom';
import {render, fireEvent, screen} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';

const fakeUserResponse = {data: []};
const BASE_URL = process.env.BASE_URL;
const server = setupServer(
    rest.post(`${BASE_URL}/api/findall`, (req, res, ctx) => {
        return res(ctx.json(fakeUserResponse));
    }),
);

beforeAll(() => server.listen())
afterEach(() => {
    server.resetHandlers();
});

afterAll(() => server.close())

test('Home should be rendered', async() => {
    render(<MemoryRouter><Home/></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Products Management Solution');
});