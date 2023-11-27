<template>
  <q-dialog
    v-model="dialogVisible"
    style="max-width: 400px"
    @hide="closeRegistrationDialog"
  > 
    <q-card class="">
      <q-card-action class="bg-white text-secondary">
        <q-btn flat icon="close" v-close-popup />
      </q-card-action>

      <div class="container bg-white">
        <q-card-section>
          <h3 class="text-h6">Регистрация</h3>
        </q-card-section>
        

        <q-card-section>
          <q-form @submit="registerUser">
            <q-input
              filled
              v-model="lastname"
              label="Фамилия"
              hint="Минимальная длина - 2 символа"
              :rules="[
                (val) => !!val || '* Необходимо заполнить поле',
                (val) =>
                  val.length >= 2 || 'Необходимо вписать минимум 2 символа',
                (val) =>
                  /^[А-Яа-яЁё]+$/.test(val) ||
                  'Пожалуйста, используйте только русские буквы',
              ]"
              lazy-rules
            ></q-input>

            <q-input
              filled
              v-model="name"
              label="Имя"
              hint="Минимальная длина - 2 символа"
              :rules="[
                (val) => !!val || '* Необходимо заполнить поле',
                (val) =>
                  val.length >= 2 || 'Необходимо вписать минимум 2 символа',
                (val) =>
                  /^[А-Яа-яЁё]+$/.test(val) ||
                  'Пожалуйста, используйте только русские буквы',
              ]"
              lazy-rules
            ></q-input>

            <q-input
              filled
              v-model="surname"
              label="Отчество"
              hint="Минимальная длина - 2 символа"
              :rules="[
                (val) => !!val || '* Необходимо заполнить поле',
                (val) =>
                  val.length >= 2 || 'Необходимо вписать минимум 2 символа',
                (val) =>
                  /^[А-Яа-яЁё]+$/.test(val) ||
                  'Пожалуйста, используйте только русские буквы',
              ]"
              lazy-rules
            ></q-input>

            <q-select
              color="secondary"
              filled
              v-model="model"
              :options="options"
              label="Полномочия"
              hint="Выберите полномочия"
            >
              <template v-if="model" v-slot:append>
                <q-icon
                  name="cancel"
                  @click.stop.prevent="model = null"
                  class="cursor-pointer"
                />
              </template>
            </q-select>

            <div class="q-gutter-sm" v-if="model === 'Клиент'">
              <q-radio
                v-model="selectedShape"
                color="secondary"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="Юр. лицо"
                label="Юр. лицо"
                :rules="shapeRules"
              />
              <q-radio
                v-model="selectedShape"
                color="secondary"
                checked-icon="task_alt"
                unchecked-icon="panorama_fish_eye"
                val="Физ. лицо"
                label="Физ. лицо"
                :rules="shapeRules"
              />
            </div>

            <q-input
              v-if="selectedShape === 'Юр. лицо' && model === 'Клиент'"
              filled
              v-model="INN"
              label="ИНН организации"
              hint="ИНН организации"
              mask="##########"
              :rules="[(val) => !!val || '* Необходимо заполнить поле']"
            ></q-input>

            <q-input
              filled
              v-model="email"
              label="Адрес эл.почты"
              type="email"
              hint="Email"
              :rules="[(val) => !!val || '* Необходимо заполнить поле']"
            ></q-input>

            <q-input
              filled
              v-model="phone"
              label="Мобильный телефон"
              type="tel"
              hint="Мобильный телефон"
              mask="+7 (###) ### - ## - ##"
              fill-mask
              :rules="[(val) => !!val || '* Необходимо заполнить поле']"
            >
            </q-input>

            <q-input
              label="Введите пароль"
              v-model="password"
              filled
              :type="isPwd ? 'password' : 'text'"
              hint="Пароль"
              :rules="[
                (val) => !!val || '* Необходимо заполнить поле',
                (val) =>
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/.test(val) ||
                  '* Пароль должен содержать заглавную латинскую букву, строчные буквы и цифры',
                (val) =>
                  val.length >= 8 ||
                  'Пароль должен содержать в себе минимум 8 символов',
              ]"
              lazy-rules
            >
              <template v-slot:append>
                <div class="cursor-pointer" @click="isPwd = !isPwd">
                  <img
                    :src="isPwd ? '/icons/eye.off.png' : '/icons/eye.on.png'"
                    alt="Toggle Password"
                    style="width: 30px; height: auto"
                  />
                </div>
              </template>
            </q-input>

            <q-input
              label="Повторите пароль"
              v-model="confirmPassword"
              filled
              :type="isPwd ? 'password' : 'text'"
              hint="Повторите пароль"
              :rules="[
                (val) => !!val || '* Необходимо заполнить поле',
                (val) => val === password || '* Пароли не совпадают',
                (val) =>
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/.test(val) ||
                  '* Пароль должен содержать заглавную латинскую букву, строчные буквы и цифры',
                (val) =>
                  val.length >= 8 ||
                  'Пароль должен содержать в себе минимум 8 символов',
              ]"
              lazy-rules
            >
              <template v-slot:append>
                <div class="cursor-pointer" @click="isPwd = !isPwd">
                  <img
                    :src="isPwd ? '/icons/eye.off.png' : '/icons/eye.on.png'"
                    alt="Toggle Password"
                    style="width: 30px; height: auto"
                  />
                </div>
              </template>
            </q-input>

            <q-btn
              type="submit"
              color="secondary"
              label="Сохранить"
              class="q-mt-md"
            ></q-btn>

            <q-alert
              v-if="emailAlreadyRegistered"
              color="negative"
              icon="warning"
              class="q-mt-md"
            >
              *Данная почта уже зарегистрирована
            </q-alert>
          </q-form>
        </q-card-section>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, watch } from "vue";
import { useQuasar } from "quasar";

export default {
  props: {
    showRegistrationDialog: {
      required: true,
    },
  },

  setup(props, { emit }) {
    const $q = useQuasar();
    const dialogVisible = ref(props.showRegistrationDialog);
    const confirmPassword = ref("");
    const email = ref("");
    const phone = ref("");
    const password = ref("");
    const name = ref("");
    const lastname = ref("");
    const surname = ref("");
    const INN = ref("");
    const selectedShape = ref("");

    const shapeRules = [
      (val) => !!val || "* Обязательно сделайте выбор",
    ];

    const registerUser = () => {
      // Логика регистрации пользователя
    };

    const closeRegistrationDialog = () => {
      emit("update:showRegistrationDialog", false);
    };

    watch(() => props.showRegistrationDialog, (newValue) => {
      dialogVisible.value = newValue;
    });

    return {
      dialogVisible,
      model: ref(" "),
      options: ["Клиент", "Сотрудник"],
      password,
      isPwd: ref(true),
      email,
      phone,
      confirmPassword,
      name,
      lastname,
      surname,
      INN,
      selectedShape,
      shapeRules,
      registerUser,
      closeRegistrationDialog,
    };
  },
};
</script>

<style scoped>
  .container {
    width: 350px;
    height: 100%;
    display: block;
    text-align: center;
    margin: 0 auto;
  }
</style>