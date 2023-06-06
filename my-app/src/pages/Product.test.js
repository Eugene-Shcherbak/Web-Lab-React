import React from 'react';
import { render, fireEvent, getByLabelText, getByTestId} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Product from './Product';

describe('Product component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        username: 'admin',
      },
      writable: true,
    });
  });

  afterEach(() => {
    delete window.localStorage;
  });

  it('renders the product information', () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    );

    const productName = getByRole('heading', { level: 1, name: /Крутий Пес/i });
    const productDescription = productName.parentElement.querySelector('.item-description');
    const productPrice = getByText('$9.99');
    const buyButton = getByText('Купити');

    expect(productName).toBeInTheDocument();
    expect(productDescription).toHaveTextContent('Найліпший пес якого я коли небудь бачив');
    expect(productPrice).toBeInTheDocument();
    expect(buyButton).toBeInTheDocument();
  });

  it('shows the success message when "Купити" button is clicked', () => {
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    );

    fireEvent.click(getByText('Купити'));

    expect(queryByText('Product succesfully bought!')).toBeInTheDocument();
  });

  it('changes the navigation menu style when the mobile button is clicked', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    );

    const mobileMenuButton = getByRole('img', { name: 'Open navigation' });
    fireEvent.click(mobileMenuButton);

  });
});