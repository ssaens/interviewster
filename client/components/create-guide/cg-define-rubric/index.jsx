import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import progress from './progress-s2.jpg';
import './style.scss';

import DefineRubric from './define-rubric';
import { Button, ModalCard } from 'components/ui';
import { Modal } from 'components/util';
import {
  GUIDE_REQUEST_AUTH,
  MODAL_OPEN,
  MODAL_CLOSE,
  LOGIN,
  REGISTER,
  GUIDE_CREATE,
  ASYNC_START,
  ASYNC_END,
  GUIDE_TO_FINISH
} from 'reducer/action-types';
import { admin } from 'fetch';

const createGuideThunk = model => dispatch => {
  dispatch({
    type: GUIDE_CREATE,
    subtype: ASYNC_START
  });
  admin.createGuide(model).then(res => {
    return Promise.resolve(res.data);
  }).catch(err => {
    return Promise.resolve(err.response.data);
  }).then(payload => {
    dispatch({
      type: GUIDE_CREATE,
      subtype: ASYNC_END,
      payload
    });
  });
};

const mapStateToProps = state => ({
  model: state.guide.model,
  isAuthed: state.auth.user,
  creatingGuide: state.guide.meta.creatingGuide,
  activeModal: state.guide.meta.activeModal,
  redirect: state.guide.meta.redirect
});

const mapDispatchToProps = dispatch => ({
  requestAuth: () => dispatch({
    type: GUIDE_REQUEST_AUTH,
    subtype: MODAL_OPEN
  }),
  closeRequestAuth: () => dispatch({
    type: GUIDE_REQUEST_AUTH,
    subtype: MODAL_CLOSE
  }),
  onLogin: () => dispatch({
    type: GUIDE_REQUEST_AUTH,
    subtype: LOGIN
  }),
  onRegister: () => dispatch({
    type: GUIDE_REQUEST_AUTH,
    subtype: REGISTER
  }),
  onFinish: () => dispatch({
    type: GUIDE_TO_FINISH
  }),
  createGuide: model => dispatch(createGuideThunk(model))
});

const AuthModal = props => (
  <Modal>
    <ModalCard>
      <div className='guide-request-auth'>
        <div className='header bold'>
          You must sign in to continue
        </div>
        <div className='ctas'>
          <Button flex label='Log in' onClick={props.onLogin} />
          <Button flex label='Register' onClick={props.onRegister} />
          <a onClick={props.onClose}>cancel</a>
        </div>
      </div>
    </ModalCard>
  </Modal>
);

const WaitModal = props => (
  <Modal>
    <ModalCard>
      {
        props.creatingGuide === 'request' ? (
          <div className='guide-wait-creation'>
            <div className='bold'>
              Creating your guide
            </div>
            Please wait a moment...
          </div>
        ) : (
          <div className='guide-wait-creation'>
            <div className='bold'>
              Your guide has been created
            </div>
            <Button flex label='ok' onClick={props.onFinish} />
          </div>
        ) 
      }
    </ModalCard>
  </Modal>
);

class CGDefineRubrics extends React.PureComponent {
  render() {
    const { model, redirect, activeModal, creatingGuide } = this.props;
    if (redirect) {
      model.redirect = null;
      return <Redirect to='/guides' />
    }
    if (!model.role) {
      return <Redirect to='/' />
    }
    return (
      <div className='cg-define-rubric'>
        { activeModal ? <AuthModal 
            onClose={this.props.closeRequestAuth} 
            onLogin={this.props.onLogin}
            onRegister={this.props.onRegister}
          /> : null }
        { creatingGuide ? <WaitModal creatingGuide={creatingGuide} onFinish={this.props.onFinish} /> : null }
        <div className='cg-description'>
          <div className='progress'>
            <img src={progress} />
          </div>
          <div className='main'>
            Personalize Your Guide and Rubric
          </div>
          <div className='sub'>
            Interviews are most effective and objective when each candidate is asked the same questions in the same order. This guide can help you do just that!
          </div>
        </div>
        <div className='cg-workspace'>
          <div className='cgws'>
            <div className='cgws-role'>
              Role: <span className='name'>{model.role.name}</span>
            </div>
            <div className='cgws-main'>
              <DefineRubric />
            </div>
            <div className='cgws-nav rel'>
              <div className='cgws-nav__left'>
                <Link to='/create-guide/add-skills'>&#8249; Back</Link>
              </div>
              <div className='cgws-nav__right'>
                <Button label='Finish' onClick={this.continue} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  continue = () => {
    if (!this.props.isAuthed) {
      this.props.requestAuth();
    } else {
      const model = {
        role: this.props.model.role,
        skills: this.props.model.skills.map(skill => skill.name),
        questions: this.props.model.questions.map(question => ({
          text: question.text,
          rubric: question.rubric.map(item => ({
            points: item.points,
            desc: item.desc
          }))
        })),
        duration: this.props.model.duration
      }
      this.props.createGuide(model);
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CGDefineRubrics));
