import { useStates } from './utilities/states';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { scrollRestore } from './utilities/scrollBehavior';
import CategorySelect from './CategorySelect';
import { sweFormat } from './utilities/currencyFormatter';
import { missingImage } from './utilities/handleMissingImage';
import React, { useState, useEffect } from "react";
import { factory } from "./utilities/FetchHelper";

let oldSearchTerm = "";

const { Product, Categorie: Category } = factory;


export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showPrice, setShowPrice] = useState("Billigaste");
  const [showName, setShowName] = useState("");
  
  
  function sortPrice() {
    if (showPrice === "Billigaste") {
      s.products.sort((a, b) => (a.price < b.price ? -1 : 1));
    }
       if (showPrice === "Dyraste") {
      s.products.sort((a, b) => (a.price < b.price ? 1 : -1));
    }

  }

   
  scrollRestore();
  
  let s = useStates('main');
  let navigate = useNavigate();

  function showDetail(id) {
    navigate(`/product-detail/${id}`);
  }

  useEffect(() => {
    if (searchTerm === "") {
      return;
    }
    if (searchTerm === false) {
      return;
    }
    s.products = s.allProducts.filter((x) =>
      x.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);


  function sortName() {
    if (showName === "A-Ö") {
      s.products.sort((a, b) => (a.name < b.name ? -1 : 1));
    }
    if (showName === "Ö-A") {
      s.products.sort((a, b) => (a.name < b.name ? 1 : -1));
    }
  }

  

  useEffect(() => {
    sortPrice();


  }, [showPrice]);

  

  useEffect(() => {
    sortName();

  }, [showName]);

   useEffect(() => {
    (async () => {
      // get the categories from the db

      // get the products from the db
      s.products = await Product.find();
      s.categories = await Category.find();
    })();
  }, []);

 
 

  

  

  return ( <Container className="productList">
    <Row><Col><h1>Våra Produkter</h1></Col></Row>
    <Row className="mb-3"><Col>
      <h5>Sortera med kategori</h5>
      <CategorySelect showAllOption bindTo={[s, 'chosenCategoryId']} />
    </Col></Row>
    <Row className="mb-3">
      <Col>
        <h5>Sortera med pris</h5>
        <select
              
              onChange={(event) => {
                setShowPrice(event.target.value);
              }}
            >
              <option>Billigaste</option>
              <option>Dyraste</option>
              
        </select>
       
        
      </Col>
    </Row>

    <Row className="mb-3">
      <Col>
        <h5>Sortera med namn</h5>
        <select onChange={(event) => {
          setShowName(event.target.value)

        }}>

          <option value="A-Ö">A-Ö</option>
          <option>Ö-A</option>
        </select>
      </Col>
    </Row>
    <Row className="mb-3">
      <Col>
        <h5>Sök på produkterna</h5>
           <input
              style={{ height: "25px", width: "19rem" }}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Sök"
            />
      </Col>
    </Row>
    {s.products.filter(
      (product) =>
      +s.chosenCategoryId == 0 /*all*/
      || +s.chosenCategoryId === product.categoryId
    ).map(({ id, name, description, price }) =>
      <Row className="product" key={id} onClick={() => showDetail(id)}>
        <Card>
          <Col xxl="12">
            <h3>{name}</h3>
            <img onError={event => missingImage(event, name)} className="float-end ms-3" style={{ width: 250, height: 150, objectFit: 'contain' }} src={`/images/products/${id}.jpg`} />
            <p>{description}</p>
          </Col>
          <Col xxl="12">
            <p><b>Price:</b> {sweFormat(price)}</p>
          </Col>
        </Card>
      </Row>
    )}
  </Container>
    )
}