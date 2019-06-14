/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';

export default class FeaturePage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  // Since state and props are static,
  // there's no need to re-render this component
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

        <section>
          <div className="input-box">
            <text>Type</text>
            <input></input>
          </div>

          <div className="input-box">
            <text>Name</text>
            <input></input>
          </div>

          <div className="input-box">
            <text>Price</text>
            <input></input>
          </div>
          <div className="input-box">
            <text>Photo</text>
            <input></input>
          </div>
          <button>Save Item</button>
        </section>
      
      </div>
    );
  }
}
