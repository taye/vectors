(function (vectors) {
    'use strict';

    var Vector = vectors.Vector;

    function fade (from, to, steps) {
        from = typeof from === 'string'? Color.fromRgba(from): from;
        to = typeof to === 'string'? Color.fromRgba(to): to;

        steps = (steps || 10) - 1;

        var colors = [],
            stepR = (from.r - to.r) / steps,
            stepG = (from.g - to.g) / steps,
            stepB = (from.b - to.b) / steps,
            stepA = (from.a - to.a) / steps;

        for (var i = 0; i < steps; i++) {
            colors.push(new Color(from.r - stepR * i,
                                  from.g - stepG * i,
                                  from.b - stepB * i,
                                  from.a - stepA * i));
        }
        colors.push(c);
        return colors;
    }

    function Color (r, g, b, a) {
        if (!(this instanceof Color)) {
            return new Color(r, g, b, a);
        }
        if (r instanceof Object) {
            a = r.a;
            g = r.g;
            b = r.b;
            r = r.r;
        }
        a = Number(a);
        if (isNaN(a)) {
            a = 1;
        }

        this.r = r || 0;
        this.g = g || 0;
        this.b = b || 0;
        this.a = a;
    }

    Color.prototype = {
        multiply: function (c) {
            if (typeof c === 'number') {
                return new Color(this.r * c,
                                 this.g * c,
                                 this.b * c,
                                 this.a * a).clip(0,1);
            }
            return new Color(this.a * c.a,
                             this.g * c.g,
                             this.b * c.b,
                             this.a * c.a).clip(0,1);
        },

        divide: function (c) {
            return this.multiply(1 / c);
        },

        add: function (c) {
            if (typeof c === 'number') {
                return new Color(this.r + c,
                                 this.g + c,
                                 this.b + c,
                                 this.a).clip(0,1);
            }
            return new Color(this.a + c.a,
                             this.g + c.g,
                             this.b + c.b,
                             this.a + c.a).clip(0,1);
        },

        subtract: function (c) {
            if (typeof c === 'number') {
                return this.add(-c);
            }
            return this.add(c.multiply(-1));
        },

        difference: function (c) {
            if (typeof c === 'number') {
                return c = {r: c, g: c, b: c, a: c};
            }

            var c = new Color(c);

            c.r = c.r > this.r?
                c.r - this.r
                : this.r - c.r;

            c.g = c.g > this.g?
                c.g - this.g
                : this.g - c.g;

            c.b = c.b > this.b?
                c.b - this.b
                : this.b - c.b;

            c.a = c.a > this.a?
                c.a - this.a
                : this.a - c.a;

            return c;
        },

        clip: function (min, max) {
            return new Color(this.r < min? min: this.r > max? max: this.r,
                             this.g < min? min: this.g > max? max: this.g,
                             this.b < min? min: this.b > max? max: this.b,
                             this.a < min? min: this.a > max? max: this.a);
        },

        negative: function () {
            return new Color(1 - this.r,
                             1 - this.g,
                             1 - this.b);
        },

        average: function () {
            return (this.r + this.g + this.b) / 3;
        },

        grayscale: function () {
            var br = this.average();
            return new Color(br, br, br, this.a);
        },

        equals: function (c) {
            return this.r === c.r &&
                   this.g === c.g &&
                   this.b === c.b &&
                   this.a === c.a;
        },

        red: function () {
            return Math.floor(this.r * 255);
        },

        green: function () {
            return Math.floor(this.g * 255);
        },

        blue: function () {
            return Math.floor(this.b * 255);
        },

        alpha: function () {
            return alpha;
        },

        rgb: function () {
            return [
                "rgb(",
                [
                    Math.floor(this.r * 255),
                    Math.floor(this.g * 255),
                    Math.floor(this.b * 255)
                ].join(', '),
                ")"
            ].join('');
        },

        rgba: function () {
            return ["rgba(", [
                Math.floor(this.r * 255),
                Math.floor(this.g * 255),
                Math.floor(this.b * 255),
                this.a
            ].join(', '), ")"].join('');
        },

        toString: function () {
            return this.rgba();
        },

        fadeTo: function (c, steps) {
            return fade(this, c, steps);
        }
    };

    Color.fromRgb = function (rgb) {
        rgba = rgba.match(/\d*[.]?\d+/g);

        return new Color(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, 1);
    };

    Color.fromRgba = function (rgba) {
        rgba = rgba.match(/\d*[.]?\d+/g);

        return new Color(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, rgba[3]);
    };

    Color.fade = fade;

    vectors.Color = Color;
}(window.vectors));
