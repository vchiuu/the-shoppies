import React from 'react';
import PropTypes from 'prop-types';

const EmailSubscription = props => {
  
  function toggleSubscription(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    props.setSubscribed(value);
  }

  return (
    <div className="subscription-container">
    <input 
      name="isSubscribed"
      type="checkbox"
      checked={props.isSubscribed}
      onChange={toggleSubscription} />
    <div className="subscription-details">
      Receive updates on Shopify's the Shoppies Award. Nomination period ends April 30th, 2021 and voting period will begin May 15th, 2021.
    </div>
  </div>
  )
}

EmailSubscription.propTypes = {
  isSubscribed: PropTypes.bool,
  setSubscribed: PropTypes.func,
};

export default EmailSubscription;