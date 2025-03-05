import { loadImages } from './imageLoader.js';

(async () => {
    const photoList = document.getElementById('photo-list');
    const albumTitle = document.getElementById('photo-heading'); // Correct ID
    // albumTitle.textContent = "Loading...";
    
    // Append "LOADING..." to the title
    albumTitle.textContent += " (LOADING...)";

    let count = 0;
    for await (const li of loadImages()) {
        photoList.appendChild(li);
        count++;
    }

    // Remove "LOADING..." after all images are loaded
    albumTitle.textContent = "Family Photo Album";

    console.log(`✅ Finished loading ${count} images`);
})();
