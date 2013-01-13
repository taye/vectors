Vectors
=======
They're everywhere.
___________________

## Vector.js
Make vectors
```javascript
var v;

v = new Vector(-31, 4.1);
v = v.unitVector()
    .rotateBy(Math.PI)
    .scale(1.5)
    .plus(Vector.I.scale(-2));
//  .etc()
```

## star.js
Make stars
```javascript
vectors.star(numberofPoints, inset, rotationRadians);
```

## interpolate.js
Join vectors
```javascript
interpolate(vectorArray, steps);
interpolate([Vector.I, {x: 2, y: 3}, new Vector(0, 0)], 10);
interpolate(vectors.star(5, 20));
```

## canvas.js
Draw vectors
```javascript
vectors.canvas.fill(vectorSet);
vectors.canvas.stroke(vectorSet, dontClosePath);

vectors.canvas.fill([
        Vector(300, 300),
        Vector(150, 0),
        Vector(0, 300)
    ]);
vectors.canvas.stroke(Star(10));

## animate.js
Animate vectors
```javascript
vectors.star(4)
    .scale(10)
    .animate(vectors.star(6)
            .scale(300)
            .translate(Vector(300, 300), 5000)
        .interpolate(100);
```

## splode.js
Make splosions
```javascript
splode(numberOfParticles, animationSteps, spiralFactor);
```

## vectors.js
Keeps things together

## Todo
 - animate scale and rotation
 - Fix splode
 - Splode using interpolate
 - Splode draw method with progress argument
 - duplivert/animate splosions

