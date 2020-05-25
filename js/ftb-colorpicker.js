 var cp;
var colSvgChoice;
var target;
var targetSVG;
var color;
var items;

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
  
	color = hex;
  
	hexacode.style.background = getCSSFromRGB(rgb);

	//Tried to get value via textbox input no joy!
	//targetSVG = $("#hex_value").val()
	
	//Just not working correctly
	//targetSVG.items[i].set('fill', ''+hex+'');
	
	target.css({'background-color': ''+hex+''});

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

	
	// need to set data-id="#123456" for each circle
	colSvgChoice = $(this).attr('data-id');
		
	// or set bg of circles using hex, then you can use
	// colSvgChoice = $(this).css('backgroundColor');
        target = $(this);
		
		//Just not working
		//targetSVG = $(this); 

		//Manual setting colour but applies to whole svg
		
		
		//Get active svg
		var activeObject = canvas.getActiveObject()
		
		/* ------------------------------------------------------------------------------------------------------- */

		//loop through svg group 01
		
/* 		items = activeObject._objects;
		
		for(var i = 0; i < items.length; i++) {	
		//canvas.add(items[i]);
		console.log(items[i].fill)
				
		//adds colour to whole svg
		console.log(items[i].set('fill', ''+targetSVG+''));	

		canvas.renderAll();
		} */
		
		/* ------------------------------------------------------------------------------------------------------- */
		
		targetSVG = 'Red'
		//added fill colour manually
		console.log(activeObject._objects[1].set('fill', ''+targetSVG+''));
		//add to fabric.js canvas
		canvas.renderAll();
		
		
		
		/* ------------------------------------------------------------------------------------------------------- */
		
		//loop through svg group 02
		
/* 		var color = '#ff00ff';

		if (activeObject && activeObject._objects) {
		  for (var i = 0; i < activeObject._objects.length; i++) {
			activeObject._objects[1].set({
			  fill: color
			});
		  }
		}
		canvas.renderAll();
		 */
		/* ------------------------------------------------------------------------------------------------------- */
		
		
		
				
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
 