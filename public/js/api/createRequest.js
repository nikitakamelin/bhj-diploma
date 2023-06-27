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
			if (options.data) {
				url = `${options.url}?email=${options.data.email}&password=${options.data.password}&account_id=${options.data.account_id}`;
			}
			
		} else {
			//При параметре method отличном от GET, данные из объекта data должны передаваться через объект FormData
			formData = new FormData();

			formData.append('id', options.data.id);
			formData.append('name', options.data.name);
			formData.append('email', options.data.email);
			formData.append('password', options.data.password);

			//для Transaction
			formData.append('type', options.data.type);
			formData.append('sum', options.data.sum);
			formData.append('account_id', options.data.account_id);
		}
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

