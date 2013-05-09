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

(function (global) {
    'use strict';

    var vectors;

    function VectorSet (vectorArray, dupliverts) {
        if (!(this instanceof VectorSet)) {
            return new VectorSet(vectorArray, dupliverts);
        }

        var i,
            len;

        if (vectorArray instanceof Array) {
            for (i = 0, len = vectorArray.length; i < len; i++) {
                this.push(vectorArray[i]);
            }
        }

        dupliverts = (vectorArray && vectorArray.dupliverts)?
            vectorArray.dupliverts: dupliverts? dupliverts: [];

        this.dupliverts = [];

        for (i = 0; i < dupliverts.length; i++) {
            this.dupliverts[i] = dupliverts[i];
        }
    }

    VectorSet.prototype = Object.create(Array.prototype);

    VectorSet.prototype.scale = function (scalar) {
        return new VectorSet(this.map(function (vector) {
                return vector.scale(scalar);
            }), this.dupliverts);
    };

    VectorSet.prototype.translate = function (transVector, y) {
        if (typeof transVector === 'number') {
            transVector = new Vector(transVector, y);
        }
        return new VectorSet(this.map(function (vector) {
                return vector.plus(transVector);
            }), this.dupliverts);
    };

    VectorSet.prototype.rotate = function (angle) {
        return new VectorSet(this.map(function (vector) {
                return vector.rotateBy(angle);
            }), this.dupliverts);
    };

    VectorSet.prototype.interpolate = function (steps) {
        return new VectorSet(vectors.interpolate(this, steps));
    };

    VectorSet.prototype.animate = function (options) {
        (options = options || {}).object = this;
        return new vectors.animate.Animation(options);
    };

    VectorSet.prototype.duplivert = function (duplicant) {
        this.dupliverts.push(duplicant);
        return this;
    };

    VectorSet.prototype.draw = function (options) {
        options = options || {};

        vectors.canvas.fill(this);

        for (var i = 0; i < this.length; i++) {
            for (var j = 0; j < this.dupliverts.length; j++) {
                this.dupliverts[j].translate(this[i]).draw();
            }
        }
        return this;
    };

    VectorSet.prototype.toString = function (rowSize, precision, format) {
        if (!this.length) {
            return '';
        }

        if (rowSize === null || rowSize === undefined) {
            rowSize = 16;
        }

        if (precision === null || precision === undefined) {
            precision = 16;
        }
        var vPrefix = '',
            vSuffix = '',
            sSuffix = '';

        if (format === 'f') {
            sSuffix = 'f';
        }
        else if (format === 'c-array') {
            vPrefix = '{';
            vSuffix = '},';
        }

        var string = [
                vPrefix,
                this[0].x.toFixed(precision),
                sSuffix,
                ',\t',
                this[0].y.toFixed(precision),
                sSuffix,
                ',\t',
                this[0].z.toFixed(precision),
                sSuffix,
                vSuffix
            ].join(''),
            i;

        for (i = 1; i < this.length; i++) {
            if (rowSize && i % rowSize === 0) {
                string += '\n';
            }
            else {
                string += ',\t';
            }

            string += [
                vPrefix,
                this[i].x.toFixed(precision),
                sSuffix,
                ',\t',
                this[i].y.toFixed(precision),
                sSuffix,
                ',\t',
                this[i].z.toFixed(precision),
                sSuffix,
                vSuffix
            ].join('');
        }
        return string;
    };

    global.vectors = vectors = {
        VectorSet: VectorSet,

        window: window
    };
} (window));
