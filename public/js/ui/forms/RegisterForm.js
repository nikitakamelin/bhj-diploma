/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
	let callback = (err, response) => {       //! не используется err 
		if (response.success) {
			App.setState('user-logged');

			const modal = new Modal(this.element.closest('#modal-register'));
			modal.close();
		} else {
			alert(response.error);
		}
	}

	User.register(data, callback);
  }
}