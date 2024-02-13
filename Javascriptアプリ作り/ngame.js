let Na = 5;
let n = Na * Na;
const node_Body = document.getElementsByTagName('body');
const nBody = node_Body.item(0);
nBody.style.overflow = 'hidden';
//計算式に従って枠の大きさを算出する
const cw = document.documentElement.clientWidth;
const ch = document.documentElement.clientHeight;
//枠の大きさを画面サイズに連動させる
const cb = cw < ch ? cw : ch; //三項演算子
const s = cb / (1.3 * (Math.sqrt(n) + 1) - 1);
const bw = 1;
// let g = s * m;
// //縦方向に対して画面中央に表示させる
// let oy = cw < ch ? (ch - (s + g) * n) / 2 : 0;
// //横方向に対しても画面中央に表示させる
// let ox = cw > ch ? (cw - (s + g) * n) / 2 : 0;
// let nID = 0;
//演算用の変数
let nID = 0;
let rX = [];
let rY = [];
let rS = [];
let rN = [];
let dX = [];
let dY = [];
let balls = [];
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

//Classに書き換え
class Ball {
  constructor(x, y, s, n, dx, dy) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.n = n;
    this.dx = dx;
    this.dy = dy;
    this.elmDiv = document.createElement('div');
    this.elmP = document.createElement('p');
    this.draw();
    this.handleTouchBound = this.handleTouch.bind(this);
    this.elmDiv.addEventListener(EVENTNAME_TOUCHSTART, this.handleTouchBound);
  }

  draw() {
    this.elmDiv.style.left = this.x + 'px';
    this.elmDiv.style.top = this.y + 'px';
    this.elmDiv.style.width = this.s - 2 * bw + 'px';
    this.elmDiv.style.height = this.s - 2 * bw + 'px';
    this.elmDiv.style.borderRadius = (this.s - 2 * bw) / 2 + 'px';
    this.elmDiv.style.position = 'absolute';
    this.elmDiv.style.backgroundColor = 'yellow';
    this.elmDiv.style.border = bw + 'px solid red';

    this.elmP.style.width = this.s - 2 * bw + 'px';
    this.elmP.style.height = this.s - 2 * bw + 'px';
    this.elmP.style.lineHeight = this.s - 2 * bw + 'px';
    this.elmP.style.fontFamily = 'sans-serif';
    this.elmP.style.fontSize = this.s * 0.6 + 'px';
    this.elmP.style.margin = '0';
    this.elmP.style.padding = '0';
    this.elmP.style.color = 'black';
    this.elmP.style.textAlign = 'center';
    this.elmP.textContent = Math.round(this.n);
    this.elmDiv.className = 'number-' + this.n;
    this.elmDiv.append(this.elmP);
    nBody.append(this.elmDiv);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
    this.checkBounds();
  }

  checkBounds() {
    // 左側に着いたときに跳ね返る
    if (this.x <= 0) {
      this.dx = Math.abs(this.dx);
    }
    // 右側に着いたときに跳ね返る
    if (cw <= this.x + this.s) {
      this.dx = -Math.abs(this.dx);
    }
    // 上側に着いたときに跳ね返る
    if (this.y <= 0) {
      this.dy = Math.abs(this.dy);
    }
    // 下側に着いたときに跳ね返る
    if (ch <= this.y + this.s) {
      this.dy = -Math.abs(this.dy);
    }
  }

  checkCollision(target) {
    const dx = target.x + target.s / 2 - (this.x + this.s / 2);
    const dy = target.y + target.s / 2 - (this.y + this.s / 2);
    let dist = Math.sqrt(dx ** 2 + dy ** 2);
    if (dist <= this.s / 2 + target.s / 2) {
      const nx = dx / dist;
      const ny = dy / dist;
      const overlap = this.s / 2 + target.s / 2 - dist;
      this.dx += (-nx * overlap) / 1;
      this.dy += (-ny * overlap) / 1;
    }
  }

  handleTouch(event) {
    event.stopPropagation();
    const nID = parseInt(this.elmDiv.className.replace('number-', ''), 10);
    if (nID === rN[tID]) {
      this.elmDiv.removeEventListener(
        EVENTNAME_TOUCHSTART,
        this.handleTouchBound
      );
      this.elmDiv.animate(
        [
          { opacity: '1', transform: 'scale(1) rotate(0deg)' },
          { opacity: '0', transform: 'scale(0) rotate(360deg)' },
        ],
        {
          fill: 'forwards',
          duration: 1500,
        }
      ).onfinish = (event) => {
        if (tID === n) {
          clearInterval(timer);
        }
      };
      tID += 1;
    } else {
      this.elmDiv.animate(
        [
          { transform: 'scale(1)', backgroundColor: 'red' },
          { transform: 'scale(3)', backgroundColor: 'red' },
          { transform: 'scale(1)', backgroundColor: 'yellow' },
        ],
        {
          fill: 'forwards',
          duration: 200,
        }
      );
    }
  }
}

//ダブり数字作成
for (i = 0; i < n; i++) {
  const dmyN = Math.floor(Math.random() * n);
  rN.push(dmyN + 1);
}
//配列操作
//rN.splice(dmyN, 0, dmyN + 1);
n = rN.length;
//並べ替え バブルソートのアルゴリズムを使用して配列rNを並べ替える
// for (i = n - 1; 0 < i; i--) {
//   for (j = 0; j < i; j++) {
//     if (rN[j + 1] < rN[j]) {
//       rN.splice(j, 2, rN[j + 1], rN[j]);
//     }
//   }
// }
//並び替え記述➁ Array.sortメソッドを使用
// rN.sort(function (a, b) {
//   return a - b;
// });
//並び替え記述➂ ES6のアロー関数を使用したArray.sortメソッド
rN.sort((a, b) => a - b);

//速度設定
for (i = 0; i < n; i++) {
  const dmyS = Math.random() / 5 + 0.2;
  const dmyA = Math.random() * 2 * Math.PI;
  const dmyDX = dmyS * Math.cos(dmyA);
  const dmyDY = dmyS * Math.sin(dmyA);
  dX.push(dmyDX);
  dY.push(dmyDY);
}

//数字の重なり判断
for (i = 0; i < n; i++) {
  let dmyCount = 0;
  let dmyS = s;
  let dmyX, dmyY; // rXとrYをwhileループの外で宣言
  //無限ループの作成
  while (1) {
    dmyCount++;
    let elmExist = false;
    //座標の乱数を変数に格納
    dmyX = Math.floor(Math.random() * (cw - dmyS));
    dmyY = Math.floor(Math.random() * (ch - dmyS));

    //配列を回すループ
    for (j = 0; j < rX.length; j++) {
      if (
        rX[j] - s <= dmyX &&
        dmyX <= rX[j] + s &&
        rY[j] - s <= dmyY &&
        dmyY <= rY[j] + s
      ) {
        elmExist = true;
      }
    }

    //二重ループ作成。座標によって数字があるか判断するコード
    // for (j = 0; j <= 2; j++) {
    //   for (k = 0; k <= 2; k++) {
    //     //画面上の特定の点にある要素を取得する
    //     let elementAtPoint = document.elementFromPoint(
    //       rX + (dmyS * j) / 2,
    //       rY + (dmyS * k) / 2
    //     );
    //     if (elementAtPoint && elementAtPoint.tagName == 'P') {
    //       //要素がPであれば無限ループ終了
    //       elmExist = true;
    //     }
    //   }
    // }
    if (elmExist == false) {
      break; // ループを抜ける
    }
    if (1000 < dmyCount) {
      //break;
      dmyS *= 0.99;
      dmyCount = 0;
    }
  }
  //格納・配列の追加
  rX.push(dmyX);
  rY.push(dmyY);
  rS.push(dmyS);
  //表示呼び出し
  // draw(dmyX, dmyY, dmyS, rN[i]);
}

const elmTime = document.createElement('p');
elmTime.style.lineHeight = ch + 'px';
elmTime.style.fontFamily = 'sans-serif';
elmTime.style.fontSize = rS[0] * 0.6 + 'px';
elmTime.style.margin = '0';
elmTime.style.padding = '0';
elmTime.style.color = 'black';
elmTime.style.textAlign = 'center';
nBody.append(elmTime);
//中央表示（透過）
for (i = 0; i < n; i++) {
  let ball = new Ball(cw / 2, ch / 2, rS[i], rN[i], dX[i], dY[i]);
  ball.elmDiv.style.opacity = '0';
  balls.push(ball);
}
//飛散アニメーション
let dmyElm = document.getElementsByTagName('div');
for (let i = 0; i < n; i++) {
  balls[i].elmDiv.animate(
    {
      opacity: ['0', '1'],
      scale: ['0', '1'],
      rotate: ['0deg', '720deg'],
      left: [cw / 2 + 'px', rX[i] + 'px'],
      top: [ch / 2 + 'px', rY[i] + 'px'],
    },
    {
      // fill: 'forwards',
      duration: 1000,
      easing: 'ease-out',
    }
  ).onfinish = (event) => {
    // //nBody.removeChild(this)
    // if (tID === n) {
    //   clearInterval(timer);
    // }
    balls[i].x = rX[i];
    balls[i].y = rY[i];
    balls[i].elmDiv.style.opacity = '1';
    dmyElm[i].style.left = balls[i].x + 'px';
    dmyElm[i].style.top = balls[i].y + 'px';
    if (i === n - 1) {
      timer = setInterval(update, 1);
      startTime = new Date();
    }
  };
}

//何秒おきに動くかの記述
// const timer = setInterval(update, 5);
let timer;
let startTime;
function update() {
  for (i = 0; i < n; i++) {
    // rX[i] += dX[i];
    // rY[i] += dY[i];
    balls[i].move();
  }
  //画面の上下左右への衝突
  for (j = 0; j < n; j++) {
    // //左側に着いたときに跳ね返る
    // if (rX[j] <= 0) {
    //   dX[j] = Math.abs(dX[j]);
    // }
    // //右側に着いたときに跳ね返る
    // if (cw <= rX[j] + rS[j]) {
    //   dX[j] = -Math.abs(dX[j]);
    // }
    // //上側に着いたときに跳ね返る
    // if (rY[j] <= 0) {
    //   dY[j] = Math.abs(dY[j]);
    // }
    // //下側に着いたときに跳ね返る
    // if (ch <= rY[j] + rS[j]) {
    //   dY[j] = -Math.abs(dY[j]);
    // }

    //衝突判断
    for (i = 0; i < n; i++) {
      // const dx = rX[i] + rS[i] / 2 - (rX[j] + rS[j] / 2);
      // const dy = rY[i] + rS[i] / 2 - (rY[j] + rS[j] / 2);
      if (i !== j) {
        //   let dmyDist = Math.sqrt(dx ** 2 + dy ** 2);
        //   if (dmyDist <= rS[i] / 2 + rS[j] / 2) {
        //     // let dmyAngle = Math.atan2(dx, dy);
        //     const nx = dx / dmyDist;
        //     const ny = dy / dmyDist;
        //     const overlap = rS[j] / 2 + rS[i] / 2 - dmyDist;
        //     dX[j] += (-nx * overlap) / 1;
        //     dY[j] += (-ny * overlap) / 1;
        //   }
        balls[j].checkCollision(balls[i]);
      }
    }
    // let dmyElm = document.getElementsByTagName('div');
    dmyElm[j].style.left = balls[j].x + 'px';
    dmyElm[j].style.top = balls[j].y + 'px';
  }
  const currentTime = new Date();
  displayTime(currentTime - startTime);
}
function displayTime(t) {
  const ms = t % 1000;
  t = (t - ms) / 1000;
  const s = t % 60;
  t = (t - s) / 60;
  const m = t;
  elmTime.textContent = m + ':' + s + ':' + ms;
}

//表示
// function draw(x, y, s, n) {
//   // //枠の表示
//   const elmDiv = document.createElement('div');
//   const elmP = document.createElement('P');
//   elmDiv.style.left = x + 'px';
//   elmDiv.style.top = y + 'px';
//   //CSSで記述した枠の大きさもコードで記述
//   elmDiv.style.width = s - 2 * bw + 'px';
//   elmDiv.style.height = s - 2 * bw + 'px';
//   //枠の角を丸くする
//   elmDiv.style.borderRadius = (s - 2 * bw) / 2 + 'px';
//   elmDiv.style.position = 'absolute';
//   elmDiv.style.backgroundColor = 'yellow';
//   elmDiv.style.border = bw + 'px solid red';
//   //未選択の位置をランダムに選ぶ処理➁
//   // let r;
//   // while (1) {
//   //   r = Math.floor(Math.random() * n * n);
//   //   if (a[r] === 0) {
//   //     a[r] = 1;
//   //     break;
//   //   }
//   // }

//   //CSSで記述した文字の大きさもコードで記述する
//   elmP.style.width = s - 2 * bw + 'px';
//   elmP.style.height = s - 2 * bw + 'px';
//   elmP.style.lineHeight = s - 2 * bw + 'px';
//   elmP.style.fontFamily = 'sans-serif';
//   elmP.style.fontSize = s * 0.6 + 'px';
//   elmP.style.margin = '0';
//   elmP.style.padding = '0';
//   elmP.style.color = 'black';
//   elmP.style.textAlign = 'center';
//   elmP.textContent = n;
//   //イベントリスナーを登録する
//   elmDiv.className = 'number-' + n; // 'number-' を追加して、CSSのクラスとしてより適切に
//   elmDiv.addEventListener(EVENTNAME_TOUCHSTART, nClick);
//   elmDiv.append(elmP);
//   nBody.append(elmDiv);
// }
//   }
// }
//タッチの判定
let tID = 0;
function nClick(e) {
  // this.style.display = 'none';
  // let nID = parseInt(this.className.replace('number-', ''), 10);
  // //順番通りのタップで消えるようにする
  // // if (nID === tID) {
  // //タッチの順番を対応させる
  // if (nID === rN[tID]) {
  //   //addEventListener自体の削除
  //   this.removeEventListener(EVENTNAME_TOUCHSTART, nClick);
  //   //アニメーション終了イベント
  //   // let dmyAnime = this.animate(
  //   this.animate(
  //     [
  //       // 開始状態: 通常の大きさで不透明、回転なし
  //       { opacity: '1', transform: 'scale(1) rotate(0deg)' },
  //       // 終了状態: 完全に透明で、サイズが0、360度回転
  //       { opacity: '1', transform: 'scale(0) rotate(360deg)' },
  //     ],
  //     {
  //       //終了時の状態で止める
  //       fill: 'forwards',
  //       //1500ミリ秒(=0.5秒)かけてアニメーション
  //       duration: 1500,
  //     }
  //   ).onfinish = (event) => {
  //     // nBody.removeChild(this);
  //     if (tID === n) {
  //       clearInterval(timer);
  //     }
  //   };
  //   tID += 1;
  //   // dmyAnime.addEventListener('finish', (event) => {
  //   //   nBody.removeChild(this);
  //   //間違えた場合の処理
  // } else {
  //   this.animate(
  //     [
  //       { transform: 'scale(1)', backgroundColor: 'red' }, // 開始状態: 通常の大きさ、赤色
  //       { transform: 'scale(3)', backgroundColor: 'red' }, // 中間状態: 大きさを3倍に、赤色
  //       { transform: 'scale(1)', backgroundColor: 'yellow' }, // 終了状態: 元の大きさに戻す、黒色
  //     ],
  //     {
  //       fill: 'forwards',
  //       duration: 200,
  //     }
  //   );
  // }
}

//スクロールを禁止にする関数
function disableScroll(event) {
  event.preventDefault();
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
