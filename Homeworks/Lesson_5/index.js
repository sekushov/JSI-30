//  Привязать контекст объекта к функции logger, чтобы при вызове this.item выводило - some value
// (Привязать через bind, call, apply)

function logger() {
    console.log(`I output only external context: ${this.item}`);
  }
  const obj = { item: 'some value' };

  logger.bind(obj)();
  logger.call(obj);
  logger.apply(obj);
  
  //////////////////////////////////
  
  // Требуется создать функцию createCache, которая возвращает объект для кэширования результатов выполнения других функций. Кэш должен хранить значения, которые были возвращены функцией при определенных входных параметрах.
  // Функция createCache должна иметь два метода:
  // cache(fn): принимает функцию fn и возвращает новую функцию, которая кэширует результаты выполнения fn. Если кэш уже содержит результат для данного набора входных параметров, то новая функция должна возвращать сохраненное значение, не вызывая fn.
  // clear(): очищает весь кэш.
  
  const createCache = function() {
    let obj = {}
    return {
        cache(fn) {
            return function (x) {
                if (obj[x]) {
                    console.log('Выполнил (значение взято из кэша): ');
                    return obj[x]
                } else {
                    obj[x] = fn.call(this, x);
                    console.log('Выполнил: ');
                    return obj[x]
                }
            }
        },
        clear() {
            obj = {}
        }
    }
  }

  var myCache = createCache();
  
  function multiplyByTwo(x) {
    return x * 2;
  }
  
  var cachedMultiplyByTwo = myCache.cache(multiplyByTwo);
  
  console.log(cachedMultiplyByTwo(5)); // Вывод: Выполнил: 10
  console.log(cachedMultiplyByTwo(5)); // Вывод: Выполнил: 10 (значение взято из кэша)
  
  console.log(cachedMultiplyByTwo(3)); // Вывод: Выполнил: 6
  console.log(cachedMultiplyByTwo(3)); // Вывод: Выполнил: 6 (значение взято из кэша)
  
  myCache.clear(); // Вывод : Кэш очищен
  
  console.log(cachedMultiplyByTwo(5)); // Вывод: Выполнил: 10
  
  //////////////////////////////////////////
  
  // Бонус
  // Реализовать полифил(собственную функцию реализующую встроенную в js) метода bind()
  
  // Код здесь
  
  //