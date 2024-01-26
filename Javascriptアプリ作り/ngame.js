const n = 5;
let node_Body = document.getElementsByTagName('body');
let nBody = node_Body.item(0);
//計算式に従って枠の大きさを算出する
const m = 0.3;
let cw = document.documentElement.clientWidth;
let ch = document.documentElement.clientHeight;
//枠の大きさを画面サイズに連動させる
let cb = cw < ch ? cw : ch; //三項演算子
let s = cb / ((m + 1) * (n + 1) - 1);
let g = s * m;
//縦方向に対して画面中央に表示させる
let oy = cw < ch ? (ch - (s + g) * n) / 2 : 0;
//横方向に対しても画面中央に表示させる
let ox = cw < ch ? 0 : ((s + g) * n - ch) / 2;

let a = [];
for (let i = 1; i <= n * n; i++) {
  a.push(0);
}

for (let x = 0; x < n; x++) {
  for (let y = 0; y < n; y++) {
    let elmDiv = document.createElement('div');
    let elmP = document.createElement('P');
    elmDiv.style.left = x * (s + g) + g + ox + 'px';
    elmDiv.style.top = y * (s + g) + g + oy + 'px';

    //CSSで記述した枠の大きさもコードで記述
    elmDiv.style.width = s + 'px';
    elmDiv.style.height = s + 'px';

    let r;
    while (1) {
      r = Math.floor(Math.random() * n * n);
      if (a[r] === 0) {
        a[r] = 1;
        break;
      }
    }

    //CSSで記述した文字の大きさもコードで記述する
    elmP.style.width = s + 'px';
    elmP.style.height = s + 'px';
    elmP.style.lineHeight = s + 'px';
    elmP.style.fontSize = s * 0.7 + 'px';

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
