export default function getBase64Image(file, id) {
    var fileReader = new FileReader();

    fileReader.onload = function() {
        localStorage.setItem(id, fileReader.result);
    };

    fileReader.readAsDataURL(file);
}