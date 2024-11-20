document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('uploadForm');
    const animalImage = document.getElementById('animalImage');
    const resultDiv = document.getElementById('result');
    const fileInput = document.getElementById('fileInput');

    const animalImages = {
        cat: 'https://i.imgur.com/CzXTtJV.jpg',
        dog: 'https://i.imgur.com/OB0y6MR.jpg',
        elephant: 'https://i.imgur.com/WFVZ3Xf.jpg'
    };

    // Add event listeners to radio buttons
    document.querySelectorAll('input[name="animal"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const animal = e.target.value;
            animalImage.src = animalImages[animal];
            animalImage.style.display = 'block';
            
            // Clear file input and result div when changing animal
            fileInput.value = '';
            resultDiv.innerHTML = '';
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const selectedAnimal = formData.get('animal');

        if (!selectedAnimal) {
            alert('Please select an animal');
            return;
        }

        if (fileInput.files.length === 0) {
            alert('Please select a file to upload');
            return;
        }

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            resultDiv.innerHTML = `
                <p>File uploaded successfully for ${selectedAnimal}</p>
                <p>File Name: ${result.file_name}</p>
                <p>File Size: ${result.file_size} bytes</p>
                <p>File Type: ${result.file_type}</p>
            `;
        } catch (error) {
            console.error('Error:', error);
            resultDiv.textContent = 'An error occurred during upload';
        }
    });
});
