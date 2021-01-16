import React from 'react';

import '../App.css';

const NominationCard = props => {
  const className = props.isSelected ? "nomination-card-selected" : "nomination-card-unselected";
  return (
    <div className={className}>
      {props.isSelected && <div className="card-title">{props.title}</div>}
    </div>
  );
};

export default NominationCard;
