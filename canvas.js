/*
 * Copyright 2013 Taye Adeyemi
 *
 * This file is part of vectors.
 *
 * vectors is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * vectors is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with vectors.  If not, see <http://www.gnu.org/licenses/>.
 */

(function (vectors) {
    'use strict';

    var Vector = vectors.Vector,
        window = vectors.window,
        document = window.document,
        console = window.console,

        canvas,
        context;

    function Style (source) {
        for (var prop in source) {
            if (context.hasOwnProperty(prop)) {
                this[prop] = source[prop];
            }
        }
    }

    Style.prototype = {
        fill: true,
        fillColor: 'rgba(0, 153, 238, 1)',

        stroke: true,
        strokeColor: 'rgba102, 225, 107, 1)',
        strokeWidth: 4
    };

    function trace (points, begin) {
        var i = 0;

        if (begin) {
            context.beginPath();
            context.moveTo(points[0].x, points[0].y);

            i += 1;
        }

        for (; i < points.length; i++) {
            context.lineTo(points[i].x, points[i].y);
        }
    }
        
    function stroke (points, open) {
        trace(points, true);

        if (!open) {
            context.closePath();
        }
        context.stroke();
    }

    function fill (points) {
        trace(points, true);
        context.fill();
    }

    function fillStroke (points) {
        trace(points, true);

        context.closePath();
        context.fill();
        context.stroke();
    }

    function setStyle (style) {
        for (var prop in style) {
            if (context.hasOwnProperty(prop)) {
                context[prop] = typeof style[prop] === 'object'? style[prop].toString(): style[prop];
            }
        }
    }

    function clear () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (vectors.canvas.clearColor) {
            context.fillStyle = vectors.canvas.clearColor;
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    function init (event) {
        canvas = document.querySelector('canvas') || document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 800;

        context = canvas.getContext('2d');

        context.fillStyle = '#09e';
        context.strokeStyle = '#f40';
        context.lineWidth = 5;
        context.lineCap = 'round';
        context.lineJoin = 'round';

        if (!canvas.parentNode) {
            document.body.appendChild(canvas);
        }

        vectors.canvas.element = canvas;
        vectors.canvas.context = context;
    }

    document.addEventListener('DOMContentLoaded', init);

    vectors.canvas = {
        fill: fill,
        stroke: stroke,
        fillStroke: fillStroke,
        clear: clear,
        Style: Style,
        setStyle: setStyle,
        clearColor: null
    };
} (vectors));

