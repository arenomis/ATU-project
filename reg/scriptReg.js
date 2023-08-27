<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="registration.css">
    <title>User registration</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
  <section class="container-wrapper">
    <section class="contener1">
      <h2 class="UserReg">АТУ СЕРВИС</h2>
      <section class="avatar">
          <h3>Регистрация</h3>
      </section>
    </section>
    <section class="contener2">
      <section class="reg">
        <div id="LoginForm">
            <form class="fieldset" @submit="RegUser" action="/sign-up" method="post">
              
              <div class="form-control">
                <label class="form-txt">Адрес эл.почты</label><br>
                <input class="form-control item" type="email" id="email" placeholder="Email" v-model="email" name="email">
                <p v-if="emailAlreadyRegistered" class="error-msg">*Данная почта уже зарегистрирована</p>
              </div>

              <div class="form-control">
                <label class="form-txt">Мобильный телефон</label><br>
                <input class="form-control item" type="tel" name="phone" id="numberPhone" v-model="numberPhone" @input="formatPhoneNumber" autocomplete="off" maxlength="12">
              </div>

              <div class="pass-group form-control" id="password">
                <label class="form-txt">Введите пароль</label><br>
                <input class="form-control item" type="password" :type="showPassword ? 'text' : 'password'" minlength="8" maxlength="25" placeholder="Пароль" v-model="passwordUs"><br>
                <div class="form-control">
                  <label class="form-txt">Повторите пароль</label><br>
                  <div class="password-input-container">
                      <input class="form-control item password-input" type="password" :type="showPassword2 ? 'text' : 'password'" minlength="8" maxlength="25" placeholder="Пароль" v-model="passwordUs2" name="password">
                      <span class="custom-password-toggle-icon" @click="toggleShowPassword2">
                          <img class="custom-eye-icon" :src="showPassword2 ? 'img/eye.on.png' : 'img/eye.off.png'" alt="Toggle Password Visibility">
                      </span>
                  </div>
                  <p v-if="passwordUs2.length > 0 && passwordUs !== passwordUs2" class="error-msg">*Пароли не совпадают</p>
                  <p v-if="!isValidPassword && passwordUs2.length > 0 && passwordUs === passwordUs2" class="error-msg">*Пароль должен содержать заглавную латинскую букву, строчные буквы и цифры</p>
              </div>
              </div>
              
              <div class="form-control">
                <label class="form-txt">Имя</label><br>
                <input class="form-control item" type="text" id="name" v-model="name" name="name"><br>
                <label class="form-txt">Фамилия</label><br>
                <input class="form-control item" type="text" id="lastname" v-model="lastname" name="lastname"><br>
                <label class="form-txt">Отчество</label><br>
                <input class="form-control item" type="text" id="surname" v-model="surname" name="surname">
              </div>

              <div class="form-control">
                <label class="form-txt">ИНН организации</label><br>
                <input class="form-control" type="text" name="inn" v-model="INN" @input="formatINN">
              </div>
            
              <div class="form-control">
                <label class="form-txt">Полномочия</label><br>
                <select class="form-control item" v-model="position" name="position">
                  <option value="client" name="client">Клиент</option>
                  <option value="employee" name="employee">Сотрудник</option>
                </select>
              </div>
            
              <p v-if="showError" class="error-msg">*Необходимо заполнить все поля</p>
              <input class="submit" type="submit" value="Сохранить">
            </form>
          </div>
        </section>
      </section>
    </section>
  </section>

    <script src="scriptReg.js"></script>
</body>
</html>
