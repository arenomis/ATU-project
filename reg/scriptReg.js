var passwordReg = new Vue({
  el: '#LoginForm',
  data: {
    username: '',
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
    numberPhone: '+7',
    INN: ''
  },
  computed: {
    isValidPassword() {
      var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/;
      return regex.test(this.passwordUs); 
    }
    
  },
  methods: {
    formatINN() {
      // Удаляем все, кроме цифр
      this.INN = this.INN.replace(/\D/g, '');

      // Ограничиваем длину до 10 символов
      if (this.INN.length > 10) {
        this.INN = this.INN.slice(0, 10);
      }
    },
    formatPhoneNumber() {
      // Проверяем и обрезаем номер телефона, чтобы он всегда начинался с '+7'
      if (!this.numberPhone.startsWith('+7')) {
          this.numberPhone = '+7' + this.numberPhone;
      }
      
  },
  toggleShowPassword2() {
    this.showPassword2 = !this.showPassword2;
    this.showPassword = !this.showPassword;
},
    RegUser: function(event) {
      event.preventDefault(); // Отменяем стандартное действие отправки формы

      // Проверяем на незаполненные поля
      if (!this.email.trim() || !this.passwordUs.trim() || !this.passwordUs2.trim() || !this.name.trim() || !this.lastname.trim() || !this.surname.trim()) {
        this.showError = true;
        return;
      }

      if (this.passwordUs !== this.passwordUs2) {
        this.showError = true;
        return;
      }

      axios.post('#', {//Адрес сервера сюда как будет 
        // передаем данные пользователя

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
      this.username = '';
      this.email = '';
      this.passwordUs = '';
      this.passwordUs2 = '';
      this.name = '';
      this.lastname = '';
      this.surname = '';
      this.position = 'employee';
    }
  }
});
