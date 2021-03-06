
import React from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from '../Firebase/Firebase';
import SweetAlert from 'react-bootstrap-sweetalert';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';


const techCompanies = [
  { label: "Side", value: "Side" },
  { label: "Main Course", value: "Main Course" }
];
export default class FeaturePage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('menu');
    this.state = {
      type: '',
      name: '',
      photo:'',
      show: true,
      myalert: false,
      avatar: "",
      isUploading: false,
      progress: 0,
      showAlert: null
    };
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
        photo: '',
        showAlert: true
      });
      // this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  
  }

  confirm = () => {
    this.setState({
      showAlert: false
    });
    this.props.history.push("/")
  }

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    
    handleProgress = progress => this.setState({ progress });
    
    handleUploadError = error => {
      this.setState({ isUploading: false });
      console.error(error);
    };

handleUploadSuccess = filename => {
  this.setState({ avatar: filename, progress: 100, isUploading: false });
  firebase
    .storage()
    .ref("images")
    .child(filename)
    .getDownloadURL()
    .then(url => this.setState({photo:url},function () {
     }));
};

renderForm = () =>{

  return (
    <div>

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
      {this.state.isUploading && <p>Progress: {this.state.progress} Please wait</p>}
      {this.state.photo != ""?(
        <img src={this.state.photo} />

      ): null } 
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

    {this.state.type == '' && this.state.photo == ''?(
    <button className='disabled' disabled={this.state.type == '' && this.state.photo == ''} type="submit">Save Item</button>

    ):
    <button type="submit">Save Item</button>

    }

    </form>

     
      </div>
  );
  
}

  render() {
    console.log('render called');
    const {showAlert} = this.state;
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

        {this.renderForm()}

        {showAlert && 
          <SweetAlert
                success
                show={showAlert}
                confirmBtnText="Awesome"
                title="Yeeey !!!"
                onConfirm={this.confirm}
              >
                You have successfully added your menu
              </SweetAlert>
          }

      </div>
    );
  }
}
