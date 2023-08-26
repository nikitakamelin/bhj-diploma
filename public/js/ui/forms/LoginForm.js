/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {

	let callback = (err,response) => {            
		if (response.success) {
			App.setState('user-logged');

			//чтобы закрыть окно авторизации, находим модальное окно у формы, используя контекст
			//закрываем через метод close()
			const modal = new Modal(this.element.closest('#modal-login'));
			modal.close();
		} else {
			alert(response.error);
		}
	} 
	User.login(data, callback);
  }
}