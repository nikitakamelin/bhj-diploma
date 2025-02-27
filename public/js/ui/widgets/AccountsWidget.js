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

	this.element.addEventListener('click', (e) => {
		e.preventDefault();

		if (e.target.classList.contains('create-account')) {
			App.getModal('createAccount').open();
		} 
		//console.log(e.target)
		this.onSelectAccount(e.target);
	});
  }

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
				this.renderItem(response.data);
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
	const account = element.closest('.account');

	//Удаляет ранее выбранному элементу cчёта класс .active
	const arr = this.element.querySelectorAll('.account');
	arr.forEach(item => item.classList.remove('active'));

	//Устанавливает текущему выбранному элементу счёта
	account.classList.add('active');
	//console.log({ account_id: account.dataset.id })
   App.showPage('transactions', { account_id: account.dataset.id });
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
