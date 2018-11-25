import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './style.scss';

import NoMatch from '../no-match';
import CGAddSkills from 'components/create-guide/cg-add-skills';
import CGDefineRubric from 'components/create-guide/cg-define-rubric';

class CreateGuide extends React.PureComponent {
  render() {
    return (
      <div className='create-guide'>
        <Switch>
          <Route path='/create-guide/add-skills' component={CGAddSkills} />
          <Route path='/create-guide/define-rubric' component={CGDefineRubric} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default CreateGuide;
