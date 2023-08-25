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

	Account.list(User.current(), (error, response) => {
		if (response.success) {
			
			//* подсказали исключить дублирование через new Option
			const select = this.element.querySelector('.accounts-select');
			response.data.forEach((item, index) => {
					select.options[index] = new Option(item.name, item.id);
			});
			
		} else {
			console.error(error);
		}
	});
  }
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