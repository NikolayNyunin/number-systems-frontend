const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
const EPS = 0.0000001


export const check_base = (base) => {
    if (typeof base !== "string")
        throw new TypeError("Parameter 'base' must be a string");

    if (!/^\d+$/.test(base))
        return false;
    base = parseInt(base);
    return !(base < 2 || base > 16);
}


export const check_number = (number, base) => {
    if (typeof number !== "string")
        throw new TypeError("Parameter 'number' must be a string");
    if (typeof base !== "number")
        throw new TypeError("Parameter 'base' must be a number");

    for (let i = 0; i < number.length; i++) {
        let n = number[i];
        if (n === '.') {
            if (i === 0 || i === number.length - 1 || (number.match(/\./g) || []).length > 1)
                return false;
        }
        else if (n === '-') {
            if (i !== 0)
                return false;
        }
        else if (!NUMBERS.includes(n.toUpperCase()))
            return false;
        else {
            n = NUMBERS.indexOf(n.toUpperCase());
            if (n >= base)
                return false;
        }
    }
    return true;
}


export const convert = (number, base1, base2) => {
    if (typeof number !== "string")
        throw new TypeError("Parameter 'number' must be a string");
    if (typeof base1 !== "number")
        throw new TypeError("Parameter 'base1' must be a number");
    if (typeof base2 !== "number")
        throw new TypeError("Parameter 'base2' must be a number");

    const decimal_number = to_decimal(number, base1);
    return from_decimal(decimal_number, base2);
}


const to_decimal = (number, from_base) => {
    if (typeof number !== "string")
        throw new TypeError("Parameter 'number' must be a string");
    if (typeof from_base !== "number")
        throw new TypeError("Parameter 'from_base' must be a number");

    if (from_base === 10)
        return parseFloat(number);

    const negative = number[0] === '-';
    if (negative)
        number = number.slice(1);

    let dot_index = number.length;
    if (number.includes('.'))
        dot_index = number.indexOf('.');

    let result = 0;
    for (let i = 0; i < Math.min(dot_index, number.length); i++) {
        let n = number[Math.min(dot_index, number.length) - i - 1];
        n = NUMBERS.indexOf(n.toUpperCase());
        result += n * Math.pow(from_base, i);
    }

    if (dot_index !== number.length) {
        for (let i = 1; i < number.length - dot_index; i++) {
            let n = number[dot_index + i];
            n = NUMBERS.indexOf(n.toUpperCase());
            result += n * Math.pow(from_base, -i);
        }
    }

    if (negative)
        result *= -1;

    return Math.round(result * Math.pow(10, 11)) / Math.pow(10, 11);
}


const from_decimal = (number, to_base) => {
    if (typeof number !== "number")
        throw new TypeError("Parameter 'number' must be a number");
    if (typeof to_base !== "number")
        throw new TypeError("Parameter 'to_base' must be a number");

    if (to_base === 10)
        return number.toString();

    if (Math.abs(number) < EPS)
        return '0';

    let result = "";

    let negative = number < 0;
    if (negative)
        number *= -1;

    let whole = Math.trunc(number);
    let fractional = number % 1;

    if (whole === 0)
        result += '0';
    else {
        while (whole > 0) {
            result = NUMBERS[whole % to_base] + result;
            whole = Math.trunc(whole / to_base);
        }
    }

    if (fractional > EPS) {
        result += '.';

        let digit_cnt = 0;
        while (fractional > EPS && digit_cnt <= 10) {
            fractional *= to_base;
            result += NUMBERS[Math.trunc(fractional)];
            fractional %= 1;
            digit_cnt++;
        }
    }

    if (negative)
        result = '-' + result;

    return result;
}
