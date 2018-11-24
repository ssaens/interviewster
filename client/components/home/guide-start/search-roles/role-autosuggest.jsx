import React from 'react';

import { SearchBar } from 'components/ui';

class RoleAutosuggest extends React.Component {
  render() {
    return (
      <div className='search-roles__search'>
        <SearchBar
          noMargin
          placeholder='What role are you hiring for?'
          onChange={this.onQueryChange}
        />
      </div>
    );
  }

  onQueryChange = e => {
    
  }

  fetchSuggestions = q => {

  }
}

export default RoleAutosuggest;
