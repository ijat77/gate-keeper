function error(text) {
    document.querySelector(".error").style.display = "inherit";
    document.querySelector("#errortext").innerText = `Error: ${text}`;
}

async function main() {
    if (window.location.hash) {
        const hash = window.location.hash.slice(1);
        //console.log(hash);
        let params;
        try {
            params = JSON.parse(atob(hash));
        } catch {
            error("Invalid link");
            return;
        }

        const password = document.getElementById("password").value;
        //console.log(params);
        const link1 = await doDecrypt(params["e1"], password);
        const link2 = await doDecrypt(params["e2"], password);
        const link3 = await doDecrypt(params["e3"], "afkla4^$QWkf;arg");


    } else {
        error("no data");
    }
}

async function doDecrypt(hash, password) {
    let decrypted;
    try {
        decrypted = await cryptoApi.decrypt(hash, password);
    } catch (e) {
        console.log("wrong password:");
        console.log(e);
    }
    //encodedHAsh = testObj.encode("saya");
    console.log(decrypted);
    return decrypted;
}