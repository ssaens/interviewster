import React from 'react';

import { Button, Textbox, SearchBar } from 'components/ui';
import SkillBox from 'components/create-guide/skill-box';
import SelectedSkills from 'components/create-guide/selected-skills';
import { admin } from 'fetch';

class RolesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initBusy: true,
      searchBusy: true,
      searchedSkills: null,
      featuredSkills: []
    };
  }

  componentWillMount() {
    admin.getSkills().catch(err =>
      Promise.resolve({ data: [] })
    ).then(res => {
      this.setState({
        initBusy: false,
        searchBusy: false,
        featuredSkills: res.data
      });
    });
  }

  render() {
    const { searchedSkills, featuredSkills, initBusy, searchBusy } = this.state;
    const { model, busy, onSubmit, onAttach, onRemove } = this.props;
    return (
      <div>
        <Textbox 
          label='name' 
          placeholder='Ex: Leadership' 
          onInput={this.onInput}
          value={model.name}
        />
        <div className='selected-skills-container'>
          <label>selected skills:</label>
          <SelectedSkills skills={model.skills} onRemove={onRemove} />
        </div>

        <div className=''>
          <label>attach more skills</label>
          <SearchBar />
          <SkillBox skills={searchedSkills || featuredSkills} busy={searchBusy} onClick={onAttach} />
        </div>
        <Button label='create' busy={busy || initBusy} onClick={onSubmit} />
      </div>
    );
  }

  onInput = e => {
    this.props.model.name = e.target.value;
    this.forceUpdate();
  }
}

export default RolesForm;
