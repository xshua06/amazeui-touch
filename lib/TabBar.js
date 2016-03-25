'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabBar = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ClassNameMixin = require('./mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Badge = require('./Badge');

var _Badge2 = _interopRequireDefault(_Badge);

require('../src/scss/components/tabbar.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// TODO: 默认的选中处理
var TabBar = _react2.default.createClass({
  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react2.default.PropTypes.string,
    component: _react2.default.PropTypes.node,
    amStyle: _react2.default.PropTypes.string,
    onSelect: _react2.default.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'tabbar',
      component: 'nav',
      onSelect: function onSelect() {}
    };
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props = this.props;
    var Component = _props.component;
    var className = _props.className;
    var children = _props.children;
    var onSelect = _props.onSelect;

    var props = _objectWithoutProperties(_props, ['component', 'className', 'children', 'onSelect']);

    return _react2.default.createElement(
      Component,
      _extends({}, props, {
        className: (0, _classnames2.default)(classSet, className)
      }),
      _react2.default.Children.map(children, function (child, index) {
        var _child$props = child.props;
        var key = _child$props.key;
        var eventKey = _child$props.eventKey;
        var onClick = _child$props.onClick;

        var props = _objectWithoutProperties(_child$props, ['key', 'eventKey', 'onClick']);

        var clickHandler = onClick || onSelect;
        key = key || eventKey || index;
        eventKey = eventKey || key;

        return _react2.default.createElement(TabBar.Item, _extends({}, props, {
          onClick: clickHandler.bind(null, eventKey),
          key: key,
          eventKey: eventKey
        }));
      })
    );
  }
});

// TODO:
//   Icon 应该支持用户自定义：
//   React-native 采用 require('path/to/icon') 的形式，
//   这里可能需要再添加一个属性
TabBar.Item = _react2.default.createClass({
  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react2.default.PropTypes.string,
    component: _react2.default.PropTypes.any,
    icon: _react2.default.PropTypes.string, // icon name
    title: _react2.default.PropTypes.string,
    href: _react2.default.PropTypes.string,
    eventKey: _react2.default.PropTypes.any,
    badge: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    badgeStyle: _react2.default.PropTypes.string,
    selected: _react2.default.PropTypes.bool, // alias of `active`
    selectedIcon: _react2.default.PropTypes.node },

  // not supported now
  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'tabbar',
      component: 'span',
      onSelect: function onSelect() {}
    };
  },
  renderBadge: function renderBadge() {
    var _props2 = this.props;
    var badge = _props2.badge;
    var badgeStyle = _props2.badgeStyle;


    return badge ? _react2.default.createElement(
      _Badge2.default,
      {
        amStyle: badgeStyle || 'alert',
        rounded: true },
      badge
    ) : null;
  },
  renderIcon: function renderIcon() {
    var icon = this.props.icon;


    return icon ? _react2.default.createElement(
      _Icon2.default,
      { name: icon, key: 'tabbarIcon' },
      this.renderBadge()
    ) : null;
  },
  renderTitle: function renderTitle() {
    var labelClassName = this.prefixClass('label');
    var title = this.props.title;


    return title ? _react2.default.createElement(
      'span',
      {
        className: labelClassName,
        key: 'tabbarTitle'
      },
      title
    ) : null;
  },
  render: function render() {
    var classSet = this.getClassSet(true);
    var _props3 = this.props;
    var Component = _props3.component;
    var className = _props3.className;

    var props = _objectWithoutProperties(_props3, ['component', 'className']);

    Component = this.props.href ? 'a' : Component;
    // TODO: how to display badge when icon not set?

    return _react2.default.createElement(
      Component,
      _extends({}, props, {
        className: (0, _classnames2.default)(classSet, className, this.prefixClass('item'))
      }),
      [this.renderIcon(), this.renderTitle()]
    );
  }
});

var TabBar1 = TabBar;
TabBar1.Item = TabBar.Item;
exports.default = TabBar1;
var TabBar = exports.TabBar = _react2.default.createFactory(TabBar1);
TabBar.Item = _react2.default.createFactory(TabBar1.Item);