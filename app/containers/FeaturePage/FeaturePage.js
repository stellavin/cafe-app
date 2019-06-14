
import React from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../Firebase/Firebase';

const techCompanies = [
  { label: "Side", value: "Side" },
  { label: "Main Course", value: "Main Course" }
];
export default class FeaturePage extends React.Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('menu');
    this.state = {
      type: '',
      name: '',
      price: '',
      photo: ''
    };
  }
  
  shouldComponentUpdate() {
    return false;
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
    console.log('state---', state);
  }

  handleSelectOption = (e) => {
    const state = this.state
    console.log('e.target.value', e.value)
    state["type"] =  e.value;
    this.setState(state);
    console.log('state--- 2', this.state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {name, type, price, photo} =this.state;
    if(photo != ""){
    this.ref.add({
      name,
      type,
      price,
      photo
    }).then((docRef) => {
      console.log('docRef ---', docRef)
      this.setState({
        name: '',
        type: '',
        price: '',
        phot: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }else {
    // show pop up to fill the field
  }
  }


 

  render() {

    const {name, type, price, photo} =this.state;
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
        <form onSubmit={this.onSubmit}>

          <div className="row margin">
            <div className="col-md-2">Type</div>
            <div className="col-md-5">
              <Select required  options={ techCompanies } onChange={this.handleSelectOption} />
            </div>
          </div>

          <div className="row margin">
            <div className="col-md-2">Name</div>
            <div className="col-md-5">
               <input  name="name" required   onChange={this.onChange} placeholder="Name"></input>
            </div>
          </div>

          <div className="row margin">
            <div className="col-md-2">Price</div>
            <div className="col-md-5">
               <input  name="price" required  onChange={this.onChange} placeholder="Price" type="number"></input>
            </div>
          </div>

          <div className="row margin">
            <div className="col-md-2">Photo</div>
            <div className="col-md-3">
            <input  name="photo" required  onChange={this.onChange} placeholder="photo" type="file" className="inputfile"></input>
            </div>
          </div>
       

       
          <button type="submit">Save Item</button>
          </form>
       
      
      </div>
    );
  }
}
