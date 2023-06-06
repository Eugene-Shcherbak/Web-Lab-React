import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCr from './ProductCr';

describe('ProductCr component', () => {
  it('handles product creation form submission', () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(),
      })
    );

    global.fetch = mockFetch;

    render(<ProductCr />);

    const titleInput = screen.getByLabelText('Title');
    const textInput = screen.getByLabelText('Text');
    const stateInput = screen.getByLabelText('State');
    const categoryInput = screen.getByLabelText('Category');
    const submitButton = screen.getByText('Add product');

    fireEvent.change(titleInput, { target: { value: 'Test title' } });
    fireEvent.change(textInput, { target: { value: 'Test text' } });
    fireEvent.change(stateInput, { target: { value: 'Test state' } });
    fireEvent.change(categoryInput, { target: { value: 'Test category' } });

    fireEvent.click(submitButton);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('http://127.0.0.1:5000/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Test title',
        text: 'Test text',
        state: 'Test state',
        category: 'Test category',
      }),
    });
  });
});