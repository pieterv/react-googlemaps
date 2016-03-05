
jest.dontMock('../PropTypeUtils');

describe('PropTypeUtils', function() {
  describe('or', function() {
    var validate, validateRequired;

    beforeEach(function() {
      var PropTypeUtils = require('../PropTypeUtils');
      var React = require('react');
      var propType = PropTypeUtils.or('initialP', React.PropTypes.number);

      validate = function validate(prop, initialProp) {
        return propType({p: prop, initialP: initialProp}, 'p', 'Component');
      };
      validateRequired = function validateRequired(prop, initialProp) {
        return propType.isRequired({p: prop, initialP: initialProp}, 'p', 'Component');
      };
    });

    it('Should return error with valid values', function() {
      expect(validateRequired()).toEqual(jasmine.any(Error));
      expect(validateRequired(null)).toEqual(jasmine.any(Error));
      expect(validate('hi', 10)).toEqual(jasmine.any(Error));
      expect(validate(null, 'hi')).toEqual(jasmine.any(Error));
    });

    it('Should return null with valid values', function() {
      expect(validateRequired(10)).toBeNull();
      expect(validateRequired(null, 10)).toBeNull();
      expect(validateRequired(10, 'num')).toBeNull();
      expect(validate(10)).toBeNull();
      expect(validate(null, 10)).toBeNull();
    });
  });
});
