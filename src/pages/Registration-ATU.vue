<template>
  <q-dialog v-model="dialogVisible" @hide="closeRegistrationDialog">
    <q-card class="">
      <q-card-action class="bg-white text-secondary">
        <q-btn flat icon="close" v-close-popup />
        <q-btn-toggle
          v-model="LogReg"
          spread
          color="white"
          text-color="secondary"
          :options="[
            { label: 'Вход', value: 'log' },
            { label: 'Регистрация', value: 'reg' },
          ]"
        />
      </q-card-action>

      <div class="container-card-section bg-white">
        <q-card-section>
          <h3 v-if="LogReg === 'reg'" class="text-h6">Регистрация</h3>
          <h3 v-if="LogReg === 'log'" class="text-h6">Вход</h3>
        </q-card-section>

        <q-card-section>
          <q-form @submit="registerUser" v-if="LogReg === 'reg'">
            <q-input
              filled
              v-model="last_name"
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
              v-model="middle_name"
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
              v-model="position"
              :options="options"
              label="Полномочия"
              hint="Выберите полномочия"
            >
              <template v-if="position" v-slot:append>
                <q-icon
                  name="cancel"
                  @click.stop.prevent="position = null"
                  class="cursor-pointer"
                />
              </template>
            </q-select>

            <div class="q-gutter-sm" v-if="position === 'Клиент'">
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
              v-if="selectedShape === 'Юр. лицо' && position === 'Клиент'"
              filled
              v-model="inn"
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
              v-model="phone_number"
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
                  'Пароль должен содержать минимум 8 символов',
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
                  'Пароль должен содержать минимум 8 символов',
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
          </q-form>
          <q-form @submit="registerUser" v-if="LogReg === 'log'">
            <q-input
              filled
              v-model="email"
              label="Адрес эл.почты"
              type="email"
              hint="Email"
              :rules="[(val) => !!val || '* Необходимо заполнить поле']"
            ></q-input>
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
                  '* Неверный пароль',
                (val) => val.length >= 8 || 'Неверный пароль',
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
    const phone_number = ref("");
    const password = ref("");
    const name = ref("");
    const last_name = ref("");
    const middle_name = ref("");
    const inn = ref("");
    const selectedShape = ref("");

    const shapeRules = [(val) => !!val || "* Обязательно сделайте выбор"];

    const inputRef = ref(null);

    const registerUser = () => {
      //отправка регистрации
      console.log("Form submitted!");
      emit("update:showRegistrationDialog", false);
    };

    const closeRegistrationDialog = () => {
      emit("update:showRegistrationDialog", false);
    };

    watch(
      () => props.showRegistrationDialog,
      (newValue) => {
        dialogVisible.value = newValue;
      }
    );

    return {
      LogReg: ref("log"),
      dialogVisible,
      position: ref(" "),
      options: ["Клиент", "Сотрудник"],
      inputRef,
      password,
      isPwd: ref(true),
      email,
      phone_number,
      confirmPassword,
      name,
      last_name,
      middle_name,
      inn,
      selectedShape,
      shapeRules,
      registerUser,
      closeRegistrationDialog,
    };
  },
};
</script>
