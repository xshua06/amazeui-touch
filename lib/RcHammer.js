'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _hammerjs = require('hammerjs');

var _hammerjs2 = _interopRequireDefault(_hammerjs);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var eventList = ["hammer.input", "onTap", "onPan", "onPanstart", "onPanmove", "onPanend", "onPancancel", "onPanleft", "onPanright", "onPanup", "onPandown", "onDoubleTap", "onSwipe", "onSwipeleft", "onSwiperight", "onSwipeup", "onSwipedown", "onPress", "onPressup", "onPinch", "onPinchstart", "onPinchmove", "onPinchend", "onPinchcancel", "onPinchin", "onPinchout", "onRotate", "onRotatestart", "onRotatemove", "onRotateend", "onRotatecancel"];

var roles = ['button', 'link'];

var RcHammer = function (_Component) {
  _inherits(RcHammer, _Component);

  function RcHammer(props) {
    _classCallCheck(this, RcHammer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RcHammer).call(this, props));

    var _this$props = _this.props;
    var disabled = _this$props.disabled;
    var active = _this$props.active;
    var actived = _this$props.actived;
    var role = _this$props.role;


    if (roles.indexOf(role) != -1) {
      _this.state = { disabled: disabled, actived: actived, active: active };
    }
    return _this;
  }

  _createClass(RcHammer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var disabled = nextProps.disabled;
      var actived = nextProps.actived;
      var role = nextProps.role;

      if (roles.indexOf(role) == -1) {
        return;
      }

      if (disabled) {
        actived = false;
      }
      this.setState({ disabled: disabled, actived: actived });
    }
  }, {
    key: '_initCustomEvents',
    value: function _initCustomEvents() {
      var _this2 = this;

      var _props = this.props;
      var onDisabled = _props.onDisabled;
      var onActive = _props.onActive;
      var onAfterHandle = _props.onAfterHandle;
      var onBeforeHandle = _props.onBeforeHandle;
      var role = _props.role;


      this.hammer.on("hammer.input", function (e) {
        // 按钮不可点击
        if (_this2.state.disabled) {
          if (role == 'link') {
            e.preventDefault();
            e.srcEvent.stopPropagation();
          }
          if (e.isFirst && !e.isFinal) {
            onDisabled(e);
          }

          if (!e.isFirst && e.isFinal) {
            _this2.state.active && _this2.setState({ active: false });
          }

          return false;
        }
        // 按钮由正常状态->激活状态
        if (e.isFirst && !e.isFinal) {
          _this2.setState({ active: true });

          // 按钮处于激活状态
          onActive(e);

          onBeforeHandle(e);
        }
        // 按钮由激活状态->正常状态
        if (!e.isFirst && e.isFinal) {
          _this2.setState({ active: false });
          onAfterHandle(e);
        }
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      this.elementNode = _reactDom2.default.findDOMNode(this);
      this.hammer = new _hammerjs2.default(this.elementNode);
      var opts = this.props.options;
      if (opts) {
        Object.keys(opts).forEach(function (option) {
          if (option == "recognizers") {
            Object.keys(opts.recognizers).forEach(function (gesture) {
              _this3.hammer.get(gesture).set(_this3.props.options.recognizers[gesture]);
            });
          } else {
            var opt = {};
            opt[option] = opts.option;
            _this3.hammer.set(opt);
          }
        });
      }

      this.hammer.get("tap").set({ threshold: 10 });

      if (this.props.vertical) {
        this.hammer.get("pan").set({ direction: _hammerjs2.default.DIRECTION_ALL });
        this.hammer.get("swipe").set({ direction: _hammerjs2.default.DIRECTION_ALL });
      }

      if (this.props.role in roles) {
        this._initCustomEvents();
      }

      eventList.forEach(function (name) {
        if (_this3.props[name]) {
          var eventType = name.slice(name == "hammer.input" ? 0 : 2).toLowerCase();
          _this3.hammer.on(eventType, function () {
            var e = arguments.length <= 0 ? undefined : arguments[0];
            if (e.pointerType == "touch") {
              var _props2;

              if (_this3.elementNode.disabled || _this3.props.disabled) {
                return;
              }
              (_props2 = _this3.props)[name].apply(_props2, arguments);
            }
          });
        }
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.hammer) {
        this.hammer.stop();
        this.hammer.destroy();
      }
      this.hammer = null;
      this.elementNode = null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var component = _props3.component;
      var className = _props3.className;
      var children = _props3.children;
      var onActive = _props3.onActive;
      var onDisabled = _props3.onDisabled;
      var onAfterHandle = _props3.onAfterHandle;
      var onBeforeHandle = _props3.onBeforeHandle;

      var props = _objectWithoutProperties(_props3, ['component', 'className', 'children', 'onActive', 'onDisabled', 'onAfterHandle', 'onBeforeHandle']);

      var _state = this.state;
      var disabled = _state.disabled;
      var actived = _state.actived;
      var active = _state.active;

      props.className = (0, _classnames2.default)(className, { disabled: disabled, actived: actived, active: active });
      return _react2.default.createElement(component, props, children);
    }
  }]);

  return RcHammer;
}(_react.Component);

RcHammer.propTypes = {
  component: _react.PropTypes.string,
  className: _react.PropTypes.string,
  role: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  active: _react.PropTypes.bool,
  actived: _react.PropTypes.bool,
  options: _react.PropTypes.object,
  onActive: _react.PropTypes.func,
  onAfterHandle: _react.PropTypes.func,
  onBeforeHandle: _react.PropTypes.func,
  onDisabled: _react.PropTypes.func,
  onTap: _react.PropTypes.func
};

RcHammer.defaultProps = {
  component: "div",
  actived: false,
  active: false,
  disabled: false,
  role: "",
  className: "",
  onActive: function onActive(e) {},
  onAfterHandle: function onAfterHandle(e) {},
  onBeforeHandle: function onBeforeHandle(e) {},
  onDisabled: function onDisabled(e) {},
  onTap: function onTap(e) {}
};

exports.default = RcHammer;