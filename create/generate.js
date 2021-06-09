async function doEncrypt() {
    const message = document.getElementById("message").value;
    const url1 = document.getElementById("url-1").value;
    const password1 = document.getElementById("password-1").value;
    const encrypted1 = await cryptoApi.encrypt(url1, password1);

    const fragments = {
        e1: encrypted1,
    }

    if (message) {
        fragments['m'] = message;
    }

    if (!config.baseUrl) {
        let url = window.location.href;
        config.baseUrl = url.substr(0, url.indexOf(config.subPath));
    }
    let output = btoa(JSON.stringify(fragments));
    document.getElementById("output").value = `${config.baseUrl}/#${output}`;

    return output;
}

// async function doDecrypt(hash, password) {
//     let decrypted;
//     try {
//         decrypted = await cryptoApi.decrypt(hash, password);
//     } catch (e) {
//         //console.log("wrong password");
//     }

//     return decrypted;
// }

function copyValue(id) {
    /* Get the text field */
    var copyText = document.getElementById(id);

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert("Copied to clipboard");
}