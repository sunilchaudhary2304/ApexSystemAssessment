
$(document).ready(function(){

	//during page load activity
	getAppointments();
    $("#showInfo").hide();

     //new button activity
    $("#btnNew").click(function(){
		$("#showInfo").show();
		$("#btnNew").hide();	

	});	
	  
	//cancel button activity
	$("#btnCancel").click(function(){
			$("#showInfo").hide();
			$("#btnNew").show();
			$(".alert-danger").fadeIn(1000).delay(1000).fadeOut(2000);
			$('#frmAppointment').trigger("reset");										   
	});
		
	$("#btnAdd").click(function(){
		getAppointments();
		//$(".alert-success").fadeIn(1000).delay(1000).fadeOut(2000);
		//$(".alert-success").html("Appointment added successfully.")
		
	});


	// validate empty form fields and submit data
	$("#frmAppointment").validate({ 
		 
			rules: {   
			
				txtDate: {
					
					required: true,
				},
				        
				txtTime: {
					required: true,
					
				},
				txtDescription: {
					required:  true
				}
			},
			messages: {
				 txtDate: "Date is required.",
				 txtTime: "Time is required.",
				 txtDescription: "Description is required.",
			},
			errorElement : 'div',
			errorLabelContainer: '.alert-danger',
			
			submitHandler: function(form) {
				
			  var txtDate = $("#txtDate").val();
			  var txtTime = $("#txtTime").val();
			  var txtDescription = $("#txtDescription").val();
				$.ajax('http://localhost/ApexTest/insertAppointment.pl',{
					
							"type": "POST", 		
							"data": {
								txtDate:txtDate,
								txtTime:txtTime,
								txtDescription:txtDescription
							},
							"success":loadAppointmentOnSuccess,
							"error":failure
				});
			}
	  });
			  

	//display match data based on the value providing in the search field.
	$("#btnSearch").click(function(){

	var searchData=$("#txtSearch").val();
	$.ajax('http://localhost/ApexTest/searchAppointment.pl',{
				"type": "GET", 
				dataType:"JSON",		
				"data": {searchData:searchData},
				"success":loadAppointmentOnSuccess,
				"error":failure
			});
		});


});

// load available appointments from database
function getAppointments(){
	$.ajax('http://localhost/ApexTest/searchAppointment.pl',{
		"type": "GET", 
		dataType:"JSON",		
		"data": '',
		"success":loadAppointmentOnSuccess,
		"error":failure
	});
}

function loadAppointmentOnSuccess(data){
	
	if(data.length == 0){
		failure();
	}
	else { 
		var dataTable = '<table class="table table-striped"><thead>';
			dataTable += '<tr><th>DATE</th><th>TIME</th><th>DESCRIPTION</th></tr></thead>';		
			$.each(data,function(index,item){
				var datetime = data[index].datetime.split(' ');
				dataTable+='<tr>';
				dataTable+='<td>'+datetime[0]+'</td>';
				dataTable+='<td>'+datetime[1]+'</td>';
				dataTable+='<td>'+item.description+'</td>';
				dataTable+='</tr>';
			});
			dataTable+='</table>';

	$('#displayAppointment').html(dataTable);
	
  }
}

function failure(){
	var msg = '*****No Appointment found*****';		
	$('#displayAppointment').html(msg);
}



