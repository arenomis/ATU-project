new Vue({
  el: '#LoginForm',
  data: {
      email: '',
      passwordUs: '',
      showPassword: false,
      showError: false
  },
  computed: {
      isValidPassword() {
          var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/;
          return regex.test(this.passwordUs);
      }
  },
  methods: {
    async submitForm() {
        console.log("Submit form method called");
        

        if (this.isValidPassword) {
            try {
                const response = await fetch('/authentification', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.email,
                        password: this.passwordUs
                    })
                });

                if (response.ok) {
                    const userData = await response.json();
                    // Обработка успешного ответа от сервера
                    console.log(userData);
                    this.showError = false;
                    this.email = '';
                    this.passwordUs = '';
                } else {
                    // Обработка ошибки авторизации
                    console.error('Ошибка авторизации');
                    this.showError = true;
                }
            } catch (error) {
                console.error('Произошла ошибка', error);
                this.showError = true;
            }
        } else {
            this.showError = true;
        }
    },
      togglePasswordVisibility() {
          this.showPassword = !this.showPassword;
      }
  }
});