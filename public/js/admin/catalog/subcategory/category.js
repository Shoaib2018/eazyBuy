//Select Category after Selecting Department
jQuery.noConflict()(function ($) {
	$(document).ready(function () {
		var category_tbody = $("#category_tbody")[0];
	    $("#did").change(function () {
	        var department_id = $(this).val();
	        var category_id = $("#category_id");

	        if (department_id != "") {
	        	$.ajax({
					type:"get",
					url: '/department/category',
					data:{
						department_id:department_id,
						_token:$("#token").data('token'),
						},
					datatype:'html',
					success:function(response){
						//category_tbody.style.display = "table-row-group";
						//console.log(response);
						category_id.html(response);
					}
				});
	        } 
	        else {
	        	category_tbody.style.display = "none";
	        	//category_id.remove();
	        	category_id.find('option').remove().end().append('<option value="">Select Department First</option>').val('');
	        }
	    });
	});
});