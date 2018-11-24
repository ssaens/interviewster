import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import progress from './progress-1.jpg';
import './style.scss';

import SelectSkills from './select-skills';
import { Button } from 'components/ui';
import {
  GUIDE_LOAD,
  FEATURED,
  GUIDE_ATTACH_SKILL,
  GUIDE_REMOVE_SKILL
} from 'reducer/action-types';
import { admin } from 'fetch';

const loadFeaturedThunk = () => dispatch => {
  admin.getFeaturedSkills().then(res => {
    return Promise.resolve(res.data);
  }).catch(err => {
    return Promise.resolve(err.response.data);
  }).then(payload => dispatch({
    type: GUIDE_LOAD,
    subtype: FEATURED,
    payload
  }));
};

const mapStateToProps = state => ({
  role: state.guide.model.role,
  skills: state.guide.model.skills,
  featuredSkills: state.guide.meta.featuredSkills,
  loadedSkills: state.guide.meta.loadedSkills
});

const mapDispatchToProps = dispatch => ({
  loadFeatured: () => dispatch(loadFeaturedThunk()),
  onAddSkill: skill => dispatch({
    type: GUIDE_ATTACH_SKILL,
    payload: skill
  }),
  onRemoveSkill: skill => dispatch({
    type: GUIDE_REMOVE_SKILL,
    payload: skill
  })
});

class CGAddSkills extends React.PureComponent {
  componentWillMount() {
    this.props.loadFeatured();
  }

  render() {
    const { role, skills, featuredSkills, loadedSkills } = this.props;
    if (!role) {
      return <Redirect to='/' />
    }
    return (
      <div className='cg-add-skills'>
        <div className='cg-description'>
          <div className='progress'>
            <img src={progress} />
          </div>
          <div className='main'>
            Select What to Assess
          </div>
          <div className='sub'>
            Research shows that interviewers are more effective when they assess skills and qualities deemed most critical for success in the role. Choose up to 8.
          </div>
        </div>
        <div className='cg-workspace'>
          <div className='cgws'>
            <div className='cgws-role'>
              Role: <span className='name'>{role.name}</span>
            </div>
            <div className='cgws-main'>
              <SelectSkills 
                skills={skills} 
                featuredSkills={featuredSkills} 
                loaded={loadedSkills} 
                onAdd={this.props.onAddSkill}
                onRemove={this.props.onRemoveSkill}
              />
            </div>
            <div className='cgws-nav rel'>
              <div className='cgws-nav__left'>
                <Link to='/'>&#8249; Back</Link>
              </div>
              <div className='cgws-nav__right'>
                <Button label='Continue' />
                <Link to='/create-guide/define-rubrics'>Skip</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onAdd = skill => console.log(skill);
  onRemove = skill => console.log(skill);
}

export default connect(mapStateToProps, mapDispatchToProps)(CGAddSkills);
