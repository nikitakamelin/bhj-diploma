/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
	let callback = (err, response) => {
		if (response.success) {
			App.update();
			this.element.reset();
			const modal = new Modal(document.querySelector('#modal-new-account'));
			modal.close();
			//console.log(this.element);
		} else {
			alert(response.error);
		}
	}
	Account.create(data, callback);
  }
}