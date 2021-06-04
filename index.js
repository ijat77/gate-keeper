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

async function main() {
    if (window.location.hash) {
        const hash = window.location.hash.slice(1);

        try {
            params = JSON.parse(atob(hash));
        } catch(e) {
            error("Invalid link");
            return;
        }
        
        message = params["m"];

        if (message) {
          document.getElementById("title").innerHTML = message;
        }

    } else {
        error("no data");
    }
}

async function decrypt() {
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
        //console.log(e);
    }
    
    return decrypted;
}