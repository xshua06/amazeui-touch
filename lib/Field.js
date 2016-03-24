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

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Field = _react2.default.createClass({
  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react2.default.PropTypes.string.isRequired,
    type: _react2.default.PropTypes.string,
    label: _react2.default.PropTypes.node,
    btnBefore: _react2.default.PropTypes.node,
    btnAfter: _react2.default.PropTypes.node,
    labelBefore: _react2.default.PropTypes.node,
    labelAfter: _react2.default.PropTypes.node
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'field',
      type: 'text'
    };
  },
  getFieldDOMNode: function getFieldDOMNode() {
    return this.refs.field;
  },
  getValue: function getValue() {
    if (this.props.type === 'select' && this.props.multiple) {
      return this.getSelectedOptions();
    } else {
      return this.getFieldDOMNode().value;
    }
  },
  getChecked: function getChecked() {
    return this.getFieldDOMNode().checked;
  },
  getSelectedOptions: function getSelectedOptions() {
    var values = [];
    var options = this.getFieldDOMNode().getElementsByTagName('option');

    options.forEach(function (option) {
      if (option.selected) {
        var value = option.getAttribute('value') || option.innerHtml;

        values.push(value);
      }
    });

    return values;
  },
  isCheckboxOrRadio: function isCheckboxOrRadio() {
    return this.props.type === 'radio' || this.props.type === 'checkbox';
  },
  isFile: function isFile() {
    return this.props.type === 'file';
  },
  renderField: function renderField() {
    var field = null;
    var fieldClassName = this.isCheckboxOrRadio() || this.isFile() ? '' : this.getClassSet();
    var classes = (0, _classnames2.default)(this.props.className, fieldClassName);
    var props = {
      ref: 'field',
      key: 'formField',
      className: classes
    };

    switch (this.props.type) {
      case 'select':
        field = _react2.default.createElement(
          'select',
          _extends({}, this.props, props),
          this.props.children
        );
        break;
      case 'textarea':
        field = _react2.default.createElement('textarea', _extends({}, this.props, props));
        break;
      case 'submit':
      case 'reset':
        var _props = this.props;
        var classPrefix = _props.classPrefix;

        var others = _objectWithoutProperties(_props, ['classPrefix']);

        field = _react2.default.createElement(_Button2.default, _extends({}, props, {
          className: null
        }, others, {
          component: 'input'
        }));
        break;
      default:
        field = _react2.default.createElement('input', _extends({}, this.props, props));
    }

    return field;
  },
  renderContainer: function renderContainer(children) {
    return this.props.label ? _react2.default.createElement(
      'label',
      {
        htmlFor: this.props.id,
        className: this.prefixClass('container'),
        key: 'label' },
      _react2.default.createElement(
        'span',
        { className: this.prefixClass('label') },
        this.props.label
      ),
      children,
      this.isCheckboxOrRadio() ? _react2.default.createElement(_Icon2.default, {
        className: this.prefixClass('icon'),
        name: 'check'
      }) : null
    ) : children;
  },
  renderFieldGroup: function renderFieldGroup(children) {
    var _this = this;

    var groupPrefix = this.setClassNS('field-group');
    var labelClassName = groupPrefix + '-label';
    var _props2 = this.props;
    var labelBefore = _props2.labelBefore;
    var labelAfter = _props2.labelAfter;
    var btnBefore = _props2.btnBefore;
    var btnAfter = _props2.btnAfter;

    var props = _objectWithoutProperties(_props2, ['labelBefore', 'labelAfter', 'btnBefore', 'btnAfter']);

    var renderFiledLabel = function renderFiledLabel(type) {
      return _this.props[type] ? _react2.default.createElement(
        'span',
        {
          className: labelClassName,
          key: type
        },
        _this.props[type]
      ) : null;
    };

    return labelBefore || labelAfter || btnBefore || btnAfter ? _react2.default.createElement(
      'div',
      {
        className: groupPrefix,
        key: 'fieldGroup'
      },
      renderFiledLabel('labelBefore'),
      btnBefore,
      children,
      renderFiledLabel('labelAfter'),
      btnAfter
    ) : children;
  },
  render: function render() {
    var field = this.renderField();

    if (this.props.label) {
      return this.renderContainer(field);
    }

    return this.renderFieldGroup(field);
  }
});

exports.default = Field;