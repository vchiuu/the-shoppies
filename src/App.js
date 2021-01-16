import React, { useMemo, useState } from 'react';
import SearchBar from './components/SearchBar';
import NominationList from './components/NominationList';
import EmailSubscription from './components/EmailSubscription';
import Banner from './assets/images/banner.svg';
import ShoppiesPopcornNoBG from './assets/images/shoppies-popcorn-nobg.svg';
import ShoppiesTrophy from './assets/images/shoppies-trophy.svg';
import Title from './assets/images/title.svg';

import './App.css';
import SuccessConfirmModal from './components/SuccessConfirmModal';

function App() {
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');
  const [emailValidation, setEmailValidation] = useState(null);
  const [formValidation, setFormValidate] = useState(null);
  const [isModalVisible, setModalVisibility] = useState(false);
  const [isSubscribed, setSubscribed] = useState(false);
  const [nominationMap, setNominationMap] = useState(new Map());

  const closeModal = () => {
    setModalVisibility(false);
  };

  const validateEmail = () => {
    if (email.trim().length === 0) {
      setEmailValidation(new Error('* The email field is required.'));
      return false;
    }
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      setEmailValidation(new Error('* Please enter a valid email address.'));
      return false;
    }
    setEmailValidation(null);
    return true;
  };

  const validateNomination = value => {
    if (nominationMap.size < 5) {
      setFormValidate(new Error('* You must submit 5 nominations.'))
      return false;
    }
    return true;
  };
  
  const submitNomination = () => {
    const isEmailValid = validateEmail();
    const isNominationValid = validateNomination();
    if (isEmailValid && isNominationValid) {
      setModalVisibility(true);
    }
  };

  const addNomination = nomination => {
    if (!nominationMap.has(nomination.imdbID)) {
      setNominationMap(prevState => {
        const nextState = new Map(prevState);
        return nextState.set(nomination.imdbID, nomination);
      });
    }
  };

  const removeNomination = nomination => {
    if (nominationMap.has(nomination.imdbID)) {
      setNominationMap(prevState => {
        const nextState = new Map(prevState);
        nextState.delete(nomination.imdbID, nomination)
        return nextState;
      });
    }
  };

  const nominationList = useMemo(() => Array.from(nominationMap.values()), [nominationMap]);

  return (
    <>
      <div className="form">
        <div className="call-to-action">Nominate your 5 Favourite Flicks for</div>
        <img className="title" src={Title} alt="the Shoppies" />
        <input 
          className="email"
          value={email}
          placeholder="Email Address" 
          onChange={(e) => setEmail(e.target.value)}/>
        {(nominationList.length < 5) ? (
          <SearchBar
            onChange={setQuery}
            nominationMap={nominationMap}
            onRemove={removeNomination}
            onSelect={addNomination}
            value={query}
          />
        ) : (
          <img className="banner" src={Banner} alt="Completion Banner" />
        )}
        <NominationList list={nominationList} removeItem={removeNomination} />
        {emailValidation && <div className="error-message">{emailValidation.message}</div>}
        {formValidation && <div className="error-message">{formValidation.message}</div>}
        <EmailSubscription 
          isSubscribed={isSubscribed}
          setSubscribed={setSubscribed}
        />
        <button className="submit-button" onClick={submitNomination}>
          Submit
        </button>
        <img className="trophy" src={ShoppiesTrophy} alt="Shoppies Trophy" />
        <img className="film-projector" src={ShoppiesPopcornNoBG} alt="projector" />
      </div>
      <SuccessConfirmModal isVisible={isModalVisible} onClose={closeModal} />
    </>
  );
}

export default App;
