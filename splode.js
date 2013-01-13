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

    function splode (n, steps, angleDiffRatio) {
        var particles = [],
            angleDiff,
            i,
            j,
            currAngle = 0;

        n = n || 8;
        steps = steps || 100;

        if (typeof angleDiffRatio !== 'number') {
            angleDiffRatio = 1;
        }

        angleDiff = Math.PI * 2 * (1 / n) * angleDiffRatio;

        for (i = 0; i < steps; i++) {
            var linear = i / steps,
                displacement = displacements.push(linear);

            particles.push([]);

            for (j = 0; j < n; j++) {
                particles[i].push(new Vector(1, 0).rotateTo(currAngle).scale(displacement));

                currAngle += angleDiff;
            }
        }

        return points;
    }
    vectors.splode = splode;
}(vectors));
