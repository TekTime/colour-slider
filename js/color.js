var red;
var green;
var blue;
var rgb;
var hex;
var hsl;

function Color (r, g, b) {
  setColor(r, g, b);
}

function setColor(r, g, b) {
  red = parseInt(r, 10);
  green = parseInt(g, 10);
  blue = parseInt(b, 10);
  rgb = [r, g, b];
  hex = getHexFromRGB(rgb);
  hsl = getHSLFromRGB(rgb);
  return true;
}

function setColorFromRGB(rgb) {
  setColor(rgb[0], rgb[1], rgb[2], 1);
  return true;
}

function setColorFromHex(hex) {
  var rgb = getRGBFromHex(hex);
  setColorFromRGB(rgb);
  return true;
}

function setColorFromHSL(hsl) {
  var rgb = getRGBFromHSL(hsl);
  setColorFromRGB(rgb);
  return true;
}

function getCSSFromRGB(rgb) {
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function getHexFromRGB(rgb) {
  if (!rgb) return;
  var hex = [Number(rgb[0]).toString(16), Number(rgb[1]).toString(16), Number(rgb[2]).toString(16)];
  for (var i = 0; i < 3; i++) {
    if (hex[i] < 10 || hex[i].length === 1) hex[i] = '0' + hex[i];
  }
  return '#' + hex.join('').toUpperCase();
}

function getRGBFromHex(hex) {
  if (!hex) return;
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  var num = parseInt(hex, 16);
  return [num >> 16, num >> 8 & 255, num & 255];
}

function getHSLFromRGB(rgb) {
  if (!rgb) return;
  var r = rgb[0] / 255;
  var g = rgb[1] / 255;
  var b = rgb[2] / 255;
  var min = Math.min(r, g, b);
  var max = Math.max(r, g, b);
  var delta = max - min;
  var h, s, l;

  if (max === min) h = 0;
  else if (r === max) h = (g - b) / delta;
  else if (g === max) h = 2 + (b - r) / delta;
  else if (b === max) h = 4 + (r - g) / delta;

  h = Math.min(h * 60, 360);
  if (h < 0) h += 360;
  l = (min + max) / 2;

  if (max === min) s = 0;
  else if (l <= 0.5) s = delta / (max + min);
  else s = delta / (2 - max - min);

  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

function getRGBFromHSL(hsl) {
  var h = hsl[0] / 360
  var s = hsl[1] / 100
  var l = hsl[2] / 100
  var t1, t2, t3, rgb, val

  if (s === 0) {
    val = l * 255
    return [val, val, val]
  }
  if (l < 0.5) t2 = l * (1 + s)
  else t2 = l + s - l * s

  t1 = 2 * l - t2
  rgb = [0, 0, 0]

  for (var i = 0; i < 3; i++) {
    t3 = h + 1 / 3 * -(i - 1)
    if (t3 < 0) t3++
    if (t3 > 1) t3--
    if (6 * t3 < 1) val = t1 + (t2 - t1) * 6 * t3
    else if (2 * t3 < 1) val = t2
    else if (3 * t3 < 2) val = t1 + (t2 - t1) * (2 / 3 - t3) * 6
    else val = t1

    rgb[i] = Math.round(val * 255)
  }
  return rgb
}

function getHSLFromHex(hex) {
  var rgb = getRGBFromHex(hex)
  return getHSLFromRGB(rgb)
}

function getHexFromHSL(hsl) {
  var rgb = getRGBFromHSL(hsl)
  return getHexFromRGB(rgb)
}

function getRGBFromHSV(hsv) {
  var h = hsv[0] / 60
  var s = hsv[1] / 100
  var v = hsv[2] / 100
  var hi = Math.floor(h) % 6

  var f = h - Math.floor(h)
  var p = 255 * v * (1 - s)
  var q = 255 * v * (1 - (s * f))
  var t = 255 * v * (1 - (s * (1 - f)))
  v *= 255

  v = Math.round(v)
  t = Math.round(t)
  p = Math.round(p)
  q = Math.round(q)

  if (hi === 0) return [v, t, p]
  else if (hi === 1) return [q, v, p]
  else if (hi === 2) return [p, v, t]
  else if (hi === 3) return [p, q, v]
  else if (hi === 4) return [t, p, v]
  else if (hi === 5) return [v, p, q]
}

function getHSVFromRGB(rgb) {
  var r = rgb[0]
  var g = rgb[1]
  var b = rgb[2]
  var min = Math.min(r, g, b)
  var max = Math.max(r, g, b)
  var delta = max - min
  var h
  var s = max === 0 ? 0 : (delta / max * 1000) / 10
  var v = ((max / 255) * 1000) / 10

  if (max === min) h = 0
  else if (r === max) h = (g - b) / delta
  else if (g === max) h = 2 + ((b - r) / delta)
  else if (b === max) h = 4 + ((r - g) / delta)
  h = Math.min(h * 60, 360)
  if (h < 0) h += 360

  return [Math.round(h), Math.round(s), Math.round(v)]
}

function isDarkColor(rgb) {
  if (rgb) {
    return Math.round((
      parseInt(rgb[0], 10) * 299 +
      parseInt(rgb[1], 10) * 587 +
      parseInt(rgb[2], 10) * 114) / 1000
    ) <= 140
  }
  return Math.round((
    parseInt(red, 10) * 299 +
    parseInt(green, 10) * 587 +
    parseInt(blue, 10) * 114) / 1000
  ) <= 140
}

function setNegativeColor(rgb) {
  if (!rgb) rgb = rgb
  var negative = getNegativeColor(rgb)
  setColorFromRGB(negative)
  return negative
}

function getNegativeColor(rgb) {
  var negative = []
  for (var i = 0; i < 3; i++) {
    negative[i] = 255 - rgb[i]
  }
  return negative
}

function setGrayscale(rgb) {
  var gray = getGrayscale(rgb)
  setColorFromRGB(gray)
  return gray
}

function getGrayscale(rgb) {
  var gray = parseInt(rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11, 10)
  if (gray < 0) gray = 0
  if (gray > 255) gray = 255
  return [gray, gray, gray]
}

function setLightnessFromHSL(light, hsl) {
  var rgb = getLightnessFromHSL(light, hsl)
  setColorFromRGB(rgb)
  return rgb
}

function getLightnessFromHSL(light, hsl) {
  if (!light || !hsl) return;
  hsl = [hsl[0], hsl[1], (hsl[2] + light)]
  var rgb = getRGBFromHSL(hsl)
  for (var i = 0; i < rgb.length; i++) {
    if (rgb[i] < 0) rgb[i] = 0
    if (rgb[i] > 255) rgb[i] = 255
  }
  return rgb
}

function setLightnessFromRGB(light, rgb) {
  rgb = getLightnessFromRGB(light, rgb)
  setColorFromRGB(rgb)
  return rgb
}

function getLightnessFromRGB(light, rgb) {
  var hsl = getHSLFromRGB(rgb)
  return getLightnessFromHSL(light, hsl)
}

function setLightnessFromHex(light, hex) {
  hex = getLightnessFromHex(light, hex)
  setColorFromHex(hex)
  return hex
}

function getLightnessFromHex(light, hex) {
  var hsl = getHSLFromHex(hex)
  return getHexFromRGB(getLightnessFromHSL(light, hsl))
}

function setChangeHueFromHSL(degrees, hsl) {
  hsl = getChangeHueFromHSL(degrees, hsl)
  setColorFromHSL(hsl)
  return hsl
}

function getChangeHueFromHSL(degrees, hsl) {
    hsl[0] += degrees
    if (hsl[0] > 360) hsl[0] -= 360
    else if (hsl[0] < 0) hsl[0] += 360
    return getRGBFromHSL(hsl)
  }

function setChangeHueFromRGB(degrees, rgb) {
    rgb = getChangeHueFromRGB(degrees, rgb)
    setColorFromRGB(rgb)
    return rgb
  }

function getChangeHueFromRGB(degrees, rgb) {
  var hsl = getHSLFromRGB(rgb)
  hsl[0] += degrees
  if (hsl[0] > 360) hsl[0] -= 360
  else if (hsl[0] < 0) hsl[0] += 360
  return getRGBFromHSL(hsl)
}

function setChangeHueFromHex(degrees, hex) {
  hex = getChangeHueFromHex(degrees, hex)
  setColorFromHex(hex)
  return hex
}

function getChangeHueFromHex(degrees, hex) {
  if (!hex) return;
  var hsl = getHSLFromHex(hex)
  hsl[0] += degrees
  if (hsl[0] > 360) hsl[0] -= 360
  else if (hsl[0] < 0) hsl[0] += 360
  return getHexFromHSL(hsl)
}

function getNaturalFromRGB(percent, rgb) {
  var hsv = getHSVFromRGB(rgb)
  var h = hsv[0]
  var s = hsv[1]
  var v = hsv[2]

  h += 0.8 * percent
  if (h > 360) h -= 360
  else if (h < 0) h += 360

  if (hsv[0] > 240 || hsv[0] < 60) {
    if (percent > 0) s -= 0.7 * percent
    else s -= 0.7 * percent
    if (s > 100) s = 100
    else if (s < 0) s = 0

    if (percent < 0) v += 0.4 * percent
    else v += 0.3 * percent
    if (v > 100) v = 100
    else if (v < 0) v = 0
  } else {
    if (percent > 0) s += 0.7 * percent
    else s += 0.7 * percent
    if (s > 100) s = 100
    else if (s < 0) s = 0

    if (percent < 0) v -= 0.4 * percent
    else v -= 0.3 * percent
    if (v > 100) v = 100
    else if (v < 0) v = 0
  }

  return getRGBFromHSV([h, s, v])
}
