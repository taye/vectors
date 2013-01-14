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
        sequence = [0, 1, -1, -1, 1],
        centre = new Vector(0, 0),
        poly80;

    function add (n) {
        return function (number) {
            return number + n;
        };
    }

    function wrap (length) {
        return function (index) {
            if (index >= length) {
                index -= length;
            }
            else if (index < 0) {
                index += length;
            }
            return index;
        };
    }

    function Star (n, inset, rotation) {
        var angle = Math.PI * (1 / n),
            points = new vectors.VectorSet(),
            i;

        n = n || 5;
        inset = inset || 0.5;
        rotation = rotation || 0;

        for (i = 0; i < n * 2; i++) {
            var rot = rotation + angle * (i + (n % 2 ? 0.5: 0)),
                point = Vector.J.rotateBy(rot).scale(i % 2 ? inset: 1);

            points.push(point);
        }
        return points;
    }

    Star.triangles = function (star, sides) {
        var triangles = [],
        i;

        for (i = 0; i < side; i++) {
            var seq = sequence.map(add(i * 2)),
            string = '';

            seq = seq.map(wrap(star.length));

            for (var j = 0; j < seq.length; j++) {
                triangles.push(star[seq[j]]);
            }

            triangles.push(centre);
        }
    };

    function Polygon (n, rotation) {
        return Star(n / 2, 1, rotation);
    }

    poly80 = Polygon(80);

    function Circle (radius) {
       return poly80.scale(radius || 1);
    }

    vectors.star = Star;
    vectors.polygon = Polygon;
    vectors.circle = Circle;
}(vectors));

