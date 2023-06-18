/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

	const xhr = new XMLHttpRequest();

	try {
		let url = options.url;
		let formData = null;

		//При параметре method = GET, данные из объекта data должны передаваться в строке адреса
		if (options.method === 'GET') {
			url = `${options.url}?mail=${options.data.email}&password=${options.data.password}`;
		} else {
			//При параметре method отличном от GET, данные из объекта data должны передаваться через объект FormData
			formData = new FormData();

			formData.append('mail', options.data.email);
			formData.append('password', options.data.password);
		}
		//настраиваем запрос на сервер
		xhr.open(options.method, url);

		//устанавливаем требуемый тип ответа
		xhr.responseType = 'json';

		//при успешном выполнении вызываем callback из options
		xhr.onload = () => {
			//! здесь не понял, откуда взять error
			//options.callback(error, xhr.response);
		}

		//console.log(url);
		xhr.send(formData);
	}
	catch (error) {
		options.callback(error, xhr.response);
	}
};

// createRequest({
// 	url: 'http://localhost:8000',
// 	data: {
// 	  mail: 'ivan@biz.pro',
// 	  password: 'odinodin'
// 	},
// 	method: 'POST',
// 		callback: (error, response) => {
// 	  alert( 'Ошибка, если есть', error );
// 	  console.log( 'Данные, если нет ошибки', response );
// 	}
//  });

// здесь перечислены все возможные параметры для функции
// createRequest({
// 	url: 'http://localhost:8000', // адрес
// 	data: { // произвольные данные, могут отсутствовать
// 	  email: 'ivan@poselok.ru',
// 	  password: 'odinodin'
// 	},
// 	method: 'GET', // метод запроса
// 	/*
// 	  Функция, которая сработает после запроса.
// 	  Если в процессе запроса произойдёт ошибка, её объект
// 	  должен быть в параметре err.
// 	  Если в запросе есть данные, они должны быть переданы в response.
// 	*/
// 	callback: (error, response) => {
// 	  console.log( 'Ошибка, если есть', error );
// 	  console.log( 'Данные, если нет ошибки', response );
// 	}
//  });