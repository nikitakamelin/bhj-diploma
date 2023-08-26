/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
	//const sidebarButton = document.querySelector('.sidebar-toggle');
	const sidebarButton = document.querySelector('[data-toggle="push-menu"]');

	sidebarButton.addEventListener('click', () => {
		['sidebar-open', 'sidebar-collapse'].map(cl => document.body.classList.toggle(cl));
	});
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
	const registerButton = document.querySelector(".menu-item_register");
	const loginButton = document.querySelector(".menu-item_login");
	const logoutButton = document.querySelector(".menu-item_logout");

	registerButton.addEventListener('click', e => {
		e.preventDefault();

		const modalWindow = App.getModal('register');
		modalWindow.open();
	})
	loginButton.addEventListener('click', e => {
		e.preventDefault();

		const modalWindow = App.getModal('login');
		modalWindow.open();
	})
	logoutButton.addEventListener('click', e => {
		e.preventDefault();
		
		User.logout((err,response) => {
			if (response.success) {
				//console.log('выйти')
				App.setState('init');
			} 
			//console.log(err,response);
	  });
	})
  }
}