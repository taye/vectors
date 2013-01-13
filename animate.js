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

    function Animation (object, points, duration, startTime) {
        if (!(this instanceof Animation)) {
            return new Animation(object, points, duration, startTime);
        }
        if (!running) {
            start();
        }

        this.object = object;
        this.points = points;

        this.start = startTime || time.current;
        this.duration = duration || 1200;
        this.end = this.start + this.duration;

        animations.push(this);
    }

    Animation.prototype = {
        animate: function (points, duration) {
            return new Animation(this.object, points, duration, this.end);
        },
        interpolate: function (steps) {
            this.points = window.interpolate(this.points, steps);
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
                    index = Math.floor(anim.points.length * progress);

                anim.object
                    .translate(anim.points[index])
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
