import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';
//ENV=production import '../src/scss/components/view.scss';

var View = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string.isRequired,
    component: React.PropTypes.node.isRequired,
  },

  getDefaultProps() {
    return {
      classPrefix: 'view',
      component: 'div',
    };
  },

  render() {
    const {
      component,
      className,
      ...props,
      } = this.props;

    return React.createElement(component, {
      ...props,
      className: classNames(className, this.getClassSet()),
    });
  },
});

const View1 = View;
export default View1;
export var View = React.createFactory(View1);