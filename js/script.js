"use strict"

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/Blackberry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

if (isMobile.any()) {
	document.body.classList.add('_mobile');
} else {
	document.body.classList.add('_desktop');
};
const searchButton = document.querySelector('.master__search-subitem');
const searchForm = document.querySelector('.master__form');
const searchFields = document.querySelectorAll('.form__search-field');
const searchFormParent = searchForm.parentElement;


searchFields.forEach(function (item, i, searchFields) {
	let itemPlaceholder = item.placeholder;
	item.addEventListener("focus", function (e) {
		item.placeholder = "";
	});
	item.addEventListener("blur", function (e) {
		item.placeholder = itemPlaceholder;
	});
});

searchButton.addEventListener("click", function (e) {
	e.stopPropagation();
	searchFormParent.classList.remove('descender');
	searchForm.classList.remove('defader');
	searchFormParent.classList.toggle('extender');
	searchButton.classList.toggle('unactive');
	searchForm.classList.toggle('unactive');
	searchForm.classList.toggle('active');
	searchForm.classList.toggle('fader');
	searchFields.forEach(function (item) {
		item.focus();
	});
});

document.body.addEventListener("click", function (e) {
	let target = e.target;
	// console.log(target);
	let field = target.classList.contains('form__search-field');
	let button = target.classList.contains('form__button');
	if (searchForm.classList.contains('active') === true && field !== true && button !== true) {
		searchFormParent.classList.toggle('extender');
		searchFormParent.classList.toggle('descender');
		searchForm.classList.toggle('fader');
		searchForm.classList.toggle('defader');
		searchButton.classList.remove('unactive');
		searchForm.classList.add('unactive');
		searchForm.classList.toggle('active');
	};
});

const burgerButton = document.querySelector('.master__burger');
const burgerMenu = document.querySelector('.burger-menu');

burgerButton.addEventListener("click", function (e) {
	e.stopPropagation();

	burgerMenu.classList.add('defader');
	burgerButton.classList.toggle('master__burger-active');
	burgerMenu.classList.toggle('unactive');
	burgerMenu.classList.toggle('fader');
	burgerMenu.classList.toggle('defader');
})

document.body.addEventListener("click", function (e) {
	let target = e.target;
	let menuField = target.classList.contains('burger-menu__list');
	let menuButton = target.classList.contains('master__burger');
	if (burgerMenu.classList.contains('fader') === true && menuField !== true) {
		burgerMenu.classList.remove('fader');
		burgerMenu.classList.add('defader');
		burgerMenu.classList.add('unactive');
		burgerButton.classList.remove('master__burger-active');
	};
});

const productsItems = document.querySelector('.products__items');
const allProducts = document.querySelectorAll('.products__item');
if (allProducts.length < 4) {
	productsItems.classList.add('products__items-few');
};

const productsTabs = document.querySelectorAll('.products__menu-list a');
productsTabs.forEach(function (item, i, productsTabs) {
	let dataIndex = i;
	item.setAttribute("data-index", dataIndex);
});

const productsCategories = document.querySelectorAll('.products__items');
productsCategories.forEach(function (item, i, productsCategories) {
	let dataIndex = i;
	item.setAttribute("data-index", dataIndex);
});

const productsMenu = document.querySelector('.products__menu');
const compareIndex = 0;
productsMenu.addEventListener("click", function (e) {
	let target = e.target;
	e.preventDefault();

	let targetIndex = target.dataset.index;
	if (targetIndex !== undefined) {
		const compareIndex = targetIndex;
		productsTabs.forEach(function (item) {
			if (item.classList.contains('selected') === true) {
				item.classList.remove('selected');
			};
		});
		target.classList.add('selected');
		productsCategories.forEach(function (item) {
			if (compareIndex === item.dataset.index) {
				item.classList.remove('defader');
				item.classList.add('selected');
				item.classList.add('fader');
			} else {
				item.classList.remove('selected');
				item.classList.remove('fader');
				item.classList.add('defader');
			};
		});
	};
});
