import React from 'react';
import { connect } from 'react-redux';

import {
  REGISTER,
  ASYNC_START,
  ASYNC_END,
  MODAL_CLOSE
} from 'reducer/action-types';
import { Modal } from 'components/util';
import { Button, ModalCard, Textbox } from 'components/ui';
import { users } from 'fetch';
import { setToken } from 'fetch/token';

const registerThunk = (username, email, password) => dispatch => {
  dispatch({
    type: ASYNC_START,
    subtype: REGISTER
  });
  users.create(username, email, password).then(res => {
    const data = res.data;
    const token = data.user.token;
    setToken(token);
    return Promise.resolve(data);
  }).catch(err => {
    return Promise.resolve(err.response.data);
  }).then(payload => {
    dispatch({
      type: ASYNC_END,
      subtype: REGISTER,
      payload
    });
  });
};

const mapStateToProps = state => ({
  busy: state.auth.busy,
  errors: state.auth.errors
});

const mapDispatchToProps = dispatch => ({
  onRegister: (username, email, password) => dispatch(registerThunk(username, email, password))
});

class Register extends React.Component {
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
          <div className='register-modal'>
            <div className='header bold'>
              Create an Account
            </div>
            <div className='errors'>
              {errors}
            </div>
            <div className='form'>
              <form onSubmit={this.onRegister}>
                <Textbox id='register-username' label='username' autoComplete='username' />
                <Textbox id='register-email' label='email' autoComplete='email' />
                <Textbox id='register-password' label='password' type='password' autoComplete='new-password' />
                <Button flex label='Submit' busy={this.props.busy} />
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

  onRegister = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('register-username');
    const email = formData.get('register-email');
    const password = formData.get('register-password');
    this.props.onRegister(username, email, password);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
