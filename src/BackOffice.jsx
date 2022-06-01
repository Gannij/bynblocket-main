
import { Link } from 'react-router-dom'

import { useStates } from './utilities/states';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { scrollRestore } from './utilities/scrollBehavior';
import CategorySelect from './CategorySelect';
import { sweFormat } from './utilities/currencyFormatter';
import SearchBar from './SearchBar'
// import { missingImage } from './utilities/handleMissingImage';
import React, { useState, useEffect } from "react";



function BackOffice() {

  let navigate = useNavigate();
  let s = useStates('main');

  async function deleteByID(id) {
   if (!id) { return { error: 'No id, can not delete' } };
   await (await fetch(`/api/products/${id}`, {
     method: 'DELETE'
   }));
    
    window.location.reload();
    alert("Product deleted")
  }

  return (
    <div>
      <h1>Backoffice</h1>
      <Row>
        <div className="">
          <Link to={`/back-office/product-add/`}>
                  <button type="button" className="my-4 btn btn-primary float-end">Add product</button>
          </Link>
        </div>
      </Row>
      {s.filterproducts.filter(product =>
      s.chosenCategoryId == 0 /*all*/
      || +s.chosenCategoryId === product.categoryId
      ).map(({ id, name, description, price }) =>
        <Row className="product" key={id} >
          <Card>
            <Col xxl="12">
              <h3>{name}</h3>
              
              <p>{description}</p>
            </Col>
            <Col xxl="12">
              <p><b>Price:</b> {sweFormat(price)}</p>
            </Col>
            <Link to={`/back-office/product-edit/${id}`}>
              <button type="button" className="my-4 btn btn-primary float-end">Edit</button>
            </Link>
            <button type="button" onClick={() => deleteByID(id) } className="my-4 btn btn-primary w-25">Delete</button>
          </Card>
        </Row>
    )}

      <Link to="/Backoffice/edit"><h3>Edit</h3></Link>
    </div>
  )
}

export default BackOffice 