const tabsContainer = document.querySelector(".tabs-container");
const allTabs = document.querySelectorAll(".tab");
const arrowIcons = document.querySelectorAll(".icon i");

let isDragging = false;

const handleIcons = (scrollVal) => {
  let maxScrollableWidth = tabsContainer.scrollWidth - tabsContainer.clientWidth;
  arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
  arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
};

arrowIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    // Adjust scroll position
    let scrollWidth = icon.id === "left" ? -150 : 150;
    tabsContainer.scrollLeft += scrollWidth;

    handleIcons(tabsContainer.scrollLeft);
  });
});

allTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabsContainer.querySelector(".active").classList.remove("active");
    tab.classList.add("active");
  });
});

const dragging = (e) => {
  if (!isDragging) return;
  tabsContainer.classList.add("dragging");
  tabsContainer.scrollLeft -= e.movementX;
  
  handleIcons(tabsContainer.scrollLeft);
};

const dragStop = () => {
  isDragging = false;
  tabsContainer.classList.remove("dragging");
};

// Handle mouse and touch events for dragging
tabsContainer.addEventListener("mousedown", () => isDragging = true);
tabsContainer.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

tabsContainer.addEventListener("touchstart", () => isDragging = true);
tabsContainer.addEventListener("touchmove", dragging);
document.addEventListener("touchend", dragStop);


// Function for filter icon
document.querySelector('.bi-filter').addEventListener("click", () => {
  const inputsContainer = document.querySelector('.inputs');

  if(inputsContainer.style.display = "none") {
    inputsContainer.style.display = "block"
  }
  else {
    inputsContainer.style.display = "none";
  }
});

document.querySelector('.filter').addEventListener("mouseleave", () => {
  const inputsContainer = document.querySelector('.inputs');

  if(inputsContainer.style.display = "block") {
    inputsContainer.style.display = "none"
  }
});

