/**
* 'See samples' reveal handling for ryanmiglavs.com/portfolio
*
* 
*
*/

(function () {
	// Initialize when the DOM is ready
	// 	• Find and store DOM elements
	//	• Set up click handler for see samples elements
	document.addEventListener('DOMContentLoaded', function() {
		var stories = [].slice.call(document.querySelectorAll('ol#design-stories > li'));
		
		document.body.classList.add('js');
		
		stories.forEach(function(li) {
			var viewSamplesLink= li.querySelector('a.view-samples');
			
			viewSamplesLink.addEventListener('click', function(e) {
				li.classList.add('expanded');
				e.preventDefault();
			});
		});
	});
})();