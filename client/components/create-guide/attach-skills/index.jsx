import React from 'react';

import { SearchBar } from 'components/ui';
import { SkillBox } from 'componetns/create-guide';

class AttachSkills extends React.PureComponent {
  render() {
    const { selected } = this.props;

    return (
      <div className='attach-skills'>
        <label>Selected</label>
        <div className='selected-skills'>

        </div>

        <SearchBar placeholder='What skills describe this role?' />

        <label>Featured</label>
        <SkillBox />
      </div>
    );
  }
}

export default AttachSkills;
