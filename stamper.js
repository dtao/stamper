(function() {

  var stampedObjects  = [],
      currentObjectId = 'A'.charCodeAt(0),
      cycleCounter    = 1;

  /**
   * "Stamps" an object with a unique and readable identifier like 'A', 'B', etc.
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

    if (index === -1) {
      stampedObjects.push({
        object: object,
        id: getNextId()
      });

      index = stampedObjects.length - 1;
    }

    return stampedObjects[index].id;
  }

  /**
   * Clears all recorded object stamps. The next stamped object will be 'A' again.
   */
  stamp.clear = function clear() {
    stampedObjects.length = 0;
    currentObjectId = 'A'.charCodeAt(0);
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

  function getNextId() {
    var base = String.fromCharCode(currentObjectId++);

    if (currentObjectId > 'Z'.charCodeAt(0)) {
      currentObjectId = 'A'.charCodeAt(0);
      ++cycleCounter;
    }

    return cycleCounter > 1 ? base + cycleCounter : base;
  }

  if (typeof module === 'object' && module != null && module.exports) {
    module.exports = stamp;
  }

  this.stamp = stamp;

}).call(this);
