'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonToolbar = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ClassNameMixin = require('./mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonToolbar = _react2.default.createClass({
  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react2.default.PropTypes.string.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'btn-toolbar'
    };
  },
  render: function render() {
    var classSet = this.getClassSet();

    return _react2.default.createElement(
      'div',
      _extends({}, this.props, {
        className: (0, _classnames2.default)(this.props.className, classSet)
      }),
      this.props.children
    );
  }
});
var ButtonToolbar1 = ButtonToolbar;
exports.default = ButtonToolbar1;
var ButtonToolbar = exports.ButtonToolbar = _react2.default.createFactory(ButtonToolbar);