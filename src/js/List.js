import React from 'react';
import classNames from 'classnames';
import ClassNameMixin from './mixins/ClassNameMixin';
import Icon from './Icon';
import RcHammer from './RcHammer';
//ENV=production import '../src/scss/components/list.scss';

var List = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string.isRequired,
    inset: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      classPrefix: 'list',
    };
  },

  render() {
    let classSet = this.getClassSet();
    const {
      className,
      inset,
      ...props
      } = this.props;

    classSet[this.prefixClass('inset')] = inset;

    // TODO: 使用 ul 可能不是太好的选择，再一些需要定义 component 的场合缺乏灵活性
    return (
      <RcHammer
        component="ul"
        {...props}
        className={classNames(classSet, className)}
      >
      </RcHammer>
    );
  }
});

List.Item = React.createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: React.PropTypes.string.isRequired,
    role: React.PropTypes.oneOf(['header', 'item']),
    title: React.PropTypes.string,
    subTitle: React.PropTypes.string,
    href: React.PropTypes.string,
    linked: React.PropTypes.bool, // linked flag for custom href like route Link
    linkComponent: React.PropTypes.any,
    linkProps: React.PropTypes.object,
    media: React.PropTypes.node,
    after: React.PropTypes.node,
    desc: React.PropTypes.node,
    nested: React.PropTypes.oneOf(['input', 'radio', 'checkbox']), // nested field
  },

  getDefaultProps() {
    return {
      classPrefix: 'item',
      role: 'item'
    };
  },

  renderTitleRow() {
    let {
      title,
      subTitle,
      href,
      linkComponent,
      } = this.props;

    let itemTitle = title ? (
      <RcHammer
        key="itemTitle"
        component="h3"
        className={this.prefixClass('title')}>
        {title}
      </RcHammer>
    ) : null;

    let titleChildren = [
      itemTitle,
      this.renderAddon('after'),
      href || linkComponent ? (
        <Icon
          className={this.prefixClass('icon')}
          name="right-nav"
          key="itemChevron"
        />
      ) : null,
    ];

    return subTitle ? (
      <RcHammer
        className={this.prefixClass('title-row')}
        key="itemTitleRow"
      >
        {titleChildren}
      </RcHammer>
    ) : titleChildren;
  },

  renderMain() {
    let {
      media,
      subTitle,
      desc,
      children
      } = this.props;
    let titleRow = this.renderTitleRow();
    let notJustTitle = media || subTitle || desc || children;

    // remove wrapper if without media/subTitle/children
    return notJustTitle ? (
      <RcHammer
        key="itemMain"
        className={this.prefixClass('main')}
      >
        {titleRow}
        {this.renderAddon('subTitle')}
        {this.renderAddon('desc')}
        {children}
      </RcHammer>
    ) : titleRow;
  },

  wrapLink(children) {
    let {
      linkComponent,
      linkProps,
      href,
      target,
      } = this.props;

    return linkComponent ?
      React.createElement(linkComponent, linkProps, children) : (
      <RcHammer
        component="a"
        href={href}
        target={target}
      >
        {children}
      </RcHammer>);
  },

  renderAddon(type) {
    return this.props[type] ? (
      <RcHammer
        key={'item-' + type}
        className={this.prefixClass(type.toLowerCase())}
      >
        {this.props[type]}
      </RcHammer>
    ) : null;
  },

  render() {
    let {
      className,
      role,
      title,
      subTitle,
      href,
      after,
      media,
      children,
      linkComponent,
      linked,
      nested,
      ...props
      } = this.props;
    let itemChildren = [
      this.renderAddon('media'),
      this.renderMain(),
    ];
    let classSet = this.getClassSet();

    classSet[this.prefixClass(nested)] = nested;
    classSet[this.prefixClass('header')] = role === 'header';
    classSet[this.prefixClass('linked')] = href || linkComponent || linked;
    subTitle && (classSet[this.prefixClass('content')] = true);

    return (
      <RcHammer
        component="li"
        {...props}
        className={classNames(classSet, className)}
      >
        {role === 'header' ? children :
          (href || linkComponent) ? this.wrapLink(itemChildren) : itemChildren}
      </RcHammer>
    );
  }
});
const List1 = List;
List1.Item = List.Item;
export default List1;
export var List = React.createFactory(List1);
List.Item = React.createFactory(List1.Item);

/**
 * TODO:
 * - 可选择列表（嵌套 radio/checkbox）图文混排的列表，
 *   考虑的创建可选择列表时根据 nested 属性自动生产 input，而不用再去嵌套 Field，
 *   以便图文混排选择实现。
 * - UE：用户如何知道这个列表是可以选择的（增加相应的提示文字？）
 * - 易用性：链接如何以更好的方式传入类似 react-router Link 这样的组件？
 */
