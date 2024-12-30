document.addEventListener("DOMContentLoaded", () => {
    const mapContainer = document.querySelector(".dotted-map");
    const mapImage = document.getElementById("dotted-map-image");
    const maxCircles = 8;
  
    const createCircle = (x, y) => {
      const circle = document.createElement("div");
      circle.className = "pulsating-circle";
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;
      mapContainer.appendChild(circle);
  
      // Remove the circle after 5 seconds
      setTimeout(() => {
        mapContainer.removeChild(circle);
      }, 5000);
    };
  
    const getRandomPosition = (image, context) => {
      const { width, height } = image;
      let x, y, pixel;
  
      do {
        x = Math.floor(Math.random() * width);
        y = Math.floor(Math.random() * height);
        pixel = context.getImageData(x, y, 1, 1).data;
      } while (pixel[3] === 0); // Repeat if the pixel is transparent
  
      return { x, y };
    };
  
    const init = () => {
      // Create a hidden canvas to read pixel data from the map image
      const canvas = document.createElement("canvas");
      canvas.width = mapImage.offsetWidth;
      canvas.height = mapImage.offsetHeight;
      const context = canvas.getContext("2d");
  
      mapImage.onload = () => {
        context.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
  
        setInterval(() => {
          if (mapContainer.querySelectorAll(".pulsating-circle").length < maxCircles) {
            const { x, y } = getRandomPosition(mapImage, context);
            createCircle(x, y);
          }
        }, 800); // Add a new circle every second
      };
    };
  
    init();
  });
  