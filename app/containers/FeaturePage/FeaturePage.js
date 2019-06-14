/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

const techCompanies = [
  { label: "Side", value: "Side" },
  { label: "Main Course", value: "Main Course" }
];
export default class FeaturePage extends React.Component {
  
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="feature-page">
        <Helmet>
          <title>Add Menu</title>
          <meta
            name="description"
            content=""
          />
        </Helmet>
        <h2>Add Menu Item</h2>

          <div className="row margin">
            <div className="col-md-2">Type</div>
            <div className="col-md-5">
              <Select options={ techCompanies } />
            </div>
          </div>

          <div className="row margin">
            <div className="col-md-2">Name</div>
            <div className="col-md-5">
               <input></input>
            </div>
          </div>

          <div className="row margin">
            <div className="col-md-2">Price</div>
            <div className="col-md-5">
               <input></input>
            </div>
          </div>

          <div className="row margin">
            <div className="col-md-2">Photo</div>
            <div className="col-md-3">
            <input type="file" className="inputfile"></input>
            </div>
          </div>
       

       
          <button>Save Item</button>
       
      
      </div>
    );
  }
}
