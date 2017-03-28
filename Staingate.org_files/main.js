function getCookie(name) {
         var cookieValue = null;
         if (document.cookie && document.cookie != '') {
             var cookies = document.cookie.split(';');
             for (var i = 0; i < cookies.length; i++) {
                 var cookie = jQuery.trim(cookies[i]);
                 // Does this cookie string begin with the name we want?
                 if (cookie.substring(0, name.length + 1) == (name + '=')) {
                     cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                     break;
                 }
             }
         }
         return cookieValue;
     }

     function csrfSafeMethod(method) {
         // these HTTP methods do not require CSRF protection
         return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
     }
     function sameOrigin(url) {
         // test that a given url is a same-origin URL
         // url could be relative or scheme relative or absolute
         var host = document.location.host; // host + port
         var protocol = document.location.protocol;
         var sr_origin = '//' + host;
         var origin = protocol + sr_origin;
         // Allow absolute or scheme relative URLs to same origin
         return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
         // or any other URL that isn't scheme relative or absolute i.e relative.
        !(/^(\/\/|http:|https:).*/.test(url));
     }
     $.ajaxSetup({
         beforeSend: function (xhr, settings) {
             if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                 // Send the token to same-origin, relative URLs only.
                 // Send the token only if the method warrants CSRF protection
                 // Using the CSRFToken value acquired earlier
                 xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
             }
         }
     });

$(document).ready(function(){
	$('#nav').slicknav();
	//$("#responsive-video").fitVids();
	$('#menu').slicknav();
	
	 $('a.gallery').colorbox({rel:'gal'});
         
	function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
	$("#btnSave").click(function (e) {
		var errorcount = 0;
		if ($('#txtemail').val() == "" || !validateEmail($('#txtemail').val())) { errorcount++; $('#txtemail').addClass('error'); } else { $('#txtemail').removeClass('error'); }
		if ($('#txtmodel').val() == "") { errorcount++; $('#txtmodel').addClass('error'); } else { $('#txtmodel').removeClass('error'); }
	        if ($('#txtmonth').val() == "") { errorcount++; $('#txtmonth').addClass('error'); } else { $('#txtmonth').removeClass('error'); }
		if ($('#txtday').val() == "") { errorcount++; $('#txtday').addClass('error'); } else { $('#txtday').removeClass('error'); }
		if ($('#txtyear').val() == "") { errorcount++; $('#txtyear').addClass('error'); } else { $('#txtyear').removeClass('error'); }
				      
		if (errorcount == 0) {
			$('#spnJoinMessage').html("<img src='/static/img/AjaxLoader.gif' alt=''/>");
			$('#spnJoinMessage').show();
			 $.ajax({
			type: "POST",
			url: "/savelist",
			data: { txtemail: $('#txtemail').val(),
			    txtfirstname: $('#txtfirstname').val(),
			    txtlastname: $('#txtlastname').val(),
			    txtphone: $('#txtphone').val(),
			    txtmodel: $('#txtmodel').val(),
			    txtserialnumber: $('#txtserialnumber').val(),
			    txtmonth: $('#txtmonth').val(),
			    txtday: $('#txtday').val(),
			    txtyear: $('#txtyear').val(),
			    txtdetail: $('#txtdetail').val(),
			    txtpicture1: $('#txtpicture1').val(),
			    txtpicture2: $('#txtpicture2').val()
			}
		    })
			.done(function (rsp) {			    
				$('#spnJoinMessage').html(rsp);
				$('#txtemail').val('');
				$('#txtfirstname').val('');
				$('#txtlastname').val('');
				$('#txtphone').val('');
				$('#txtmodel').val('');
				$('#txtserialnumber').val('');
				$('#txtmonth').val('');
				$('#txtday').val('');
				$('#txtyear').val('');
				$('#txtdetail').val('');
				$('#txtpicture1').val('');
				$('#txtpicture2').val('');
			});
		}
		return false;
	});
	
	
	$("#btnContact").click(function (e) {
		var errorcount = 0;
		if ($('#txtcontactemail').val() == "" || !validateEmail($('#txtcontactemail').val())) { errorcount++; $('#txtcontactemail').addClass('error'); } else { $('#txtcontactemail').removeClass('error'); }
		if ($('#txtcontactname').val() == "") { errorcount++; $('#txtcontactname').addClass('error'); } else { $('#txtcontactname').removeClass('error'); }
	        if ($('#txtcontactmessage').val() == "") { errorcount++; $('#txtcontactmessage').addClass('error'); } else { $('#txtcontactmessage').removeClass('error'); }
						      
		if (errorcount == 0) {
			$('#spnContactMessage').html("<img src='/static/img/AjaxLoader.gif' alt=''/>");
			$('#spnContactMessage').show();
			 $.ajax({
			type: "POST",
			url: "/contact",
			data: { txtcontactemail: $('#txtcontactemail').val(),
			    txtcontactname: $('#txtcontactname').val(),
			    txtcontactmessage: $('#txtcontactmessage').val()			 
			}
		    })
			.done(function (rsp) {			    
				$('#spnContactMessage').html(rsp);
				$('#txtcontactemail').val('');
				$('#txtcontactname').val('');
				$('#txtcontactmessage').val('');				
			});
		}
		return false;
	});
});
