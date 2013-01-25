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

    function joinVectors (v1, v2, steps) {
        var stepVector = v2.minus(v1).scale(1 / steps),
            interpolated = [],
            i;

        for (i = 0; i < steps; i++) {
            interpolated.push(
                v1.plus(stepVector.scale(i)));
        }
        return interpolated;
    }

    function joinScalars (s1, s2, steps) {
        var stepValue = (s2 - s1) / steps,
            interpolated = [],
            i;

        for (i = 0; i < steps; i++) {
            interpolated.push(s1 + stepValue * i);
        }
        return interpolated;
    }

    function interpolate (vertices, steps) {
        var points = [],
            joiner,
            interpolated = [],
            i,
            last = vertices.length - 1;

        if (typeof vertices[0] === 'number') {
            joiner = joinScalars;
        }
        else {
            if (!(vertices[0] instanceof Vector)) {
                vertices = vertices.map(Vector);
            }
            joiner = joinVectors;
        }

        for (i = 0; i < vertices.length - 1; i++) {
            interpolated = interpolated.concat(joiner(vertices[i], vertices[i + 1], steps));
        }

        interpolated.push(vertices[last]);
        return interpolated;
    }

    vectors.joinVectors = joinVectors;
    vectors.joinScalars = joinScalars;
    vectors.interpolate = interpolate;
} (vectors));

