const n = 3;
let node_Body = document.getElementsByTagName('body');
let nBody = node_Body.item(0);

for (i = 1; i < n * n; i++) {
  let elmDiv = document.createElement('div');
  let elmP = document.createElement('P');
  elmP.textContent = '10';
  elmDiv.append(elmP);
  nBody.append(elmDiv);
}
