// filepath: /e:/GitHub/static-site/photo-album/imageLoader.js
import { isEditable } from './config.js';

let imagesData = [];

export async function* loadImages() {
    try {
        const response = await fetch("images.json");

        if (!response.ok) {
            throw new Error(`Failed to load images: ${response.status} ${response.statusText}`);
        }

        const images = await response.json();
        imagesData = images; // Store the images data
        sortImagesData(); // Sort images data by sortOrder

        for (const image of imagesData) {
            // Commented-out delay for now, but can be re-enabled if needed
            // await new Promise(resolve => setTimeout(resolve, 100));
            
            const li = document.createElement("li");
            li.classList.add("photo-item");
            li.innerHTML = `
                <div class="photo-container">
                    <div class="photo-content">
                        <p class="photo-title" contenteditable="${isEditable()}">${image.title}</p>
                        <img src="${image.filePath}" alt="${image.title}">
                        <p class="photo-description">${image.description}</p>
                        <div class="photo-controls">
                            <button class="up-button">Up</button>
                            <button class="down-button">Down</button>
                        </div>
                    </div>
                </div>
            `;

            // Add event listener to track changes if editable
            if (isEditable()) {
                li.querySelector('.photo-title').addEventListener('input', (event) => {
                    updateImageTitle(image.filePath, event.target.innerText);
                });
            }

            // Add event listeners for up and down buttons
            li.querySelector('.up-button').addEventListener('click', () => {
                console.log(`up ${image.filePath}`);
            });

            li.querySelector('.down-button').addEventListener('click', () => {
                console.log(`down ${image.filePath}`);
            });

            yield li;
        }
    } catch (error) {
        console.error("Error loading images:", error);
    }
}

function updateImageTitle(filePath, newTitle) {
    const image = imagesData.find(img => img.filePath === filePath);
    if (image) {
        image.title = newTitle;
    }
    console.log("Updated images data: ", imagesData);
}

export function getImagesData() {
    return imagesData;
}

export function sortImagesData() {
    imagesData.sort((a, b) => a.sortOrder - b.sortOrder);
}