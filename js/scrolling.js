/**
* Scroll handling for ryanmiglavs.com
*
* Things that happen on scroll:
* 	• Main h1 moves and changes opacity
*	• Body gets 'scrolled' class
*	• figcaptions move up and increase opacity
*	• figure > img moves down (to scroll 'slower')
*/

(function () {
	var speed = .15;
	var header = {};
	var h1 = {};
	var manifestoLis = [];
	
	var prefersReducedMotion = matchMedia('(prefers-reduced-motion)');
	var isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
	
	
	if (!prefersReducedMotion.matches) {
		// Initialize when the DOM is ready
		// 	• Find and store DOM elements
		//	• Set up click handler for scroll arrow pseudo-element
		document.addEventListener('DOMContentLoaded', function() {
			// Find the DOM elements
			header = document.getElementsByTagName('header')[0]
			h1 = document.getElementsByTagName('h1')[0];
			manifestoLis = document.getElementById('manifesto')
				? document.getElementById('manifesto').getElementsByTagName('li')
				: null;
			
			// I'm only using standard browser-supported smooth-scrolling.
			if (isSmoothScrollSupported) {
				header.style.cursor = 'pointer';
				header.onclick = function() {
					var bottomOfHeader = header.getBoundingClientRect().bottom;
					window.scrollTo({
						'behavior': 'smooth',
						'left': 0,
						'top': bottomOfHeader
					});
				}
			}
		});
		
		window.onscroll = function() {
			// Adjust translateY() on h1
			h1.style.transform = 'translateY(' + (window.pageYOffset * speed) + 'px)';
			if (window.pageYOffset > 0) {
				h1.style.opacity = 1 / (window.pageYOffset/100);
				document.body.classList.add('scrolled');
			} else {
				h1.style.opacity = 1;
				document.body.classList.remove('scrolled');
			}
			
			// Adjust translateY() property on elements inside home manifesto <li>s
			if (manifestoLis) {
				var len = manifestoLis.length;
				for (i=0; i<len; ++i) {
					var li = manifestoLis[i];
					var figcaption = li.getElementsByTagName('figcaption')[0];
					var img = li.getElementsByTagName('img')[0];
					var offset = li.getBoundingClientRect().top;
					
					// Adjust translateY() on figcaptions
					if (figcaption) {
						figcaption.style.transform = 'translateY(' + (offset * speed) + 'px)';
					}
					// Adjust opacity on figcaptions
					if (offset > 0) {
						figcaption.style.opacity = 1 / (offset/80);
					} else {
						figcaption.style.opacity = 1;
					}
					
					// Adjust translateY() on imgs
					if (img) {
						img.style.transform = 'translateY(' + (offset * speed * -1) + 'px)';
					}
				}
			}
		}
	}	
})();