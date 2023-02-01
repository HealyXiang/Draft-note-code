let likeArr = { length: 3 };

function dd() {
  console.log(this);
}

// dd();

var pokemon = {
  firstname: 'Pika',
  lastname: 'Chu ',
  getPokeName: function () {
    var fullname = this.firstname + ' ' + this.lastname;
    return fullname;
  },
};

var pokemonName = function (snack, hobby) {
  console.log(this.getPokeName() + ' loves ' + snack + ' and ' + hobby);
};

// pokemonName.call(pokemon, 'sushi', 'algorithms'); // Pika Chu  loves sushi and algorithms
// pokemonName.apply(pokemon, 'sushi');

var name = 'window';

var A = {
  name: 'A',
  sayHello: function () {
    var s = () => console.log(this.name);
    return s; //返回箭头函数s
  },
};

var sayHello = A.sayHello();
sayHello(); // 输出A

var B = {
  name: 'B',
};

A.sayHello.call(B)();
sayHello.call(B); //还是A
sayHello.call(); //还是A
