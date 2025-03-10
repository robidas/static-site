import { loadImages, getImagesData, sortImagesData } from './imageLoader.js';
import { isEditable, setEditable } from './config.js';

// For future use: setting the editable flag based on some condition
// setEditable(true);
(async () => {
    const photoList = document.getElementById('photo-list');
    const albumTitle = document.getElementById('photo-heading'); // Correct ID
    
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

if (isEditable()) {
    console.log("Editing is enabled.");
} else {
    console.log("Editing is disabled.");
}

document.getElementById('save-button').addEventListener('click', () => {
    saveChanges();
});

async function saveChanges() {
    try {
        sortImagesData(); // Sort images data by sortOrder before saving

        const fileHandle = await window.showSaveFilePicker({
            suggestedName: 'images.json',
            types: [{
                description: 'JSON Files',
                accept: {'application/json': ['.json']}
            }]
        });

        const writableStream = await fileHandle.createWritable();
        await writableStream.write(JSON.stringify(getImagesData(), null, 2));
        await writableStream.close();

        console.log("Changes saved!");
    } catch (error) {
        console.error("Error saving changes:", error);
    }
}