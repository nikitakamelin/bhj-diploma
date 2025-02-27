/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element){
	try {
		this.element = element;
		this.registerEvents();
	} catch (error) {
		console.error(`Элемент не найден. Ошибка: ${error}`);
	}
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
	const closeElementsArray = [...this.element.querySelectorAll('[data-dismiss="modal"]')];

	const checkCloseElement = item => {
		item.addEventListener('click', e => {
			e.preventDefault();
			this.onClose(e);
		})
	}
	closeElementsArray.forEach(checkCloseElement);
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
	this.close();
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
	this.element.style.display = "block";
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
	this.element.removeAttribute('style');
  }
}