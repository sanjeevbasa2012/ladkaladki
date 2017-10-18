(function ($) {
	
	$.widget( "ladkaladki.llCriteria", {
		options: {
			debug: true,
			profileLoginId:1,
			totalRecords:0,
			currentPageNumber:1,
			noOfRowsToDisplay:5
		},
		_create: function() {
			optionThis = this.options;
			this.displayLaguage();
			this.displayCities();
			this.displayReligion();
			
		},
		_init: function() {
			var objThis = this;
			
			//get Loged-In User Details
			objThis.getLoginUserDetails();
			
			//this.displayCountry();
			
        	//Bind Submit Query
            $("#postCarSaleRequest").bind("click", function () {

                //alert("Submit button clicked")
                /*
             	$("#resultListing").empty();
             	//$("#div_AutoSale").empty();
             	//$("#div_AutoSale").hide();
           	    objThis.executeQuery();
           	    $("#resultListing").show();
           	    */
             	$("#resultListing").empty();
				objThis.executeQueryTotal();
                
            });
			
		},
		executeQueryTotal: function() {
	    	var objThis = this;
	    	var optionThis = this.options;
	    	

	    	var minAge = $("#minAge").val();
	    	var maxAge = $("#maxAge").val();
	    	
	    	var gender = $("input[name=lookingFor]:checked").val();
	    	var usrSelectedReligions = objThis.getSelectedReligions();
	    	var usrSelectedLanguages = objThis.getSelectedLanguages();
	    	var usrSelectedCities = objThis.getSelectedCities();
	    	
            if (minAge.length == 0 )  {
            	minAge = 21;
            }
	    	if (maxAge == 0 || maxAge.length == 0) {
	    		maxAge = 99;
	    	}

	    	
	    	//alert('usrSelectedCities:'+usrSelectedCities);

	    	
	    	var urlData={"dataSource":"ladkaladki",
    			    "procName":"SP_ProfileSearchTotal",
  	    	        "inputParam":'[{"parameter":"'+gender+'","parameterType":"VARCHAR"},'+
		    	      '{"parameter":"'+minAge+'","parameterType":"Number"},'+
	 			      '{"parameter":"'+maxAge+'","parameterType":"Number"},'+
	 			      '{"parameter":"'+usrSelectedReligions+'","parameterType":"VARCHAR"},'+
	 			      '{"parameter":"'+usrSelectedLanguages+'","parameterType":"VARCHAR"},'+  			      
	 			      '{"parameter":"'+usrSelectedCities+'","parameterType":"VARCHAR"}'+ 
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

	    			optionThis.totalRecords = 0;
	    			$.each(data, function() {
	    				$.each(this, function(obj, val) {
	    					optionThis.totalRecords = val.TotalProfiles;
	    				});
	    			});
	    			console.log("Total records:"+optionThis.totalRecords);
	    			
	    			objThis.executeQuery();
	    			

	    		
	    		},
                error: function(xhr, textStatus, errorThrown) {
                    alert(textStatus);
                }
	    	}).done(function() {
	    		$("#results").val("Successful....");    		
	    	});		
		},

	    executeQuery: function() {
	    	var objThis = this;
	    	var optionThis = this.options;
	    	
	    	var gender = $("input[name=lookingFor]:checked").val();
	    	//alert('lookingFor:'+lookingFor);
	    	var minAge = $("#minAge").val();
	    	var maxAge = $("#maxAge").val();
	    	
	    	var loginProfileId = optionThis.profileLoginId;
	    	var usrSelectedReligions = objThis.getSelectedReligions();
	    	var usrSelectedLanguages = objThis.getSelectedLanguages();
	    	var usrSelectedCities = objThis.getSelectedCities();
	    	//alert('usrSelectedCities:'+usrSelectedCities);
	    	
	    	

            
            if (minAge.length == 0 )  {
            	minAge = 21;
            }
	    	if (maxAge == 0 || maxAge.length == 0) {
	    		maxAge = 99;
	    	}
 	    	
	    	//var pageNum = 1;  // Inital page Number

	    	 /*     			    
	    	      "inputParam":'[{"parameter":"'+lookingFor+'","parameterType":"VARCHAR"},'+
	    	         {"parameter":"'+minAge+'","parameterType":"Number"},
    			      '{"parameter":"'+maxAge+'","parameterType":"Number"},'+
    			      '{"parameter":"'+usrSelectedReligions+'","parameterType":"VARCHAR"},'+
    			      '{"parameter":"'+usrSelectedLanguages+'","parameterType":"VARCHAR"},'+  			      
    			      '{"parameter":"'+usrSelectedCities+'","parameterType":"VARCHAR"},'+ 
    			      '{"parameter":"'+pageNum+'","parameterType":"Number"},'+
	    			  '{"parameter":"'+noOfRows+'","parameterType":"Number"}'+
	                  ']',

             */
	    	
	    	var urlData={"dataSource":"ladkaladki",
    			    "procName":"SP_ProfileSearch",
  	    	        "inputParam":'[{"parameter":"'+loginProfileId+'","parameterType":"Number"},'+
	    	          '{"parameter":"'+gender+'","parameterType":"VARCHAR"},'+
		    	      '{"parameter":"'+minAge+'","parameterType":"Number"},'+
	 			      '{"parameter":"'+maxAge+'","parameterType":"Number"},'+
	 			      '{"parameter":"'+usrSelectedReligions+'","parameterType":"VARCHAR"},'+
	 			      '{"parameter":"'+usrSelectedLanguages+'","parameterType":"VARCHAR"},'+  			      
	 			      '{"parameter":"'+usrSelectedCities+'","parameterType":"VARCHAR"},'+ 
	 			      '{"parameter":"'+optionThis.currentPageNumber+'","parameterType":"Number"},'+
	    			  '{"parameter":"'+optionThis.noOfRowsToDisplay+'","parameterType":"Number"}'+
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


	    			//optionThis.totalRecords = 10;
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
						currentPage:optionThis.currentPageNumber,
						rowsToDisplay:optionThis.noOfRowsToDisplay
					});
	    		
	    		},
                error: function(xhr, textStatus, errorThrown) {
                    alert(textStatus);
                }
	    	}).done(function() {
	    		$("#results").val("Successful....");    		
	    	});		
	    	
	    },
	    
	    getLoginUserDetails: function () {
	    	var objThis = this;
	    	var optionThis = this.options;
	    	
	    	var loginProfileId = optionThis.profileLoginId;

	    	var urlData={"dataSource":"ladkaladki",
    			    "procName":"SP_getProfileDetail",
    			    "inputParam":'[{"parameter":"'+loginProfileId+'","parameterType":"Number"},'+
    			                  '{"parameter":"'+loginProfileId+'","parameterType":"Number"}]',
	    			"outputParam":"dataCursor"
    			    };
	    	$.ajax( {
				url:"getJSONServlet",
				cache:true,
				type:"post",
				data:urlData,
				datatype:"json",
				success: function(data, textstatus, xhr) {
					var jsonDataString = JSON.stringify(data);
					//console.log('user login details:'+jsonDataString);

					$("#loginUserStats").loginUserStatistics( {
						debug: true,
						queryData: data
					});
						
				}
	    		
	    	});
	    },

		displayReligion: function() {
			optionThis = this.options;
			
			var urlData = {"dataSource":"ladkaladki",
					"procName":"SP_Religion",
					"inputParam":"[]",
					"outputParam":"dataCursor"
					};
			
			$.ajax( {
				url:"getJSONServlet",
				cache:true,
				type:"post",
				data:urlData,
				datatype:"json",
				success: function(data, textstatus, xhr) {
	    			var jsonDataString = JSON.stringify(data);
	    			
	    			if (optionThis.debug) {
		    			console.log(jsonDataString);
		    		}
	    			
	    			if ( $("#selectReligion").html() ) {
	    				
		    			$("#selectReligion").jqGrid({
		    				mtype:"post",
		    				altRows:true,
		    				datatype:"jsonstring",
		    				datastr: jsonDataString,
		    				jsonReader: {root:"jsonResultSetData", repeatitems:false},
		    				height:'100',
		    				width:'245',
		    				colNames:[ 'Religion','Religion Id'],
		    				colModel:[
                                      {name:'religionName',index:'religionName', sortable:true, classes:'textFont15px' },
		    				          {name:'religionId',index:'religionId', hidden:true,  align:'left' }
		    				],
		    				multiselect:true,
		    				multiselectWidth:40,
		    				paging:true,
		    				caption:"Religion",
		    				onSelectRow: function() {
		    					var selectedRows = $("#selectReligion").getGridParam("selarrrow");
		    		    		if (selectedRows.length > 0 ) {
		    		    			$("#selectReligion").jqGrid('setCaption', 'Religion - Selected '+selectedRows.length);		
		    		    		} else {
		    		    			$("#selectReligion").jqGrid('setCaption', 'Religion');
		    		    		}
		    				},
		    				onSelectAll: function() {
		    					var selectedRows = $("#selectReligion").getGridParam("selarrrow");
		    		    		if (selectedRows.length > 0 ) {
		    		    			$("#selectReligion").jqGrid('setCaption', 'Religion - Selected '+selectedRows.length);		
		    		    		} else {
		    		    			$("#selectReligion").jqGrid('setCaption', 'Religion');
		    		    		}
		    				}		    				
		    			});
	    				
	    				
	    			} else {
	    				alert("Element selectReligion does not exist, verify html");
	    			}
					
				},
				error: function(xhr, textStatus, errorThrown) {
					alert(errorThrown);
				}
			}).done(function() {
	    		$("#results").val("Religion created Successful....");   
	    		
	    	});
			
		},
		
		displayLaguage: function() {
			optionThis = this.options;
			
			var urlData = {
					"dataSource":"ladkaladki",
					"procName":"SP_Language",
					"inputParam":"[]",
					"outputParam":"dataCursor"
			};
			
			$.ajax({
				url:"getJSONServlet",
				cache:true,
				type:"post",
				data:urlData,
				datatype:"json",
				success: function (data, textstatus, xhr) {
					var jsonDataString = JSON.stringify(data);
	    			if (optionThis.debug) {
		    			console.log(jsonDataString);
		    		}
	    			
	    			if ( $("#selectLanguage").html () ) {
		    			$("#selectLanguage").jqGrid({
		    				mtype:"GET",
		    				datatype:"jsonstring",
		    				datastr: jsonDataString,
		    				jsonReader: {root:"jsonResultSetData", repeatitems:false},
		    				height:'100',
		    				width:'245',
		    				colNames:[ 'Mother Tongues','Language Id'],
		    				colModel:[
                                      {name:'languageName',index:'languageName', sortable:true, classes:'textFont15px' },
		    				          {name:'languageId',index:'languageId', hidden:true,  align:'left' }
		    				],
		    				multiselect:true,
		    				multiselectWidth:40,
		    				paging:true,
		    				caption:"Mother Tongue",
		    				onSelectRow: function() {
		    					var selectedRows = $("#selectLanguage").getGridParam("selarrrow");
		    		    		if (selectedRows.length > 0 ) {
		    		    			$("#selectLanguage").jqGrid('setCaption', 'Mother Tongue - Selected '+selectedRows.length);		
		    		    		} else {
		    		    			$("#selectLanguage").jqGrid('setCaption', 'Mother Tongue');
		    		    		}
		    				},
		    				onSelectAll: function() {
		    					var selectedRows = $("#selectLanguage").getGridParam("selarrrow");
		    		    		if (selectedRows.length > 0 ) {
		    		    			$("#selectLanguage").jqGrid('setCaption', 'Mother Tongue - Selected '+selectedRows.length);		
		    		    		} else {
		    		    			$("#selectLanguage").jqGrid('setCaption', 'Mother Tongue');
		    		    		}
		    				}		    				
		    			});	    				
	    				
	    			} else {
	    				alert("Element selectLanguage does not exist, verify html");
	    			}
	    				
	    				
				}
				
			}).done (function() {
				$("#results").val("Successful....");  
			});
			
			
		},
		
		displayCities: function() {
			optionThis = this.options;
			
	    	var urlData={"dataSource":"ladkaladki",
    			    "procName":"SP_Cities",
    			    "inputParam":'[]',
    			    "outputParam":"dataCursor"
    			    };
	    	$.ajax( {
	    		url:"getJSONServlet",
	    		cache:true,
	    		type:"post",
	    		data:urlData,
	    		datatype:"json",
	    		success: function(data, textstatus, xhr) {

	    			var jsonDataString = JSON.stringify(data);
	    			
	    			/*
	    			var jsonDataString = {"jsonResultSetData":[{"countryId":1,"countryName":"India"},
	    			                                           {"countryId":3,"countryName":"UAE"},
	    			                                           {"countryId":2,"countryName":"USA"},
	    			                                           {"countryId":4,"countryName":"USA4"},
	    			                                           {"countryId":5,"countryName":"USA5"},
	    			                                           {"countryId":6,"countryName":"USA6"}
	    			                                           ]};*/
	    			
	    			if (optionThis.debug) {
		    			console.log(jsonDataString);
		    		}
	    			
	    			if ( $("#selectCities").html() ) {
	    				
		    			$("#selectCities").jqGrid({
		    				mtype:"GET",
		    				datatype:"jsonstring",
		    				datastr: jsonDataString,
		    				jsonReader: {root:"jsonResultSetData", repeatitems:false},
		    				height:'100',
		    				width:'245',
		    				colNames:[ 'City Name','City Id'],
		    				colModel:[
                                      {name:'cityName',index:'cityName', sortable:true, classes:'textFont15px' },
		    				          {name:'cityId',index:'cityId', hidden:true,  align:'left' }
		    				],
		    				multiselect:true,
		    				multiselectWidth:40,
		    				paging:true,
		    				caption:"Residence of",
		    				onSelectRow: function() {
		    					var selectedRows = $("#selectCities").getGridParam("selarrrow");
		    		    		if (selectedRows.length > 0 ) {
		    		    			$("#selectCities").jqGrid('setCaption', 'Residence of - Selected '+selectedRows.length);		
		    		    		} else {
		    		    			$("#selectCities").jqGrid('setCaption', 'Residence of');
		    		    		}
		    				},
		    				onSelectAll: function() {
		    					var selectedRows = $("#selectCities").getGridParam("selarrrow");
		    		    		if (selectedRows.length > 0 ) {
		    		    			$("#selectCities").jqGrid('setCaption', 'Residence of - Selected '+selectedRows.length);		
		    		    		} else {
		    		    			$("#selectCities").jqGrid('setCaption', 'Residence of');
		    		    		}
		    				}		    				
		    			});
	    				
	    				
	    			} else {
	    				alert("Element selectCities does not exist, verify html");
	    			}
	    		},
	    		error: function(xhr, textStatus, errorThrown) {
                    alert(errorThrown);
                }
	    			    		
	    	}).done(function() {
	    		$("#results").val("Successful....");   
	    		
	    	});   		
		},
		
		getSelectedReligions: function() {
	    	optionThis = this.options;
	    	var selectedRows = $("#selectReligion").getGridParam("selarrrow");
	    	var returnValues = "";
	    	if (selectedRows.length > 0 ) {
		    	returnValues = returnValues + $("#selectReligion").jqGrid('getCell', selectedRows[0], 'religionId');
		    	for (var i=1; i<selectedRows.length; i++) {
		    		returnValues = returnValues + ","+$("#selectReligion").jqGrid('getCell', selectedRows[i], 'religionId');	    		
		    	}
	    	}
	    	
	    	return returnValues;    	
		},
		
		getSelectedLanguages: function() {
			optionThis = this.options;
			var selectedRows = $("#selectLanguage").getGridParam("selarrrow");
			var returnValues = "";
			if(selectedRows.length > 0) {
				returnValues = returnValues + $("#selectLanguage").jqGrid('getCell', selectedRows[0], 'languageId');
				for (var i=1; i<selectedRows.length; i++) {
					returnValues = returnValues + ", "+$("#selectLanguage").jqGrid('getCell', selectedRows[i], 'languageId');
				}
			}
			
			return returnValues;
		},
		
		getSelectedCities: function() {
			var selectedRows = $("#selectCities").getGridParam("selarrrow");
			var returnValues = "";
			if (selectedRows.length > 0) {
				returnValues = returnValues + $("#selectCities").jqGrid('getCell', selectedRows[0], 'cityId');
				for (var i=1; i<selectedRows.length; i++) {
					returnValues = returnValues +", "+ $("#selectCities").jqGrid('getCell', selectedRows[i], 'cityId');
					
				}
			}
			
			return returnValues;
		}
		
	});
	
}) (jQuery);
