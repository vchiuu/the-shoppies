import PropTypes from 'prop-types';
import React from 'react';
import NominationCard from './NominationCard';

import '../App.css';

const NominationList = ({ list, removeItem }) => {
  const renderNominationCard = nomination => (
    <NominationCard
      {...nomination}
      key={nomination.imdbID}
      isSelected
      onRemove={removeItem}
    />
  );

  const renderPlaceholderCards = () => {
    if (list.length < 5) {
      return new Array(5 - list.length).fill().map((value, index) => (
        <NominationCard key={`placeholder-${index}`} isSelected={false} />
      ));
    }
    return null;
  }

  return (
    <div className="nomination-container">
      <div className="subtitle">Nominations</div>
      <div className="nomination-list">
        {list.map(renderNominationCard)}
        {renderPlaceholderCards()}
      </div>
    </div>
  );
};

NominationList.defaultProps = {
  list: [],
};

NominationList.propTypes = {
  list: PropTypes.array,
  removeItem: PropTypes.func.isRequired,
};

export default NominationList;
