/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReposList from 'components/ReposList';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */

  state= {
    menu:[
      {
        type: "Main Course",
        name:"Pizza Margherita",
        price: 5,
        url:"https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi6iZTe_ujiAhUk4YUKHX7-DX4QjRx6BAgBEAU&url=https%3A%2F%2Fwww.qsrmagazine.com%2Fcategory%2Fchains%2Fpizza-inn&psig=AOvVaw0qOpkO_b2_-mlvgUH4bZqu&ust=1560602286202514"
      },
      {
        type: "Main Course",
        name:"Pizza Margherita",
        price: 5,
        url:"https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi6iZTe_ujiAhUk4YUKHX7-DX4QjRx6BAgBEAU&url=https%3A%2F%2Fwww.qsrmagazine.com%2Fcategory%2Fchains%2Fpizza-inn&psig=AOvVaw0qOpkO_b2_-mlvgUH4bZqu&ust=1560602286202514"
      },
      {
        type: "Main Course",
        name:"Pizza Margherita",
        price: 5,
        url:"https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi6iZTe_ujiAhUk4YUKHX7-DX4QjRx6BAgBEAU&url=https%3A%2F%2Fwww.qsrmagazine.com%2Fcategory%2Fchains%2Fpizza-inn&psig=AOvVaw0qOpkO_b2_-mlvgUH4bZqu&ust=1560602286202514"
      },
      {
        type: "Main Course",
        name:"Pizza Margherita",
        price: 5,
        url:"https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi6iZTe_ujiAhUk4YUKHX7-DX4QjRx6BAgBEAU&url=https%3A%2F%2Fwww.qsrmagazine.com%2Fcategory%2Fchains%2Fpizza-inn&psig=AOvVaw0qOpkO_b2_-mlvgUH4bZqu&ust=1560602286202514"
      },
      {
        type: "Main Course",
        name:"Pizza Margherita",
        price: 5,
        url:"https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi6iZTe_ujiAhUk4YUKHX7-DX4QjRx6BAgBEAU&url=https%3A%2F%2Fwww.qsrmagazine.com%2Fcategory%2Fchains%2Fpizza-inn&psig=AOvVaw0qOpkO_b2_-mlvgUH4bZqu&ust=1560602286202514"
      },
      {
        type: "Main Course",
        name:"Pizza Margherita",
        price: 5,
        url:"https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi6iZTe_ujiAhUk4YUKHX7-DX4QjRx6BAgBEAU&url=https%3A%2F%2Fwww.qsrmagazine.com%2Fcategory%2Fchains%2Fpizza-inn&psig=AOvVaw0qOpkO_b2_-mlvgUH4bZqu&ust=1560602286202514"
      }
    ]
  }

  componentDidMount() {
    const { username, onSubmitForm } = this.props;
    if (username && username.trim().length > 0) {
      onSubmitForm();
    }
    this.renderCard();
  }
 
  // this function is used to loop through the menu items

  renderCard(){
    return this.state.menu.map(function(item, i){
      console.log('items----', item)
      {/* Menu Card */}
      return (
              <div className="card">
              <div className="card-image">
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
          <button>Add menu item</button>

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
