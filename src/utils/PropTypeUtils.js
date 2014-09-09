"use strict";

/**
 * Check if a prop or another specified prop has a valid value
 * @type {function}
 */
exports.or = createChainableOrTypeChecker;

function createChainableOrTypeChecker(orPropName, validate) {
  function checkType(isRequired, props, propName, componentName) {
    componentName = componentName || ANONYMOUS;
    if (props[propName] == null && props[orPropName] == null) {
      if (isRequired) {
        return new Error(
          'Required prop `' + propName + '` or `' + orPropName + '` was not specified in ' +
            '`' + componentName + '`.'
        );
      }
    } else {
      var validatePropName = props[propName] == null ? orPropName : propName;
      return validate(props, validatePropName, componentName);
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}