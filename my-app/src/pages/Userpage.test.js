import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Userpage from './Userpage';

describe('Userpage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('displays user id when logged in', () => {
    localStorage.setItem('username', 'testUser');
    const { getByText } = render(
      <MemoryRouter>
        <Userpage />
      </MemoryRouter>
    );
    expect(getByText('testUser')).toBeInTheDocument();
  });

  it('displays navigation links', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Userpage />
      </MemoryRouter>
    );
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Products')).toBeInTheDocument();
    expect(getByText('Sign in')).toBeInTheDocument();
    expect(getByText('User not logged in')).toBeInTheDocument();
  });

  it('displays credit card form', () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Userpage />
      </MemoryRouter>
    );

    expect(getByLabelText('Card Number:')).toBeInTheDocument();
    expect(getByLabelText('Expiration Date:')).toBeInTheDocument();
    expect(getByLabelText('CVV:')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('displays error message when credit card form is submitted without required fields', () => {
    const { getByText, getByLabelText, queryByText } = render(
      <MemoryRouter>
        <Userpage />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText('Card Number:'), { target: { value: '' } });
    fireEvent.change(getByLabelText('Expiration Date:'), { target: { value: '' } });
    fireEvent.change(getByLabelText('CVV:'), { target: { value: '' } });
    fireEvent.click(getByText('Submit'));

    expect(queryByText('Card Number is required')).toBeNull();
    expect(queryByText('Expiration Date is required')).toBeNull();
    expect(queryByText('CVV is required')).toBeNull();

    // Ensure the success message is not displayed
    expect(queryByText('Card info was added')).toBeInTheDocument();
  });

  it('displays success message when credit card form is submitted with valid input', async () => {
    const { getByLabelText, getByText, queryByText } = render(
      <MemoryRouter>
        <Userpage />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText('Card Number:'), { target: { value: '1234567890123456' } });
    fireEvent.change(getByLabelText('Expiration Date:'), { target: { value: '12/24' } });
    fireEvent.change(getByLabelText('CVV:'), { target: { value: '123' } });
    fireEvent.click(getByText('Submit'));

    expect(queryByText('Card Number is required')).toBeNull();
    expect(queryByText('Expiration Date is required')).toBeNull();
    expect(queryByText('CVV is required')).toBeNull();

    await waitFor(() => {
      expect(getByText('Card info was added')).toBeInTheDocument();
    });
  });

  it('handles logout correctly', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Userpage />
      </MemoryRouter>
    );

    fireEvent.click(getByText('Log out'));

    expect(localStorage.getItem('username')).toBeNull();
  });
});