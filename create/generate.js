async function doEncrypt() {
    const baseUrl = "http://127.0.0.1:5500/#";

    const message = document.getElementById("message").value;
    const url1 = document.getElementById("url-1").value;
    const password1 = document.getElementById("password-1").value;
    const url2 = document.getElementById("url-2").value;
    const password2 = document.getElementById("password-2").value;
    const url3 = document.getElementById("url-3").value;
    const password3 = "afkla4^$QWkf;arg";

    //if (message){
    //  const encryptedMsg = await cryptoApi.encrypt(message,password3);
    //} else {
    //  const encryptedMsg = null;
    //}

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

    //const password = "123456";
    //const linkUrl = "http://www.google.com";
    //const encrypted = await cryptoApi.encrypt(linkUrl,password);
    //encodedHAsh = testObj.encode("saya");
    console.log('output');
    console.log(fragments);
    let output = btoa(JSON.stringify(fragments));
    //let output = new Uint8Array(encrypted)
    console.log(output);
    const test = "eyJlMSI6ImIxc1JPWDJhRXlVaXY4SkRuamw4R2F4RUEvR3cvd2xKK1F5NE5OM1JQNHgzYmltZ25BNGU3M1pBOEMycmtxSVdvaWZCdGF5bWduZ3QwaGwxQnl6V25hWGVjWUJyIiwiZTIiOiJBMC9DNk1BTk5MYk12OXRsUGhJVEdvb0RxQTgrczFKd1RkcDdGOHZhdjdORzJHVkRTMjJjb3dlcCs4cVNYRlEzRXhOUko2Y2FsZnNyaDRzT0JzN0xOSEtDTkpNPSIsImUzIjoiUUJNcmY5NzRWQUJLY2g3Y1pGd3VGZGhHSkZQbmpTc1poY0R0cGcwSnRxRGJ6UlpabTI5Y3RyWUYwdnkxK0Zqc1lGY1VVY0syb3MvMXEwMjd1bHgrcFVJaCIsIm0iOiJUaGlzIGlzIGEgdGVzdCJ9";
    console.log(atob(output));
    console.log(JSON.parse(atob(output)));
    //doDecrypt(encrypted1, "satu");
    document.getElementById("output").value = `http://127.0.0.1:5500/#${output}`;
    console.log('password: ' + password1);
    console.log(fragments["e1"]);
    console.log("1: " + await doDecrypt("rthJ93uSGZMMa/1hijrw1UVX7Ue6aw7rdp4z64gCMm+tEf5peVDDRW6qWbmexC+LIEsu+m5pLiZKjsJH+1BHkPZ/hYAx", "satu"));
    //document.getElementById("output").value = output;
    //document.querySelector("#output").value
    return output;
}

async function doDecrypt(hash, password) {
    //const password = "123456";
    let decrypted;
    try {
        decrypted = await cryptoApi.decrypt(hash, password);
    } catch (e) {
        console.log("wrong password");
    }
    //encodedHAsh = testObj.encode("saya");
    console.log(decrypted);
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