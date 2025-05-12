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

	// Image hover swap code

	document.addEventListener('DOMContentLoaded', function () {
		const img = document.querySelector('.profile-img-hover');
		if (img) {
			const originalSrc = img.getAttribute('src');
			const altSrc = img.getAttribute('data-alt');

			if (!altSrc) {
				console.warn('Missing data-alt attribute on image.');
				return;
			}

			img.addEventListener('mouseenter', () => {
				img.setAttribute('src', altSrc);
			});

			img.addEventListener('mouseleave', () => {
				img.setAttribute('src', originalSrc);
			});
		} else {
			console.warn('No image with class "profile-img-hover" found.');
		}
	});

	// Projects Carousel Logic

	document.addEventListener('DOMContentLoaded', function () {
		// Example project data (replace with your real projects)
		const projects = [
			{
				title: 'Covid-19 Trends Dashboard',
				img: 'assets/images/covid.jpeg',
				desc: 'A dashboard to visualize the trends of Covid-19 cases and deaths.',
				link: 'https://covid-projector-nb.streamlit.app/net'
			},
			{
				title: 'Robocoder',
				img: 'assets/images/rc.png',
				desc: 'A web application that allows users to code with AI assistance.',
				// link: 'https://robocoder.vercel.app/'
			},
			{
				title: 'Book library',
				img: 'assets/images/book-library.jpeg',
				desc: 'A web application that allows users to manage their book library.',
				// link: 'https://book-library-one.vercel.app/'
			},
			// {
			// 	title: 'Project Four',
			// 	img: 'assets/images/demo4.jpeg',
			// 	desc: 'Description for project four.',
			// 	link: 'https://example.com/project4'
			// },
			// {
			// 	title: 'Project Five',
			// 	img: 'assets/images/demo5.jpeg',
			// 	desc: 'Description for project five.',
			// 	link: 'https://example.com/project4'
			// },
			// {
			// 	title: 'Project Six',
			// 	img: 'assets/images/demo6.jpeg',
			// 	desc: 'Description for project six.',
			// 	link: 'https://example.com/project4'
			// }
		];

		const carousel = document.querySelector('.projects-carousel');
		const leftBtn = document.querySelector('.carousel-nav.left');
		const rightBtn = document.querySelector('.carousel-nav.right');
		let startIdx = 0;

		function renderProjects() {
			carousel.innerHTML = '';
			for (let i = 0; i < 3; i++) {
				let idx = (startIdx + i) % projects.length;
				let item = document.createElement('div');
				item.className = 'project-item' + (i === 1 ? ' center' : '');
				item.innerHTML = `
					<img src="${projects[idx].img}" alt="${projects[idx].title}">
					<h3>${projects[idx].title}</h3>
					<ul class="project-bullets">
						<li>${projects[idx].desc}</li>
						<li><a href="${projects[idx].link}" target="_blank" rel="noopener" class="project-link">🔗 View Project</a></li>
					</ul>
				`;
				// Move to center on click/touch
				item.addEventListener('click', function() {
					// Calculate the offset to make this item the center
					const offset = (idx - ((startIdx + 1) % projects.length) + projects.length) % projects.length;
					startIdx = (startIdx + offset) % projects.length;
					renderProjects();
				});
				item.addEventListener('touchend', function() {
					const offset = (idx - ((startIdx + 1) % projects.length) + projects.length) % projects.length;
					startIdx = (startIdx + offset) % projects.length;
					renderProjects();
				});
				carousel.appendChild(item);
			}
		}

		leftBtn.addEventListener('click', function() {
			startIdx = (startIdx - 1 + projects.length) % projects.length;
			renderProjects();
		});
		rightBtn.addEventListener('click', function() {
			startIdx = (startIdx + 1) % projects.length;
			renderProjects();
		});

		// Swipe support for mobile (horizontal)
		let touchStartX = null;
		carousel.addEventListener('touchstart', function(e) {
			touchStartX = e.changedTouches[0].screenX;
		});
		carousel.addEventListener('touchend', function(e) {
			if (touchStartX === null) return;
			let touchEndX = e.changedTouches[0].screenX;
			if (touchEndX - touchStartX > 40) {
				// Swipe right
				leftBtn.click();
			} else if (touchStartX - touchEndX > 40) {
				// Swipe left
				rightBtn.click();
			}
			touchStartX = null;
		});

		renderProjects();
	});

	// Awards section entrance animation
	(function() {
		const cards = document.querySelectorAll('.award-card');
		if (!('IntersectionObserver' in window) || !cards.length) {
			// Fallback: show all
			cards.forEach(card => card.classList.add('visible'));
			return;
		}
		const observer = new IntersectionObserver((entries, obs) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					obs.unobserve(entry.target);
				}
			});
		}, { threshold: 0.2 });
		cards.forEach(card => observer.observe(card));
	})();

	// Features section entrance animation
	(function() {
		const features = document.querySelectorAll('.feature-animate');
		if (!('IntersectionObserver' in window) || !features.length) {
			features.forEach(f => f.classList.add('visible'));
			return;
		}
		const observer = new IntersectionObserver((entries, obs) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					obs.unobserve(entry.target);
				}
			});
		}, { threshold: 0.2 });
		features.forEach(f => observer.observe(f));
	})();

}());
