;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	
	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
	});


}());

document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.getElementById('downloadCV');
    
    downloadButton.addEventListener('click', function() {
        const cvUrl = '/Users/nbayramli/Desktop/University stuff/extra-documents/Nazrin Bayramli Resume.pdf';

        const link = document.createElement('a');
        link.href = cvUrl;
        link.download = 'Nazrin_Bayramli_Resume.pdf'; 
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
		window.open(cvUrl, '_blank');

    });
	
});


document.addEventListener('DOMContentLoaded', function() {
	// Select the form within the container with id "fh5co-consult"
	var form = document.querySelector('#fh5co-consult form');
	if (!form) {
	  console.error("Contact form not found!");
	  return;
	}
  
	form.addEventListener('submit', function(e) {
	  e.preventDefault(); // Prevent default form submission
  
	  // Retrieve values from the form fields
	  var fname   = document.getElementById('fname').value.trim();
	  var lname   = document.getElementById('lname').value.trim();
	  var email   = document.getElementById('email').value.trim();
	  var subject = document.getElementById('subject').value.trim();
	  var message = document.getElementById('message').value.trim();
  
	  // Simple validation to ensure all fields are filled
	  if (!fname || !lname || !email || !subject || !message) {
		alert("Please fill in all fields.");
		return;
	  }
  
	  // Set up the parameters for EmailJS
	  var templateParams = {
		fname: fname,
		lname: lname,
		email: email,
		subject: subject,
		message: message
	  };
  
	  // Send email using EmailJS
	  emailjs.send('service_9d5mf2s', 'YOUR_TEMPLATE_ID', templateParams)
		.then(function(response) {
		  alert("Thank you " + fname + "! Your message has been sent.");
		  form.reset();
		}, function(error) {
		  alert("Failed to send message. Please try again later.");
		  console.error("EmailJS error:", error);
		});
	});
  });
  
