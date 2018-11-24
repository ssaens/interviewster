import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.scss';

import { APP_LOAD } from 'reducer/action-types';
import { initFetch, users } from '../fetch';
import Navbar from '../components/navbar';
import Admin from './admin';
import Billing from './billing';
import Blog from './blog';
import CreateGuide from './create-guide';
import Home from './home';
import HowItWorks from './how-it-works';
import NoMatch from './no-match';

const loadAppThunk = () => dispatch => {
  const token = initFetch(token);
  if (!token) {
    return dispatch({
      type: APP_LOAD,
      payload: {}
    });
  }
  users.me().then(res => dispatch({
    type: APP_LOAD,
    payload: {
      user: res.data.user,
      token: res.data.user.token
    }
  })).catch(err => dispatch({
    type: APP_LOAD,
    payload: {}
  }));
};

const mapStateToProps = state => {
  return {
    isLoaded: state.common.isLoaded,
    user: state.common.user
  };
};

const mapDispatchToProps = dispatch => ({
  loadApp: () => dispatch(loadAppThunk())
});

class App extends React.Component {
  componentWillMount() {
    this.props.loadApp();
  }

  render() {
    if (!this.props.isLoaded) {
      return (<div className='app-main'></div>)
    }

    return (
      <div className='app-main'>
        <Navbar />
        <div className='app-main-view'>
          <Switch>
            <Route path='/how-it-works' component={HowItWorks} />
            <Route path='/create-guide' component={CreateGuide} />
            <Route path='/billing' component={Billing} />
            <Route path='/blog' component={Blog} />
            <Route path='/admin' component={Admin} />
            <Route exact path='/' component={Home} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
