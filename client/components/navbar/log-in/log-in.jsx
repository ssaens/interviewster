import React from 'react';
import { connect } from 'react-redux';
import './style.scss';

import {
  LOGIN,
  ASYNC_START,
  ASYNC_END
} from 'reducer/action-types';
import { Modal } from 'components/util';
import { Button, ModalCard, Textbox } from 'components/ui';
import { users } from 'fetch';
import { setToken } from 'fetch/token';

const loginThunk = (email, password) => dispatch => {
  dispatch({
    type: ASYNC_START,
    subtype: LOGIN
  });
  users.login(email, password).then(res => {
    const data = res.data;
    const token = data.user.token;
    setToken(token);
    return Promise.resolve(data);
  }).catch(err => {
    return Promise.resolve(err.response.data);
  }).then(payload => {
    dispatch({
      type: ASYNC_END,
      subtype: LOGIN,
      payload
    });
  });
};

const mapStateToProps = state => ({
  busy: state.auth.busy,
  errors: state.auth.errors
});

const mapDispatchToProps = dispatch => ({
  onLogin: (email, password) => dispatch(loginThunk(email, password))
});

class LogIn extends React.Component {
  render() {
    let errors = null;
    if (this.props.errors && this.props.errors.message) {
      errors = <div className='error-msg' key={'register-error-message'}>{this.props.errors.message}</div>;
    } else if (this.props.errors) {
      errors = Object.entries(this.props.errors || {}).map(([field, msg]) => 
        <div className='error-msg' key={`register-error-${field}`}>{field}: {msg.toString()}</div>
      );
    }
    
    return (
      <Modal>
        <ModalCard>
          <div className='login-modal'>
            <div className='header bold'>
              Login
            </div>
            <div className='errors'>
              {errors}
            </div>
            <div className='form'>
              <form onSubmit={this.onLogin}>
                <Textbox id='login-email' label='email' autoComplete='email' />
                <Textbox id='login-password' label='password' type='password' autoComplete='current-password' />
                <Button flex label='Log in' busy={this.props.busy} />
                <div className='cancel'>
                  <a onClick={this.props.closeModal}>cancel</a>
                </div>
              </form>
            </div>
          </div>
        </ModalCard>
      </Modal>
    )
  }

  onLogin = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('login-email');
    const password = formData.get('login-password');
    this.props.onLogin(email, password);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
