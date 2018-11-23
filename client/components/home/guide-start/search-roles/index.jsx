import React from 'react';

import RoleAutosuggest from './role-autosuggest';
import { Button, SearchBar } from 'components/ui';

class SearchRoles extends React.Component {
  render() {
    return (
      <div className='search-roles'>
        <RoleAutosuggest />
        <div className='search-roles__submit'>
          <Button 
            label='Get Started' 
            onClick={() => console.log('here')}
          />
        </div>
      </div>
    );
  }
}

export default SearchRoles;
