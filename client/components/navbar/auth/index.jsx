import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import AuthedCard from './authed';
import UnauthedCard from './unauthed';
import { LogIn, Register } from '../log-in';
import { clearToken } from 'fetch/token';
import {
  MODAL_OPEN,
  MODAL_CLOSE,
  LOGIN,
  REGISTER,
  LOGOUT
} from 'reducer/action-types';

const mapStateToProps = state => ({
  user: state.auth.user,
  activeModal: state.auth.activeModal
});

const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch({
    type: MODAL_OPEN,
    subtype: modal
  }),
  closeModal: () => dispatch({
    type: MODAL_CLOSE
  }),
  onLogout: () => {
    clearToken();
    dispatch({ type: LOGOUT });
  }
});

class AuthCard extends React.Component {
  render() {
    const { user, activeModal } = this.props;

    if (user) {
      return (
        <div className='auth-card'>
          <AuthedCard onLogout={this.onLogout} user={user} />
        </div>
      );
    }

    const ModalComponent = activeModal === LOGIN ? LogIn :
                           activeModal === REGISTER ? Register : null;

    return (
      <div className='auth-card'>
        <UnauthedCard openModal={this.openModal} />
        {ModalComponent ? <ModalComponent closeModal={this.closeModal} /> : null}
      </div>
    );
  }

  openModal = (modal) => {
    this.props.openModal(modal);
  }

  closeModal = () => {
    this.props.closeModal();
  }

  onLogout = () => {
    this.props.onLogout();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthCard);
