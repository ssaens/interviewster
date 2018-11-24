import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './style.scss';

import NoMatch from '../no-match';
import CGAddSkills from 'components/create-guide/cg-add-skills';

class CreateGuide extends React.PureComponent {
  render() {
    return (
      <div className='create-guide'>
        <Switch>
          <Route path='/create-guide/add-skills' component={CGAddSkills} />
          <Route path='/create-guide/define-rubric' />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default CreateGuide;
