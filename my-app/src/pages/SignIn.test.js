import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignIn from './SignIn';

describe('SignIn component', () => {
  it('submits the form with correct credentials', async () => {
    const fetchMock = jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      ok: true,
    });

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    const usernameInput = getByLabelText('username');
    const passwordInput = getByLabelText('Password');
    const submitButton = getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        'http://127.0.0.1:5000/user/login',
        expect.objectContaining({
          method: 'POST',
          headers: {
            Authorization: expect.stringContaining(
              'Basic dGVzdHVzZXI6dGVzdHBhc3N3b3Jk'
            ),
          },
        })
      );

      expect(localStorage.getItem('username')).toBe('testuser');
      expect(localStorage.getItem('password')).toBe('testpassword');
      expect(localStorage.getItem('role')).toBe('user');
      expect(window.location.href).toBe('http://localhost/');
    });

    fetchMock.mockRestore();
  });

  it('displays an error message with wrong credentials', async () => {
    const fetchMock = jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      status: 401,
    });

    jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    const usernameInput = getByLabelText('username');
    const passwordInput = getByLabelText('Password');
    const submitButton = getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        'http://127.0.0.1:5000/user/login',
        expect.objectContaining({
          method: 'POST',
          headers: {
            Authorization: expect.stringContaining(
              'Basic dGVzdHVzZXI6d3JvbmdwYXNzd29yZA=='
            ),
          },
        })
      );

      expect(window.alert).toHaveBeenCalledWith('Wrong credentials!');
    });

    fetchMock.mockRestore();
    window.alert.mockRestore();
  });
});