const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function encrypted(secret) {
    const file = document.querySelector('#inp-file').files[0];
    //const file = document.getElementsByTagName('input')[0].value;
    toBase64(file)
        .then(res => {
            document.getElementById("result").value = res;

        }).catch(err => {
            toastr["error"]("No ha seleccionado ningún archivo");
        })
};

function decrypted() {
    const crypto = document.getElementById("result").value;
    let ext;
    if (crypto == "Aquí se mostrará el archivo encriptado") {
        toastr["error"]("No ha seleccionado ningún archivo");
    } else {
        const link = document.createElement('a');
        link.hidden = true;
        if ((crypto.indexOf("image/jpeg") != -1)) {
            ext = ".jpeg";
        } else if ((crypto.indexOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") != -1)) {
            ext = ".xlsx";
        } else if ((crypto.indexOf("application/vnd.openxmlformats-officedocument.wordprocessingml.document") != -1)) {
            ext = ".docx";
        } else if ((crypto.indexOf("image/png") != -1)) {
            ext = ".png";
        } else if ((crypto.indexOf("text/plain") != -1)) {
            ext = ".txt";
        } else if ((crypto.indexOf("application/json") != -1)) {
            ext = ".json";
        } else if ((crypto.indexOf("video/mp4") != -1)) {
            ext = ".mp4";
        };
        link.download = "data" + ext;
        link.href = crypto;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}

function clean() {
    document.getElementById("result").value = "Aquí se mostrará el archivo encriptado";
    document.getElementById("inp-file").value = "";
}