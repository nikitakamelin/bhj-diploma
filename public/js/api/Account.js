/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  static URL = '/account';	

  static get(id = '', callback){

	let url = this.URL + `/${id}`;

	createRequest({
		url: url, 
		method: 'GET',
		callback: callback,
	});
  }
}
