import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';
//ENV=production import '../src/scss/components/switch.scss';

var Switch = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    amStyle: React.PropTypes.string,
    onValueChange: React.PropTypes.func,
    checked: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      classPrefix: 'switch',
      onValueChange: function() {},
      checked: false,
      disabled: false
    };
  },

  getInitialState() {
    return {
      checked: this.props.checked
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      checked: nextProps.checked
    });
  },

  onValueChange(e){
    let {
      onValueChange
    } = this.props;

    let {
      checked
    } = this.state;

    checked = !checked;
    this.setState({
      checked
    }, () => {
      onValueChange.call(this, checked);
    });
  },

  render() {
    let classSet = this.getClassSet();
    const {
      name,
      className,
      disabled,
      ...props
      } = this.props;

    let checked = this.state.checked;
    return (
      <label
        {...props}
        className={classNames(classSet, className)}
      >
        <input
          onChange={this.onValueChange}
          name={name}
          disabled={disabled}
          checked={checked}
          type="checkbox"
          ref="field"
        />
        <span className={this.prefixClass('label')} />
      </label>
    );
  }
});

const Switch1 = Switch;
export default Switch1;
export var Switch = React.createFactory(Switch1);
