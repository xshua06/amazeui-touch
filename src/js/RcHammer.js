import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Hammer from 'hammerjs';
import classNames from 'classnames';


let eventList    = ["hammer.input", "onTap", "onPan", "onPanstart", "onPanmove", "onPanend", "onPancancel", "onPanleft", "onPanright", "onPanup", "onPandown", "onDoubleTap", "onSwipe", "onSwipeleft", "onSwiperight", "onSwipeup", "onSwipedown", "onPress", "onPressup", "onPinch", "onPinchstart", "onPinchmove", "onPinchend", "onPinchcancel", "onPinchin", "onPinchout", "onRotate", "onRotatestart", "onRotatemove", "onRotateend", "onRotatecancel"];

let roles        = ['button', 'link'];

class RcHammer extends Component {

  constructor(props) {
    super(props);

    let {
      disabled,
      active,
      actived,
      role
    } = this.props;

    if(roles.indexOf(role) != -1){
      this.state = {disabled, actived, active};
    }
  }

  componentWillReceiveProps(nextProps){
    let {
      disabled,
      actived,
      role,
    } = nextProps
    if(roles.indexOf(role) == -1){
      return;
    }

    if(disabled){
      actived = false;
    }
    this.setState({ disabled, actived });
  }

  _initCustomEvents(){
    let {onDisabled, onActive, onAfterHandle, onBeforeHandle, role} = this.props

    this.hammer.on("hammer.input", (e)=>{
      // 按钮不可点击
      if(this.state.disabled){
        if(role == 'link'){
          e.preventDefault();
          e.srcEvent.stopPropagation();
        }
        if(e.isFirst && !e.isFinal){
          onDisabled(e);
        }

        if(!e.isFirst && e.isFinal){
          this.state.active && this.setState({active: false});
        }

        return false
      }
      // 按钮由正常状态->激活状态
      if(e.isFirst && !e.isFinal){
        this.setState({active: true});

        // 按钮处于激活状态
        onActive(e);

        onBeforeHandle(e);
      }
      // 按钮由激活状态->正常状态
      if(!e.isFirst && e.isFinal){
        this.setState({active: false});
        onAfterHandle(e);
      }
    })
  }

  componentDidMount(){
    this.elementNode = ReactDOM.findDOMNode(this);
    this.hammer = new Hammer(this.elementNode);
    let opts = this.props.options;
    if(opts){
      Object.keys(opts).forEach( (option)=>{
        if(option == "recognizers"){
          Object.keys(opts.recognizers).forEach( (gesture) =>{
            this.hammer.get(gesture).set( this.props.options.recognizers[gesture] );
          });
        }else{
          let opt = {};
          opt[option] = opts.option;
          this.hammer.set(opt);
        }
      });
    }

    this.hammer.get("tap").set({threshold: 10});

    if(this.props.vertical){
      this.hammer.get("pan").set({ direction: Hammer.DIRECTION_ALL });
      this.hammer.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
    }

    if(this.props.role in roles){
      this._initCustomEvents();
    }

    eventList.forEach( (name) => {
      if(this.props[name]){
        let eventType = name.slice(name == "hammer.input" ? 0 : 2).toLowerCase();
        this.hammer.on(eventType, (...arg) => {
          let e = arg[0];
          if(e.pointerType == "touch"){
            if (this.elementNode.disabled || this.props.disabled){
              return
            }
            this.props[name](...arg);
          }
        })
      }
    })
  }

  componentWillUnmount(){
    if (this.hammer){
      this.hammer.stop();
      this.hammer.destroy();
    }
    this.hammer = null
    this.elementNode = null
  }

  render(){
    let {component, className, children, onActive, onDisabled, onAfterHandle, onBeforeHandle, ...props} = this.props;
    let {disabled, actived, active} = this.state;
    props.className = classNames(className, {disabled, actived, active});
    return React.createElement( component, props, children);
  }
}

RcHammer.propTypes = {
  component: PropTypes.string,
  className: PropTypes.string,
  role: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  actived: PropTypes.bool,
  options: PropTypes.object,
  onActive: PropTypes.func,
  onAfterHandle: PropTypes.func,
  onBeforeHandle: PropTypes.func,
  onDisabled: PropTypes.func,
  onTap: PropTypes.func,
}

RcHammer.defaultProps = {
  component: "div",
  actived: false,
  active: false,
  disabled: false,
  role: "",
  className: "",
  onActive: (e)=>{},
  onAfterHandle: (e)=>{},
  onBeforeHandle: (e)=>{},
  onDisabled: (e)=>{},
  onTap: (e)=>{},
}

export default RcHammer

