(function($) {
	
	$.widget("ladkaladki.loginUserStatistics", {
		
		options: {
			debug:false,
			targetElement: "",
			queryData:""
			
		},
		_create:function() {
			optionThis = this.options;
			optionThis.targetElement = this.element.context.id;
			
			// Call the base
			this._super();
		},
		destroy:function() {
			// Grab the name of the element this widget is applied to
			//var elementName = this.element.context.id;		
			
			// Unbind all events
			$(this.element).unbind();
			
			//Kill all live event for this element
			$(this.element).die();
			
			//Empty this element
			$(this.element).empty();
			
			//Call the base destroy function
			$.Widget.prototype.destroy.call(this);			
		},
		_init:function() {
			console.log ("Fired Init function from loginUserStatistics");
			var objThis = this;
			var optionThis = this.options;
			optionThis.targetElement = this.element.context.id;
			
			var strHTML = "";
			strHTML += "<table name='tbl_userLoginDetails' class='ui-corner-all ui-widget-content myAcc_table'>";

			$.each(optionThis.queryData, function() {
				$.each(this, function(obj, val) {
					console.log(val.profilesContacted);
					strHTML += "<tr>";
					strHTML += "<td class='myAccHeader lastrow' width='80%'>";
				    strHTML += val.profileName+"'s Account";
				    strHTML += "</td>";
				    strHTML += "<td class='myAccHeader lastrow' align='right'>";
				    strHTML += "(Edit Profile)";
				    strHTML += "</td>";
				    strHTML += "</tr>";
	                
				    strHTML += "<tr>";
				    strHTML += "<td>";
				    strHTML += "Membership";
				    strHTML += "</td>";
				    strHTML += "<td>";
				    strHTML += "GOLD";
				    strHTML += "</td>";
				    strHTML += "</tr>";

				    strHTML += "<tr>";
				    strHTML += "<td>";
				    strHTML += "Membership expires on";
				    strHTML += "</td>";
				    strHTML += "<td>";
				    strHTML += "01-Oct-2014";
				    strHTML += "</td>";
				    strHTML += "</tr>";

	                strHTML += "<tr>";
	                strHTML += "<td colspan='2' class='lastrow'>";             
	                strHTML += "<a id='postMembership' href='#' class='btnPostAd1'>Become a GOLD member</a>";
	                strHTML += "</td>";
	                strHTML += "</tr>";
	                
	                strHTML += "<tr>";
	                strHTML += "<td>";
	                strHTML += "Profiles you contacted";
	                strHTML += "</td>";
	                strHTML += "<td>";
	                strHTML += val.profilesContacted;
	                strHTML += "</td>";
	                strHTML += "</tr>";
         
	                strHTML += "<tr>";
	                strHTML += "<td>";
	                strHTML += "&nbsp;&nbsp;&nbsp;&nbsp;Profiles Accepted";
	                strHTML += "</td>";
	                strHTML += "<td>";
	                strHTML += val.contactsAccepted;
	                strHTML += "</td>";
	                strHTML += "</tr>"; 
	                
	                strHTML += "<tr>";
	                strHTML += "<td>";
	                strHTML += "&nbsp;&nbsp;&nbsp;&nbsp;Profiles Rejected";
	                strHTML += "</td>";
	                strHTML += "<td>";
	                strHTML += val.contactsRejected;
	                strHTML += "</td>";
	                strHTML += "</tr>";
	                                             
	                strHTML += "<tr>";
	                strHTML += "<td class='lastrow'>";
	                strHTML += "&nbsp;&nbsp;&nbsp;&nbsp;Awaiting Response";
	                strHTML += "</td>";
	                strHTML += "<td class='lastrow'>";
	                strHTML += val.contactsResponsePending;
	                strHTML += "</td>";
	                strHTML += "</tr>";

	                strHTML += "<tr>";
	                strHTML += "<td>";
	                strHTML += "Profiles expressed interest";
	                strHTML += "</td>";
	                strHTML += "<td>";
	                strHTML += val.profileExpressedInterest;
	                strHTML += "</td>";
	                strHTML += "</tr>";

	                
	                strHTML += "<tr>";
	                strHTML += "<td>";
	                strHTML += "&nbsp;&nbsp;&nbsp;&nbsp;Response Accepted";
	                strHTML += "</td>";
	                strHTML += "<td>";
	                strHTML += val.profilesAccepted;
	                strHTML += "</td>";
	                strHTML += "</tr>";
	                
	                strHTML += "<tr>";
	                strHTML += "<td>";
	                strHTML += "&nbsp;&nbsp;&nbsp;&nbsp;Response Rejected";
	                strHTML += "</td>";
	                strHTML += "<td>";
	                strHTML += val.profilesRejected;
	                strHTML += "</td>";
	                strHTML += "</tr>";
	                                             
	                strHTML += "<tr>";
	                strHTML += "<td>";
	                strHTML += "&nbsp;&nbsp;&nbsp;&nbsp;Awaiting Response";
	                strHTML += "</td>";
	                strHTML += "<td>";
	                strHTML += val.profilesResponsePending;
	                strHTML += "</td>";
	                strHTML += "</tr>";
				
				});
			});

			strHTML += "</table>";
			$("#"+optionThis.targetElement).append(strHTML);
			
		}
		
		
		
	});
	
}) (jQuery);