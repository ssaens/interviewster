import React from 'react';
import classNames from 'classnames';
import './style.scss';

const Option = props => (
  <div className='option' onClick={() => props.onClick(props.item)}>
    {props.item.name}
  </div>
);

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected || props.defaultValue,
      open: false
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const { selected, open } = this.state;
    const { items, defaultItem } = this.props;
    return (
      <div className='ui-drop-down rel' ref={$ => this.$ = $}>
        <div 
          className={classNames('ui-drop-down__selected rel', { open })} 
          onClick={this.toggle}
        >
          {items.find(i => i.value === selected).name}
          <span className='toggle-icon'>
            <i className='icon ion-ios-arrow-down' />
          </span>
        </div>
        <div className={classNames('ui-drop-down__options', { hidden: !open })}>
          {items.map(item => 
            <Option key={item.value} item={item} onClick={this.onSelect} />
          )}
        </div>
      </div>
    );
  }

  onSelect = item => {
    this.setState({ 
      selected: item.value,
      open: false
    }, () => this.props.onSelect(item.value));
  }

  toggle = () => {
    this.setState({ open: !this.state.open });
  }

  handleClickOutside = e => {
    if (this.state.open && this.$ && !this.$.contains(e.target)) {
      this.setState({ open: false });
    }
  }
}

export default DropDown;
