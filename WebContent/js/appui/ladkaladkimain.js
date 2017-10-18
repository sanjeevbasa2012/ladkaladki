$(document).ready( function() {
	
	$("#leftNav").llCriteria( {
		debug:false,
		totalRecords:0,
		noOfRowsToDisplay:9
	});
	

	//add idle class to all input text field
	$('input[type="text"]').addClass("idleField");

    //Add FocusField class to the text field that has focus	
	$('input[type="text"]').focus(function() {
		$(this).removeClass('idleField').addClass('focusField');
	});
	
	//Remove FocusField class on exit of the text field
	$('input[type="text"]').blur(function() {
		$(this).removeClass('focusField').addClass('idleField');
	});
	
	
});




