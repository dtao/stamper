(function() {

  var stampedObjects = [],
      currentStamp   = 'A'.charCodeAt(0),
      cycleCounter   = 1;

  /**
   * "Stamps" an object with a unique and readable identifier like 'A', 'B', etc.
   * Returns an object's stamp if it's already been stamped.
   *
   * @param {Object} object
   * @return {string}
   *
   * @example
   * var obj1 = {}, obj2 = {};
   *
   * stamp(obj1); // => 'A'
   * stamp(obj2); // => 'B'
   * stamp(obj2); // => 'B'
   */
  function stamp(object) {
    var index = findObjectIndex(object);

    if (index < 0) {
      stampedObjects.push({
        object: object,
        stamp: getNextStamp()
      });

      index = stampedObjects.length - 1;
    }

    return stampedObjects[index].stamp;
  }

  /**
   * Gets an object's stamp, if it has one.
   *
   * @param {Object}
   * @return {string}
   */
  stamp.get = function get(object) {
    var index = findObjectIndex(object);
    return index >= 0 ? stampedObjects[index].stamp : null;
  };

  /**
   * Checks if an object is stamped.
   *
   * @param {Object}
   * @return {boolean}
   */
  stamp.isStamped = function isStamped(object) {
    return findObjectIndex(object) < 0;
  };

  /**
   * Clears all recorded object stamps. The next stamped object will be 'A' again.
   */
  stamp.clear = function clear() {
    stampedObjects.length = 0;
    currentStamp = 'A'.charCodeAt(0);
    cycleCounter = 1;
  };

  function findObjectIndex(object) {
    for (var i = 0; i < stampedObjects.length; ++i) {
      if (stampedObjects[i].object === object) {
        return i;
      }
    }
    return -1;
  }

  function getNextStamp() {
    var base = String.fromCharCode(currentStamp++);
    var result = cycleCounter > 1 ? base + cycleCounter : base;

    if (currentStamp > 'Z'.charCodeAt(0)) {
      currentStamp = 'A'.charCodeAt(0);
      ++cycleCounter;
    }

    return result;
  }

  if (typeof module === 'object' && module != null && module.exports) {
    module.exports = stamp;
  }

  this.stamp = stamp;

}).call(this);
