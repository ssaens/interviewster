import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import progress from './progress-s3.jpg';
import placeholder from './guide-icon.jpg';
import './style.scss';
import { GUIDE_LIST_LOAD } from 'reducer/action-types';
import { admin } from 'fetch';

const fetchGuidesThunk = () => dispatch => {
  admin.getGuides().then(res => {
    return Promise.resolve(res.data);
  }).catch(err => {
    return Promise.resolve(err.response.data);
  }).then(payload => {
    dispatch({
      type: GUIDE_LIST_LOAD,
      payload
    });
  })
};

const mapStateToProps = state => ({
  guides: state.guides.guides,
  loaded: state.guides.loaded
});

const mapDispatchToProps = dispatch => ({
  fetchGuides: () => dispatch(fetchGuidesThunk())
});

const toDisplayDate = ts => {
  const date = new Date(ts);
  return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
}

const GuideElem = props => (
  <Link to={`guides/${props.guide._id}`}>
    <div className='guide-list__elem'>
      <div className='g-card'>
        <img src={placeholder} />
      </div>
      <div className='g-desc'>
        <div className='g-desc__role bold'>{props.guide.role}</div>
        <div className='g-desc__ts'>Created On: {toDisplayDate(props.guide.createdAt)}</div>
        <div className='g-desc__author'>Created By: {props.guide.author.username}</div>
      </div>
    </div>
  </Link>
);

class GuideList extends React.PureComponent {
  componentWillMount() {
    this.props.fetchGuides();
  }

  render() {
    if (!this.props.loaded) {
      return <div />;
    }
    return (
      <div className='guide-list'>
        <div className='cg-description'>
          <div className='progress'>
            <img src={progress} />
          </div>
        </div>
        <div className='header bold'>
          My Saved Guides
        </div>
        <div className='guide-list-main'>
          {this.props.guides.map(guide => <GuideElem key={guide._id} guide={guide} />)}
          <Link to='/'>
            <div className='guide-list__elem new-elem'>
              <div className='g-card'>
                <div className='plus-container'>
                  <div className='square'>
                    <span className='content'>+</span>
                  </div>
                  <div className='text'>
                    Create New
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuideList);
