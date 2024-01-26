const n = 5;
let node_Body = document.getElementsByTagName('body');
let nBody = node_Body.item(0);

let a = [];
for (let i = 1; i <= n * n; i++) {
  a.push(0);
}

for (let x = 0; x < n; x++) {
  for (let y = 0; y < n; y++) {
    let elmDiv = document.createElement('div');
    let elmP = document.createElement('P');
    elmDiv.style.left = x * 60 + 50 + 'px';
    elmDiv.style.top = y * 60 + 50 + 'px';

    let r;
    while (1) {
      r = Math.floor(Math.random() * n * n);
      if (a[r] === 0) {
        a[r] = 1;
        break;
      }
    }

    elmP.textContent = r + 1;
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
