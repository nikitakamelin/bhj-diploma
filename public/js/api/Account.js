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

	//! как можно/нужно сохранить id? 

	createRequest({
		url: this.URL, //!! можно ли здесь использовать this
		method: 'GET',
		callback: callback,
	});
  }
}
