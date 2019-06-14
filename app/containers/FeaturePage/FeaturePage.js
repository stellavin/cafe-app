
import React from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../Firebase/Firebase';
import SweetAlert from 'react-bootstrap-sweetalert';
import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';


const techCompanies = [
  { label: "Side", value: "Side" },
  { label: "Main Course", value: "Main Course" }
];
export default class FeaturePage extends React.Component {

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('menu');
    this.state = {
      type: '',
      name: '',
      price: '',
      photo: '',
      show: true,
      myalert: null,
      avatar: "",
      isUploading: false,
      progress: 0
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
    console.log('im here 1')
    if(type != ''){
      console.log('im here 2')
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
        photo: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }else {
    console.log('im here 3')
    const state = this.state
    state["alert"] = true;
    this.setState(state);
    this.setState({state},function () {
      console.log('image-------',this.state);
     })
    
  }
  }

  hideAlert = () => {
    this.setState({
      myalert: false
    });
  }

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    
    handleProgress = progress => this.setState({ progress });
    
    handleUploadError = error => {
      this.setState({ isUploading: false });
      console.error(error);
    };

handleUploadSuccess = filename => {
  this.setState({progress:100},function () {
    console.log('filename-------',filename);
   })
  this.setState({ avatar: filename, progress: 100, isUploading: false });
  firebase
    .storage()
    .ref("images")
    .child(filename)
    .getDownloadURL()
    .then(url => this.setState({photo:url},function () {
      console.log('image-------',this.state.photo);
     }));

};


 

  render() {

    const {name, type, price, photo, myalert, avatar} =this.state;
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
            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
            {photo && <img src={photo} />}
            <CustomUploadButton
              accept="image/*"
              storageRef={firebase.storage().ref('images')}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
              style={{backgroundColor: '#3b86ff', color: 'white', padding: 10, borderRadius: 4}}
            >
              Choose photo
   
            </CustomUploadButton>
            </div>
          </div>

        
       

       
          <button type="submit">Save Item</button>
          </form>

            <SweetAlert 
              danger 
              show={myalert}
              title="Error!" 
              onConfirm={this.hideAlert()} 
            > 
              Type should not be empty 
            </SweetAlert>
         
          

          
       
      
      </div>
    );
  }
}
