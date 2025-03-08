import { Component } from '@angular/core';

// Задание 1
const getComputerCountString: (n: number) => string = (n) => {
  const tens = n % 100;
  const units = tens % 10;

  if (tens >= 11 && tens <= 14) return `${n} компьютеров`;
  if (units === 1) return `${n} компьютер`;
  if (units >= 2 && units <= 4) return `${n} компьютера`;
  return `${n} компьютеров`;
};

// Задание 2
// console.log(findCommonDivisors([42, 12, 16]));
const findDivisors: (n: number) => number[] = (n) => {
  if (n <= 0) return [];

  const divisors: number[] = [];
  const sqrtN = Math.floor(Math.sqrt(n));

  for (let i = 1; i <= sqrtN; i++) {
    if (n % i === 0) {
      divisors.push(i);
      if (i !== n / i) {
        divisors.push(n / i);
      }
    }
  }

  return divisors;
};

const NOD: (a: number, b: number) => number = (a, b) => {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
};

const findCommonDivisors: (numbers: number[]) => number[] = (numbers) => {
  if (numbers.length === 0) return [];

  let currentGCD = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    currentGCD = NOD(currentGCD, numbers[i]);
    if (currentGCD === 1) break;
  }

  return findDivisors(currentGCD)
    .filter((item) => item !== 1)
    .sort((a, b) => a - b);
};

const result1 = findCommonDivisors([42, 12, 16]);

// Задание 3

const isPrime: (n: number) => boolean = (n) => {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};

const findPrimes: (min: number, max: number) => number[] = (min, max) => {
  const primes: number[] = [];
  for (let i = min; i <= max; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  return primes;
};

const result = findPrimes(11, 20);

// Задание 4

function printMultiplicationTable(n: number): void {
  if (n <= 0) {
    console.log('Число должно быть больше 0.');
    return;
  }

  const widths: number[] = [String(n).length + 1];

  for (let i = 1; i <= n; i++) {
    widths.push(String(n * i).length + 1);
  }

  let header = String(' ').padStart(widths[0]);
  for (let i = 1; i <= n; i++) {
    header += String(i).padStart(widths[i]);
  }
  console.log(header);

  for (let i = 1; i <= n; i++) {
    let row = String(i).padStart(widths[0]);
    for (let j = 1; j <= n; j++) {
      row += String(i * j).padStart(widths[j]);
    }
    console.log(row);
  }
}

printMultiplicationTable(5);

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor() {
    // for (let i = 0; i < 500; i++) {
    //   console.log(getComputerCountString(i));
    // }
  }
}
