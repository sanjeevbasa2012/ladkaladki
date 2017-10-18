(function ($) {
	
	$.widget("ladkaladki.profileLisitng", {
		
		options: {
			debug:false,
			targetElement: "",
			queryData:"",
			profileLoginId:1,
			profileGender:"",
			profileMaxAge:"",
			profileMinAge:"",
			profileReligions:"",
			profileLanguages:"",
			profileCities:"",
			totalRecords:0,
			currPage:0,         // Internally user variable
			totalPages:0,       // Internally user variable
			rowsToDisplay:0,    // Internally user variable
			NumOfPgLinks:10,     // Internally used variable, Number of page links to be displayed on the page
            prevProfileID:0     // Internally used variable, to control the View Profile button click event
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
			var objThis = this;
			var optionThis = this.options;
			optionThis.targetElement = this.element.context.id;
			
			if (optionThis.totalRecords > 0) {
				objThis.initInstance();
			} else {
				//objThis.initInstanceZero();	
				objThis.initInstance();
			}
			
			// Bind the page link
			$.each($('.btnPageLink'), function(obj, val) {
				// Get the Element Id for the class name 'btnPageLink',
				var elementId = val.id;			
				
				$("#"+elementId).bind('click', function() {
					var pageNum = $(this).text();					
					// If the user has clicked 'Prev' or 'Next'
					// button on the page link					
					var found = val.id.indexOf("page_Next");
					
					if (found >= 0) {
						if (optionThis.currentPage < optionThis.totalPages) {
							pageNum = parseInt(optionThis.currentPage) + 1;
						} else {
							pageNum = optionThis.currentPage;
						}
						
					} 
					
					//found =  val.text.indexOf("<");
					found =  val.id.indexOf("page_Prev");
					if (found >= 0 ) {
						if (optionThis.currentPage > 1) {
							pageNum = parseInt(optionThis.currentPage) - 1;
						} else {
							pageNum = optionThis.currentPage;
						}
						
					} 
					
					//alert(pageNum);
					objThis.executeQueryByPage(pageNum);
				});	
			});
			
		
		},
		
		initInstance: function() {
			var objThis = this;
			var optionThis = this.options;
			var imagePath = "images/"; 
			//var imagePath = "kmimages/";
			
			// Displays the loading Image GIF
			$("#loader").show();
			
			var strHTML = "";
			strHTML += "<table name='table1' border=0 width='100%' height='200px' border='0'" +
					"class='ui-corner-all ui-widget-content kmList_table'>";
			
			$.each(optionThis.queryData, function() {
				$.each(this, function(obj, val) {

					var srcName1 = "", srcName2 = "", srcName3 = "";
					if (val.profileImage1.length > 0) {
						srcName1 = imagePath+val.profileImage1;
					}
					if (val.profileImage2.length > 0) {
						srcName2 = imagePath+val.profileImage2;
					} else {
						srcName2 = imagePath+val.profileImage1;
					}
					if (val.profileImage3.length > 0) {
						srcName3 = imagePath+val.profileImage3;
					} else {
						srcName3 = imagePath+val.profileImage1;
					}			
					
					strHTML += "<tr>";
					strHTML += "<td class='lastrow' width='170px'>";
					strHTML += "<div id='div_"+val.profileId +"' class='rotator' >";
					strHTML += "<img class='div_"+val.profileID+"'name='"+val.profileImage1+"'src='"+srcName1+"' width='150px' height='150px' />";
                    /*
					strHTML += "<ul>";
					
					strHTML += "<li>";
					strHTML += "<a href='javascript:void(0)'>";
					strHTML += "<img class='div_"+val.profileId+"' name='"+val.profileImage1+"'src='"+srcName1+"' width='150px' height='150px' />";
					strHTML += "</a>";
				    strHTML += "</li>";

					strHTML += "<li>";
					strHTML += "<a href='javascript:void(0)'>";
					strHTML += "<img class='div_"+val.profileId+"' name='"+val.profileImage2+"'src='"+srcName2+"' width='150px' height='150px' />";
					strHTML += "</a>";
				    strHTML += "</li>";
			           			           
					strHTML += "<li>";
					strHTML += "<a href='javascript:void(0)'>";
					strHTML += "<img class='div_"+val.profileId+"' name='"+val.profileImage3+"'src='"+srcName3+"' width='150px' height='150px' />";
					strHTML += "</a>";
				    strHTML += "</li>";
				    
				    strHTML += "</ul>";
				    */
					strHTML += "</div>";
					
					strHTML += "</td>";
					strHTML += "<td class='lastrow'>";
					strHTML += "<div id='div_"+val.profileId +"_Details' >";

					strHTML += "<table name='table2' border='0' width='100%' class='ui-corner-all ui-widget-content'>";

					strHTML += "<tr>";
					strHTML += "<td class='price' width='95%'>";
					strHTML += val.profileName+'&nbsp;&nbsp;&nbsp;';
					strHTML += "[ "+val.profileId+" ]";
					strHTML += "<input type='hidden' value='"+val.profileId+"' class='profileId' />";
					strHTML += "</td>";
					strHTML += "<td class='price' align='right'>";
					if (val.responseStatus == 'PE') {
						strHTML += "<a class='circle' href='javascript:void(0)'>";
						strHTML += "&nbsp;&nbsp;&nbsp;&nbsp;";
						strHTML += "</a>";						
					}
					if (val.responseStatus == 'AP') {
						strHTML += "<img src='images/circle_green.png' width='30px' height='30px' style='float:right' />";						
					}
					if (val.responseStatus == 'RJ') {
						strHTML += "<img src='images/circle_red.png' width='30px' height='30px' style='float:right'/>";
					}

					strHTML += "</td>";
					strHTML += "</tr>";					
					
					strHTML += "<tr>";
					strHTML += "<td colspan=2>";
					strHTML += "Age: "+val.profileAge;
					strHTML += "</td>";
					strHTML += "</tr>";
					      					      
					strHTML += "<tr>";
					strHTML += "<td colspan=2>";
					strHTML += "Resident of: "+val.cityName;
					strHTML += "</td>";
					strHTML += "</tr>";

					strHTML += "<tr>";
					strHTML += "<td colspan=2>";
					strHTML += "Mother Tongue: "+val.languageName;
					strHTML += "</td>";
					strHTML += "</tr>";
					
					strHTML += "<tr>";
					strHTML += "<td>";
					strHTML += "Religion: "+val.religionName;
					strHTML += "</td>";
					
					strHTML += "<td>&nbsp;";
					strHTML += "</td>";
					strHTML += "</tr>";
					
					strHTML += "<tr>";
					strHTML += "<td width='80%'>";
					strHTML += "Education: "+val.profileEdu;
					strHTML += "</td>";
					strHTML += "<td align='right'>";
					strHTML += "<a id='postViewProfile_"+val.profileId+"' href='#' class='btnContactSeller'>View Details</a>";				
					strHTML += "</td>";					
					strHTML += "</tr>";
					
					strHTML += "</table>";
					
					strHTML += "</div>";
					strHTML += "</td>";
					
					strHTML += "</tr>";					
				});
			});
			strHTML += "<tr>";
			strHTML += "<td colspan='2' class='ui-corner-all ui-widget-content'  >";
			var startCtr = optionThis.currentPage;
			var pageStart = 1;
			var pageEnd = 1;
			optionThis.totalPages = 1;
			if ( optionThis.totalRecords > optionThis.rowsToDisplay) {
				optionThis.totalPages = 	Math.ceil(optionThis.totalRecords/optionThis.rowsToDisplay);
			}
			
			strHTML += "<a id='page_Prev' class='btnPageLink' href='javascript:void(0)'>";
			strHTML += "<img src='images/Navigate-Left-16.png'>";
			strHTML += "</a>";
			if ( optionThis.currentPage > optionThis.NumOfPgLinks && optionThis.currentPage <= optionThis.totalPages) {
				pageStart = optionThis.currentPage - (optionThis.NumOfPgLinks/2);
			} 
			
			pageEnd = pageStart + (optionThis.NumOfPgLinks-1);
			if (pageEnd > optionThis.totalPages) {
				pageEnd = optionThis.totalPages;
			}
			
			for ( startCtr = pageStart; startCtr <= pageEnd; startCtr++) {
				//strHTML += "<a id='page_"+startCtr+"' class='btnPageLink' href='javascript:void(0)'>";
				if (optionThis.currentPage == startCtr) {
					strHTML += "<a id='page_"+startCtr+"' class='btnPageLinkCurr' href='javascript:void(0)'>";
					strHTML += "<b>"+startCtr+"</b>";
				} else {
					strHTML += "<a id='page_"+startCtr+"' class='btnPageLink' href='javascript:void(0)'>";
					strHTML += startCtr;
				}
				
				strHTML += "</a>&nbsp;&nbsp;&nbsp;&nbsp;";
			}
			strHTML += "<a id='page_Next' class='btnPageLink' href='javascript:void(0)'>";
			strHTML += "<img src='images/Navigate-Right-16.png'>";
			strHTML += "</a>";
			strHTML += "</td>";
			strHTML += "</tr>";
			strHTML += "</table>";
			strHTML += "";
			/*
			strHTML += "<div id='loader' class='loader' style='display:none;'>";
			strHTML += "<img id='img-loader' src='images/loading.gif' atl='loading'/>";
			strHTML += "</div>";
			*/
			$("#"+optionThis.targetElement).append(strHTML);

			if ($("#"+optionThis.targetElement).height() < 1600) {
				$("#contentNav").css({'height':'1600'});
			} else {
				$("#contentNav").css({'height':'100%'});
			}
			
			
	        //Find if all the images within the page has been loaded
			/*
	        var load_counter = 0;
			var $images = $("div.rotator img");
			var imgTotal = $images.length;
	        $images.load(function() {
	        	load_counter++;
	        	if (load_counter == imgTotal) {
        			$("#loader").hide();
	        	} 
	        });
	        
			*/
			
			// Bind Contact seller Button
			$.each($(".btnContactSeller"), function(obj, val) {
				var profileId = "";
				var sellerEmailAddr = "";
				var sellerBrandName = "";
				var sellerModelName = "";
				var sellerPrice ="";
					
				var elementId = val.id;
                
				$("#"+elementId).bind('click', function() {
					$(".lastrow").click(function() {

						profileId = $(this).find($(".profileId")).val();						
						objThis.showProfileDetails(profileId);
						optionThis.prevProfileID = profileId;
						
						/*
						sellerEmailAddr = $(this).find($(".sellerEmailId")).val();
						sellerMfgName = $(this).find($(".sellerMfgName")).val();
						sellerBrandName = sellerMfgName+"&nbsp;&nbsp;&nbsp;"+$(this).find($(".sellerBrandName")).val();
						sellerModelName = $(this).find($(".sellerModelName")).val();
						sellerPrice     = $(this).find($(".sellerPrice")).val();

						objThis.contactSeller(sellerId, sellerEmailAddr, sellerBrandName, sellerModelName, sellerPrice);
						*/	
					});
				});				
			});
			
			
			
			$("#loader").hide();
			
			//scroll to top of page
			$('html, body').animate({scrollTop:0}, 0); 
			
		},

		executeQueryByPage: function(pageNum) {
	    	var objThis = this;
	    	var optionThis = this.options;
	    	
	    	//var lookingFor = $("input[name=lookingFor]:checked").val();
	    	//alert('lookingFor:'+lookingFor);
	    	var minAge = $("#minAge").val();
	    	var maxAge = $("#maxAge").val();
	    	
	    	var loginProfileId = optionThis.profileLoginId;
	    	var gender = optionThis.profileGender;
	    	var usrSelectedReligions = optionThis.profileReligions;
	    	var usrSelectedLanguages = optionThis.profileLanguages;
	    	var usrSelectedCities = optionThis.profileCities;
	    	//var pageNum = pageNum;                   // Inital page Number
	    	var noOfRows = optionThis.rowsToDisplay; // Total number of rows to be fetch from DB and displayed.
	    	
	    	//alert('usrSelectedCities:'+usrSelectedCities);
          
            if (minAge.length == 0 )  {
            	minAge = 21;
            }
	    	if (maxAge == 0 || maxAge.length == 0) {
	    		maxAge = 99;
	    	}
 	    	

	    	
	    	var urlData={"dataSource":"ladkaladki",
    			    "procName":"SP_ProfileSearch",
  	    	        "inputParam":'[{"parameter":"'+loginProfileId+'","parameterType":"Number"},'+
  	    	          '{"parameter":"'+gender+'","parameterType":"VARCHAR"},'+
		    	      '{"parameter":"'+minAge+'","parameterType":"Number"},'+
	 			      '{"parameter":"'+maxAge+'","parameterType":"Number"},'+
	 			      '{"parameter":"'+usrSelectedReligions+'","parameterType":"VARCHAR"},'+
	 			      '{"parameter":"'+usrSelectedLanguages+'","parameterType":"VARCHAR"},'+  			      
	 			      '{"parameter":"'+usrSelectedCities+'","parameterType":"VARCHAR"},'+ 
	 			      '{"parameter":"'+pageNum+'","parameterType":"Number"},'+
	    			  '{"parameter":"'+noOfRows+'","parameterType":"Number"}'+
	                  ']',
    			    "outputParam":"dataCursor"
    			    };
 	
	    	$.ajax({
	    		url:"getJSONServlet",
	    		cache:false,
	    		type:"post",
	    		data:urlData,
	    		datatype:"json",
	    		success: function(data, textstatus, xhr) {
	    			//var jsonDataString = JSON.stringify(data);
	    			
	    			//if (optionThis.debug) {
		    		//	var arrayLength = data.jsonResultSetData.length;
	    			//}
	    			$("#resultListing").empty();

	    			
					$("#resultListing").profileLisitng( {
						debug: true,
						queryData: data,
						profileGender: gender,
						profileMinAge:minAge,
						profileMaxAge:maxAge,
						profileReligions:usrSelectedReligions,
						profileLanguages:usrSelectedLanguages,
						profileCities:usrSelectedCities,
						totalRecords:optionThis.totalRecords,
						currentPage:pageNum,
						rowsToDisplay:noOfRows
					});
	    		
	    		},
                error: function(xhr, textStatus, errorThrown) {
                    alert(textStatus);
                }
	    	}).done(function() {
	    		$("#results").val("Successful....");    		
	    	});			    	
	    },
	    
	    
	    showProfileDetails: function(searchProfileId) {
	    	console.log("searching profileID:"+searchProfileId)

	    	var objThis = this;
	    	var optionThis = this.options;
	    	console.log("searching prev profileID:"+optionThis.prevProfileID);

	       //if (optionThis.prevProfileID != searchProfileId) {
	    	   
	    		   


	    	var urlData={"dataSource":"ladkaladki",
    			    "procName":"SP_getProfileDetail",
    			    "inputParam":'[{"parameter":"'+optionThis.profileLoginId+'","parameterType":"Number"},'+
	                  '{"parameter":"'+searchProfileId+'","parameterType":"Number"}]',
    			    
	    			"outputParam":"dataCursor"
    			    };
	    	$.ajax( {
				url:"getJSONServlet",
				cache:true,
				type:"post",
				data:urlData,
				datatype:"json",
				success: function(data, textstatus, xhr) {					
					// To read the data, convert the JSON object to a STring
					//var jsonDataString = JSON.stringify(data);
				    //console.log('user login details:'+jsonDataString);
					
					var vProfileName = "";
					var vProfileAge = "";
					var vProfileReligion = "";
					var vProfileMthrTongue = "";
					var vProfileCity ="";
					var vProfileProfession = "";
					var vProfileDesc = "";
					var vProfileBackGround = "";
					var vprofilePartnerReqd = "";
				    $.each(data, function() {
				    	
				    	$.each(this, function(obj, val){	
				    		vProfileName = val.profileName;
				    		vProfileAge = val.profileAge;
				    		vProfileReligion = val.religionName;
				    		vProfileMthrTongue = val.languageName;
				    	    vProfileCity =  val.cityName;
				    	    vProfileProfession = "TBD";
				    	    vProfileDesc = val.profileDesc;
				    	    vProfileBackGround = val.profileBackground;
				    	    vprofilePartnerReqd = val.profilePartnerReqd;
				    	});
				    	
				    });
				    console.log("vProfileName="+vProfileName);
				    $("#popupOverlay").css({"display":"block"});
				    
				    //Display profile details
				    $("#popupOverlay").llgallery({
						profileLoginId:optionThis.profileLoginId,          // Login User Id
						profileId:searchProfileId,                        // Contact Profile Id
				    	"profileName":vProfileName,
				    	"profileAge":vProfileAge,
				    	"profileReligion":vProfileReligion,
						"profileMotherTongue":vProfileMthrTongue,
						"profileCity":vProfileCity,
						"profileProfession":vProfileProfession,
						"profileDesc":vProfileDesc,
						"profileBackground":vProfileBackGround,
						"profilePartnerReqd":vprofilePartnerReqd
				    });
				    
			    	$("#popupOverlay").show();
			    	$("#div_ImgGallery").show();
			    	$("#div_AutoSale").show();
			    	/*
					$("#loginUserStats").loginUserStatistics( {
						debug: true,
						queryData: data
					});
					*/	
				}
	    	});	
	    	
	       //};  // refresh = true
	       
	    }

		
	});
	
}) (jQuery);