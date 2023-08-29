var passwordReg = new Vue({
  el: '#LoginForm',
  data: {
    /*productionTip: false, убрать комент при публикации*/
    email: '',
    passwordUs: '',
    passwordUs2: '',
    name: '',
    lastname: '',
    surname: '',
    position: 'employee',
    showError: false,
    showPassword: false,
    showPassword2: false,
    emailAlreadyRegistered: false,
    phone: '7',
    showErrorPhone: false, // Флаг для отображения ошибки в номере телефона
    INN: '',
    formSubmitted: false, // Флаг для отслеживания отправки формы
  },
  computed: {
    formatINN() {
      // Удаляем все, кроме цифр
      this.INN = this.INN.replace(/\D/g, '');

      // Ограничиваем длину до 10 символов
      if (this.INN.length > 10) {
        this.INN = this.INN.slice(0, 10);
      }
    },
    isValidPassword() {
      var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/;
      return regex.test(this.passwordUs); 
    }
  },
  methods: {
    formatPhoneNumber() {
      // Проверяем и обрезаем номер телефона, чтобы он всегда начинался с '+7'
      this.phone = this.phone.replace(/\D/g, '');

      if (!this.phone.startsWith('7')) {
          this.phone = '7' + this.phone;
      }
      if (this.formSubmitted && this.phone.length !== 11) { 
        this.showErrorPhone = true;
      } else {
        this.showErrorPhone = false;
        this.formSubmitted = false;
      }
    },
    toggleShowPassword2() {
      this.showPassword2 = !this.showPassword2;
      this.showPassword = !this.showPassword;
    },
    RegUser(event) {
      event.preventDefault(); // Отменяем стандартное действие отправки формы

      this.formSubmitted = true; // Устанавливаем флаг, что форма была отправлена

      // Проверяем на незаполненные поля
      if (!this.email.trim() || this.INN.trim() || !this.passwordUs.trim() || !this.passwordUs2.trim() || !this.name.trim() || !this.lastname.trim() || !this.surname.trim()) {
        this.showError = true;
        return;
      }

      if (this.passwordUs !== this.passwordUs2) {
        this.showError = true;
        return;
      }
      if (this.phone.length !== 11) {
          this.showErrorPhone = true;
        return;
      }

      axios.post('#', { // Адрес сервера сюда как будет передаем данные пользователя

      })
      .then(response => {
        // Обработка ответа от сервера
        if (response.data.detail === "Email already registered") {
          this.emailAlreadyRegistered = true; // устанавливаем флаг для отображения сообщения
        } else {
          // Дополнительный код для обработки успешной регистрации
        }
        this.showErrorPhone = false;
      })
      .catch(error => {
        // Обработка ошибок
        console.error(error);
      });

      // Сброс ошибок и полей после сохранения
      this.showError = false;
      this.showErrorPhone = false;
      this.email = '';
      this.phone = '7';
      this.passwordUs = '';
      this.passwordUs2 = '';
      this.name = '';
      this.lastname = '';
      this.surname = '';
      this.inn = '';
      this.position = 'employee';
    }
  }
});
