jest.dontMock('../GetterProxy');

describe('GetterProxy', function() {
  it('should proxy', function() {
    var GetterProxy = require('../GetterProxy');

    var returnVal = {};
    var argVal = {};
    var instance = {
      setAThing: jest.genMockFn(),
      notSet: jest.genMockFn().mockReturnValue(returnVal),
      getAThing: jest.genMockFn().mockReturnValue(returnVal)
    };

    var proxy = new GetterProxy(instance);
    expect(proxy.setAThing).toBeUndefined();
    expect(proxy.notSet).toEqual(jasmine.any(Function));
    expect(proxy.getAThing).toEqual(jasmine.any(Function));

    var returned = proxy.getAThing(argVal);
    expect(instance.getAThing).toBeCalledWith(argVal);
    expect(returned).toBe(returnVal);
  });
});