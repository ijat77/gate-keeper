var params;

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

function alertMessage(text, fading = true, color = "crimson") {
    var fade = document.getElementById("message-box");
    fade.innerText = text;
    fade.style.color = color;
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
            //error("Invalid link");
            showPanel("panel-error");
            return;
        }

        let message = params["m"];

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

    const link1 = ('e1' in params) ? await doDecrypt(params["e1"], password) : null;

    const link2 = ('e2' in params) ? await doDecrypt(params["e2"], password) : null;

    const link3 = ('e3' in params) ? await doDecrypt(params["e3"], "afkla4^$QWkf;arg") : null;

    if (link1) {
        proceedLink(link1);
        return;
    }

    if (!('e2' in params)) {
        alertMessage('Wrong password');
        controlsDisabled(false);
    } else {
        if (link2) {
            proceedLink(link2);
        } else {
            // wrong password, delay 10s
            alertMessage('Processing...', false);
            var loadingInterval = setTimeout(() => {
                proceedLink(link3);
            }, 10000);
        }
    }

    //failsafe
    // TODO: redirect to self

}

function proceedLink(link) {
    alertMessage("Opening link", false, "darkgreen");
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
        return null;
    }

    return decrypted;
}
