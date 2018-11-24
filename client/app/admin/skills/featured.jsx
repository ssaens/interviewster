import React from 'react';

import { SearchBar } from 'components/ui';
import SkillBox from 'components/create-guide/skill-box';

class FeaturedSkills extends React.PureComponent {
  render() {
    return (
      <div className='create-skill admin-section'>
        <div className='bold'>
          Featured Skills
        </div>
        <div className='featured-list'>
          <SkillBox skills={this.props.skills} busy={this.props.busy} />
        </div>
      </div>
    );
  }
}

export default FeaturedSkills;
