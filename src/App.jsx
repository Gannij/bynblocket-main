import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { useStates } from './utilities/states';
import { factory } from './utilities/FetchHelper';
import { init } from './utilities/shoppingCartLogic';
import './utilities/scrollBehavior';

import MainNav from './MainNav';
import StartPage from './StartPage';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import ProductEdit from './ProductEdit';
import ProductAdd from './ProductAdd';
import ShoppingCart from './ShoppingCart'
import BackOffice from './BackOffice';

// Create classes used for fetching from the REST-api
const { Product, Categorie: Category } = factory;
let oldSearchTerm = "";

export default function App() {

  let s = useStates('main', {
    products: [],
    filterproducts: [],
    categories: [],
    chosenCategoryId: 0,
    cartContents: [],
    allProducts: [],
    searchTerm: "",
  });

  useEffect(() => {
    if (s.searchTerm === oldSearchTerm) {
      return;
    }
    oldSearchTerm = s.searchTerm;
    s.products = s.allProducts.filter((x) =>
      x.name.toLowerCase().includes(s.searchTerm.toLowerCase())
    );
  }, [s]);

  useEffect(() => {
    (async () => {
      // get the categories from the db
      s.categories = await Category.find();
      // get the products from the db
      s.products = await Product.find();
      s.allProducts = s.products.slice();
      // initilize the shopping cart
      // (this provides local storage of cartContents)
      init(s, 'cartContents');
    })();
  }, []);

  return s.allProducts.length === 0 ? null :
    <Router>
      <MainNav />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/back-office/product-edit/:id" element={<ProductEdit />} />
        <Route path="/back-office/product-add" element={<ProductAdd />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/back-office" element={<BackOffice />} />
      </Routes>
    </Router>
}