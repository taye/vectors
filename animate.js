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

        this.object = options.object || {};
        this.translation = options.translation || [new Vector()];
        this.scale = options.scale || [1];
        this.rotation = options.rotation || [0];

        this.start = options.start|| time.current;
        this.duration = typeof options.duration === 'number'? options.duration: Infinity;
        this.end = this.start + this.duration;

        this.onEnd = typeof options.onEnd === 'function'
            ? options.onEnd
            : null;

        animations.push(this);
    }

    Animation.prototype = {
        animate: function (options) {
            options = options || {};
            options.object = this.object;

            // If an animation property is not defined,
            // use the final value of this animation
            options.scale = options.scale || [this.scale[this.scale.length - 1]];
            options.rotation = options.rotation || [this.rotation[this.rotation.length - 1]];
            options.translation = options.translation || [this.translation[this.translation.length - 1]];

            // Start next animation at the end of this one
            options.start = this.duration === Infinity? this.start: this.end;
            return new Animation(options);
        },
        interpolate: function (steps) {
            if (this.duration === Infinity) {
                return this;
            }
            this.scale = this.scale instanceof Array?
                vectors.interpolate(this.scale, steps)
                : this.scale;
            this.rotation = this.rotation instanceof Array?
                vectors.interpolate(this.rotation, steps)
                : this.rotation;
            this.translation = this.translation instanceof Array?
                vectors.interpolate(this.translation, steps)
                : this.translation;
            return this;
        },
        kill: function () {
            animations.splice(animations.indexOf(this), 1);
            if (this.onEnd) {
                this.onEnd(time.current);
            }
        }
    };

    function start () {
        time.current = new Date().getTime();
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
                anim.kill();

                if (!animations.length) {
                    vectors.canvas.clear();
                    pause();
                }
                continue;
            }

            if (time.current > anim.start) {
                var progress = (time.current - anim.start) / (anim.duration === Infinity? 1: anim.duration),
                
                    scale = (typeof anim.scale === 'function'?
                             anim.scale(progress)
                             : anim.scale[Math.floor(anim.duration === Infinity? 0: anim.scale.length * progress)]),

                    rotation = (typeof anim.rotation === 'function'?
                             anim.rotation(progress)
                             : anim.rotation[Math.floor(anim.duration === Infinity? 0: anim.rotation.length * progress)]),

                    translation = (typeof anim.translation === 'function'?
                             anim.translation(progress)
                             : anim.translation[Math.floor(anim.duration === Infinity? 0: anim.translation.length * progress)]);

                anim.object
                    .scale(scale)
                    .rotate(rotation)
                    .translate(translation)
                    .draw(progress);
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

    function killall () {
        pause();
        vectors.canvas.clear();

        while(animations.length) {
            animations[0].kill();
        }
    }

    vectors.animate = {
        Animation: Animation,
        
        start: start,
        pause: pause,
        running: function () {
            return running;
        },
        killall: killall
    };
}(vectors));
