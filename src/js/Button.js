import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';
//ENV=production import '../src/scss/components/button.scss';

const Button = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string.isRequired,
    component: React.PropTypes.node,
    href: React.PropTypes.string,
    target: React.PropTypes.string,
    amStyle: React.PropTypes.string,
    amSize: React.PropTypes.string,
    hollow: React.PropTypes.bool,
    block: React.PropTypes.bool,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    // radius: React.PropTypes.bool,
    // rounded: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      classPrefix: 'btn',
    };
  },

  renderAnchor(classes) {
    let {
      href,
      component: Component,
      children,
      ...props
      } = this.props;
    Component = Component || 'a';

    href = href || '#';

    return (
      <Component
        {...props}
        href={href}
        className={classes}
        role="button"
      >
        {children}
      </Component>
    );
  },

  renderButton(classes) {
    let {
      component: Component,
      children,
      ...props,
      } = this.props;
    Component = Component || 'button';

    return (
      <Component
        {...props}
        className={classes}
      >
        {children}
      </Component>
    );
  },

  render() {
    let classSet = this.getClassSet();
    let {
      href,
      target,
      block,
      className,
      } = this.props;
    let renderType = href || target ? 'renderAnchor' : 'renderButton';

    // block button
    classSet[this.prefixClass('block')] = block;

    return this[renderType](classNames(classSet, className));
  }
});

const Button1 = Button;
export default Button1;
export var Button = React.createFactory(Button1);


