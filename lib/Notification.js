'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notification = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _ClassNameMixin = require('./mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

require('../src/scss/components/notification.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @see https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html
// To improve reliability, CSSTransitionGroup will no longer listen to
// transition events. Instead, you should specify transition durations
// manually using props such as `transitionEnterTimeout={500}`.
// NOTE: It should less than CSS animation duration, if not, the animation
// be not smooth. It maybe a bug of React.
var TRANSITION_TIMEOUT = 250;

var Notification = _react2.default.createClass({
  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react2.default.PropTypes.string.isRequired,
    title: _react2.default.PropTypes.string,
    amStyle: _react2.default.PropTypes.string,
    closeBtn: _react2.default.PropTypes.bool,
    animated: _react2.default.PropTypes.bool,
    visible: _react2.default.PropTypes.bool,
    onDismiss: _react2.default.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'notification',
      closeBtn: true,
      onDismiss: function onDismiss() {}
    };
  },
  renderCloseBtn: function renderCloseBtn() {
    return this.props.closeBtn ? _react2.default.createElement(_Icon2.default, {
      className: this.prefixClass('icon'),
      name: 'close',
      onClick: this.props.onDismiss
    }) : null;
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props = this.props;
    var title = _props.title;
    var className = _props.className;
    var animated = _props.animated;
    var visible = _props.visible;

    var props = _objectWithoutProperties(_props, ['title', 'className', 'animated', 'visible']);

    classSet[this.prefixClass('animated')] = animated;

    var notificationBar = visible ? _react2.default.createElement(
      'div',
      _extends({}, props, {
        className: (0, _classnames2.default)(classSet, className),
        key: 'notification'
      }),
      _react2.default.createElement(
        'div',
        { className: this.prefixClass('content') },
        title ? _react2.default.createElement(
          'h3',
          { className: this.prefixClass('title') },
          title
        ) : null,
        this.props.children
      ),
      this.renderCloseBtn()
    ) : null;

    return animated ? _react2.default.createElement(
      _reactAddonsCssTransitionGroup2.default,
      {
        component: 'div',
        transitionName: 'notification',
        transitionEnterTimeout: TRANSITION_TIMEOUT,
        transitionLeaveTimeout: TRANSITION_TIMEOUT
      },
      notificationBar
    ) : notificationBar;
  }
});

var Notification1 = Notification;
exports.default = Notification1;
var Notification = exports.Notification = _react2.default.createFactory(Notification1);