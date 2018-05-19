//Домашнее задание к лекции 3.1 «Создание конструктора и прототипа»

'use strict';
const rand = (min, max) => {
	return Math.ceil((max - min + 1) * Math.random()) + min - 1;
};

const generateId = () => {
	return Array(4).fill(1).map(value => rand(1000, 9999)).join('-');
};

const pointsInfo = [
	{ title: 'Темная сторона Луны', coords: [500, 200, 97] },
	{ title: 'Седьмое кольцо Юпитера', coords: [934, -491, 712] },
	{ title: 'Саратов', coords: [30, 91, 77] },
];

//task 1
console.log('task 1');
function OrdersTeleportationPoint(title, x, y, z) {
	this.title = title;
	this.x = x;
	this.y = y;
	this.z = z;
}

OrdersTeleportationPoint.prototype.getDistance = function(x, y, z) {
	return Math.sqrt(
		Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2) + Math.pow(z - this.z, 2)
	);
};

const point = new OrdersTeleportationPoint('Темная сторона Луны', 500, 200, 97);
let distance = point.getDistance(100, -100, 33);
console.log(
	`Расстояние до пункта «${point.title}» составит ${distance.toFixed(0)} единиц`
);

// task 2
console.log('task 2');
function OrdersTeleportationPointLocator(locationPoints) {
	this.locationPoints = locationPoints;
}

OrdersTeleportationPointLocator.prototype.getClosest = function(x, y, z) {
	const distances = [];

	for (const locationPoint of this.locationPoints) {
		distances.push(locationPoint.getDistance(x, y, z));
	}

	return pointsInfo[distances.indexOf(Math.min.apply(Math, distances))];
};

const points = pointsInfo.map(
	point => new OrdersTeleportationPoint(point.title, ...point.coords)
);
const locator = new OrdersTeleportationPointLocator(points);

const closestPoint = locator.getClosest(333, 294, 77);
console.log(`Ближайший пункт телепортации заказов «${closestPoint.title}»`);

// task 3
console.log('task 3');
function LoyaltyCard(clientName, orderSum) {
	this.orders = [orderSum];
	this.owner = clientName;
	this.id = generateId();
	this.balance = orderSum;
	this.discount = function() {
		if (this.balance > 10000) {
			return 7;
		}

		if (this.balance > 5000 && this.balance <= 10000) {
			return 5;
		}

		if (this.balance > 3000 && this.balance <= 5000) {
			return 3;
		}
	};
}

LoyaltyCard.prototype.append = function(sum) {
	this.balance += sum;
	this.orders.push(sum);
};

LoyaltyCard.prototype.getFinalSum = function(sum) {
	return sum * (1 - this.discount() / 100);
};

LoyaltyCard.prototype.show = function() {
	console.log(`Карта ${this.id}:
  Владелец: ${this.owner}
  Баланс: ${this.balance} Q
  Текущая скидка: ${this.discount()} %
  Заказы:`);
	for (let i = 0; i < this.orders.length; i++) {
		console.log(`    #${i + 1} на сумму ${this.orders[i]} Q`);
	}
};

const card = new LoyaltyCard('Иванов Иван', 6300);
let newOrderSum = 7000;
let finalSum = card.getFinalSum(newOrderSum);
console.log(`Итоговая сумма для заказа на ${newOrderSum} Q по карте
  составит ${finalSum} Q. Скидка ${card.discount()} %.`);

card.append(newOrderSum);
console.log(`Баланс карты после покупки ${card.balance} Q.`);
card.show();
