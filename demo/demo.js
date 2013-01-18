'use strict';

var smallStar = vectors.star(5, 0.38, Math.PI / 2).scale(50),
    largeStar = vectors.star(6).scale(250),
    events = (function () {
        'use strict';

        var addEvent = ('addEventListener' in document)?
                'addEventListener': 'attachEvent',
            removeEvent = ('removeEventListener' in document)?
                'removeEventListener': 'detachEvent',
            
            elements = [],
            targets = [];

        if (!Array.prototype.indexOf) {
            Array.prototype.indexOf = function(elt /*, from*/)   {
            var len = this.length >>> 0;

            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                ? Math.ceil(from)
                : Math.floor(from);

            if (from < 0)
                from += len;

            for (; from < len; from++)
                if (from in this && this[from] === elt)
                    return from;

            return -1;
            };
        }

        function add (element, type, listener, useCapture) {
            if (!(element instanceof window.Element) && element !== window.document) {
                return;
            }

            var target = targets[elements.indexOf(element)];

            if (!target) {
                target = {
                    events: {}
                }
                target.events[type] = [];
                elements.push(element);
                targets.push(target);
            }
            if (typeof target.events[type] !== 'array') {
                target.events[type] = [];
            }
            target.events[type].push(listener);

            return element[addEvent](type, listener, useCapture || false);
        }

        function remove (element, type, listener, useCapture) {
            var i,
                target = targets(elements.indexOf(element));

            if (index === -1) {
                return;
            }

            if (target && target.events && target.events[type]) {

                if (listener === 'all') {
                    for (i = 0; i < target.events[type].length; i++) {
                        element[removeEvent](type, target.events[type][i], useCapture || false);
                        target.events[type].splice(i, 1);
                    }
                } else {
                    for (i = 0; i < target.events[type].length; i++) {
                        if (target.events[type][i] === listener) {
                            element[removeEvent](type, target.events[type][i], useCapture || false);
                            target.events[type].splice(i, 1);
                        }
                    }
                }
            }
        }

        function removeAll (element) {
            var type,
                target = targets(elements.indexOf(element));

            for (type in target.events) {
                if (target.events.hasOwnProperty(type)) {
                    events.remove(target, type, 'all');
                }
            }
        }

        return {
            add: add,
            remove: remove,
            removeAll: removeAll
        };
    }()),
    demoElement = document.createElement('div'),
    canvas = vectors.canvas,
    supportsTouch = 'createTouch' in document,
    pageX = 0,
    pageY = 0,
    
    interval = 2000;

function animScale (progress) {
    progress = (progress % interval) / interval;

    return 0.0 + 1.0 * Math.sin(progress * 1 * Math.PI);
}

function animRot (Progress) {
    return 4 * Math.PI * pageX / window.innerWidth;
}

function animTrans (progress) {
    progress = (progress % interval) / interval;

    return Vector(pageX - canvas.element.offsetLeft + 30 * Math.sin(progress * 2 * Math.PI),
                  pageY - canvas.element.offsetTop);
}

function demo () {
    var smallStar = vectors.star(5, 0.38, 0.5 * Math.PI).scale(50),
        largeStar = smallStar.scale(5);

    smallStar
        .animate({
                translation: largeStar.translate(Vector(300, 300)),
                duration: 2000 })
            .interpolate(50)
            .animate({
                    scale: [1, 5],
                    rotation: [0, 2 * Math.PI],
                    duration: 3000 })
                .interpolate(100);
}

function setXY (event) {
    if (supportsTouch) {
        event = event.touches[0];
    }
    pageX = event.pageX;
    pageY = event.pageY;
}

events.add(document, 'DOMContentLoaded', function (event) {
    var pre = document.createElement('pre');

    pre.appendChild(document.createTextNode(demo.toString()));
    demoElement.appendChild(pre);

    demoElement.style.position = 'absolute';
    demoElement.style.left = '0px';
    demoElement.style.top = '0px';
    demoElement.style.cursor = 'pointer';

    document.body.appendChild(demoElement);

    events.add(document, 'mousemove', setXY);
    events.add(document, 'touchmove', setXY);

    events.add(demoElement, 'click', demo);
    events.add(demoElement, 'touchStart', demo);

    smallStar.animate({
        scale: animScale,
        rotation: animRot,
        translation: animTrans
    });
});

