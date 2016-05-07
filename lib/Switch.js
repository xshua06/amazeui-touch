'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Switch = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ClassNameMixin = require('./mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

require('../src/scss/components/switch.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Switch = _react2.default.createClass({
  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react2.default.PropTypes.string.isRequired,
    name: _react2.default.PropTypes.string,
    amStyle: _react2.default.PropTypes.string,
    onValueChange: _react2.default.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'switch',
      onValueChange: function onValueChange() {}
    };
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props = this.props;
    var name = _props.name;
    var className = _props.className;
    var onValueChange = _props.onValueChange;
    var disabled = _props.disabled;

    var props = _objectWithoutProperties(_props, ['name', 'className', 'onValueChange', 'disabled']);

    return _react2.default.createElement(
      'label',
      _extends({}, props, {
        className: (0, _classnames2.default)(classSet, className)
      }),
      _react2.default.createElement('input', {
        onChange: onValueChange.bind(this),
        name: name,
        disabled: disabled,
        type: 'checkbox',
        ref: 'field'
      }),
      _react2.default.createElement('span', { className: this.prefixClass('label') })
    );
  }
});

var Switch1 = Switch;
exports.default = Switch1;
var Switch = exports.Switch = _react2.default.createFactory(Switch1);