/**
* 'See samples' reveal handling for ryanmiglavs.com/portfolio
*
* 
*
*/

(function () {
	var prefersReducedMotion = matchMedia('(prefers-reduced-motion)');
	var isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
	
	
	// Initialize when the DOM is ready
	// 	• Find and store DOM elements
	//	• Set up click handler for see samples elements
	document.addEventListener('DOMContentLoaded', function() {
		var stories = [].slice.call(document.querySelectorAll('ol#design-stories > li'));
		
		document.body.classList.add('js');
		
		stories.forEach(function(li) {
			var viewSamplesLink= li.querySelector('a.view-samples');
			
			viewSamplesLink.addEventListener('click', function(e) {
				if ( li.classList.contains('expanded') ) {
					var offsetTop = getPageOffset(li.querySelector('.project-intro'));
					
					li.classList.remove('expanded');
					
					if ( window.pageYOffset > (offsetTop + window.innerHeight) ) {
						if (!prefersReducedMotion && isSmoothScrollSupported) {
							window.scrollTo({
								'behavior': 'smooth',
								'left': 0,
								'top': offsetTop,
							});
						} else {
							window.scrollTo(0, offsetTop);
						}
					}
					
				} else {
					li.classList.add('expanded');
				}
				
				e.preventDefault();
			});
		});
	});
	
	function getPageOffset(el) {
		var currentOffset = 0;
		
		if (el.offsetParent) {
			do {
				currentOffset += el.offsetTop;
			} while (el = el.offsetParent);
		}
		
		return currentOffset;
	}
})();