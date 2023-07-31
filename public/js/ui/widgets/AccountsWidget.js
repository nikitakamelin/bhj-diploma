/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
	try {
		this.element = element;
		this.registerEvents();
		this.update();
	} catch (error) {
		console.error(`Элемент не найден. Ошибка: ${error}`)
	}
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {

	const createAccountButtons = [...document.getElementsByClassName('create-account')];

	createAccountButtons.forEach(item => {
		item.addEventListener('click', e => {
			e.preventDefault();
			
			App.getModal('createAccount').open();
		})
	});

	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	const existingAccounts = [...document.getElementsByClassName('account')];
	console.log(existingAccounts)

	// existingAccounts.forEach(item => {
	// 	item.addEventListener('click', e => {
	// 		e.preventDefault();

	// 		console.log('smth')
	// 	});
	// })
	}
	//!-----------------------------------------

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
	if (User.current()) {

		Account.list(User.current(), (err, response) => {
			if (response.success) {
				this.clear();
				//console.log(response.data)
				this.renderItem(response.data);
				//console.log(response.data)
			}
		});
	}
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
	//console.log("clear");
	//[...document.querySelectorAll('.account')].forEach(item => item.remove())
	[...document.getElementsByClassName('account')].forEach(item => item.remove())
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
	console.log('onSelectAccount');
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){

	return `<li class="account" data-id="${item.id}">
				<a href="#">
					<span>${item.name}</span> /
					<span>${item.sum} ₽</span>
				</a>
			 </li>`;
   }


  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
	data.forEach(item => {
		this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(item));
	});
  }
}
