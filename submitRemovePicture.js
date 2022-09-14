const formRemovePicture = document.getElementById('formRemovePicture');
const urlPost = 'http://localhost:3000/api/remove/picture';
const urlJson = 'app-data/library/picture-library.json';

formRemovePicture.addEventListener('submit', async event => {
    event.preventDefault();
    //Create the key/value pairs used in the form
    const formData = new FormData(formRemovePicture);
    try {
        //send the data using post and await the reply
        const response = await fetch(urlPost, {
            method: 'post',
            body: formData
        });
        const result = await response.text();

        if (response.ok) {

            const response = await fetch(urlJson);
            const data = await response.text();

            alert(`Thank you for submitting the information. It has been recieved:\n`+
                `${data}`);
        }
        else {
            alert("Transmission error");
        }
        console.log(result);
    }
    catch {
        alert("Transmission error");
    }
})