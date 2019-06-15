/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import './style.scss';
import { Link } from 'react-router-dom';
import firebase from '../Firebase/Firebase';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('menu');
    this.unsubscribe = null;
    this.state = {
      menu: []
    };
  }

  componentDidMount() {

    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    this.renderCard();
  }
 
  onCollectionUpdate = (querySnapshot) => {
    // window.location.reload()
    const menu = [];
    querySnapshot.forEach((doc) => {
      const {name, type, price, photo} = doc.data();
      menu.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        type,
        price,
        photo
      });
    });
    this.setState({
      menu
   });
  }

  
  // this function is used to loop through the menu items

  renderCard(){
    return this.state.menu.map(function(item, i){
      console.log('items----', item)
      {/* Menu Card */}
      return (
              <div className="card" key={i}>
              <div className="card-image">
                <img src={item.photo} />
              </div>
              <div className="card-footer">
                <div>
                  <div className="type">{item.type}</div>
                  <div className="name">{item.name}</div>
                </div>
                <div className="price">$ {item.price}</div>
                  
              </div>

            </div>

      );
    {/* End Card */}

    })
  }

  render() {
    const {
      loading, error, repos, username, onChangeUsername, onSubmitForm
    } = this.props;
    const reposListProps = {
      loading,
      error,
      repos
    };

    return (
      <article>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Cafe React App " />
        </Helmet>
        <div className="home-page">
          <div className="display-row">
          <h2>Menu</h2>
          <Link className="router-link" to="/features">
          <button>Add menu item</button>
          </Link>
          

          </div>
          
          <section className="align-left">
            {/* display cards */}
            {this.renderCard()}
         
          </section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func
};
