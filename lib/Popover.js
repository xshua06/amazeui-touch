'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ClassNameMixin = require('./mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

var _BackdropMixin = require('./mixins/BackdropMixin');

var _BackdropMixin2 = _interopRequireDefault(_BackdropMixin);

require('../src/scss/components/popover.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Popover = _react2.default.createClass({
  mixins: [_ClassNameMixin2.default, _BackdropMixin2.default],

  propTypes: {
    classPrefix: _react2.default.PropTypes.string,
    placement: _react2.default.PropTypes.oneOf(['top', 'bottom', 'horizontal']),
    positionLeft: _react2.default.PropTypes.number,
    positionTop: _react2.default.PropTypes.number,
    angleLeft: _react2.default.PropTypes.number,
    angleTop: _react2.default.PropTypes.number,
    anglePosition: _react2.default.PropTypes.string,
    onDismiss: _react2.default.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'popover'
    };
  },
  handleBackdropClick: function handleBackdropClick(e) {
    if (e && e.target === this.refs.backdrop) {
      var onDismiss = this.props.onDismiss;


      onDismiss && onDismiss();
    }
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props = this.props;
    var className = _props.className;
    var children = _props.children;
    var positionLeft = _props.positionLeft;
    var positionTop = _props.positionTop;
    var angleLeft = _props.angleLeft;
    var angleTop = _props.angleTop;
    var anglePosition = _props.anglePosition;
    var isClosing = _props.isClosing;
    var placement = _props.placement;

    var props = _objectWithoutProperties(_props, ['className', 'children', 'positionLeft', 'positionTop', 'angleLeft', 'angleTop', 'anglePosition', 'isClosing', 'placement']);

    var style = {
      left: positionLeft,
      top: positionTop
    };
    var angleStyle = {
      left: angleLeft,
      top: angleTop
    };

    classSet[this.prefixClass('out')] = isClosing;
    classSet[this.prefixClass(placement)] = placement;

    var popover = _react2.default.createElement(
      'div',
      _extends({}, props, {
        style: style,
        ref: 'overlay',
        className: (0, _classnames2.default)(classSet, className)
      }),
      _react2.default.createElement(
        'div',
        { className: this.prefixClass('inner') },
        children
      ),
      _react2.default.createElement('div', {
        style: angleStyle,
        className: (0, _classnames2.default)(this.prefixClass('angle'), anglePosition ? this.prefixClass('angle-' + anglePosition) : null)
      })
    );

    return this.renderBackdrop(popover);
  }
});

exports.default = Popover;