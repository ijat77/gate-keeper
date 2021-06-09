async function doEncrypt() {
    const message = document.getElementById("message").value;
    const url1 = document.getElementById("url-1").value;
    const password1 = document.getElementById("password-1").value;
    const encrypted1 = await cryptoApi.encrypt(url1, password1);
    const encrypted2 = await cryptoApi.encrypt(url2, password2);
    const encrypted3 = await cryptoApi.encrypt(url3, password3);

    const fragments = {
        e1: encrypted1,
        e2: encrypted2,
        e3: encrypted3
    }

    if (message) {
        fragments['m'] = message;
    }

    console.log(JSON.stringify(fragments));

    if (!config.baseUrl) config.baseUrl = window.location.origin;
    let output = btoa(JSON.stringify(fragments));
    document.getElementById("output").value = `${config.baseUrl}/#${output}`;

    return output;
}

async function doDecrypt(hash, password) {
    let decrypted;
    try {
        decrypted = await cryptoApi.decrypt(hash, password);
    } catch (e) {
        //console.log("wrong password");
    }

    return decrypted;
}

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