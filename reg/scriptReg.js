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
    position: 'client',
    passwordValidError: false,
    passwordFocused: false,
    showError: false,
    showPassword: false,
    showPassword2: false,
    emailAlreadyRegistered: false,
    phone: '7',
    showErrorPhone: false, // Флаг для отображения ошибки в номере телефона
    INN: ''
  },
  computed: {
    OffCheck() {
      if (this.passwordUs.length = 0) {
        this.passwordValidError = false;
      }
    },
    formatName() {
      // Удаляем все, кроме русских букв
      this.name = this.name.replace(/[^А-ЯЁа-яё]/g, '');
      this.lastname = this.lastname.replace(/[^А-ЯЁа-яё]/g, '');
      this.surname = this.surname.replace(/[^А-ЯЁа-яё]/g, '');
    },
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
       if (this.phone.length === 11) { 
        this.showErrorPhone = false;   
      }
    },
    checkPhone(){
      if (this.phone.length !== 11) { 
        this.showErrorPhone = true;   
      }
    },
    checkPasswordFocused() {
      this.passwordFocused = true;
      this.checkPasswordValidity()
    },
    checkPasswordValidity() {
      this.passwordValidError = this.passwordUs.length > 0 && !this.isValidPassword && this.passwordFocused;
    },
    toggleShowPassword2() {
      this.showPassword2 = !this.showPassword2;
      this.showPassword = !this.showPassword;
    },
    RegUser(event) {
      event.preventDefault(); // Отменяем стандартное действие отправки формы

    

      // Проверяем на незаполненные поля
      if (!this.email.trim() || !this.INN.trim() || !this.passwordUs.trim() || !this.passwordUs2.trim() || !this.name.trim() || !this.lastname.trim() || !this.surname.trim()) {
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
      this.position = 'client';
    }
  }
});
