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

    var animations = [],
        time = {
            current: 0,
            previous: 0,
            interval: 0
        },
        running = false,
        
        interval = 40,
        timeout;

    function Animation (options) {
        if (!(this instanceof Animation)) {
            return new Animation(options);
        }
        if (!running) {
            start();
        }

        this.object = options.object;
        this.translation = options.translation || [new Vector()];
        this.scale = options.scale || [1];
        this.rotation = options.rotation || [0];

        this.start = options.start|| time.current;
        this.duration = options.duration || 1200;
        this.end = this.start + this.duration;

        animations.push(this);
    }

    Animation.prototype = {
        animate: function (options) {
            options = options || {};

            options.scale = options.scale || [1];
            options.rotation = options.rotation || [0];
            options.translation = options.translation || [new Vector()];

            // Start next animation at the end of this one
            options.scale = options.scale.map(function (scalar) {
                    return scalar * this.scale[this.scale.length - 1];
                }, this);

            options.rotation = options.rotation.map(function (angle) {
                    return angle + this.rotation[this.rotation.length - 1];
                }, this);

            options.translation = vectors.VectorSet(options.translation).translate(this.translation[this.translation.length - 1])
            options.object = this.object;

            options.start = this.end;
            return new Animation(options);
        },
        interpolate: function (steps) {
            this.translation = vectors.interpolate(this.translation, steps);
            this.scale = vectors.interpolate(this.scale, steps);
            this.rotation = vectors.interpolate(this.rotation, steps);
            return this;
        }
    };

    function start () {
        updateTime();

        running = true;

        repeatRun();
    }

    function pause () {
        if (!running) {
            return;
        }
        window.clearTimeout(timeout);
        running = false;
    }

    function run () {
        var i,
            len,
            anim;

        vectors.canvas.clear();

        for (i = 0; i < animations.length; i++) {
            anim = animations[i];

            if (time.current >= anim.end) {
                animations.splice(i, 1);

                if (!animations.length) {
                    vectors.canvas.clear();
                    pause();
                }
                continue;
            }

            if (time.current > anim.start) {
                var progress = (time.current - anim.start) / anim.duration,
                    scaleIndex = Math.floor(anim.scale.length * progress),
                    rotIndex = Math.floor(anim.rotation.length * progress),
                    transIndex = Math.floor(anim.translation.length * progress);

                anim.object
                    .scale(anim.scale[scaleIndex])
                    .rotate(anim.rotation[rotIndex])
                    .translate(anim.translation[transIndex])
                    .draw();
            }
        }
    }

    function repeatRun () {
        timeout = window.setTimeout(repeatRun, interval);

        updateTime();
        run();
    }

    function updateTime () {
        time.previous = time.current;
        time.current = new Date().getTime();

        time.interval = time.current - time.previous;
    }

    vectors.animate = {
        Animation: Animation,
        
        start: start,
        pause: pause,
        running: function () {
            return running;
        }
    };
}(vectors));
