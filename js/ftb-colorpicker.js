var cp;
var colSvgChoice;

var hexacode = document.querySelector(".hexacode");

var hex_value = document.querySelector('#hex_value');
var sliders = document.getElementsByClassName('slider');

for (var i = 0; i < sliders.length; i++) {

  noUiSlider.create(sliders[i], {
    start: 0,
    animate: false,
	//animate: true,
	behaviour: "snap",
	animationDuration: 1000,	
    connect: [true, false],
    range: {
      'min': 0,
      'max': 255
    },
    format: {
      to: function(val){
        val = String(val).split('.');
        return val[0];
      },
      from: function(val){
        val = String(val).split('.');
        return val[0];
      }
    }
  });
}

function Colorpicker(hex) {
  setNewColor(hex);
}

function setNewRGBColor(rgb) {
    setNewColor(getHexFromRGB(rgb));
  }

function setNegativeColor(rgb) {
  if (!rgb){ rgb = this.rgb; }
  var negative = getNegativeColor(rgb);
  setNewColor(getHexFromRGB(negative));
  return negative;
}

function setNewColor(hex) {
  setColorFromHex(hex);
  
  document.querySelector('#redbar').noUiSlider.set(red);
  document.querySelector('#greenbar').noUiSlider.set(green);
  document.querySelector('#bluebar').noUiSlider.set(blue);

  hex_value.value = hex;

  hexacode.style.background = getCSSFromRGB(rgb);
  
  
  


//Display colour from slider  
	
	$(this,"a.ftbQuickChoice").each(function() {

	var getHexacode = (this.hex);
	
	console.clear();
	
	//Here I can view the getHexacode 
	console.log(getHexacode)
	
	
	//This isn't changing inline WHY?
	$(this,"a.ftbQuickChoice").css({'background-color': ''+getHexacode+''});
	
	//Just crabs all colours
	//$("a.ftbQuickChoice").css({'background-color': ''+getHexacode+''});
	

	});
	  
}

function copyHex() {
    // clipboard.writeText(this.hex)
  }

function copyRGB() {
    // clipboard.writeText(this.getCSSFromRGB(this.rgb))
	
  }


document.addEventListener('DOMContentLoaded', function() {
  
  $(document).on('click', 'a.ftbQuickChoice', function (e) {
	e.preventDefault();
	colPickerDisplay();

	//var colSvgChoice = $(this).attr('data-id');
	colSvgChoice = $(this).attr('data-id');
	//console.clear();
	
	cp = Colorpicker(''+colSvgChoice+'');
	
	
});
  
  
  
  
  
  
  
}, false);

document.querySelector('#redbar').noUiSlider.on('slide', function() {
  var red = document.querySelector('#redbar').noUiSlider.get();
  setNewRGBColor([red, green, blue]);
});
document.querySelector('#greenbar').noUiSlider.on('slide', function() {
  var green = document.querySelector('#greenbar').noUiSlider.get();
  setNewRGBColor([red, green, blue]);
});
document.querySelector('#bluebar').noUiSlider.on('slide', function() {
  var blue = document.querySelector('#bluebar').noUiSlider.get();
  setNewRGBColor([red, green, blue]);
});



document.querySelector('#hex_value').oninput = function () {
  var hex = this.value.replace('#', '');
  if (hex.length !== 6) return;
  setNewColor(hex);
}

var els = document.querySelectorAll('#redvalue, #greenvalue, #bluevalue, #hex_value')
for (var el of els) {
  el.onfocus = function () {
    this.onkeydown = function(e) { changeHex(e); }
    this.onwheel = function(e) { changeHex(e); }

    function changeHex (e) {
      if (e.keyCode === 38 || e.deltaY < 0) {
        var red = (red >= 255) ? 255 :red + 1;
        var green = (green >= 255) ? 255 :green + 1;
        var blue = (blue >= 255) ? 255 :blue + 1;
        returnsetNewRGBColor([red, green, blue]);
      } else if (e.keyCode === 40 || e.deltaY > 0) {
        var red = (red <= 0) ? 0 :red - 1;
        var green = (green <= 0) ? 0 :green - 1;
        var blue = (blue <= 0) ? 0 :blue - 1;
        returnsetNewRGBColor([red, green, blue]);
      }
    }
  }
}
