import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';
import RcHammer from './RcHammer';
//ENV=production import '../src/scss/components/icon.scss';

var Icon = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string.isRequired,
    component: React.PropTypes.node.isRequired,
    name: React.PropTypes.string.isRequired,
    href: React.PropTypes.string,
    // amStyle: React.PropTypes.string,
    // button: React.PropTypes.bool,
    // size: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      classPrefix: 'icon',
      component: 'span'
    };
  },

  render() {
    let classSet = this.getClassSet();
    let {
      className,
      name,
      ...props
      } = this.props;

    // icon-[iconName]
    classSet[this.prefixClass(name)] = true;

    return (
      <RcHammer
        {...props}
        className={classNames(classSet, className)}
      >
        {this.props.children}
      </RcHammer>
    );
  }
});

const Icon1 = Icon;
export default Icon1;
export var Icon = React.createFactory(Icon1);

