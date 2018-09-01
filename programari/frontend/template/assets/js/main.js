document.addEventListener('DOMContentLoaded', () => {
	// Add a click event on each of them
	document.querySelectorAll('.navbar-burger').forEach(($el) => {
		$el.addEventListener('click', () => {
			var target = $el.dataset.target;
			var $target = document.getElementById(target);
			$el.classList.toggle('is-active');
			$target.classList.toggle('is-active');

		});
	});
});