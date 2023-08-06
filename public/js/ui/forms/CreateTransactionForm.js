/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);

	 this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Accountlist
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
//*--------------------- ОТРИСОВЫВАЕТСЯ 2 РАЗА -------------------------------------
	Account.list(User.current(), (error, response) => {
		if (response.success) {
			//console.log(this.element.id)
			if (this.element.id === 'new-income-form') {
				console.log(response.data)
				response.data.forEach(item => {
					//console.log(item.id);
					document.querySelector('#income-accounts-list').innerHTML += `<option value="${item.id}">${item.name}</option>`;
				})
			}
		} else {
			console.error(error);
		}
	});
  }
	//*----------------------------------------------------------------------
  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {

	Transaction.create(data, (err, response) => {
		if (response.success) {
			App.update();
			this.element.reset();
			let modal = {};
			if (this.element.id === 'new-income-form') {
				modal = new Modal(document.querySelector('#modal-new-income')); 
			}
			if (this.element.id === 'new-expense-form') {
				modal = new Modal(document.querySelector('#modal-new-expense')); 
			}
			modal.close();
		}
	});
  }
}