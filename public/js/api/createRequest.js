/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

	const xhr = new XMLHttpRequest();

	try {
		let url = options.url;
		let formData = null;

		//!--------------------------------------------------------------------
		if (options.data) {
			//При параметре method = GET, данные из объекта data должны передаваться в строке адреса
			if (options.method === 'GET') {
			
				url = `${options.url}?`
				//в цикле передаем гет-параметры
				for (let key in options.data) {
					//
					let data = `${key}=${options.data[key]}&`
					url = url + data;
				}
				//отрезаем последний амперсанд
				url = url.slice(0, -1)
				
			} else {
				//При параметре method отличном от GET, данные из объекта data должны передаваться через объект FormData
				formData = new FormData();

				for (let key in options.data) {
					formData.append(key, options.data[key]);
				}

			}
		}
		//!--------------------------------------------------------------------

		//настраиваем запрос на сервер
		xhr.open(options.method, url);

		//устанавливаем требуемый тип ответа
		xhr.responseType = 'json';

		//при успешном выполнении вызываем callback из options
		xhr.onload = (error) => {
			if (xhr.status != 200) {
				console.error("Ошибка http:" + error);
			}
			//console.log(url)
			options.callback(error, xhr.response);
		}

		xhr.send(formData);
	}
	catch (err) {
		//console.log(error);
		alert('Ошибка: ' + err);
		options.callback(err, xhr.response);
	}
};

