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

    function join (v1, v2, segLength) {
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

    function interpolate (vertices, steps) {
        var points = [],
            pathLength = 0,
            segmentLength,
            interpolated = [],
            i;

        if (!(vertices[0] instanceof Vector)) {
            vertices = vertices.map(Vector);
        }

        // Calculate the total length of the vertex sequence
        for (i = 0; i < vertices.length - 1; i++) {
            pathLength += vertices[i].distanceTo(vertices[i + 1]);
        }
        segmentLength = pathLength / steps;

        for (i = 0; i < vertices.length - 1; i++) {
            interpolated = interpolated.concat(join(vertices[i], vertices[i + 1], segmentLength));
        }

        return interpolated;
    }

    vectors.join = join;
    vectors.interpolate = interpolate;
} (vectors));
