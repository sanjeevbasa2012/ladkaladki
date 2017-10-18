(function ($) {	
	$.widget("ladkaladki.llgallery", {		
		options: {
			"targetElement":"",
			
			'imageFiles': '{"data":[' +
					                '{"imageFileName":"P1010034.JPG"},'+ 
	    	                        '{"imageFileName":"P1010391.JPG"}' +
	    	                      ']}',
			"width":800,                 // Should be a numeric value without any suffix of px 
			"height":580,                // Should be a numeric value without any suffix of px
			"profileLoginId":0,          // Login User Id
			"profileId":0,               // Contact Profile Id
			"profileName":"",
			"profileAge":"",
			"profileReligion":"Hindu",
			"profileMotherTongue":"Telugu",
			"profileCity":"Mumbai",
			"profileProfession":"Software Engineer",
			"profileDesc":"",
			"profileBackground":"",
			"profilePartnerReqd":"",
	
			"totalImages":0,             // Internally used by the plugin
			"nextCtr":0,                 // Internally used by the plugin
			"prevCtr":0,                 // Internally used by the plugin
			"currCtr":1,                 // Internally used by the plugin
			"displayPageNumber":false    // Setetying to display the page button link at the bottom on the image
		},
    	/*
    	"imageFiles":{'data':[{'imageFileName':'images/P1010391.JPG'},
    	                        {'imageFileName':'images/P1010391.JPG'},
    	                        {'imageFileName':'images/P1010391.JPG'},
    	                        {'imageFileName':'images/P1010391.JPG'}
    	                       ]}
    	   */
		_create: function() {
			//var optionThis = this.options;
	
			//Call the base			
			this._super();
		},
		_init: function() {
			var optionThis = this.options;
			var totalImages = 0;
			optionThis.targetElement = this.element.context.id;
			console.log("targetElement:"+optionThis.targetElement);
			
			
			var imagesArray = optionThis.imageFiles;
			console.log("optionThis.imageFiles:"+optionThis.imageFiles);
			console.log("imagesArray:"+imagesArray);
			
			var strHTML = "";		
			strHTML += "<table border=0 class='ui-corner-all ui-widget-content km_table'>";
			
			 
			strHTML += "<tr>";
			
			strHTML += "<td width='70%'>";

			strHTML += "<div id='div_ImgGallery' class='ui-corner-all ui-widget-content div_ImgGallery' >";
				 
                // Insert user loaded images here
				totalImages = 0;

	            strHTML += "<a id='close_ImgGalleryBtn' class='close_ImgGallery' href='javascript:void(0)'>";
				strHTML += "<img src='images/close.png' style='border:0px'>";
				strHTML += "</a>";
				
				strHTML += "<a id='prevBtn' class='btnNavLeft' href='javascript:void(0)'>";
				strHTML += "<img src='images/Navigate-Left-48.png'>";
				strHTML += "</a>";
				
				strHTML += "<a id='nextBtn' class='btnNavRight' href='javascript:void(0)'>";
				strHTML += "<img src='images/Navigate-Right-48.png'>";
				strHTML += "</a>";
				
	     	   // Converts String to JSOM object
	     	   var jsonDataString = JSON.parse(imagesArray);
				console.log("jsonDataString:"+jsonDataString);
				var imagePath = "images/";
				var firstImageFileName = ""
				$.each(jsonDataString, function() {
					$.each(this, function(obj, val) {
						console.log('Image File Name:'+val.imageFileName);
						totalImages++;
						
						if (totalImages == 1) {
							firstImageFileName = val.imageFileName;
							strHTML += "<div id='galleryImg_"+totalImages+"' class='ui-corner-all ui-widget-content visible'>";
						}else {
							strHTML += "<div id='galleryImg_"+totalImages+"'  class='ui-corner-all ui-widget-content' style='opacity:0;'>";
						}

					    strHTML += "<img src="+imagePath+val.imageFileName+" width='"+optionThis.width+"' height='"+optionThis.height+"' />";
						strHTML += "</div>";
						
					});			
				});
				optionThis.totalImages = totalImages;
		
			strHTML += "</div>";
			/*
            // Display image button links
            optionThis.totalImages = totalImages;	
            strHTML += "<div id='div_btnLinks' class='ui-corner-all div_btnLinks' >";
			    var imgNum = 0;
				for (var iCtr=0;iCtr<optionThis.totalImages;iCtr++) {
					imgNum = iCtr + 1;
					strHTML += "<a id='page_"+imgNum+"' class='btnPageLink' href='javascript:void(0)'>";
				    strHTML += "&nbsp";
					strHTML += "</a>";
				}

            strHTML += "</div>"; 
            */
			strHTML += "</td>";
			
			
			strHTML += "<td width='30%'>";
			     strHTML += "<div id='div_AutoSale' class='ui-corner-all div_AutoSale' >"; 
	             strHTML += "<table class='ui-corner-all ui-widget-content myAcc_table'>";
	 			
	             strHTML += "<tr>";
	             strHTML += "<td class='myAccHeader lastrow' colspan='2' width='100%'>";
	             strHTML += "<h2>"+optionThis.profileName+"</h2>";
	             strHTML += "</td>";	
	             strHTML += "</tr>";

	             strHTML += "<tr>";
	             strHTML += "<td width='60%'>";
	             strHTML += "<h3>"+"Age"+"</h3>";
	             strHTML += "</td>";
	             strHTML += "<td>";
	             strHTML += "<h3>"+optionThis.profileAge+"&nbsp;yrs</h3>";
	             strHTML += "</td>";
	             strHTML += "</tr>";
	             
	             strHTML += "<tr>";
	             strHTML += "<td width='60%'>";
	             strHTML += "Religion";
	             strHTML += "</td>";
	             strHTML += "<td>";
	             strHTML += optionThis.profileReligion;
	             strHTML += "</td>";
	             strHTML += "</tr>";
	             
	             strHTML += "<tr>";
	             strHTML += "<td width='60%'>";
	             strHTML += "Mother Tongue";
	             strHTML += "</td>";
	             strHTML += "<td>";
	             strHTML += optionThis.profileMotherTongue;
	             strHTML += "</td>";
	             strHTML += "</tr>";

	             strHTML += "<tr>";
	             strHTML += "<td width='60%'>";
	             strHTML += "Resident";
	             strHTML += "</td>";
	             strHTML += "<td>";
	             strHTML += optionThis.profileCity;
	             strHTML += "</td>";
	             strHTML += "</tr>";
	                                  
	             strHTML += "<tr>";
	             strHTML += "<td width='60%'>";
	             strHTML += "Profession"; 
	             strHTML += "</td>";
	             strHTML += "<td>";
	             strHTML += optionThis.profileProfession;
	             strHTML += "</td>";
	             strHTML += "</tr>";
	             
	             strHTML += "<tr>";
	             strHTML += "<td width='60%' colspan='2'>";
	                 strHTML += "<table class='ui-corner-all ui-widget-content myAcc_table'>"; 
	                 strHTML += "<tr>";
	                 strHTML += "<td colspan='2' width='100%'>";
	                 strHTML += "<div id='accordian'>";
	                 
	                 strHTML += "<h3>Profiles personality </h3>";
	                 strHTML += "<div>";
	                 strHTML += "<textarea rows='8' cols='30' disabled wrap='hard'>";
	                 strHTML += optionThis.profileDesc;
	                 strHTML += "</textarea>";
	                 strHTML += "</div>";

	                 strHTML += "<h3>Family Background </h3>";
	                 strHTML += "<div>";
	                 strHTML += "<textarea rows='8' cols='30' disabled wrap='hard'>";
	                 strHTML += optionThis.profileBackground;
	                 strHTML += "</textarea>";
	                 strHTML += "</div>";
	                 
	                 strHTML += "<h3>What am I looking for in my partners</h3>";
	                 strHTML += "<div>";
	                 strHTML += "<textarea rows='8' cols='30' disabled wrap='hard'>";
	                 strHTML += optionThis.profilePartnerReqd;	                 
	                 strHTML += "</textarea>";
	                 strHTML += "</div>";
	                 
	                 strHTML += "</div>";
	                 strHTML += "</td>";
	                 strHTML += "</tr>";                       
	                 strHTML += "</table>";
	              strHTML += "</td>";
	              strHTML += "</tr>";
	              
		          strHTML += "<tr>";
		          strHTML += "<td width='60%' colspan='2'>";
				  strHTML += "<a id='contactProfile' href='#' class='btnPostAd'>Contact</a>";				
	              strHTML += "</td>";
	              strHTML += "</tr>";		          
	              strHTML += "</table>"; 
	              strHTML += "</div>"; 
	                       
			strHTML += "</td>";
			strHTML += "</tr>";			
		
		    strHTML += "</table>";			
			
			$("#"+optionThis.targetElement).append(strHTML);
			$("#page_1").css({color:"#FF0000"});
			//$("#page_1").css({"background":"#FF0000"});
			$("#page_1").removeClass("btnPageLink").addClass("btnPageLinkCurr");
			
			// Set the width and height of the element based on the options width and height 
			// and there after add the class, if we add the class and then set the height and
			// width, they do not seem to be working
			//$("#div_ImgGallery").height(optionThis.height+10);
			//$("#div_ImgGallery").width(optionThis.width+10);
			
		    optionThis.nextCtr = 1;
		    optionThis.prevCtr = 0;
	        $("#prevBtn").prop("disabled", true);
	        $("#nextBtn").prop("disabled", true);
	        
	        //Find if all the images within the galary has been loaded
	        var load_counter = 0;
			var $images = $("#div_ImgGallery img");
			var imgTotal = $images.length;	        
	        
	        $("#message").val(" ");
	        $images.load(function() {
	        	load_counter++;
	        	$("#message").val('Loading....'+load_counter+"  of "+imgTotal);
	        	if (load_counter == imgTotal) {
	        		$("#div_ImgGallery").fadeIn();
	        		if (optionThis.totalImages > 0) {
	        			$("#prevBtn").prop("disabled", true);
	        			$("#nextBtn").prop("disabled", null);
	        			$("#message").val('All Images Loaded');
	        		}
	        	} 
	        });
	           	        
	        //Bind the gallery next Button        
			$("#nextBtn").bind("click", function() {
				  console.log("Next button clicked");
		           // return, if you are on the last image, this should not happen
                   // since the next button would be disabled
		           if (optionThis.nextCtr >= optionThis.totalImages) {
		        	   $("#nextBtn").css({opacity:0});  
		               return;
		           }
		           
		           optionThis.currCtr++;
		           var currImageNum = optionThis.currCtr;
		           var prevImageNum = currImageNum-1;
		           $("#page_"+prevImageNum).removeClass("btnPageLinkCurr").addClass("btnPageLink");
		           $("#page_"+currImageNum).removeClass("btnPageLink").addClass("btnPageLinkCurr");
		           
		           $("#page_"+prevImageNum).css({color:"#000000"});
		           $("#page_"+currImageNum).css({color:"#FF0000"});
		           
		           // Get the First Image
		           var current = $("#div_ImgGallery div.visible");
		           console.log("current="+current.length);

		           if (current.length == 0) {
		               current = $("#div_ImgGallery div:first"); 
		               $("#page_1").css({color:"#FF0000"});
		               $("#page_1").removeClass("btnPageLink").addClass("btnPageLinkCurr");
		               console.log("current="+current.length);
		           }
		           
		           // Get the next image, if it reach the end, rotate it back to the first image
		           var next=   ((current.next().length >0) ? ( (current.next().hasClass('visible')) ? $("#div_ImgGallery div:first") :current.next()) : $("#div_ImgGallery div:first"));
		           console.log("next="+next.length);
		           
		           //hide the current image, by turning off the opacity and the set left to 0
		           if (next.length > 0 ) {        	   
		        	   next.css({opacity:0.3});
		        	   //optionThis.width+10
		               current.css({opacity:1.0}).removeClass('visible').animate({left:0}, 0, function() {
		                   // make the next image visible, the visible class has a z-index
		                   next.css({opacity:1.0}).addClass('visible').animate({left:"0px"}, 0, function() {
		                	   current.css({opacity:0.0});
		                   });  
		               }); 	        	   
		           }
		           
		           //Enable or Disable the next and previous button
		           optionThis.nextCtr++;
		           optionThis.prevCtr++;		           
		           if (optionThis.nextCtr >= optionThis.totalImages)  {
		               $("#nextBtn").prop("disabled", true);
		           }          
		           $("#prevBtn").prop("disabled", null);
			});
			
	        //Bind the gallery previous Button        
			$("#prevBtn").bind("click", function() {
		           // Get the First Image
		           var current = $("#div_ImgGallery div.visible");
		           if (optionThis.prevCtr == 0) {
		        	   $("#prevBtn").css({opacity:0});
		               return;
		           }
		           
		           var prevImageNum = optionThis.currCtr;
		           optionThis.currCtr--;
		           var currImageNum = optionThis.currCtr;
		           
		           $("#page_"+prevImageNum).removeClass("btnPageLinkCurr").addClass("btnPageLink");
		           $("#page_"+currImageNum).removeClass("btnPageLink").addClass("btnPageLinkCurr");
		           
		           $("#page_"+prevImageNum).css({color:"#000000"});
		           $("#page_"+currImageNum).css({color:"#FF0000"});

		           if (current.length == 0) {
		               current = $("#div_ImgGallery div:last");
		           }
		           
		           
		           // Get the next image, if it reach the end, rotate it back to the first image
		           var prev=   ((current.prev().length >0) ? ( (current.prev().hasClass('visible')) ? $("#div_ImgGallery div:last") :current.prev()) : $("#div_ImgGallery div:last"));
		           
		           //hide the current image, by turning off the opacity and the set left to 0
		           current.css({opacity:1.0}).removeClass('visible').animate({left:"0px"},0, function() {
		               // make the next image visible, the visible class has a z-index
		               prev.css({opacity:0.3});
		               prev.css({opacity:1.0}).addClass('visible').animate({left:"0px"}, 0, function() {;
		                  prev.css({left:"0"});
		                  current.css({opacity:0.0});
		               });
		           });
		           
		           
		           /*
				    //Set the fade in effect for the next image, the show call has a z-index 
				    current.removeClass('show').animate({opacity:0.0}, 1000); 
				    next.css({opacity:0.0}).addClass('show').animate({opacity:1.0}, 1000); 
		           */
		           optionThis.prevCtr--;
		           optionThis.nextCtr--;
		           
		           if (optionThis.prevCtr == 0) {
		        	   $("#prevBtn").prop("disabled", true);
		           }
		           $("#nextBtn").prop("disabled", null);	
		           
			});
			
			//Bond Close Button
			$("#close_ImgGalleryBtn").bind("click", function() {
				//$("#"+optionThis.targetElement).hide();
	        	//$("#div_ImgGallery").empty();
	        	//$("#div_ImgGallery").hide();

	        	$("#"+optionThis.targetElement).empty();
	        	$("#"+optionThis.targetElement).hide();
	        	$("#popupOverlay").hide();        	
			});
					
			//Display Next and Prev Button on hover 
			$("#div_ImgGallery").bind("mouseover", function() {
				$("#nextBtn").css({opacity:0.3});
				$("#prevBtn").css({opacity:0.3});
			});
			
			$("#nextBtn").bind("mouseover", function() {
				$("#nextBtn").css({opacity:0.3});
				$("#prevBtn").css({opacity:0.3});
			});
	
			$("#prevBtn").bind("mouseover", function() {
				$("#nextBtn").css({opacity:0.3});
				$("#prevBtn").css({opacity:0.3});
			});
			
			//Display Next and Prev Button on hover 
			$("#div_ImgGallery").bind("mouseout", function() {
				$("#nextBtn").css({opacity:0});
				$("#prevBtn").css({opacity:0});
			});
						
			//Accordian Effect
            $("#accordian").accordion({ header: "h3",          
                autoheight: true,
                active: 0,
                alwaysOpen: false,
                fillspace: false,
                collapsible: true,
                heightStyle: content   //auto, fill, content
            });
            
            //On Contact Profile button clicked
            $("#contactProfile").bind("click", function() {
            	//alert("Contact Profile");
            	$("#popupOverlay").hide();
            	$("#autoSaleForm").css({"display":"block"});

            	$("#autoSaleForm").contactForm({
            		profileLoginId:optionThis.profileLoginId,
			        contactProfileID:optionThis.profileId,
					profileName:optionThis.profileName,
					imageFileName:firstImageFileName,
					width:310,
					height:305
            	});
            	$("#div_AutoSaleContact").css({"display":"block"});
            	$("#div_ImgGalleryContact").css({"display":"block"});
            	$("#autoSaleForm").show();
            	
            });

		},
		destroy: function() {		
			//Unbind all events;
			$(this.element).unbind();
			
			// Kill all the live event for this element
			$(this.element).die();
			
			// Empty the element
			$(this.element).empty();
			
		    // Call the base destory function
			$.Widget.prototype.destroy.call(this);
		}
				
	});
	
}) (jQuery);
