async function doEncrypt() {
    const message = document.getElementById("message").value;
    const url1 = document.getElementById("url-1").value;
    const password1 = document.getElementById("password-1").value;
    const url2 = document.getElementById("url-2").value;
    const password2 = document.getElementById("password-2").value;
    const url3 = document.getElementById("url-3").value;
    const password3 = "afkla4^$QWkf;arg";

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

    if (!config.baseUrl) {
        let url = window.location.href;
        config.baseUrl = url.substr(0, url.indexOf(config.subPath));
    }
    let output = btoa(JSON.stringify(fragments));
    document.getElementById("output").value = `${config.baseUrl}/#${output}`;

    return output;
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