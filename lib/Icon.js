'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Icon = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ClassNameMixin = require('./mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

var _RcHammer = require('./RcHammer');

var _RcHammer2 = _interopRequireDefault(_RcHammer);

require('../src/scss/components/icon.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Icon = _react2.default.createClass({
  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react2.default.PropTypes.string.isRequired,
    component: _react2.default.PropTypes.node.isRequired,
    name: _react2.default.PropTypes.string.isRequired,
    href: _react2.default.PropTypes.string
  },

  // amStyle: React.PropTypes.string,
  // button: React.PropTypes.bool,
  // size: React.PropTypes.string,
  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'icon',
      component: 'span'
    };
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props = this.props;
    var Component = _props.component;
    var className = _props.className;
    var href = _props.href;
    var name = _props.name;

    var props = _objectWithoutProperties(_props, ['component', 'className', 'href', 'name']);

    Component = href ? 'a' : Component;

    if (href) {
      props.component = Component;
      props.href = href;
    }

    // icon-[iconName]
    classSet[this.prefixClass(name)] = true;

    return _react2.default.createElement(
      _RcHammer2.default,
      _extends({
        className: (0, _classnames2.default)(classSet, className)
      }, props),
      this.props.children
    );
  }
});

var Icon1 = Icon;
exports.default = Icon1;
var Icon = exports.Icon = _react2.default.createFactory(Icon1);