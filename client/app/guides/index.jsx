import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import GuideList from 'components/guides';
import GuideView from 'components/guides/guide-view';

const mapStateToProps = state => ({
  isAuthed: state.auth.user
});

class Guides extends React.PureComponent {
  render() {
    if (!this.props.isAuthed) {
      return <Redirect to='/' />;
    }
    return (
      <div className='view-guides'>
        <div className='header'>
          <Switch>
            <Route path='/guides/:id' component={GuideView} /> 
            <Route exact path='/guides' component={GuideList} /> 
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Guides);
