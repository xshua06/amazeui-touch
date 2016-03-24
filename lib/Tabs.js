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

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _ButtonGroup = require('./ButtonGroup');

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

require('../src/scss/components/tabs.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Tabs = _react2.default.createClass({
  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react2.default.PropTypes.string,
    defaultActiveKey: _react2.default.PropTypes.any,
    onSelect: _react2.default.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'tabs'
    };
  },
  getInitialState: function getInitialState() {
    var defaultActiveKey = this.props.defaultActiveKey != null ? this.props.defaultActiveKey : this.getDefaultActiveKey(this.props.children);

    return {
      activeKey: defaultActiveKey,
      previousActiveKey: null
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.activeKey != null && nextProps.activeKey !== this.props.activeKey) {
      this.setState({
        previousActiveKey: this.props.activeKey
      });
    }
  },
  getDefaultActiveKey: function getDefaultActiveKey(children) {
    var defaultActiveKey = null;

    _react2.default.Children.forEach(children, function (child) {
      if (defaultActiveKey == null) {
        defaultActiveKey = child.props.eventKey;
      }
    });

    return defaultActiveKey !== undefined ? defaultActiveKey : 0;
  },
  handleClick: function handleClick(key, disabled, e) {
    e.preventDefault();
    var activeKey = this.state.activeKey;

    if (disabled) {
      return null;
    }

    if (this.props.onSelect) {
      this.props.onSelect(key);
    }

    if (activeKey !== key) {
      this.setState({
        activeKey: key,
        previousActiveKey: activeKey
      });
    }
  },
  renderNav: function renderNav() {
    var _this = this;

    var activeKey = this.state.activeKey;

    var navs = _react2.default.Children.map(this.props.children, function (child, index) {
      var _child$props = child.props;
      var eventKey = _child$props.eventKey;
      var key = _child$props.key;
      var disabled = _child$props.disabled;
      var navSize = _child$props.navSize;
      var navStyle = _child$props.navStyle;


      eventKey = eventKey !== undefined ? eventKey : index;
      key = key === undefined ? index : key;
      var active = eventKey === activeKey;

      return _react2.default.createElement(
        _Button2.default,
        {
          ref: 'tabNav' + key,
          key: key,
          onClick: _this.handleClick.bind(_this, key, disabled),
          active: active,
          disabled: disabled,
          className: active ? 'active' : null,
          amSize: navSize || 'sm',
          amStyle: navStyle || 'primary',
          hollow: true
        },
        child.props.title
      );
    });

    return _react2.default.createElement(
      _ButtonGroup2.default,
      {
        className: this.prefixClass('nav'),
        justify: true
      },
      navs
    );
  },
  renderTabPanels: function renderTabPanels() {
    var activeKey = this.state.activeKey;
    var panels = _react2.default.Children.map(this.props.children, function (child, index) {
      var _child$props2 = child.props;
      var key = _child$props2.key;
      var eventKey = _child$props2.eventKey;
      var children = _child$props2.children;


      if (eventKey === undefined) {
        eventKey = index;
      }

      return _react2.default.createElement(
        Tabs.Item,
        {
          active: eventKey === activeKey,
          enventKey: eventKey,
          key: key ? key : 'tabPanel' + index
        },
        children
      );
    });

    return _react2.default.createElement(
      'div',
      {
        className: this.prefixClass('body')
      },
      panels
    );
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props = this.props;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['className']);

    return _react2.default.createElement(
      'div',
      _extends({}, props, {
        className: (0, _classnames2.default)(classSet, className)
      }),
      this.renderNav(),
      this.renderTabPanels()
    );
  }
});

Tabs.Item = _react2.default.createClass({
  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react2.default.PropTypes.string,
    title: _react2.default.PropTypes.node,
    eventKey: _react2.default.PropTypes.any,
    disabled: _react2.default.PropTypes.bool,
    active: _react2.default.PropTypes.bool,
    navSize: _react2.default.PropTypes.string,
    navStyle: _react2.default.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'tab'
    };
  },
  render: function render() {
    var classSet = this.getClassSet(true);
    var _props2 = this.props;
    var className = _props2.className;
    var children = _props2.children;

    var props = _objectWithoutProperties(_props2, ['className', 'children']);

    classSet[this.prefixClass('panel')] = true;

    return _react2.default.createElement(
      'div',
      _extends({}, props, {
        className: (0, _classnames2.default)(classSet, className)
      }),
      children
    );
  }
});

exports.default = Tabs;