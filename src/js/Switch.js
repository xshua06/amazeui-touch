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
  },

  getDefaultProps() {
    return {
      classPrefix: 'switch',
      onValueChange: function() {},
    };
  },

  render() {
    let classSet = this.getClassSet();
    const {
      name,
      className,
      onValueChange,
      disabled,
      ...props
      } = this.props;

    return (
      <label
        {...props}
        className={classNames(classSet, className)}
      >
        <input
          onChange={onValueChange.bind(this)}
          name={name}
          disabled={disabled}
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
