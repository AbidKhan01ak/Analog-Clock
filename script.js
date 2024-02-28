// Selecting the clock hands and clock element
const secondHand = document.querySelector(".second-hand");
const hourHand = document.querySelector(".hour-hand");
const minHand = document.querySelector(".min-hand");
const clock = document.querySelector(".clock");

// Creating a div element to display hover time
const hoverTime = document.createElement("div");
hoverTime.classList.add("hover-time");

// Function to set the initial position of the clock hands
function setDate() {
  const now = new Date();
  const seconds = now.getSeconds();
  const secondsDegrees = (seconds / 60) * 360 + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const minute = now.getMinutes();
  const minuteDegrees = (minute / 60) * 360 + (seconds / 60) * 6 + 90;
  minHand.style.transform = `rotate(${minuteDegrees}deg)`;

  const hour = now.getHours();
  const hourDegrees = (hour / 12) * 360 + (minute / 60) * 30 + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

// Initial call to setDate to set the initial position of the hands
setDate();

// Call setDate every second to update the clock
setInterval(setDate, 1000);

// Function to update time when hovering over the clock
function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const amPM = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format
  const timeString = `${hours}:${minutes}:${seconds} ${amPM}`;
  hoverTime.textContent = timeString;
}

// Function to position the time display relative to the mouse pointer
function positionTime(event) {
  hoverTime.style.top = `${event.clientY - 30}px`; // Adjust position relative to mouse
  hoverTime.style.left = `${event.clientX}px`; // Adjust position relative to mouse
}

// Event listener to show time on hover and update position
function showTimeOnHover(event) {
  updateTime(); // Update time when hovering
  positionTime(event); // Position time display relative to mouse
  document.body.appendChild(hoverTime); // Append time display to body
}

// Event listener to hide time on leave
function hideTimeOnLeave() {
  hoverTime.remove(); // Remove time display when leaving
}

// Update time every second to reflect changes in the second hand
setInterval(updateTime, 1000);

// Event listeners to show/hide time on hover/leave
clock.addEventListener("mouseenter", showTimeOnHover);
clock.addEventListener("mousemove", positionTime); // Update time position on mousemove
clock.addEventListener("mouseleave", hideTimeOnLeave);
