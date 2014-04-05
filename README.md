# stamper

Give me an object, I give you a stamp.

```javascript
var obj1 = {},
    obj2 = {},
    obj3 = {};

stamp(obj1); // => 'A'
stamp(obj2); // => 'B'
stamp(obj3); // => 'C'

// same object, same stamp
var obj = obj1;
stamp(obj); // => 'A'

obj = obj3;
stamp(obj); // => 'C'

obj = new Object();
stamp(obj); // => 'D'

obj = obj2;
stamp(obj); // => 'B'
```

Make sense? Sweet.
