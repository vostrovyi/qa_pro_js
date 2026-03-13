function pow(x, y) {
 let rez = 1;

 if (y >= 0) {
 for (let i = 1; i <= y; i++) {
 rez = rez * x;
 }
 } else {
 for (let i = 1; i <= -y; i++) {
 rez = rez * x;
 }
 rez = 1 / rez;
 }

 return rez;
}

console.log(pow(2, -3))