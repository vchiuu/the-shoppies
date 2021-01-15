import React, {useState} from 'react';
import Modal from 'react-modal';

import '../App.css';

const NominationCard = props => {
  return (
    <>
      <div className={(props.isSelected) ? "nomination-card-selected" : "nomination-card-unselected"}>
        {(props.isSelected)? (
          <>
            <div className="card-title"> {props.title} </div>
          </>
        ):(
          null
        )}
        
      </div>
    </>
  )
}

export default NominationCard;