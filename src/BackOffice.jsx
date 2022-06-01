import { Link } from 'react-router-dom'
import { useStates } from './utilities/states';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { sweFormat } from './utilities/currencyFormatter';
import React from "react";



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
    <div><Container className="productList">
      <Row><Col><h2>Back Office</h2></Col></Row>
      <Row>
        <Link to={`/back-office/product-add/`}>
          <button type="button" className="my-4 btn btn-success float-start">Add product</button>
        </Link>
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
            <Col> <Link to={`/back-office/product-edit/${id}`}>
              <button type="button" className="my-2 btn btn-info float-end" style={{ width: 100 }}>Edit</button>
            </Link></Col>
            <Col><button type="button" className="my-2 btn btn-danger float-end" onClick={() => deleteByID(id)} style={{ width: 100 }}>Delete</button></Col>

          </Card>
        </Row>
      )}
    </Container>
    </div>
  )
}

export default BackOffice 