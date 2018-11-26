import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './style.scss';

import Rubric from '../../create-guide/questions/question/rubric';
import { admin } from 'fetch';

const DURATION_TO_STRING_MAP = {
  30: '30 minutes',
  45: '45 minutes',
  60: '1 hour'
};

const Field = props => (
  <div className='field'>
    <span className='field__name bold'>{props.name}: </span>
    <span className='field__value'>{props.value}</span>
  </div>
);

const Skill = props => (
  <div className='skill-tag'>
    {props.skill}
  </div>
);

const Question = props => (
  <div className='question'>
    <div className='question-text'>
      <div className='question-text__input'>{props.question.text}</div>
    </div>
    <div className='question-rubric'>
      <Rubric model={props.question.rubric} />
    </div>
  </div>
);

const toDisplayDate = ts => {
  const date = new Date(ts);
  return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
}

class GuideView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      model: null,
      redirect: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    admin.getGuide(id).then(res => {
      this.setState({ loading: false, model: res.data });
    }).catch(err => {
      this.setState({ redirect: true, loading: false });
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
    if (this.state.loading) {
      return <div></div>;
    }
    return (
      <div className='guide-view'>
        <Link to='/guides'>&#8249; back to guides</Link>
        <div className='header bold'>
          { this.state.model.role }
        </div>
        <div className='section'>
          <Field name='Created On' value={toDisplayDate(this.state.model.createdAt)} />
          <Field name='Author' value={this.state.model.author.username} />
          <Field name='Duration' value={DURATION_TO_STRING_MAP[this.state.model.duration]} />
        </div>
        <div className='section'>
          <div className='bold'>
            Attached Skills
          </div>
          <div className='skills'>
            {this.state.model.skills.map(skill => <Skill key={skill} skill={skill} />)}
          </div>
        </div>
        <div className='section'>
          <div className='bold'>
            Questions
          </div>
          <div className='questions'>
            {this.state.model.questions.map(q => <Question key={q._id} question={q} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default GuideView;
