import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import NominationIcon from '../assets/images/nomination-icon.svg'

const SearchResults = ({ nominationMap, onAdd, onClose, onRemove, results }) => {
  const renderResultEntry = entry => {
    const isSelected = nominationMap.has(entry.imdbID);
    const onClick = isSelected ? onRemove : onAdd;
    return (
      <button className="search-result-entry" key={entry.imdbID} onClick={() => onClick(entry)}>
        <span>{entry.Title} ({entry.Year})</span>
        <img
          alt={isSelected ? 'Remove' : 'Add'}
          className={isSelected ? 'remove-nomination-button' : 'add-nomination-button'}
          src={NominationIcon}
        />
      </button>
    );
  };

  useEffect(() => {
    const onClick = e => {
      const listRef = document.getElementById('search-container');
      if (listRef && !listRef.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [onClose]);

  return (
    <div className="search-result-list">
      {results.map(renderResultEntry)}
    </div>
  );
};

SearchResults.defaultProps = {
  results: [],
};

SearchResults.propTypes = {
  onAdd: PropTypes.func.isRequired,
  nominationMap: PropTypes.instanceOf(Map),
  onClose: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  results: PropTypes.array,
};

export default SearchResults;
