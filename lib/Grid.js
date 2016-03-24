'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ClassNameMixin = require('./mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Grid = _react2.default.createClass({
  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react2.default.PropTypes.string.isRequired,
    component: _react2.default.PropTypes.node.isRequired,
    collapse: _react2.default.PropTypes.bool,
    avg: _react2.default.PropTypes.number,
    align: _react2.default.PropTypes.oneOf(['right', 'center', 'between', 'around'])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'g',
      component: 'div'
    };
  },


  render: function render() {
    var classSet = this.getClassSet();
    var _props = this.props;
    var Component = _props.component;
    var collapse = _props.collapse;
    var className = _props.className;
    var avg = _props.avg;
    var align = _props.align;

    var props = _objectWithoutProperties(_props, ['component', 'collapse', 'className', 'avg', 'align']);

    // .g-collapse


    classSet[this.prefixClass('collapse')] = collapse;

    if (avg) {
      classSet[this.prefixClass('avg-' + avg)] = true;
    }

    if (align) {
      classSet[this.prefixClass(align)] = true;
    }

    return _react2.default.createElement(
      Component,
      _extends({}, props, {
        className: (0, _classnames2.default)(className, classSet)
      }),
      this.props.children
    );
  }
});

exports.default = Grid;