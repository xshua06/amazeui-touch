'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavBar = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ClassNameMixin = require('./mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

require('../src/scss/components/navbar.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var NavBar = _react2.default.createClass({
  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react2.default.PropTypes.string,
    title: _react2.default.PropTypes.node,
    leftNav: _react2.default.PropTypes.array,
    rightNav: _react2.default.PropTypes.array,
    titleOnLeft: _react2.default.PropTypes.bool,
    onSelect: _react2.default.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'navbar',
      onSelect: function onSelect() {}
    };
  },
  renderTitle: function renderTitle() {
    var _props = this.props;
    var titleOnLeft = _props.titleOnLeft;
    var title = _props.title;

    var titlePosition = this.prefixClass(titleOnLeft ? 'left' : 'center');

    return title ? _react2.default.createElement(
      'h2',
      {
        className: (0, _classnames2.default)(this.prefixClass('title'), titlePosition)
      },
      title
    ) : this.props.children;
  },
  renderNav: function renderNav(position) {
    var nav = this.props[position + 'Nav'];

    return nav && Array.isArray(nav) ? _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)(this.prefixClass('nav'), this.prefixClass(position))
      },
      nav.map(this.renderNavItem)
    ) : null;
  },
  renderNavItem: function renderNavItem(item, index) {
    var Component = item.component || 'a';
    var itemProps = item.props || {};
    var navTitle = item.title ? _react2.default.createElement(
      'span',
      {
        className: this.prefixClass('nav-title'),
        key: 'title'
      },
      item.title
    ) : null;
    var navIconKey = 'icon';
    var navIcon = item.customIcon ? _react2.default.createElement('img', {
      src: item.customIcon,
      className: this.prefixClass('icon'),
      alt: item.title || null,
      key: navIconKey
    }) : item.icon ? _react2.default.createElement(_Icon2.default, {
      className: this.prefixClass('icon'),
      name: item.icon,
      key: navIconKey
    }) : null;

    return _react2.default.createElement(
      Component,
      _extends({
        href: item.href,
        key: 'navbarNavItem' + index,
        onClick: this.props.onSelect.bind(this, item)
      }, itemProps, {
        className: (0, _classnames2.default)(this.prefixClass('nav-item'), itemProps.className)
      }),
      [navTitle, navIcon]
    );
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props2 = this.props;
    var title = _props2.title;
    var className = _props2.className;

    var props = _objectWithoutProperties(_props2, ['title', 'className']);

    return _react2.default.createElement(
      'header',
      _extends({}, props, {
        className: (0, _classnames2.default)(classSet, className)
      }),
      this.renderTitle(),
      this.renderNav('left'),
      this.renderNav('right')
    );
  }
});

var NavBar1 = NavBar;
exports.default = NavBar1;
var NavBar = exports.NavBar = _react2.default.createFactory(NavBar1);