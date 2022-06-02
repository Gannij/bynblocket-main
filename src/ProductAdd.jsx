import { useStates } from './utilities/states';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import { FetchHelper } from "./utilities/FetchHelper.js";
import CategorySelect from './CategorySelect';
import axios from 'axios';
import React from 'react';
 

export default function ProductDetail() {
  let navigate = useNavigate();

  const [file, setFile] = React.useState();
  const [fileName, setFileName, id] = React.useState("");

  let product = useStates({description:"",name:"",price:0,categoryId:1})

  console.log(product) 

  async function customAddProduct(obj) {
    let method = 'POST';
    let result = await (await fetch(`/api/products/`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    })).json();

    let productID = result.lastInsertRowId;

    if (productID == null)
    {
      console.log("BAD ID");
      return;
    }
    // in this particular REST-api the property _errror
    // signals that things have gone wrong
    if (result._error) {
      throw (new Error(result));
    }

    const formData = new FormData();
    formData.append("file",file);
    formData.append("fileName",fileName)
    formData.append("id",productID)
    try
    {
      const res = await axios.post(
        "http://localhost:3000/api/upload",
        formData
      );
    }
    catch(exception)
    {
      console.log(exception);
    }

    alert("Product added")
    window.location.reload();
  }

  const saveFile = (e) =>
  {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };


  // Check if we are offline (in that case no editing available)
  // console.log("navigator.onLine", navigator.onLine);

  return !navigator.onLine ?

    <Container>
      {/* Offline */}
      <Row><Col>
        <h4>Sorry no product editing while offline!</h4>
      </Col></Row>
    </Container > :

    <Container className='product-edit'>
      {/* Online */}
      <Row><Col>
        <input type="file" onChange={saveFile}/>
        
      </Col></Row>
      <Row><Col><h1></h1></Col></Row>
      <Row><Col><p></p></Col></Row>
      <Row><Col><p>Price: </p></Col></Row>
      <Row><Col>
        <label className="mt-3">Name:
          <input className="form-control" {...product.bind('name')} />
        </label>
      </Col></Row>
      <Row><Col>
        <label className="mt-3">Description:
          <textarea className="form-control" {...product.bind('description')} />
        </label>
      </Col></Row>
      <Row><Col>
        <label className="mt-3">Price:
          <input type="number" className="form-control" {...product.bind('price')} />
        </label>
      </Col></Row>
      <Row className="mt-4"><Col>
        <label>
          Category:&nbsp;
          <CategorySelect bindTo={[product, 'categoryId']} />
        </label>
      </Col></Row>
      <button type="button" onClick={() => customAddProduct(product)} className="my-4 btn btn-primary float-end">Save</button>
    </Container>
}