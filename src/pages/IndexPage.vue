<template>
  <q-page class="flex flex-center bg-white">
    <svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" style="margin-top: -45vh;">
      <circle cx="80" cy="80" r="80" fill="#EDC500" />
    </svg>
    <svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" style="position: absolute; margin-top: -25vh;">
      <circle cx="80" cy="80" r="26" fill="#D8315B" />
    </svg>
    <svg width="100%" height="110%" xmlns="http://www.w3.org/2000/svg" style="position: absolute; bottom: 0;">
      <ellipse cx="50%" cy="100%" rx="110%" ry="50%" fill="#18191E" />
    </svg>
    <p class="absolute" style="font-size: 44px; font-weight: 700; color:aliceblue; margin-top:10vh;">АТУ СЕРВИС</p>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
