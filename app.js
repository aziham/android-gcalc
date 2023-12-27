const btnsContainer = document.querySelector(".controls");

























// Handling buttons animation
const handleMouseUp = event => {
	event.target.classList.remove("btn-radius");
	setTimeout(() => {
		event.target.classList.remove("btn-overlay");
	}, 100);
}

const handleMouseDown = event => {
	let btn = event.target;
	btn.classList.add("btn-radius");
	btn.classList.add("btn-overlay");
	btn.addEventListener("mouseup", handleMouseUp);
}

btnsContainer.addEventListener("mousedown", handleMouseDown);
