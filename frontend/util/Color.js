var Color = function(rgbArray) {
  this.color = { "value": rgbArray} ;
  this.splitComplements = this.splitComplements(this.color.value);
};

Color.prototype = {
  toHSV: function (rgbArray) {
    var r = rgbArray[0] / 255;
    var g = rgbArray[1] / 255;
    var b = rgbArray[2] / 255;
    var min = Math.min( Math.min (r, g), b);
    var max = Math.max( Math.max (r, g), b);
    var delta_max = max - min;

    var v = max;
    var h, s;

    if (delta_max === 0){
        h = 0;
        s = 0;
    } else {
      s = delta_max / max;

      delta_r = (((max - r) / 6) + (delta_max / 2)) / delta_max;
      delta_g = (((max - g) / 6) + (delta_max / 2)) / delta_max;
      delta_b = (((max - b) / 6) + (delta_max / 2)) / delta_max;

      if (r === max){
        h = delta_b - delta_g;
      } else if ( g === max) {
        h = delta_r - delta_b + 1 / 3;
      } else {
        h = delta_g - delta_r + 2 / 3;
      }
      if (h < 0) {
        h += 1;
      } else if (h > 1) {
        h -= 1;
      }
    }
    return [h, s * 100, v * 100];
  },

  toRGB: function(hsvArray) {
    var h = hsvArray[0],
    s = hsvArray[1],
    v = hsvArray[2];

    if (h < 0){
      h = 0;
    }
    if (h > 360){
      h = 360;
    }
    if (s < 0){
      s = 0;
    }
    if (s > 100){
      s = 100;
    }
    if (v < 0){
      v = 0;
    }
    if (v > 100){
      v = 100;
    }

    s /= 100;
    v /= 100;
    h /= 60;

    var chroma = v * s,
        temp = h;
    while(temp >= 2.0){
      temp -= 2.0;
    }
    var x = chroma * (1 - Math.abs(temp - 1));

    switch(Math.floor(h)){
      case 0:
        r = chroma;
        g = x;
        b = 0;
        break;
      case 1:
        r = x;
        g = chroma;
        b = 0;
        break;
      case 2:
        r = 0;
        g = chroma;
        b = x;
        break;
      case 3:
        r = 0;
        g = x;
        b = chroma;
        break;
      case 4:
        r = x;
        g = 0;
        b = chroma;
        break;
      case 5:
        r = chroma;
        g = 0;
        b = x;
        break;
      default:
        r = 0;
        g = 0;
        b = 0;
        break;
    }

    var m = v - chroma;
    r += m;
    g += m;
    b += m;
    r *= 255;
    g *= 255;
    b *= 255;

    return [r, g, b];
  },

  splitComplements: function(){
    var hsv = this.toHSV(this.color.value);
    var left = hsv.slice(0);
    var right = hsv.slice(0);
    left[0] = (left[0] * 360.0 + 30);
    right[0] = (right[0] * 360.0 - 30);
    while (left[0] > 360){
      left[0] -= 360.0;
    }
    while (right[0] < 0 ){
      right[0] += 360.0;
    }
    left = this.toRGB(left);
    right = this.toRGB(right);
    return [left, right];

  }
};

module.exports = Color;
