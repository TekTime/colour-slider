	var canvas = new fabric.Canvas('c');
	var HideControls = {
		'tl': true, //rotate
		'tr': true, //expand
		'bl': true,
		'br': true, //move
		'ml': false,
		'mt': false,
		'mr': false,
		'mb': false,
		'mtr': false
	};
	$("button").click(function () {
		$('#element1').children('svg').children('path').each(function () {
			alert($(this).attr('fill'));
		});
	});
	$(document).on('click', '#leftGetCol', function () {
		//console.log("You just clicked a button!"); 
	});
	$(document).ready(function () {
		var runme = document.getElementById('canvas2db');
		runme.addEventListener('click', function (e) {
			var name = JSON.stringify(canvas.toDatalessJSON(), null, 4);
			var image = canvas.toDataURL("image/png");
			$("#myTextArea").text(name);
			//var data = 'data='+document.getElementById("myTextArea").value;
			//This one add 'getdata to file'var getdata = 'getdata='+document.getElementById("myTextArea").value;
			var getdata = document.getElementById("myTextArea").value;
			//$.ajax('./getme.php', {
			$.ajax({
				url: "./getme.php",
				type: 'POST', // http method
				contentType: 'application/x-www-form-urlencoded',
				//data: {name: name, image: image, getdata: getdata},  // data to submit
				data: {
					canvas_image: image,
					getdata: getdata
				}, // data to submit
				success: function (data, status, xhr) {
					//console.log('status: ' + status + ', data: ' + data);
					console.log('Status: ' + status + ' ' + data);
				},
				error: function (jqXhr, textStatus, errorMessage) {
					console.log('Error' + errorMessage + ': ' + data);
				}
			});
		});
	});
	$("#canvas2json").click(function () {
		/* 	
		Not beautify
		var json = canvas.toJSON();
		$("#myTextArea").text(JSON.stringify(json)); */
		//BEST ONE
		var jsonData = JSON.stringify(canvas.toDatalessJSON(), null, 4);
		$("#myTextArea").text(jsonData);
		//console.log(jsonData);
	});
	$("#loadJson2Canvas").click(function () {
		canvas.loadFromJSON($("#myTextArea").val(), canvas.renderAll.bind(canvas));
	});
	var example_json = '{"objects":[{"type":"rect","originX":"center","originY":"center","left":300,"top":150,"width":150,"height":150,"fill":"#29477F","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":{"color":"rgba(94, 128, 191, 0.5)","blur":5,"offsetX":10,"offsetY":10},"visible":true,"clipTo":null,"rx":0,"ry":0,"x":0,"y":0},{"type":"circle","originX":"center","originY":"center","left":300,"top":400,"width":200,"height":200,"fill":"rgb(166,111,213)","overlayFill":null,"stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":{"color":"#5b238A","blur":20,"offsetX":-20,"offsetY":-10},"visible":true,"clipTo":null,"radius":100}],"background":""}'
	var viewJson = document.getElementById("template_txt");
	$(viewJson).text(example_json);

	function loadPreviewer() {
		var group = [];
		fabric.loadSVGFromString(svg, function (objects, options) {
			var loadedObjects = new fabric.Group(group);
			loadedObjects.set({
				originX: 'center',
				originY: 'center',
				cornersize: 4,
				padding: 10,
				//hasControls: false,
				//hasBorders: false,
				left: canvas.width / 2,
				top: canvas.height / 2
			});
			loadedObjects.scaleToHeight(canvas.height - 200)
			canvas.add(loadedObjects);
			canvas.setActiveObject(loadedObjects);
			canvas.renderAll();
		}, function (item, object) {
			object.set('id', item.getAttribute('id'));
			console.clear();
			console.log(object.set('id', item.getAttribute('id')));
			group.push(object);
		});
	}

	function upload_canvas_DB() {
		var name = JSON.stringify(canvas.toDatalessJSON(), null, 4);
		var image = canvas.toDataURL("image/png");
		//document.getElementById("myTextArea").text(name); 
		$("#myTextArea").text(name);
		//$.ajax('./getme.php', {
		$.ajax({
			url: "./getme.php",
			type: 'POST', // http method
			data: {
				name: name,
				image: image
			}, // data to submit
			success: function (data, status, xhr) {
				//console.log('status: ' + status + ', data: ' + data);
				console.log('Status: ' + status + ': ' + data);
			},
			error: function (jqXhr, textStatus, errorMessage) {
				console.log('Error' + errorMessage + ': ' + data);
			}
		});
	}

	function rasterizeSVG() {
		var image = canvas.toDataURL("image/png");
		document.getElementById("preview_image").src = image;
	}

	function getObjectSVG(obj) {
		var svg = $(obj).html();
		//console.log($(obj).html());	
		var group = [];
		fabric.loadSVGFromString(svg, function (objects, options) {
			var loadedObjects = new fabric.Group(group);
			loadedObjects.set({
				originX: 'center',
				originY: 'center',
				cornersize: 4,
				padding: 10,
				//hasControls: false,
				//hasBorders: false,
				left: canvas.width / 2,
				top: canvas.height / 2
			});
			loadedObjects.scaleToHeight(canvas.height - 200)
			canvas.add(loadedObjects);
			canvas.setActiveObject(loadedObjects);
			canvas.renderAll();
		}, function (item, object) {
			object.set('id', item.getAttribute('id'));
			console.clear();
			console.log(object.set('id', item.getAttribute('id')));
			group.push(object);
		});
	}
	//ADD IMAGE
	function addClipArt12345(clipart) {
		fabric.Image.fromURL('img/clipart-png/' + clipart, function (image) {
			var newImageWidth = image.width;
			var newImageHeight = image.height;
			if (newImageHeight > canvas.height && newImageWidth < canvas.width) {
				newImageHeight = canvas.height / 4;
				newImageWidth = newImageHeight / image.getHeight() * image.getWidth();
			} else if (newImageHeight < canvas.height && newImageWidth > canvas.width) {
				newImageWidth = canvas.width / 4;
				newImageHeight = newImageWidth / image.getWidth() * image.getHeight();
			} else if (newImageHeight > canvas.height && newImageWidth > canvas.width) {
				while (newImageHeight * 4 > canvas.height && newImageWidth * 4 > canvas.width) {
					if (newImageWidth > newImageHeight) {
						newImageWidth = canvas.width / 4;
						newImageHeight = newImageWidth / image.getWidth() * image.getHeight();
					} else {
						newImageHeight = canvas.height / 4;
						newImageWidth = newImageHeight / image.getHeight() * image.getWidth();
					}
				}
			}
			image.set({
				angle: 0,
				padding: 0,
				width: newImageWidth,
				height: newImageHeight
			});
			canvas.centerObject(image);
			canvas.add(image);
			canvas.setActiveObject(image);
		});
	}

	
	
	//Know Colour Clicked	
	
	
/* $("a.ftbQuickChoice").click(function() {
	
	var panelClicked = $(this).attr('data-id');
	
	console.log(panelClicked)
	
}); */ 	



	
	
	
	
	
	
	
	
	
	
	
	
	
	
	function colPickerDisplay() {
	$(".main").removeClass("mainOff").addClass("mainOn");;	
	//$(".main").addClass("mainOn");
	}	
	
	function clearFirst() {
		$('#rightGetCol').empty();
	}
	
	
	

	function addClipArt(clipart) {
		var group = [];
		clearFirst();
		fabric.loadSVGFromURL('img/clipart-png/' + clipart, function (image, options) {
			var loadedObjects = fabric.util.groupSVGElements(image, options);
			//var loadedObjects = new fabric.Group(group);
			loadedObjects.set({
				originX: 'center',
				originY: 'center',
				cornersize: 4,
				padding: 10,
				//hasControls: false,
				//hasBorders: false,
				transparentCorners: false,
				cornerColor: 'blue',
				cornerStrokeColor: 'blue',
				borderColor: 'blue',
				cornerSize: 12,
				cornerStyle: 'circle',
				left: canvas.width / 2,
				top: canvas.height / 2,
				borderDashArray: [3, 3],
				hoverCursor: "pointer",
				hasRotatingPoint: false
			});
			canvas.centerObject(loadedObjects);
			canvas.add(loadedObjects);
			canvas.setActiveObject(loadedObjects);
			loadedObjects.setControlsVisibility(HideControls);
			canvas.renderAll();
		}, function (item, object) {
			object.set('id', item.getAttribute('id'));
			group.push(object);
			var svgResults = (object.fill);
			

	
			if(object.fill === '' || object.fill === 'none'){
			//return;	
			return false;
			//return true;
			//event.preventDefault()
			//event.stopPropagation()
				
			} else {
			//console.log(object.fill);
			var found = {};
			var svgColours = '<a href="javascript:void(0)" data-id="'+svgResults+'" class="ftbQuickChoice" style="background: '+svgResults+';" ></a>'
			$('#rightGetCol').append(svgColours);				
			
			//http://localhost/ftbYellow/GitHubFiles/get-single-svg-colour/index.html (data attribute)
			$('[data-id]').each(function(){
			var $this = $(this);
			if(found[$this.data('id')]){
			$this.remove();   
			}
			else{
			found[$this.data('id')] = true;   
			}
			});	
			
			}
	
		});
	}
	
	
	

		
		

	function loadClipArt() {
		var x = document.getElementById("show_clipart");
		var y = document.getElementById("show_shapes");
		$(x).removeClass('hideItem').addClass('showItem');
		$(y).removeClass('showItem').addClass('hideItem');
	}

	function loadShapes() {
		var x = document.getElementById("show_clipart");
		var y = document.getElementById("show_shapes");
		$(x).removeClass('showItem').addClass('hideItem');
		$(y).removeClass('hideItem').addClass('showItem');
	}