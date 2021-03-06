import React, {cloneElement} from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';

var ButtonToolbar = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string.isRequired,
  },

  getDefaultProps() {
    return {
      classPrefix: 'btn-toolbar',
    };
  },

  render() {
    let classSet = this.getClassSet();

    return (
      <div
        {...this.props}
        className={classNames(this.props.className, classSet)}
      >
        {this.props.children}
      </div>
    );
  }
});
const ButtonToolbar1 = ButtonToolbar;
export default ButtonToolbar1;
export var ButtonToolbar = React.createFactory(ButtonToolbar);