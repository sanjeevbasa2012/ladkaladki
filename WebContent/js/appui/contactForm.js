(function ($) {
	
	$.widget("ladkaladki.contactForm", {
		options : {
			debug:false,
			targetElement: "",
			profileLoginId:0,
			contactProfileID:0,
			profileName:"",
			imageFileName:"P1010391.JPG",
			width:100,
			height:100
		},
		_create: function() {			
			//Call the base			
			this._super();
		},
		_init: function() {
			var objThis = this;
			var optionThis = this.options;

			
			optionThis.targetElement = this.element.context.id;
			console.log("targetElement:"+optionThis.targetElement);
			$("#"+optionThis.targetElement).empty();

			var strHTML = "";	
			var imagePath = "images/";
			strHTML += "<table border=0 class='ui-corner-all ui-widget-content km_table'>";
			
			 
			strHTML += "<tr>";
			
			strHTML += "<td width='30%'>";

			strHTML += "<div id='div_ImgGalleryContact' class='ui-corner-all ui-widget-content div_ImgGalleryContact' >";
			  strHTML += "<div id='galleryImg_Profile' class='ui-corner-all ui-widget-content visible'>";
	          strHTML += "<img src="+imagePath+optionThis.imageFileName+" width='"+optionThis.width+"' height='"+optionThis.height+"' />";
	          strHTML += "</div>";
		    strHTML += "</div>";

			strHTML += "</td>";
			
			
			strHTML += "<td width='70%'>";
			     strHTML += "<div id='div_AutoSaleContact' class='ui-corner-all div_AutoSaleContact' >"; 
	             strHTML += "<table class='ui-corner-all ui-widget-content myAcc_table'>";
	 			
	 		    strHTML +="<tr>";
				strHTML +="<td colspan=2>";
				strHTML += "<div class='formHeader'>";
				strHTML +="Contact Profile...&nbsp;&nbsp;"+optionThis.profileName;
				strHTML += "</div>";
				strHTML +="</td>";
				strHTML +="<td>";
				strHTML +="</tr>";
				
	 			strHTML +="<tr>";
				strHTML +="<td colspan=2>";
				strHTML +="<textarea id='inputSenderComment' rows='8' cols='80' " +
						" placeholder='Send your profosal to the profile, limit your message to 4000 characters ' " +
						" class='validate[required]'></textarea>";
				strHTML +="</td>";
				strHTML +="</tr>";
				
				strHTML +="<tr>";
				strHTML +="<td colspan='2'>";
				strHTML +="&nbsp;";
				strHTML +="</td>";
				strHTML +="</tr>";
						
							
				strHTML +="<tr>";
				strHTML +="<td align='left'>";
				strHTML +="<a id='saveBtn' href='#' class='btnPostAd'>Send Proposal</a>";
				strHTML +="</td>";
				strHTML +="<td align='right'>";
				strHTML +="<a id='closeContactBtn' href='#' class='btnPostAd'>Close</a>";
				strHTML +="</td>";
				strHTML +="</tr>";			
			    strHTML += "</table>";
			    strHTML += "</div>";
	                       
			strHTML += "</td>";
			strHTML += "</tr>";			
		
		    strHTML += "</table>";			


			//$("#contentNav").append(strHTML);
			$("#"+optionThis.targetElement).append(strHTML);
			
			//Bond Close Button
			$("#closeContactBtn").bind("click", function() {
				//$("#"+optionThis.targetElement).hide();
	        	//$("#div_ImgGallery").empty();
	        	//$("#div_ImgGallery").hide();

	        	$("#"+optionThis.targetElement).empty();
	        	$("#"+optionThis.targetElement).hide();
	        	//$("#popupOverlay").hide();        	
			});
			
			$("#saveBtn").bind("click", function() {
				objThis.contactProfile();
				
			});
			
			
			
		},
		contactProfile: function() {
			console.log("Calling Contact Prfile Function");
			var objThis = this;
			var optionThis = this.options;
			var inputSndrComment = $("#inputSenderComment").val()
		
			var urlData = {"dataSource":"ladkaladki",
				"procName":"SP_ContactProfile",
				"inputParam": '[{"parameter":"'+optionThis.profileLoginId+'","parameterType":"NUMBER"},' +
				               '{"parameter":"'+optionThis.contactProfileID+'","parameterType":"NUMBER"},' +
				               '{"parameter":"'+inputSndrComment+'","parameterType":"VARCHAR"},' +
						']'		
			};
			
			$.ajax({
				url:"getJSONServlet",
				cache:false,
				type:"post",
				data:urlData,
				datatype:"json",
				success: function(data, textstatus, xhr) {
					
					//objThis.sendEmailToSeller(fromAddr, optionThis.sellerEmailAddr, subject, emailBody);
					$("#autoSaleForm").hide();
					
	       			var $prompt = $('<div id="dialog">\
	    					<p>An email has been send to the seller.<br><br>\
	    					The seller would be contacting you via email\
	    					or phone (if contact # was provided)</p></div>').appendTo($("#popupOverlay"));
	    			$prompt.dialog({
	    				modal:true,
	    			    draggable: false,
	    			    resizable: false,
	    				width:480,
	    				height:280,
	    			    title:'Thank you...',
	    			    position: ['center', 'top'],
	    			    dialogClass: 'ui-dialog-osx',
	    			    show:'clip',
	    			    hide:[{effect:"explode", duration:1000}],
	    			    closeOnEscape:false,
	    			    buttons: [ {
	    				    	text: "Close",
	    				    	click: function() {
	    							$("#popupOverlay").hide();
	    				            $("#popupOverlay").css({ // this is just for style
	    				                "opacity": "0.0"  
	    				            });
	    				            
	    				    		$("#autoSaleForm").empty();
	    				    		//$("#resultListing").show();
	    				    		$("#dialog").remove();
	    				    		$(this).dialog("close").dialog("destroy");
	    			            	

	    				    	}
	    				    }
	    				]
	    			});
					
				}
				
				
			}).done(function() {
				
			});
			
			
		}
		
	});
	
}) (jQuery);