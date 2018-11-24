import React from 'react';

import { SearchBar } from 'components/ui';
import SkillBox from 'components/create-guide/skill-box';

class AllSkills extends React.PureComponent {
  render() {
    const { skills, busy } = this.props;
    return (
      <div className='create-skill admin-section'>
        <div className='bold'>
          All Skills
        </div>
        <SearchBar placeholder='filter' />
        <div className='featured-list'>
          <SkillBox skills={skills} busy={busy} />
        </div>
      </div>
    );
  }
}

export default AllSkills;
