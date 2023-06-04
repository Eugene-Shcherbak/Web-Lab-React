import './App.css';
import Index1 from './pages/Index1';
import Product from './pages/Product';
import Products from './pages/Products';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Userpage from './pages/Userpage';
import ProductCr from './pages/ProductCr';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element = {<Index1 />} />
          <Route path='/product' element = {<Product />} />
          <Route path='/products' element = {<Products />} />
          <Route path='/signin' element = {<SignIn />} />
          <Route path='/signup' element = {<SignUp />} />
          <Route path='/userpage' element = {<Userpage />} />
          <Route path='/productcr' element = {<ProductCr />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;