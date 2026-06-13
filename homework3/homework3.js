function pow(x, y) {
    if (!Number.isInteger(y)) {
        return "Power is not an integer";
    }
    else{
        let rez = 1;

        if (y >= 0) {
            for (let i = 1; i <= y; i++) {
                rez = rez * x;
            }
        } else if (y < 0) {
            for (let i = 1; i <= -y; i++) {
                rez = rez * x;
            }
            rez = 1 / rez;
        }

        return rez;
    }
}

console.log(pow(-2, 3)) // -8
//console.log(Math.pow(-2, 3))
