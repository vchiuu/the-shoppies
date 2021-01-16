import debounce from 'awesome-debounce-promise';
import axios from 'axios';
import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import SearchResults from './SearchResults';
import SearchIcon from '../assets/images/search-icon.svg';
import '../App.css';

const SearchBar = ({ nominationMap, onChange, onRemove, onSelect, value, ...props }) => {
  const [results, setResults] = useState([]);
  const [focused, setFocused] = useState(false);

  const onFocus = () => setFocused(true);

  const onBlur = () => setFocused(false);

  const searchOMDBApi = useCallback(async query => {
    if (!query) {
      return;
    }
    try {
      const response = await axios({
        baseURL: 'https://www.omdbapi.com/',
        method: 'get',
        params: {
          apikey: process.env.REACT_APP_OMDB_API_KEY,
          s: query,
        },
        url: '/',
      });
      if (Array.isArray(response.data.Search)) {
        setResults(response.data.Search);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const debounceSearchOMDBApi = useMemo(() => debounce(searchOMDBApi, 1000), [searchOMDBApi]);

  const onTextChange = async e => {
    const query = e.target.value;
    onChange(query);
    await debounceSearchOMDBApi(query);
  }

  return (
  <div className="search-container" id="search-container">
    <input
      {...props}
      className="search-bar"
      placeholder="Search for Film Nomination"
      onChange={onTextChange}
      onFocus={onFocus}
      value={value}
    />
    <div className="search-button">
      <img src={SearchIcon} alt="Search" width={18}/>
    </div>
    {focused && results.length > 0 && (
      <SearchResults
        nominationMap={nominationMap}
        onAdd={onSelect}
        onClose={onBlur}
        onRemove={onRemove}
        results={results}
      />
    )}
  </div>
  );
};

SearchBar.propTypes = {
  nominationMap: PropTypes.instanceOf(Map),
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchBar;
