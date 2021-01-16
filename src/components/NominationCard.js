import React from 'react';
import Tooltip from 'react-tooltip';
import RemoveIcon from '../assets/images/remove-icon.svg';
import FilmNominated from '../assets/images/film-nominated.svg';
import AddIcon from '../assets/images/add-icon.svg';

import '../App.css';

const NominationCard = ({ imdbID, isSelected, onRemove, Poster, Title }) => {
  const className = `nomination-card ${isSelected ? "nomination-card-selected" : "nomination-card-unselected"}`;
  const getStyles = () => {
    const styles = {
      backgroundImage: `url(${isSelected ? FilmNominated : AddIcon})`,
    };
    if (Poster) {
      Object.assign(styles, {
        backgroundSize: '100% 100%',
        backgroundImage: `url(${Poster})`
      });
    }
    return styles;
  };
  return (
    <>
      <div className={className} data-for={imdbID} data-tip style={getStyles()}>
        {isSelected && (
          <button
            className="remove-button"
            onClick={onRemove}
            style={{ backgroundImage: `url(${RemoveIcon})`}}
          />
        )}
      </div>
      {isSelected && (
        <Tooltip id={imdbID}>
          <span>{Title}</span>
        </Tooltip>
      )}
    </>
  );
};

export default NominationCard;
