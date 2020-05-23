# Throttle-stream
This is a little bit more modern throttle stream i.e. transform stream that has an ability to control amount of data that is being passed in a unit of time.

Throttle stream extends the native Transform stream class. You can make a new Throttle class instance this way:

```javascript
  const Throttle = require('throttle-stream');
  const throttle = new Throttle({ bytes: 1000, interval: 100 });
```
While creating the instance of the class pass an object as an argument with following properties:

```javascript
  const options = {
    bytes: 1000, // Integer. Size of a chunk to be read per interval
    interval: 100 // Integer. Time between chunk passing. In miliseconds.
  };
```
## Example
```javascript
  const Throttle = require('throttle-stream');
  
  const input = getReadableStreamSomehow();
  const output = createWritableStreamSomehow();
  
  input.pipe(new Throttle({ bytes: 6000, interval: 1000 })).pipe(output);

```
This implementation will send 6000 bytes of data to the output every 1000 miliseconds.
