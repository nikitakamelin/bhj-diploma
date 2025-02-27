/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
	static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
	user = JSON.stringify(user);
	localStorage.setItem('user', user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
	localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
	if (!localStorage.getItem('user')) {
		return undefined;
	}
	return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
	    // ...
		 let url = this.URL + '/current';

		 createRequest({
			// ...
			url: url,
			method: 'GET',
			// задаём функцию обратного вызова
			callback: (err, response) => {
			  if ( response && response.user ) {
				 //console.log(response.user)
				 this.setCurrent(response.user);
			  } else {
				//console.log('unset done');
				this.unsetCurrent();
			  }
			  // ...
			  // вызываем параметр, переданный в метод fetch
			  callback( err, response );
			}
			// ...
		 });

		//console.log(xhr);
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
	createRequest({
		url: this.URL + '/register',
		data,
		method: 'POST',
		callback: (err, response) => {
			if (response && response.user) {
				this.setCurrent(response.user);
			}
		callback(err, response);
		}
	})
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {

	createRequest({
		url: this.URL + '/logout',
		method: 'POST',
		callback: (err, response) => {
			if (response) {
				//console.log(User.current());
				this.unsetCurrent();
			}
			callback(err, response);
		}
	});
  }
}
