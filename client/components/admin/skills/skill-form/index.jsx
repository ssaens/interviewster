import React from 'react';

import Questions from 'components/create-guide/questions';
import { Button, Textbox } from 'components/ui';

class SkillForm extends React.PureComponent {
  render() {
    const { model, onAdd, onDelete, onReorder, onSubmit, busy } = this.props;
    return (
      <form onSubmit={onSubmit}>
        <Textbox 
          label='name' 
          placeholder='Ex: Leadership' 
          onInput={this.onInput}
          value={model.name}
        />
        <label>
          associated questions
        </label>
        <Questions 
          questions={model.questions}
          onAdd={onAdd} 
          onDelete={onDelete} 
          onReorder={onReorder}
        />
        <Button label='create' busy={busy} />
      </form>
    );
  }

  onInput = e => {
    this.props.model.name = e.target.value;
    this.forceUpdate();
  }
}

export default SkillForm;
