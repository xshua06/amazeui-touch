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

var _CollapseMixin = require('./mixins/CollapseMixin');

var _CollapseMixin2 = _interopRequireDefault(_CollapseMixin);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Accordion = _react2.default.createClass({
  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react2.default.PropTypes.string,
    activeKey: _react2.default.PropTypes.any,
    defaultActiveKey: _react2.default.PropTypes.any,
    inset: _react2.default.PropTypes.bool,
    onSelect: _react2.default.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'accordion'
    };
  },
  getInitialState: function getInitialState() {
    return {
      activeKey: this.props.defaultActiveKey || null
    };
  },


  shouldComponentUpdate: function shouldComponentUpdate() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleSelect: function handleSelect(e, key) {
    e.preventDefault();

    if (this.props.onSelect) {
      this._isChanging = true;
      this.props.onSelect(key);
      this._isChanging = false;
    }

    if (this.state.activeKey === key) {
      key = null;
    }

    this.setState({
      activeKey: key
    });
  },
  renderItems: function renderItems() {
    var _this = this;

    var activeKey = this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;

    return _react2.default.Children.map(this.props.children, function (child, index) {
      var _child$props = child.props;
      var eventKey = _child$props.eventKey;
      var key = _child$props.key;

      var props = {
        key: key ? key : index,
        onSelect: _this.handleSelect
      };

      if (eventKey === undefined) {
        props.eventKey = eventKey = index;
      }

      props.expanded = eventKey === activeKey;

      return _react2.default.cloneElement(child, props);
    });
  },
  render: function render() {
    var classSet = this.getClassSet();

    classSet[this.prefixClass('inset')] = this.props.inset;

    return _react2.default.createElement(
      'section',
      _extends({}, this.props, {
        className: (0, _classnames2.default)(classSet, this.props.className)
      }),
      this.renderItems()
    );
  }
});

Accordion.Item = _react2.default.createClass({
  mixins: [_ClassNameMixin2.default, _CollapseMixin2.default],

  propTypes: {
    title: _react2.default.PropTypes.node,
    eventKey: _react2.default.PropTypes.any
  },

  handleClick: function handleClick(e) {
    e.selected = true;

    if (this.props.onSelect) {
      this.props.onSelect(e, this.props.eventKey);
    } else {
      e.preventDefault();
    }

    if (e.selected) {
      this.handleToggle();
    }
  },

  handleToggle: function handleToggle() {
    this.setState({ expanded: !this.state.expanded });
  },
  getCollapsibleDimensionValue: function getCollapsibleDimensionValue() {
    return this.refs.panel.scrollHeight;
  },
  getCollapsibleDOMNode: function getCollapsibleDOMNode() {
    if (!this.isMounted() || !this.refs || !this.refs.panel) {
      return null;
    }

    return this.refs.panel;
  },
  render: function render() {
    return _react2.default.createElement(
      'dl',
      {
        className: (0, _classnames2.default)(this.setClassNS('accordion-item'), this.isExpanded() ? this.setClassNS('active') : null)
      },
      _react2.default.createElement(
        'dt',
        {
          onClick: this.handleClick,
          className: this.setClassNS('accordion-title')
        },
        this.props.title,
        _react2.default.createElement(_Icon2.default, {
          className: this.setClassNS('accordion-icon'),
          name: 'right-nav'
        })
      ),
      _react2.default.createElement(
        'dd',
        {
          className: (0, _classnames2.default)(this.setClassNS('accordion-body'), this.getCollapsibleClassSet()),
          ref: 'panel'
        },
        _react2.default.createElement(
          'div',
          {
            className: this.setClassNS('accordion-content')
          },
          this.props.children
        )
      )
    );
  }
});

exports.default = Accordion;