'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Badge = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ClassNameMixin = require('./mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

require('../src/scss/components/badge.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Badge = _react2.default.createClass({
  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react2.default.PropTypes.string.isRequired,
    component: _react2.default.PropTypes.node.isRequired,
    href: _react2.default.PropTypes.string,
    amStyle: _react2.default.PropTypes.string,
    // radius: React.PropTypes.bool,
    rounded: _react2.default.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'badge',
      component: 'span'
    };
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props = this.props;
    var Component = _props.component;
    var className = _props.className;
    var href = _props.href;

    var props = _objectWithoutProperties(_props, ['component', 'className', 'href']);

    Component = href ? 'a' : Component;

    return _react2.default.createElement(
      Component,
      _extends({}, props, {
        className: (0, _classnames2.default)(classSet, className)
      }),
      this.props.children
    );
  }
});

var Badge1 = Badge;
exports.default = Badge1;
var Badge = exports.Badge = _react2.default.createFactory(Badge1);