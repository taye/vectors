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

    function joinVectors (v1, v2, segLength) {
        var joinVector = v2.minus(v1),
            magnitude = joinVector.magnitude(),
            numberOfPoints = magnitude / segLength,
            interpolated = [],
            i;

        for (i = 0; i < numberOfPoints; i++) {
            interpolated.push(
                v1.plus(joinVector.unitVector().scale(i * segLength)));
        }
        return interpolated;
    }

    function joinScalars (s1, s2, segLength) {
        var difference = s2 - s1,
            numberOfPoints = difference / segLength,
            step = (difference >= 0)? segLength: -segLength,
            interpolated = [],
            i;

        for (i = 0; i < numberOfPoints; i++) {
            interpolated.push(s1 + i * step);
        }
        return interpolated;
    }

    function interpolate (vertices, steps) {
        var points = [],
            pathLength = 0,
            segmentLength,
            joiner,
            interpolated = [],
            i,
            last = vertices.length - 1;

        if (typeof vertices[0] === 'number') {
            for (i = 0; i < last; i++) {
                pathLength += vertices[i + 1] - (vertices[i] > vertices[i + 1]? vertices[i]: -vertices[i]);
            }
            joiner = joinScalars;
        }
        else {
            if (!(vertices[0] instanceof Vector)) {
                vertices = vertices.map(Vector);
            }

            // Calculate the total length of the vertex sequence
            for (i = 0; i < vertices.length - 1; i++) {
                pathLength += vertices[i].distanceTo(vertices[i + 1]);
            }
            joiner = joinVectors;
        }

        segmentLength = pathLength / steps;

        for (i = 0; i < vertices.length - 1; i++) {
            interpolated = interpolated.concat(joiner(vertices[i], vertices[i + 1], segmentLength));
        }

        interpolated.push(vertices[last]);
        return interpolated;
    }

    vectors.joinVectors = joinVectors;
    vectors.joinScalars = joinScalars;
    vectors.interpolate = interpolate;
} (vectors));

