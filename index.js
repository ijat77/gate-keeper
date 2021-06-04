let params;

function fadeout(elementId) {
  var fade = document.getElementById(elementId);
    
  var intervalID = setInterval(() => {
        
      if (!fade.style.opacity) {
          fade.style.opacity = 1;
      }
        
        
      if (fade.style.opacity > 0) {
          fade.style.opacity -= 0.1;
      } 
        
      else {
          clearInterval(intervalID);
      }
        
  }, 200);
}

var errorInterval

function error(text){
  var fade= document.getElementById("errorPrompt");
  fade.innerText = text;
  fade.style.opacity = 1;
  clearTimeout(errorInterval);
  errorInterval = setTimeout(() =>{
    fadeout("errorPrompt");
  },3000);

}

function error2(text) {
    document.querySelector(".error").style.display = "inherit";
    document.querySelector("#errortext").innerText = `Error: ${text}`;
}

async function main() {
    if (window.location.hash) {
        const hash = window.location.hash.slice(1);
        //console.log(hash);
        
        try {
            params = JSON.parse(atob(hash));
        } catch(e) {
            error("Invalid link");
            return;
        }
        //console.log(params);
        //console.log(params["e2"]);
        //link2 = await doDecrypt(params["e2"], "dua");
        //console.log("e2: " + link2);
        //link3 = await doDecrypt(params["e3"], "afkla4^$QWkf;arg");
        message = params["m"];

        if (message) {
          document.getElementById("title").innerHTML = message;
          //console.log(message);
        }

    } else {
        error("no data");
    }
}

async function decrypt() {
  //console.log("DECRYPTING");
  //console.log(params);
  const password = document.getElementById("password").value;
  
  if (!password) {
    error("Please type a password");
    return;
  }
  
  const link1 = await doDecrypt(params["e1"], password);
  const link2 = await doDecrypt(params["e2"], password);
  const link3 = await doDecrypt(params["e3"], "afkla4^$QWkf;arg");

  if (link1) {
    proceedLink(link1);
  } else if (link2) {
    proceedLink(link2);
  } else {
    proceedLink(link3);
  }

  //failsafe
  // TODO: redirect to self

}

function proceedLink(link) {
  error(link);
  console.log('SUCCESS!');
  console. log("LINK: " + link);
}

async function doDecrypt(hash, password) {
    let decrypted = null;
    try {
        decrypted = await cryptoApi.decrypt(hash, password);
    } catch (e) {
        //console.log("wrong password:");
        //console.log(e);
    }
    //encodedHAsh = testObj.encode("saya");
    //console.log(decrypted);
    return decrypted;
}