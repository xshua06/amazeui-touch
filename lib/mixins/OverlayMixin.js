'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Overlay Mixin
 *
 * @desc `overlay` is something like Popover, OffCavans, etc.
 */

exports.default = {
  propTypes: {
    container: _react2.default.PropTypes.node
  },

  componentDidMount: function componentDidMount() {
    this._renderOverlay();
  },
  componentDidUpdate: function componentDidUpdate() {
    this._renderOverlay();
  },


  // Remove Overlay related DOM node
  componentWillUnmount: function componentWillUnmount() {
    this._unmountOverlay();

    if (this._overlayWrapper) {
      this.getContainerDOMNode().removeChild(this._overlayWrapper);
      this._overlayWrapper = null;
    }
  },


  // Create Overlay wrapper
  _mountOverlayWrapper: function _mountOverlayWrapper() {
    this._overlayWrapper = document.createElement('div');
    this.getContainerDOMNode().appendChild(this._overlayWrapper);
  },


  // Render Overlay to wrapper
  _renderOverlay: function _renderOverlay() {
    if (!this._overlayWrapper) {
      this._mountOverlayWrapper();
    }

    var overlay = this.renderOverlay();

    if (overlay !== null) {
      this._overlayInstance = _reactDom2.default.render(overlay, this._overlayWrapper);
    } else {
      // Unmount if the component is null for transitions to null
      this._unmountOverlay();
    }
  },


  // Remove a mounted Overlay from wrapper
  _unmountOverlay: function _unmountOverlay() {
    _reactDom2.default.unmountComponentAtNode(this._overlayWrapper);
    this._overlayInstance = null;
  },
  getOverlayDOMNode: function getOverlayDOMNode() {
    if (!this.isMounted()) {
      throw new Error('getOverlayDOMNode(): A component must be mounted to\n        have a DOM node.');
    }

    if (this._overlayInstance) {
      // 包含 backdrop 时通过 refer 返回 overlay DOM 节点
      return _reactDom2.default.findDOMNode(this._overlayInstance.refs && this._overlayInstance.refs.overlay || this._overlayInstance);
    }

    return null;
  },
  getContainerDOMNode: function getContainerDOMNode() {
    return _reactDom2.default.findDOMNode(this.props.container) || document.body;
  }
};