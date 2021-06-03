
async function doEncrypt() {
  const password = "123456";
  const linkUrl = "http://www.google.com";
  const encrypted = await cryptoApi.encrypt(linkUrl,password);
  //encodedHAsh = testObj.encode("saya");
  //console.log(encrypted);
  doDecrypt(encrypted);
  return encrypted;
}

async function doDecrypt(hash) {
  const password = "123456";
  let decrypted;
  try {
    decrypted = await cryptoApi.decrypt(hash,password);
  } catch(e) {
    console.log("wrong password");
  }
  //encodedHAsh = testObj.encode("saya");
  console.log(decrypted);
  return decrypted;
}
