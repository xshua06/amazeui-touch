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

require('../src/scss/components/button.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Button = _react2.default.createClass({
  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react2.default.PropTypes.string.isRequired,
    component: _react2.default.PropTypes.node,
    href: _react2.default.PropTypes.string,
    target: _react2.default.PropTypes.string,
    amStyle: _react2.default.PropTypes.string,
    amSize: _react2.default.PropTypes.string,
    hollow: _react2.default.PropTypes.bool,
    block: _react2.default.PropTypes.bool,
    active: _react2.default.PropTypes.bool,
    disabled: _react2.default.PropTypes.bool
  },

  // radius: React.PropTypes.bool,
  // rounded: React.PropTypes.bool,
  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'btn'
    };
  },
  renderAnchor: function renderAnchor(classes) {
    var _props = this.props;
    var href = _props.href;
    var Component = _props.component;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['href', 'component', 'children']);

    Component = Component || 'a';

    href = href || '#';

    return _react2.default.createElement(
      Component,
      _extends({}, props, {
        href: href,
        className: classes,
        role: 'button'
      }),
      children
    );
  },
  renderButton: function renderButton(classes) {
    var _props2 = this.props;
    var Component = _props2.component;
    var children = _props2.children;

    var props = _objectWithoutProperties(_props2, ['component', 'children']);

    Component = Component || 'button';

    return _react2.default.createElement(
      Component,
      _extends({}, props, {
        className: classes
      }),
      children
    );
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props3 = this.props;
    var href = _props3.href;
    var target = _props3.target;
    var block = _props3.block;
    var className = _props3.className;

    var renderType = href || target ? 'renderAnchor' : 'renderButton';

    // block button
    classSet[this.prefixClass('block')] = block;

    return this[renderType]((0, _classnames2.default)(classSet, className));
  }
});

exports.default = Button;