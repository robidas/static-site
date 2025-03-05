export async function* loadImages() {
    try {
        const response = await fetch("images.json");

        if (!response.ok) {
            throw new Error(`Failed to load images: ${response.status} ${response.statusText}`);
        }

        const images = await response.json();

        for (const image of images) {
            // Commented-out delay for now, but can be re-enabled if needed
            // await new Promise(resolve => setTimeout(resolve, 100));

            const li = document.createElement("li");
            li.innerHTML = `
                <div class="photo-container">
                    <p class="photo-title">${image.title}</p>
                    <img src="${image.filePath}" alt="${image.title}">
                    <p class="photo-description">${image.description}</p>
                </div>
            `;

            yield li; // Yielding the actual li element, so script.js can use appendChild()
        }
    } catch (error) {
        console.error("Error loading images:", error);
    }
}
