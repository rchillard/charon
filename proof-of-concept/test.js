const CHARON_API = "http://localhost:3000/api-endpoint";

function summonCharon(pass) {
  console.log(pass);
  fetch(CHARON_API, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: "POST",
    body: JSON.stringify({
      passphrase: pass
    })
  });
}
