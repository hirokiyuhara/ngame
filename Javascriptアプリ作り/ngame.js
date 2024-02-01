const n = 9;
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
let ox = cw > ch ? (cw - (s + g) * n) / 2 : 0;

let nID = 0;
//タッチの検出
let supportTouch = 'ontouchend' in document;
let EVENTNAME_TOUCHSTART = supportTouch ? 'touchstart' : 'mousedown';
document.addEventListener('touchmove', disableScroll, { passive: false });
document.addEventListener('mousewheel', disableScroll, { passive: false });
//未選択の位置をランダムに選ぶ処理
// let a = [];
// for (let i = 1; i <= n * n; i++) {
//   a.push(0);
// }

// for (let x = 0; x < n; x++) {//縦横の座標を基にしたループ
//   for (let y = 0; y < n; y++) {
for (i = 0; i < n * n; i++) {
  let rX, rY; // rXとrYをwhileループの外で宣言
  //無限ループの作成
  while (1) {
    let elmExist = false;
    //座標の乱数を変数に格納
    rX = Math.random() * (cw - s);
    rY = Math.random() * (ch - s);
    //二重ループ作成
    for (j = 0; j <= 1; j++) {
      for (k = 0; k <= 1; k++) {
        //画面上の特定の点にある要素を取得する
        let elementAtPoint = document.elementFromPoint(rX + s * j, rY + s * k);
        if (elementAtPoint && elementAtPoint.tagName == 'P') {
          //要素がDIVであれば無限ループ終了
          elmExist = true;
        }
      }
    }
    if (elmExist == false) {
      break; // ループを抜ける
    }
  }
  // //枠の表示
  let elmDiv = document.createElement('div');
  let elmP = document.createElement('P');
  elmDiv.style.left = rX + 'px';
  elmDiv.style.top = rY + 'px';
  //CSSで記述した枠の大きさもコードで記述
  elmDiv.style.width = s + 'px';
  elmDiv.style.height = s + 'px';
  //枠の角を丸くする
  elmDiv.style.borderRadius = s / 2 + 'px';
  setStyleDiv(elmDiv);

  //未選択の位置をランダムに選ぶ処理➁
  // let r;
  // while (1) {
  //   r = Math.floor(Math.random() * n * n);
  //   if (a[r] === 0) {
  //     a[r] = 1;
  //     break;
  //   }
  // }

  //CSSで記述した文字の大きさもコードで記述する
  elmP.style.width = s + 'px';
  elmP.style.height = s + 'px';
  elmP.style.lineHeight = s + 'px';
  elmP.style.fontFamily = 'sans-serif';
  elmP.style.fontSize = s * 0.6 + 'px';
  setStyleP(elmP);
  elmP.textContent = i + 1;
  //イベントリスナーを登録する
  elmDiv.className = 'number-' + (i + 1); // 'number-' を追加して、CSSのクラスとしてより適切に
  elmDiv.addEventListener(EVENTNAME_TOUCHSTART, nClick);
  elmDiv.append(elmP);
  nBody.append(elmDiv);
}
//   }
// }

let tID = 1;

function nClick(e) {
  // this.style.display = 'none';
  let nID = parseInt(this.className.replace('number-', ''), 10);
  //順番通りのタップで消えるようにする
  if (nID === tID) {
    tID += 1;

    //addEventListener自体の削除
    this.removeEventListener(EVENTNAME_TOUCHSTART, nClick);
    //アニメーション終了イベント
    // let dmyAnime = this.animate(
    this.animate(
      [
        // 開始状態: 通常の大きさで不透明、回転なし
        { opacity: '1', transform: 'scale(1) rotate(0deg)' },
        // 終了状態: 完全に透明で、サイズが0、360度回転
        { opacity: '0', transform: 'scale(0) rotate(360deg)' },
      ],
      {
        //終了時の状態で止める
        fill: 'forwards',
        //500ミリ秒(=0.5秒)かけてアニメーション
        duration: 1500,
      }
    ).onfinish = (event) => {
      nBody.removeChild(this);
    };
    // dmyAnime.addEventListener('finish', (event) => {
    //   nBody.removeChild(this);
    //間違えた場合の処理
  } else {
    this.animate(
      [
        { transform: 'scale(1)', backgroundColor: 'red' }, // 開始状態: 通常の大きさ、赤色
        { transform: 'scale(3)', backgroundColor: 'red' }, // 中間状態: 大きさを3倍に、赤色
        { transform: 'scale(1)', backgroundColor: 'yellow' }, // 終了状態: 元の大きさに戻す、黒色
      ],
      {
        fill: 'forwards',
        duration: 200,
      }
    );
  }
}

//スクロールを禁止にする関数
function disableScroll(event) {
  event.preventDefault();
}

function setStyleDiv(elm) {
  elm.style.position = 'absolute';
  elm.style.backgroundColor = 'yellow';
  elm.style.border = '1px solid red';
}

function setStyleP(elm) {
  elm.style.margin = '0';
  elm.style.padding = '0';
  elm.style.color = 'black';
  elm.style.textAlign = 'center';
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
