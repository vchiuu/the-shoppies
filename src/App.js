import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import NominationCard from './components/NominationCard';
import Banner from './assets/banner.svg';
import ShoppiesPopcornNoBG from './assets/shoppies-popcorn-nobg.svg';
import ShoppiesTrophy from './assets/shoppies-trophy.svg';
import ShoppiesPopcorn from './assets/shoppies-popcorn.svg';
import Title from './assets/title.svg';
import SearchIcon from './assets/search-icon.svg';
import './App.css';

function App() {
  const NOMINATIONS = [{title: 'Soul'},{title: 'Tenet'},{title: 'Alone'},{title: 'The Phenomenon'},{title: 'Hello'}]

  const [email, setEmail] = useState('');
  const [input, setInput] = useState('');
  const [isModalVisible, setModalVisibility] = useState(false);
  const [isSubscribed, setSubscribed] = useState(false);
  const [emailValidation, setEmailValidation] = useState({
    isValidEmail: true,
    emailErrorMsg: '',
  });
  const [nominations, setNominations] = useState(5);
  const [formValidation, setFormValidate] = useState({
    isFormValid: true,
    formErrorMsg: '',
  })

  function toggleModal(){
    setModalVisibility(!isModalVisible);
  }

  function toggleSubscription(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setSubscribed(value);
  }

  const validateEmail= value => {
    if (value.trim().length === 0) {
      setEmailValidation({
        isValidEmail: false,
        emailErrorMsg: '* The email field is required.',
      });
    } else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
      setEmailValidation({
        isValidEmail: true,
        emailErrorMsg: '',
      });
    } else {
      setEmailValidation({
        isValidEmail: false,
        emailErrorMsg: '* Please enter a valid email address.',
      });
    }
  };

  const validateNomination = value => {
    if (nominations.length < 5) {
      setFormValidate({
        isFormValid: false,
        formErrorMsg: '* You must submit 5 nominations.',
      })
    }
  }

  return (
    <div className="app">
      <div className="form">
        <div className="call-to-action"> Nominate your 5 Favourite Flicks for</div>
        <img className="title" src={Title} alt="the Shoppies" />
        <input 
          className="email"
          value={email}
          placeholder="Email Address" 
          onChange={(e)=> setEmail(e.target.value)}/>
        {(NOMINATIONS.length < 5) ? (
        <div className="search-container">
          <input
            className="search-bar"
            value={input}
            placeholder="Search for Film Nomination"
            onChange={(e) => setInput(e.target.value)}
            />
          <div className="search-button">
            <img src={SearchIcon} alt="Search" width={18}/>
          </div>
        </div>
        ):(
          <img className="banner" src={Banner} alt="Completion Banner" />
        )}
        <div className="nomination-container">
          <div className="subtitle"> Nominations </div>
          <div className="nomination-list">
            <NominationCard
              title="Hello"
              isSelected={true}
              hasPoster={false}/>
            <NominationCard
              title="World"
              isSelected={true}
              hasPoster={true}/>
            <NominationCard
              title="Nomination"
              isSelected={false}
              hasPoster={false}/>
            <NominationCard
              title="Nomination"/>
            <NominationCard
              title="Nomination"/>
            </div>
        </div>
        {!emailValidation.isValidEmail ? (
          <div className="email-error"> {emailValidation.emailErrorMsg} </div>
          ) : null}
        {!formValidation.isFormValid ? (
          <div className="email-error"> {formValidation.formErrorMsg} </div>
          ) : null}
        <div className="subscription-container">
          <input 
            name="isSubscribed"
            type="checkbox"
            checked={isSubscribed}
            onChange={toggleSubscription} />
          <div className="subscription-details">
            Receive updates on Shopify's the Shoppies Award. Nomination period ends April 30th, 2021 and voting period will begin May 15th, 2021.
          </div>
        </div>
        <div className="submit-button" onClick={toggleModal}>
          <div className="submit-text"> SUBMIT </div>
        </div>
      </div>
      <img className="trophy" src={ShoppiesTrophy} alt="Shoppies Trophy" />
      <img className="film-projector" src={ShoppiesPopcornNoBG} alt="projector" />
      <div className="test">
      <Modal
        isOpen={isModalVisible}
        onRequestClose={toggleModal}
        className="modal-container"
        style={{
          overlay: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 998,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
          content: {
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'visible auto',
            outline: 'none',
          }
        }}
      >
        <div className="inner-modal-container">
          <div className="modal-title"> Thank you! </div>
          <img className="modal-image" src={ShoppiesPopcorn} alt="Popcorn"/>
          <div className="modal-subtitle"> Your nominations have been successfully submited. </div>
          <div className="modal-description">
            Our nomination period will end on April 30th, 2021. And, the voting period will begin May 15th, 2021 so be ready to cast your votes!
          </div>
          <div className="modal-button" onClick={toggleModal}> 
            <div className="submit-text">Close</div>
          </div>
        </div>
      </Modal>
      </div>
    </div>
  );
}

export default App;
