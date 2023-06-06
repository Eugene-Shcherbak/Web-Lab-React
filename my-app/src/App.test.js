import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Index1 from './pages/Index1';
import Product from './pages/Product';
import Products from './pages/Products';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Userpage from './pages/Userpage';
import ProductCr from './pages/ProductCr';

describe('App component', () => {
  it('renders the correct routes', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Index1 />} />
          <Route path="/product" element={<Product />} />
          <Route path="/products" element={<Products />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userpage" element={<Userpage />} />
          <Route path="/productcr" element={<ProductCr />} />
        </Routes>
      </MemoryRouter>
    );



    render(
      <MemoryRouter initialEntries={['/product']}>
        <Routes>
          <Route path="/product" element={<Product />} />
        </Routes>
      </MemoryRouter>
    );



    render(
      <MemoryRouter initialEntries={['/products']}>
        <Routes>
          <Route path="/products" element={<Products />} />
        </Routes>
      </MemoryRouter>
    );



    render(
      <MemoryRouter initialEntries={['/signin']}>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </MemoryRouter>
    );



    render(
      <MemoryRouter initialEntries={['/signup']}>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </MemoryRouter>
    );



    render(
      <MemoryRouter initialEntries={['/userpage']}>
        <Routes>
          <Route path="/userpage" element={<Userpage />} />
        </Routes>
      </MemoryRouter>
    );



    render(
      <MemoryRouter initialEntries={['/productcr']}>
        <Routes>
          <Route path="/productcr" element={<ProductCr />} />
        </Routes>
      </MemoryRouter>
    );


  });
});