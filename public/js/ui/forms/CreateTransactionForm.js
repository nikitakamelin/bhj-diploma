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
//*----------------------------------------------------------------------
	// Account.list(User.current(), (error, response) => {
	// 	if (response.success) {
	// 		//console.log(this.element.id)
	// 		if (this.element.id === 'new-income-form') {
	// 			console.log(response.data)
	// 			response.data.forEach(item => {
	// 				document.querySelector('#income-accounts-list').innerHTML += `<option value="${item.id}">${item.name}</option>`;
	// 			})
				 
	// 		}
	// 	} else {
	// 		console.error(error);
	// 	}
	// });
	//*----------------------------------------------------------------------
	//const callback = 

	console.log(User.current())
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {

  }
}