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
            $('.alert').alert("Seleccione un archivo");
        })
};

function decrypted() {
    const crypto = document.getElementById("result").value;
    const link = document.createElement('a');
    link.hidden = true;
    link.download = "data.xlsx";
    link.href = crypto;
    document.body.appendChild(link);
    link.click();
    link.remove();
}