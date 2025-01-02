const titles = [
    "Innovation",
    "Collaboration",
    "Excellence",
    "Growth",
    "Integrity"
  ];
  
  const descriptions = [
    "We thrive on pushing boundaries and exploring new ideas to create a lasting impact. At our core, innovation drives everything we do, from developing groundbreaking technologies to reimagining the way we approach challenges in our industry.",
    "Together, we solve the toughest problems, leveraging diverse perspectives and expertise to drive change and make a difference in the world.",
    "We are committed to delivering the highest standards in everything we do, fostering a culture of excellence and continuous improvement.",
    "Our people are our greatest asset, and we invest in their personal and professional development to help them grow and thrive.",
    "Trust and transparency are at the heart of our business. We uphold integrity in every decision we make and every action we take."
  ];
  
  const images = [
    "/images/innovation.png",
    "/images/collaboration.png",
    "/images/excellence.png",
    "/images/growth.png",
    "/images/integrity.jpeg"
  ];
  
  let currentSlide = 0;
  let autoSlideInterval;
  
  const titleElement = document.getElementById("carousel-title");
  const descriptionElement = document.getElementById("carousel-description");
  const imageElement = document.getElementById("carousel-image");
  const carouselText = document.querySelector(".carousel-text");
  const carouselImage = document.querySelector(".carousel-image");
  
  function updateSlide() {
    // Remove active class to trigger exit animations
    carouselImage.classList.remove("active");  
    setTimeout(() => {
      // Update content after animations complete
      titleElement.textContent = titles[currentSlide];
      descriptionElement.textContent = descriptions[currentSlide];
      imageElement.src = images[currentSlide];
      imageElement.alt = titles[currentSlide];
  
      // Add active class to trigger entrance animations
      carouselText.classList.add("active");
      carouselImage.classList.add("active");
    }, 300); // Delay to match exit animation duration
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + titles.length) % titles.length;
    updateSlide();
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % titles.length;
    updateSlide();
  }
  
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      nextSlide();
    }, 8000);
  }
  
  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }
  
  // Initialize the first slide and start auto-sliding
  updateSlide();
  startAutoSlide();
  
  // Optional: Stop auto-slide on user interaction
  document.querySelectorAll(".arrow").forEach(button => {
    button.addEventListener("click", stopAutoSlide);
  });
  