// Проверяем себя, если не понимаем почему так а не иначе пишем в чат или в ЛС, желательно объяснять почему то или иное решение

// Типы данных

console.log([1, 2, 3] + ' is the answer.'); // "1,2,3 is the answer" - массив приводится к строке и конкатенируется
console.log(false || true * 2); // 2 - в левой части остается true, приводится к числу 1 и умножается на 2
console.log({ valueOf: () => 42 } * 2); // 84 - из-за колбека объект возвращает значение
console.log(parseInt('7.5') + parseFloat('2.5')); // 9.5 - parseInt отбрасывает дробную часть
console.log(!!'Hello' - 1); // 0 - непустая строка приводится к bool (true), а true приводится к числу (1)
console.log(new String('hello') instanceof Object); // true - создается объект класса String, и он является объектом
console.log((true ^ false) === (false ^ true)); // true: ^ - исключающее или. Вернет true, если только одно значение true
console.log(true && '5' + 5); // "55": && возвращает операнд 1, если он может быть преобразован в false; в противном случае возвращает операнд 2
console.log({ valueOf: () => '10', toString: () => '20' } + 5); // "105": при первом колбеке возвращается "10" и конкатенируется
console.log((5).toString() === '5'); // true
console.log(null || false || undefined); // undefined: || возвращает 1-й операнд, если он может быть преобразован в true и т.д.; в противном случае возвращает последний операнд
console.log(0 || 2 || NaN); // 2 - т.к. может преобразовываться в true
console.log(1 && null && 2); // null - т.к. может быть преобразован в false

//

function xy() {}

console.log(typeof xy); // function
console.log(xy instanceof Object); // true

var str1 = String(123);
var str2 = new String(123);

console.log(typeof str1 === typeof str2); // false: String - примитив, а new String - объект
console.log(str1 === str2); // false - отличается тип
console.log(str1 === String(123)); // true
console.log(str2 === new String(123)); // false - ссылаются на разные объекты
console.log(str1 === 123); // false - разный тип
console.log(str1 === '123'); // true
console.log(str1 == str2); // true
console.log(str1 == 123); // true
console.log(str1 == '123'); // true

var arr = [];
console.log(typeof arr); // object

var str3 = '123';
str3[0] = '2';
console.log(str3); // "123" - для замены строк используются методы

var p = 1 + 2 + 3 + '';
var z = '' + 1 + 2 + 3;

console.log(p, typeof p); // "6" string - числа складываются и приводятся к строке
console.log(z, typeof z); // 123 string - записывается пустая строка и конкатенируется

var o = '123x';
console.log(Number(o)); // NaN
console.log(parseInt(o, 10)); // 123 - буква отбросится
console.log(+o); // NaN - буква не конвертируется в число
console.log(typeof +o); // number - унарный плюс приводит к числовому типу
console.log(Boolean(String(false))); // true: false => "false" => true

var h = [];
console.log(h ? 1 : 2); // 1 - пустой массив может приводиться к true

// Переменные

let a = a + 1;
console.log(a); // error - обращение к переменной до создания

//

var b = b + 1;
console.log(b); // NaN: undefined + 1

//

function foo(c) {
  if (c > 0) {
    var c = c + 10;
    return c;
  }
  return c;
}
console.log(foo(15)); // 25

//

function foo() {
  console.log(d2);
  let d1 = '1';
  return function () {
    console.log(d1);
    console.log(d2);
  };
}

const d2 = '2';
const x = foo();

x(); // 2 1 2: сначала инициализируется d2, потом вызывается foo()

//

function giveMeX(showX) {
  if (showX) {
    let x = 5;
  }
  return x;
}

console.log(giveMeX(false)); // error: X не определена
console.log(giveMeX(true)); // error: X определена только в пределах блока

//

console.log(x); // error: X не определена

var y = 1;

console.log(y); // 1

function car() {
  if (false) {
    var y = 2;
  }
  console.log(y);
}

car(); // undefined: Y определена, но не инициализирована
console.log(y); // error: Y определена только в области функции

//

var i = 1;
var j = {};

(function () {
  i++;
  j.j = 1;
})();
console.log(i, j); // 2 {j: 1}

(function (i, j) {
  i++;
  j.k = 1;
})(i, j);
console.log(i, j); // error - переменные не определены

//

// Бонус

// Создать объект всеми возможными способами

const obj1 = {},
    obj2 = new Object(),
    obj3 = Object.create({}),
    obj4 = Object.assign({});

//

// Написать функцию глубокого сравнения двух объектов:
// объекты могут быть любыми, и иметь любой уровень вложенности

const firstObj = { here: { l1: {l2: {l3: [1, 2], m: 5}}, other: '3' }, object: 'any' };
const secondObj = { here: { l1: {l2: {l3: [1, 2], m: 5}}, other: '3' }, object: 'any' };

const deepEqual = (firstObj, secondObj) => {
  let equal = true;   // по умолчанию объекты равны
  const isEqual = (first, second) => {
    const keys1 = Object.keys(first),   // в переменных массив свойств объекта
          keys2 = Object.keys(second);
    if (keys1.length === keys2.length) {    // проверяем количество свойств
      for (let i = 0; i < keys1.length; i++) {    // проходим по объекту
        if (typeof(first[keys1[i]]) == 'object' && typeof(second[keys2[i]]) == 'object') {    // если в значениях - объекты, выполняем заново рекурсивно
          isEqual(first[keys1[i]], second[keys2[i]])
        } else {
          if (keys1[i] !== keys2[i] || first[keys1[i]] !== second[keys2[i]]) {    // иначе сравниваем значения
            equal = false   // если значения не равны
          }
        }
      }
    }
  }
  isEqual(firstObj, secondObj);
  return equal
};

//

console.log(deepEqual(firstObj, secondObj)); // true;
