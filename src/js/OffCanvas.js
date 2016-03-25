/**
 * @see https://github.com/negomi/react-burger-menu
 */

import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';
import BackdropMixin from './mixins/BackdropMixin';
//ENV=production import '../src/scss/components/offcanvas.scss';

var OffCanvas = React.createClass({
  mixins: [ClassNameMixin, BackdropMixin],

  propTypes: {
    classPrefix: React.PropTypes.string,
    placement: React.PropTypes.oneOf(['left', 'right']),
    onDismiss: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      classPrefix: 'offcanvas',
      placement: 'left',
    };
  },

  handleBackdropClick(e) {
    if (e && e.target === this.refs.backdrop) {
      let {
        onDismiss,
        } = this.props;

      onDismiss && onDismiss();
    }
  },

  render() {
    let classSet = this.getClassSet();
    let {
      placement,
      animation,
      className,
      children,
      isClosing,
      ...props
      } = this.props;

    classSet[this.prefixClass('out')] = isClosing;
    classSet[this.prefixClass(placement)] = !!placement;
    classSet[this.prefixClass(animation)] = !!animation;

    const offCanvas = (
      <div
        {...props}
        className={classNames(classSet, className)}
        ref="overlay"
      >
        {children}
      </div>
    );

    return this.renderBackdrop(offCanvas);
  }
});

const OffCanvas1 = OffCanvas;
export default OffCanvas1;
export var OffCanvas = React.createFactory(OffCanvas1);
