const CHARON_API = "https://api-endpoint";

function summonCharon(pass) {
  fetch(CHARON_API, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: "POST",
    body: JSON.stringify({
      passphrase: pass
    })
  });
}
