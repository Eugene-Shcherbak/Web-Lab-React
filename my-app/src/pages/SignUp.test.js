import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUp from './SignUp';

describe('SignUp component', () => {
  beforeEach(() => {
    // Mock window.alert
    window.alert = jest.fn();
  });

  it('performs registration on form submit', () => {
    // Mock the fetch request
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(),
      })
    );

    const { getByLabelText, getByTestId } = render(<SignUp />);

    // Fill in form fields
    fireEvent.change(getByLabelText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(getByLabelText('name'), {
      target: { value: 'Test' },
    });
    fireEvent.change(getByLabelText('surname'), {
      target: { value: 'User' },
    });
    fireEvent.change(getByLabelText('Password'), {
      target: { value: 'test123' },
    });
    fireEvent.change(getByLabelText('Confirm Password'), {
      target: { value: 'test123' },
    });

    // Submit the form
    fireEvent.submit(getByTestId('sign-up-form'));

    // Assertions
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:5000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',
        firstname: 'Test',
        lastname: 'User',
        email: 'test@example.com',
        password: 'test123',
      }),
    });
  });

  it('displays error message if passwords do not match', () => {
    const { getByLabelText, getByTestId } = render(<SignUp />);

    // Fill in form fields
    fireEvent.change(getByLabelText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(getByLabelText('name'), {
      target: { value: 'Test' },
    });
    fireEvent.change(getByLabelText('surname'), {
      target: { value: 'User' },
    });
    fireEvent.change(getByLabelText('Password'), {
      target: { value: 'test123' },
    });
    fireEvent.change(getByLabelText('Confirm Password'), {
      target: { value: 'mismatch123' }, // Passwords do not match
    });

    // Submit the form
    fireEvent.submit(getByTestId('sign-up-form'));

    // Assertions
    expect(fetch).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Passwords do not match!');
  });
});