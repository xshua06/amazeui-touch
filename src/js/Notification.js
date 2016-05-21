import React from 'react';
import classNames from 'classnames';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import ClassNameMixin from './mixins/ClassNameMixin';
import Icon from './Icon';
//ENV=production import '../src/scss/components/notification.scss';

// @see https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html
// To improve reliability, CSSTransitionGroup will no longer listen to
// transition events. Instead, you should specify transition durations
// manually using props such as `transitionEnterTimeout={500}`.
// NOTE: It should less than CSS animation duration, if not, the animation
// be not smooth. It maybe a bug of React.
const TRANSITION_TIMEOUT = 250;

var TransItem = React.createClass({

  componentDidMount(){
    let { onWillAppear, onAppear, } = this.props;
    if(onWillAppear){
      onWillAppear()
    }
    if(onAppear){
      onAppear()
    }
  },

  componentDidUpdate(){
    let { onWillEnter, onEnter, onWillLeave } = this.props;
    if(onWillEnter){
      onWillEnter()
    }
    if(onEnter){
      onEnter()
    }
    if(onWillLeave){
      onWillLeave()
    }
  },

  componentWillUnmount(){
    let { onLeave, } = this.props;
    if(onLeave){
      onLeave()
    }
  },

  render(){
    let {
      children,
      onWillLeave,
      onLeave,

      onWillEnter,
      onEnter,

      onWillAppear,
      onAppear,

      ...other
    } = this.props;
    return (
      <div
        {...other}
      >
        {children}
      </div>
    )
  }
});
var Notification = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    amStyle: React.PropTypes.string,
    closeBtn: React.PropTypes.bool,
    animated: React.PropTypes.bool,
    visible: React.PropTypes.bool,
    onClose: React.PropTypes.func,
    message: React.PropTypes.array,
    duration: React.PropTypes.number,
  },

  componentDidMount() {
    this.loopPlay();
  },

  // componentWillReceiveProps(newProps) {
  //   let {message, visible, duration} = newProps;
  //   message = message.slice();
  //   this.setState({message, visible, duration});
  // },

  loopPlay(state) {
    clearTimeout(this.loopPlayId);
    let _this = this;
    _this.last = false;
    let loop = ()=>{
      let {message, index, visible, duration} = _this.state;
      let msg, msgLen;

      // 如果隐藏掉，不处理
      if(!visible) return;
      message = message.slice();
      msg = message[index];
      if(msg){
        if(msg.timeout){
          message.splice(index, 1);
        }else{
          // 下一信息index
          index++;
        }
      }
      msgLen = message.length;

      // 如果删除timeout>0的信息后还有信息，则进行轮播
      if(msgLen > 0 && index === msgLen){
        index = 0;
      }

      if(msg){
        if(_this.last) return;
        _this.loopPlayId = setTimeout( loop, msg.timeout || duration);
        _this.setState({ msg, message, index });
        if(msg.timeout == 0 && msgLen == 1){
          _this.last = true;
        }
      }else{
        _this.setState({msg: null, visible: false});
      }

      if(msgLen == 1){
        _this.isLoop = false;
      }
    };

    // 获取第一条信息
    let duration;
    if(state){
      duration = state.duration;
    }
    if(!duration){
      duration = this.state.duration;
    }
    let message = (state ? state.message : this.state.message).slice();
    let visible = state ? state.visible : this.state.visible;

    if(!visible) return;

    let msgLen = message.length;
    let index = 0; //this.state.index;
    if(msgLen > 0){
      // 获取第一条信息的显示时间
      let msg = message[index];
      let timeout = msg.timeout;

      // 根据显示时间
      // timeout=0，一直显示duration时间但不删除，进行轮播显示;>0显示timeout时间后删除
      if(timeout){
        message.splice(index, 1); //删除该条信息
      }else{
        if( msgLen > 1) index++;
      }

      this.setState({index, message, msg, visible});

      // 在timeout 或者 duration 后显示下一信息
      if( timeout == 0 && msgLen == 1) return;

      _this.isLoop = true;
      this.loopPlayId = setTimeout( loop, timeout > 0 ? timeout : duration );
    }
  },

  getDefaultProps() {
    return {
      classPrefix: 'notification',
      closeBtn: true,
      onClose: () => {},
      message: [], // [ {content: 'aaaa', timeout: 5000}, {content: 'bbbb', timeout: 5000} ]
      duration: 3000
    };
  },

  getInitialState() {
    let index   = 0;
    let {message, visible, duration} = this.props;
    let msg = null;
    message = message.slice();
    return {
      msg,
      index,
      message,
      visible,
      duration,
    }
  },

  renderCloseBtn() {
    return this.props.closeBtn ? (
      <Icon
        className={this.prefixClass('icon')}
        name="close"
        onClick={this.props.onClose}
      />
    ) : null;
  },

  render() {
    let classSet = this.getClassSet();
    let {
      title,
      className,
      animated,
      children,
      ...props
    } = this.props;
    let { message, visible } = this.state;
    let msgLen = message.length;

    classSet[this.prefixClass('animated')] = animated;

    let msg = this.state.msg || (msgLen > 0 ? message[0] : null);

    let notificationBar= visible ? (
        <TransItem
          {...props}
          className={classNames(classSet, className)}
          key={ "notification" + (new Date).getTime()}
        >
          <div className={this.prefixClass('content')}>
            {title ? (
              <h3 className={this.prefixClass('title')}>
                {title}
              </h3>
            ) : null}
            { msg ? msg.content : null }
            { children }
          </div>
          {this.renderCloseBtn()}
        </TransItem>

      ) : null;

    let anim = (
      <CSSTransitionGroup
        component="div"
        className={classNames({"notification-loop": visible, "notification-single": !visible})}
        transitionName="notification"
        transitionEnterTimeout={TRANSITION_TIMEOUT}
        transitionLeaveTimeout={TRANSITION_TIMEOUT}
      >
        { notificationBar }
      </CSSTransitionGroup>
    );

    return animated ? anim : (<div className="notification-noanim">{ notificationBar }</div>);
  }
});

const Notification1 = Notification;
export default Notification1;
export var Notification = React.createFactory(Notification1);
