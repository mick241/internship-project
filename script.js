document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Logged in successfully!");
});

document.getElementById("addPropertyForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Property added successfully!");
});
const carouselImages = document.querySelector('.carousel-images');
const nextButton = document.querySelector('.next-btn');
let currentIndex = 0;
const totalImages = document.querySelectorAll('.carousel-images img').length;

let autoSlide; // To store the setInterval reference
let isPaused = false; // Flag to check if paused

// Function to update the carousel position
function updateCarousel() {
    const offset = -currentIndex * 100; // Calculate the offset for the current image
    carouselImages.style.transform = `translateX(${offset}%)`;
}

// Function to pause the slide for 2 seconds
function pauseCarousel() {
    isPaused = true;
    clearInterval(autoSlide); // Stop auto-sliding
    setTimeout(() => {
        isPaused = false;
        startAutoSlide(); // Restart auto-sliding after the pause
    }, 2000); // Pause duration: 2 seconds
}

// Automatically cycle through images every 10 seconds with pause
function startAutoSlide() {
    autoSlide = setInterval(() => {
        if (!isPaused) {
            currentIndex = (currentIndex + 1) % totalImages; // Loop back to the first image after the last
            updateCarousel();
            pauseCarousel(); // Pause after every slide
        }
    }, 10000); // Slide duration: 10 seconds
}

// Handle the "Next" button click
nextButton.addEventListener('click', () => {
    clearInterval(autoSlide); // Stop auto-sliding temporarily
    currentIndex = (currentIndex + 1) % totalImages; // Loop back to the first image after the last
    updateCarousel();
    pauseCarousel(); // Pause after clicking next
});

// Start the auto-slide
startAutoSlide();
// Define property galleries
const propertyGalleries = [
    [
        "property1.jpg",
        "property1-1.jpg",
        "property1-2.jpg",
        "property1-3.jpg",
    ],
    [
        "property2.jpg",
        "property2-1.jpg",
        "property2-2.jpg",
    ],
    [
        "property3.jpg",
        "property3-1.jpg",
        "property3-2.jpg",
        "property3-3.jpg",
    ],
];

let currentGalleryIndex = 0; // To track the selected gallery
let currentImageIndex = 0;  // To track the currently displayed image

const galleryModal = document.getElementById("gallery-modal");
const galleryImage = document.getElementById("gallery-image");
const thumbnailContainer = document.getElementById("thumbnail-container");

// Open gallery modal
function openGallery(index) {
    currentGalleryIndex = index;
    currentImageIndex = 0;
    galleryModal.style.display = "flex";
    updateGallery();
}

// Close gallery modal
function closeGallery() {
    galleryModal.style.display = "none";
}

// Update modal with current gallery and thumbnails
function updateGallery() {
    const images = propertyGalleries[currentGalleryIndex];
    galleryImage.src = images[currentImageIndex];

    // Clear and add thumbnails
    thumbnailContainer.innerHTML = "";
    images.forEach((image, idx) => {
        const thumbnail = document.createElement("img");
        thumbnail.src = image;
        thumbnail.alt = `Thumbnail ${idx + 1}`;
        thumbnail.onclick = () => {
            currentImageIndex = idx;
            updateGallery();
        };
        thumbnailContainer.appendChild(thumbnail);
    });
}
