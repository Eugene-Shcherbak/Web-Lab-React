import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Products from './Products';

describe('Products component', () => {
  it('displays products list', async () => {
    const mockProducts = [
      { id: 1, title: 'Product 1', text: 'Product 1 description' },
      { id: 2, title: 'Product 2', text: 'Product 2 description' },
    ];

    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ products: mockProducts }),
    });

    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading products...')).toBeInTheDocument();

    // Wait for the products to be fetched and rendered
    const productElements = await screen.findAllByRole('link', { name: /Product \d/ });

    expect(productElements).toHaveLength(2);
    expect(productElements[0]).toHaveAttribute('href', '/Product');
    expect(productElements[0]).toHaveTextContent('Product 1');
    expect(productElements[0]).toHaveTextContent('Product 1 description');
    expect(productElements[1]).toHaveAttribute('href', '/Product');
    expect(productElements[1]).toHaveTextContent('Product 2');
    expect(productElements[1]).toHaveTextContent('Product 2 description');
  });

  it('displays user information if logged in as admin', () => {
    localStorage.setItem('username', 'admin');

    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );


    expect(screen.getByText('admin')).toBeInTheDocument();
  });

  it('displays default user information if not logged in as admin', () => {
    localStorage.setItem('username', 'user123');

    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );

    expect(screen.getByText('user123')).toBeInTheDocument();
  });
});