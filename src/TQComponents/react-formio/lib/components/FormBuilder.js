'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _components = require('formiojs/components');

var _components2 = _interopRequireDefault(_components);

var _Components = require('formiojs/components/Components');

var _Components2 = _interopRequireDefault(_Components);

var _FormBuilder = require('formiojs/FormBuilder');

var _FormBuilder2 = _interopRequireDefault(_FormBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_Components2.default.setComponents(_components2.default);

var _class = function (_Component) {
  _inherits(_class, _Component);

  function _class() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  return _class;
}(_react.Component);

_class.defaultProps = {
  options: {}
};
_class.propTypes = {
  form: _propTypes2.default.object,
  options: _propTypes2.default.object,
  onSaveComponent: _propTypes2.default.func,
  onUpdateComponent: _propTypes2.default.func,
  onDeleteComponent: _propTypes2.default.func,
  onCancelComponent: _propTypes2.default.func,
  onEditComponent: _propTypes2.default.func
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.componentDidMount = function () {
    _this2.initializeBuilder();
  };

  this.componentWillUnmount = function () {
    if (_this2.builder !== undefined) {
      _this2.builder.instance.destroy(true);
    }
  };

  this.initializeBuilder = function () {
    var _props = _this2.props,
        options = _props.options,
        form = _props.form;


    _this2.builder = new _FormBuilder2.default(_this2.element, form, options);
    _this2.builderReady = _this2.builder.setDisplay(form.display);

    _this2.builderReady.then(function () {
      _this2.builder.instance.on('saveComponent', _this2.emit('onSaveComponent'));
      _this2.builder.instance.on('updateComponent', _this2.emit('onUpdateComponent'));
      _this2.builder.instance.on('deleteComponent', _this2.emit('onDeleteComponent'));
      _this2.builder.instance.on('cancelComponent', _this2.emit('onCancelComponent'));
      _this2.builder.instance.on('editComponent', _this2.emit('onEditComponent'));
      _this2.builder.instance.on('saveComponent', _this2.onChange);
      _this2.builder.instance.on('updateComponent', _this2.onChange);
      _this2.builder.instance.on('deleteComponent', _this2.onChange);
    });
  };

  this.componentWillReceiveProps = function (nextProps) {
    var _props2 = _this2.props,
        options = _props2.options,
        form = _props2.form;


    if (form !== nextProps.form) {
      _this2.initializeBuilder();
    }

    if (options !== nextProps.options) {
      _this2.initializeBuilder();
    }
  };

  this.render = function () {
    return _react2.default.createElement('div', { ref: function ref(element) {
        return _this2.element = element;
      } });
  };

  this.onChange = function () {
    if (_this2.props.hasOwnProperty('onChange') && typeof _this2.props.onChange === 'function') {
      _this2.props.onChange(_this2.builder.instance.schema);
    }
  };

  this.emit = function (funcName) {
    return function () {
      if (_this2.props.hasOwnProperty(funcName) && typeof _this2.props[funcName] === 'function') {
        var _props3;

        (_props3 = _this2.props)[funcName].apply(_props3, arguments);
      }
    };
  };
};

exports.default = _class;