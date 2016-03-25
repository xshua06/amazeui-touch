import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';
import CollapseMixin from './mixins/CollapseMixin';
import Icon from './Icon';

//ENV=production import '../src/scss/components/accordion.scss';


var Accordion = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string,
    activeKey: React.PropTypes.any,
    defaultActiveKey: React.PropTypes.any,
    inset: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      classPrefix: 'accordion',
    };
  },

  getInitialState() {
    return {
      activeKey: this.props.defaultActiveKey || null
    };
  },

  shouldComponentUpdate: function() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleSelect(e, key) {
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

  renderItems() {
    let activeKey = this.props.activeKey != null ?
      this.props.activeKey : this.state.activeKey;

    return React.Children.map(this.props.children, (child, index) => {
      let {
        eventKey,
        key,
        } = child.props;
      let props = {
        key: key ? key : index,
        onSelect: this.handleSelect,
      };

      if (eventKey === undefined) {
        props.eventKey = eventKey = index;
      }

      props.expanded = eventKey === activeKey;

      return React.cloneElement(child, props);
    });
  },

  render() {
    let classSet = this.getClassSet();

    classSet[this.prefixClass('inset')] = this.props.inset;

    return (
      <section
        {...this.props}
        className={classNames(classSet, this.props.className)}
      >
        {this.renderItems()}
      </section>
    );
  }
});

Accordion.Item = React.createClass({
  mixins: [ClassNameMixin, CollapseMixin],

  propTypes: {
    title: React.PropTypes.node,
    eventKey: React.PropTypes.any,
  },

  handleClick: function(e) {
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

  handleToggle() {
    this.setState({expanded: !this.state.expanded});
  },

  getCollapsibleDimensionValue() {
    return this.refs.panel.scrollHeight;
  },

  getCollapsibleDOMNode() {
    if (!this.isMounted() || !this.refs || !this.refs.panel) {
      return null;
    }

    return this.refs.panel;
  },

  render() {
    return (
      <dl
        className={classNames(this.setClassNS('accordion-item'),
        this.isExpanded() ? this.setClassNS('active') : null)}
      >
        <dt
          onClick={this.handleClick}
          className={this.setClassNS('accordion-title')}
        >
          {this.props.title}
          <Icon
            className={this.setClassNS('accordion-icon')}
            name="right-nav"
          />
        </dt>
        <dd
          className={classNames(this.setClassNS('accordion-body'),
            this.getCollapsibleClassSet())}
          ref="panel"
        >
          <div
            className={this.setClassNS('accordion-content')}
          >
            {this.props.children}
          </div>
        </dd>
      </dl>
    );
  }
});

const Accordion1 = Accordion;
Accordion1.Item = Accordion.Item;

export default Accordion1;
export var Accordion = React.createFactory(Accordion1);
Accordion.Item = Accordion1.Item;

