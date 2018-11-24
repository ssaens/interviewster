import React from 'react';
import DraggableList from 'react-draggable-list';
import './style.scss';

import Question from './question';

class Questions extends React.Component {
  render() {
    const { questions, onAdd, onUpdate, onDelete, onReorder } = this.props;
    return (
      <div className='questions'>
        <DraggableList
          commonProps={{
            onDelete,
            onUpdate
          }}
          itemKey={this.itemKey}
          template={Question}
          list={questions}
          onMoveEnd={onReorder}
        />
        <div className='new-question' onClick={onAdd}>
          Add Question
        </div>
      </div>
    );
  }

  itemKey = item => `q-${item._id}`
}

export default Questions;