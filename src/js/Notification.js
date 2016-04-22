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
  },

  componentDidMount() {
    let {children} = this.props;
    let childs = React.Children.toArray(children);
    this.loopPlay( childs, this.props );
  },

  componentWillReceiveProps(newProps) {
    let {children, visible} = newProps;
    let childs = React.Children.toArray(children);
    clearTimeout(this.loopPlayId);
    this.loopPlay( childs, newProps );
  },

  loopPlay(childs = [], props) {
    let index = 0;
    let len = childs.length;
    let loop = ()=>{
      let {visible} = props;
      if(visible && len > 1){
        this.setState({ child: childs[index] });
        index++;
        if(index === len){
          index = 0;
        }
        this.loopPlayId = setTimeout( loop, 3000);
      }
    }

    loop();
  },

  getDefaultProps() {
    return {
      classPrefix: 'notification',
      closeBtn: true,
      onClose: () => {},
    };
  },

  getInitialState() {
    return {
      child: null
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
      visible,
      children,
      ...props
    } = this.props;

    let childs = React.Children.toArray(children);
    let childsLen = childs.length;

    if(!childsLen) return null;

    classSet[this.prefixClass('animated')] = animated;

    let child = this.state.child;
    let notificationBar= visible ? (
        <div
          {...props}
          className={classNames(classSet, className)}
          key={ "notification" + (child && child.key || child) }
        >
          <div className={this.prefixClass('content')}>
            {title ? (
              <h3 className={this.prefixClass('title')}>
                {title}
              </h3>
            ) : null}
            { childsLen > 1 ? child : children }
          </div>
          {this.renderCloseBtn()}
        </div>
      ) : null;

    let anim = (
      <CSSTransitionGroup
        component="div"
        className={classNames({"notification-loop": visible && childsLen > 1, "notification-single": !visible || childsLen == 1})}
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
