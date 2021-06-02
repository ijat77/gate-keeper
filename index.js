function error(text) {
    document.querySelector(".error").style.display = "inherit";
    document.querySelector("#errortext").innerText = `Error: ${text}`;
}

// Run when the <body> loads
async function main() {
    //alert("hello");
    if (window.location.hash) {
        console.log(window);
        console.log(window.location.hash);
    } else {
        error("no data");
    }
}