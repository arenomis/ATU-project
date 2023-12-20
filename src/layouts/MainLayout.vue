<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="bg-primary"
          color="secondary"
        />

        <q-toolbar-title> АТУ сервис </q-toolbar-title>
        <q-btn
          v-if="!loggedIn"
          flat
          dense
          round
          icon="login"
          aria-label="Вход"
          @click="loginOpen"
          class="bg-primary"
          color="secondary"
        >
          Вход
        </q-btn>
        <q-btn
          v-else
          flat
          dense
          round
          icon="logout"
          aria-label="Выход"
          @click="logout"
          class="bg-primary"
          color="secondary"
        >
          Выход
        </q-btn>
        <q-dialog v-model="showRegistrationDialog">
          <registration-dialog
            v-model:showRegistrationDialog="showRegistrationDialog"
          />
        </q-dialog>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Список страниц </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import RegistrationDialog from "pages/Registration-ATU.vue";

const linksList = [
  {
    title: "Novigation",
    caption: "slider",
    icon: "<>",
    link: "/slider",
  },
  {
    title: "Registration",
    caption: "registration",
    icon: "#",
    link: "/registration",
  },
  {
    title: "Kard",
    caption: "kard",
    icon: "~",
    link: "/kard",
  },
  {
    title: "Kard-worker",
    caption: "kard-worker",
    icon: "(.-.)",
    link: "/kard-worker",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    RegistrationDialog,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const loggedIn = ref(false);
    const showRegistrationDialog = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      loggedIn,
      showRegistrationDialog,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      loginOpen() {
        if (!loggedIn.value) {
          // Открываем окно регистрации только при нажатии на "Вход", если пользователь не авторизован
          showRegistrationDialog.value = true;
        } else {
          // В противном случае выполняем логику выхода
          loggedIn.value = false;
        }
      },
      logout() {
        loggedIn.value = false;
      },
    };
  },
});
</script>
