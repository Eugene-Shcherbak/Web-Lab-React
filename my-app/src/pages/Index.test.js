import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Index1 from './Index1';

let container = null;

beforeEach(() => {
  // Set up a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // Clean up on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Index1 component', () => {
  it('renders without crashing', () => {
    act(() => {
      render(
        <BrowserRouter>
          <Index1 />
        </BrowserRouter>,
        container
      );
    });

    expect(container).toBeTruthy();
  });

  it('renders correct navigation links', () => {
    act(() => {
      render(
        <BrowserRouter>
          <Index1 />
        </BrowserRouter>,
        container
      );
    });

    const homeLink = container.querySelector('a[href="/"]');
    const productsLink = container.querySelector('a[href="/Products"]');
    const signInLink = container.querySelector('a[href="/SignIn"]');
    const userPageLink = container.querySelector('a[href="/Userpage"]');
    const productCrLink = container.querySelector('a[href="/ProductCr"]');

    expect(homeLink).toBeTruthy();
    expect(productsLink).toBeTruthy();
    expect(signInLink).toBeTruthy();
    expect(userPageLink).toBeTruthy();
    expect(productCrLink).toBeFalsy(); // Not visible when localStorage.username is not "admin"
  });

  it('updates user ID in the DOM if present in localStorage', () => {
    const mockLocalStorage = {
      username: 'testUser',
    };
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
    });

    act(() => {
      render(
        <BrowserRouter>
          <Index1 />
        </BrowserRouter>,
        container
      );
    });

    const userIdElement = container.querySelector('#userid');

    expect(userIdElement.innerHTML).toBe(mockLocalStorage.username);
  });

  it('adds "menu-btn" class to navigation on mobile button click', () => {
    act(() => {
      render(
        <BrowserRouter>
          <Index1 />
        </BrowserRouter>,
        container
      );
    });

    const mobileMenuButton = container.querySelector('#mobile-cta');
    const navigation = container.querySelector('nav');

    expect(navigation.classList.contains('menu-btn')).toBeFalsy();

    act(() => {
      mobileMenuButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(navigation.classList.contains('menu-btn')).toBeTruthy();
  });

  it('removes "menu-btn" class from navigation on mobile button exit click', () => {
    act(() => {
      render(
        <BrowserRouter>
          <Index1 />
        </BrowserRouter>,
        container
      );
    });

    const mobileMenuExitButton = container.querySelector('#mobile-exit');
    const navigation = container.querySelector('nav');
    navigation.classList.add('menu-btn');

    expect(navigation.classList.contains('menu-btn')).toBeTruthy();

    act(() => {
      mobileMenuExitButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(navigation.classList.contains('menu-btn')).toBeFalsy();
  });
});