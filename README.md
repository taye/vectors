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
```

## animate.js
Animate vectors

```javascript
vectors.star(4)
    .animate({
            translation: largeStar.translate(Vector(300, 300)),
            duration: 2000 })
        .interpolate(100)
        .animate({
            scale: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            duration: 1000 });
```

## splode.js
Make (broken) splosions

```javascript
splode(numberOfParticles, animationSteps, spiralFactor);
```

## vectors.js
Keeps things together and gives us the VectorSet

```javascript
vectors.star(2) instanceof vectors.VectorSet === true // true
```

## Todo
 - interpolate scalars
 - fix splode
 - splode using interpolate
 - splode draw method with progress argument
 - duplivert/animate splosions
 - ~~animate scale and rotation~~

