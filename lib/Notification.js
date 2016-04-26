'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notification = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _ClassNameMixin = require('./mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

require('../src/scss/components/notification.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @see https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html
// To improve reliability, CSSTransitionGroup will no longer listen to
// transition events. Instead, you should specify transition durations
// manually using props such as `transitionEnterTimeout={500}`.
// NOTE: It should less than CSS animation duration, if not, the animation
// be not smooth. It maybe a bug of React.
var TRANSITION_TIMEOUT = 250;

var TransItem = _react2.default.createClass({
  componentDidMount: function componentDidMount() {
    var _props = this.props;
    var onWillAppear = _props.onWillAppear;
    var onAppear = _props.onAppear;

    if (onWillAppear) {
      onWillAppear();
    }
    if (onAppear) {
      onAppear();
    }
  },
  componentDidUpdate: function componentDidUpdate() {
    var _props2 = this.props;
    var onWillEnter = _props2.onWillEnter;
    var onEnter = _props2.onEnter;
    var onWillLeave = _props2.onWillLeave;

    if (onWillEnter) {
      onWillEnter();
    }
    if (onEnter) {
      onEnter();
    }
    if (onWillLeave) {
      onWillLeave();
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    var onLeave = this.props.onLeave;

    if (onLeave) {
      onLeave();
    }
  },
  render: function render() {
    var _props3 = this.props;
    var children = _props3.children;
    var onWillLeave = _props3.onWillLeave;
    var onLeave = _props3.onLeave;
    var onWillEnter = _props3.onWillEnter;
    var onEnter = _props3.onEnter;
    var onWillAppear = _props3.onWillAppear;
    var onAppear = _props3.onAppear;

    var other = _objectWithoutProperties(_props3, ['children', 'onWillLeave', 'onLeave', 'onWillEnter', 'onEnter', 'onWillAppear', 'onAppear']);

    return _react2.default.createElement(
      'div',
      other,
      children
    );
  }
});
var Notification = _react2.default.createClass({
  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react2.default.PropTypes.string.isRequired,
    title: _react2.default.PropTypes.string,
    amStyle: _react2.default.PropTypes.string,
    closeBtn: _react2.default.PropTypes.bool,
    animated: _react2.default.PropTypes.bool,
    visible: _react2.default.PropTypes.bool,
    onClose: _react2.default.PropTypes.func,
    message: _react2.default.PropTypes.array,
    duration: _react2.default.PropTypes.number
  },

  componentDidMount: function componentDidMount() {
    this.loopPlay();
  },
  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    var message = newProps.message;
    var visible = newProps.visible;
    var duration = newProps.duration;

    message = message.slice();
    this.setState({ message: message, visible: visible, duration: duration });
  },
  loopPlay: function loopPlay(state) {
    clearTimeout(this.loopPlayId);
    var _this = this;
    _this.last = false;
    var loop = function loop() {
      var _this$state = _this.state;
      var message = _this$state.message;
      var index = _this$state.index;
      var visible = _this$state.visible;
      var duration = _this$state.duration;

      var msg = void 0,
          msgLen = void 0;

      // 如果隐藏掉，不处理
      if (!visible) return;
      message = message.slice();
      msg = message[index];
      if (msg) {
        if (msg.timeout) {
          message.splice(index, 1);
        } else {
          // 下一信息index
          index++;
        }
      }
      msgLen = message.length;

      // 如果删除timeout>0的信息后还有信息，则进行轮播
      if (msgLen > 0 && index === msgLen) {
        index = 0;
      }

      if (msg) {
        if (_this.last) return;
        _this.loopPlayId = setTimeout(loop, msg.timeout || duration);
        _this.setState({ msg: msg, message: message, index: index });
        if (msg.timeout == 0 && msgLen == 1) {
          _this.last = true;
        }
      } else {
        _this.setState({ msg: null, visible: false });
      }
    };

    // 获取第一条信息
    var duration = state ? state.duration : this.state.duration;
    var message = (state ? state.message : this.state.message).slice();
    var visible = state ? state.visible : this.state.visible;

    if (!visible) return;

    var msgLen = message.length;
    var index = 0; //this.state.index;
    if (msgLen > 0) {
      // 获取第一条信息的显示时间
      var msg = message[index];
      var timeout = msg.timeout;

      // 根据显示时间
      // timeout=0，一直显示duration时间但不删除，进行轮播显示;>0显示timeout时间后删除
      if (timeout) {
        message.splice(index, 1); //删除该条信息
      } else {
          if (msgLen > 1) index++;
        }

      this.setState({ index: index, message: message, msg: msg, visible: visible });

      // 在timeout 或者 duration 后显示下一信息
      if (timeout == 0 && msgLen == 1) return;
      this.loopPlayId = setTimeout(loop, timeout > 0 ? timeout : duration);
    }
  },
  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'notification',
      closeBtn: true,
      onClose: function onClose() {},
      message: [], // [ {content: 'aaaa', timeout: 5000}, {content: 'bbbb', timeout: 5000} ]
      duration: 3000
    };
  },
  getInitialState: function getInitialState() {
    var index = 0;
    var _props4 = this.props;
    var message = _props4.message;
    var visible = _props4.visible;
    var duration = _props4.duration;

    var msg = null;
    message = message.slice();
    return {
      msg: msg,
      index: index,
      message: message,
      visible: visible,
      duration: duration
    };
  },
  renderCloseBtn: function renderCloseBtn() {
    return this.props.closeBtn ? _react2.default.createElement(_Icon2.default, {
      className: this.prefixClass('icon'),
      name: 'close',
      onClick: this.props.onClose
    }) : null;
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props5 = this.props;
    var title = _props5.title;
    var className = _props5.className;
    var animated = _props5.animated;
    var children = _props5.children;

    var props = _objectWithoutProperties(_props5, ['title', 'className', 'animated', 'children']);

    var _state = this.state;
    var message = _state.message;
    var visible = _state.visible;

    var msgLen = message.length;

    classSet[this.prefixClass('animated')] = animated;

    var msg = this.state.msg || (msgLen > 0 ? message[0] : null);

    var notificationBar = visible ? _react2.default.createElement(
      TransItem,
      _extends({}, props, {
        className: (0, _classnames2.default)(classSet, className),
        key: "notification" + new Date().getTime()
      }),
      _react2.default.createElement(
        'div',
        { className: this.prefixClass('content') },
        title ? _react2.default.createElement(
          'h3',
          { className: this.prefixClass('title') },
          title
        ) : null,
        msg ? msg.content : null,
        children
      ),
      this.renderCloseBtn()
    ) : null;

    var anim = _react2.default.createElement(
      _reactAddonsCssTransitionGroup2.default,
      {
        component: 'div',
        className: (0, _classnames2.default)({ "notification-loop": visible, "notification-single": !visible }),
        transitionName: 'notification',
        transitionEnterTimeout: TRANSITION_TIMEOUT,
        transitionLeaveTimeout: TRANSITION_TIMEOUT
      },
      notificationBar
    );

    return animated ? anim : _react2.default.createElement(
      'div',
      { className: 'notification-noanim' },
      notificationBar
    );
  }
});

var Notification1 = Notification;
exports.default = Notification1;
var Notification = exports.Notification = _react2.default.createFactory(Notification1);