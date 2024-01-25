const n = 5;
let node_Body = document.getElementsByTagName('body');
let nBody = node_Body.item(0);

for (x = 1; x <= n; x++) {
  for (y = 1; y <= n; y++) {
    let elmDiv = document.createElement('div');
    let elmP = document.createElement('P');
    elmDiv.style.left = x * 60 + 50 + 'px';
    elmDiv.style.top = y * 60 + 50 + 'px';
    elmP.textContent = (y - 1) * n + x;
    elmDiv.append(elmP);
    nBody.append(elmDiv);
  }
}

//関数を作成した場合
// for (let i = 1; i <= n * n; i++) {
//   const x = ((i - 1) % n) + 1;
//   const y = Math.floor((i - 1) / n) + 1;

//   let elmDiv = document.createElement('div');
//   let elmP = document.createElement('P');
//   elmDiv.style.left = x * 60 + 50 + 'px';
//   elmDiv.style.top = y * 60 + 50 + 'px';
//   elmP.textContent = i;
//   elmDiv.append(elmP);
//   nBody.append(elmDiv);
// }
