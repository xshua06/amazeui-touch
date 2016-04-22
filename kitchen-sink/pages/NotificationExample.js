import React from 'react';
import {
  Container,
  Group,
  Notification,
  Button,
  Field,
} from 'amazeui-touch';

const NotificationExample = React.createClass({
  getInitialState() {
    return {
      visible: false,
      amStyle: '',
    };
  },

  openNotification() {
    this.setState({
      visible: true,
      amStyle: this.refs.barStyle.getValue()
    });
  },

  closeNotification() {
    this.setState({
      visible: false
    });
  },

  render() {
    window.that = this;
    return (
      <Container {...this.props}>
        <Notification
          amStyle={this.state.amStyle}
          visible={this.state.visible}
          animated
          onDismiss={this.closeNotification}
          closeBtn={false}
        >
          {this.state.child}
        </Notification>
      </Container>
    );
  }
});

export default NotificationExample;
