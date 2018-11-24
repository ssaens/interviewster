import React from 'react';
import classNames from 'classnames';
import './style.scss';

import { Textarea } from 'components/ui';
import Rubric from './rubric';

class Question extends React.Component {
  render() {
    const { item, dragHandle, itemSelected, commonProps } = this.props;
    return (
      <div className={classNames('question', {dragged: itemSelected !== 0})}>
        <div className='question-text rel'>
          <textarea className='question-text__input' onInput={this.onInput} />
        </div>
        <div className='question-rubric'>
          <Rubric model={item.rubric} />
        </div>
        <div className='question-control rel'>
          {dragHandle(
            <div className='drag-handle'>
              <i className='icon ion-md-reorder' />
            </div>
          )}
          <div className='close'>
            <i className='icon ion-md-close' onClick={() => commonProps.onDelete(item)} />
          </div>
        </div>
      </div>
    );
  }

  onInput = e => {
    this.props.item.text = e.target.value;
  }
}

export default Question;
