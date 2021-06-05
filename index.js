let params;

var intervalID

function controlsDisabled(disabled) {
    document.getElementById("password").disabled = disabled;
    document.getElementById("openButton").disabled = disabled;
}

function fadeout(elementId) {
    var fade = document.getElementById(elementId);

    intervalID = setInterval(() => {

        if (!fade.style.opacity) {
            fade.style.opacity = 1;
        }


        if (fade.style.opacity > 0) {
            fade.style.opacity -= 0.1;
        } else {
            clearInterval(intervalID);
        }

    }, 200);
}

var errorInterval

function alertMessage(text, fading = true) {
    var fade = document.getElementById("message-box");
    fade.innerText = text;
    fade.style.opacity = 1;
    clearTimeout(intervalID);
    clearTimeout(errorInterval);
    if (fading) {
        errorInterval = setTimeout(() => {
            fadeout("message-box");
        }, 3000);

    }

}

function showPanel(panelId) {
    document.getElementById(panelId).style.display = "block";
}

async function main() {
    if (window.location.hash) {
        const hash = window.location.hash.slice(1);

        try {
            params = JSON.parse(atob(hash));
        } catch (e) {
            error("Invalid link");
            showPanel("panel-error");
            return;
        }

        message = params["m"];

        if (message) {
            document.getElementById("title").innerHTML = message;
        }
        showPanel("panel-input");

    } else {
        showPanel("panel-error");
    }
}

async function decrypt() {
    const password = document.getElementById("password").value;

    if (!password) {
        alertMessage("Please type a password");
        controlsDisabled(false);
        return;
    }

    controlsDisabled(true);

    const link1 = await doDecrypt(params["e1"], password);
    const link2 = await doDecrypt(params["e2"], password);
    const link3 = await doDecrypt(params["e3"], "afkla4^$QWkf;arg");

    if (link1) {
        proceedLink(link1);
    } else if (link2) {
        proceedLink(link2);
    } else {
        // wrong password, delay 10s
        alertMessage('Processing...', false);
        var loadingInterval = setTimeout(() => {
            proceedLink(link3);
        }, 10000);

    }

    //failsafe
    // TODO: redirect to self

}

function proceedLink(link) {
    alertMessage("Unlocked, opening link");
    //console.log('SUCCESS!');
    //console. log("LINK: " + link);

    try {
        let objUrl = new URL(link);
        window.location.replace(link);
    } catch {
        alertMessage("Invalid link", false);
        return;
    }
}

async function doDecrypt(hash, password) {
    let decrypted = null;
    try {
        decrypted = await cryptoApi.decrypt(hash, password);
    } catch (e) {
        //console.log(e);
        //alertMessage("Data error");
        return null;
    }

    return decrypted;
}