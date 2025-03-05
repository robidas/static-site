export async function* loadImages() {
    try {
        const response = await fetch("images.json");

        if (!response.ok) {
            throw new Error(`Failed to load images: ${response.status} ${response.statusText}`);
        }

        const images = await response.json();

        for (const image of images) {
            // await new Promise(resolve => setTimeout(resolve, 5)); // Simulate network delay for testing

            const li = document.createElement("li");
            li.innerHTML = `
                <div class="photo-container">
                    <img src="${image.filePath}" alt="${image.title}">
                    <p class="photo-title">${image.title}</p>
                    <p class="photo-description">${image.description}</p>
                </div>
            `;
            yield li;
        }
    } catch (error) {
        console.error("Error loading images:", error);
    }
}
