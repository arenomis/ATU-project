<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="white"
      navigation
      padding
      arrows
      infinite
      height="100%"
      class="text-white shadow-0 rounded-borders bg-primary"
      no-passive
      touch-swipe 
      >

        <q-carousel-slide name="style" class="column no-wrap flex-center">
        <img :src="require('../assets/slide-img/img1.png')" name="style" alt="Изображение 1">
        <div class="q-mt-md">
            <p class="white">СЕРВИС <span class="red">И</span></p>
            <p><span class="red">ЗАМЕНА </span></p>
            <p><span class="red">МАСЛА</span><span class="white">.</span></p>
        </div>
        <div>
            <q-btn
              color="secondary" 
              text-color="white" 
              class="btnCast"
            >
            <a href="#" class="btnLink">
              <span class="btnTxt">Подробнее</span>
            </a>
          </q-btn>
        </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <img :src="require('../assets/slide-img/img2.png')" name="style" alt="Изображение 2">
          <div class="q-mt-md">
            <p class="red">МНЕ</p>
            <p class="red">НУЖЕН </p>
            <p class="white">РЕМОНТ<span class="red">!</span></p>
          </div>
          <div>
            <q-btn
              color="secondary" 
              text-color="white" 
              class="btnCast"            >
            <a href="#" class="btnLink">
              <span class="btnTxt">О проблеме</span>
            </a>
          </q-btn>
        </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <img :src="require('../assets/slide-img/img3.png')" name="style" alt="Изображение 3">
          <div class="q-mt-md">
            <p class="red">КАК</p>
            <p class="white">ВЕДУТСЯ </p>
            <p class="red">РАБОТЫ<span class="white">?</span></p>
          </div>
          <div>
            <q-btn
              color="secondary" 
              text-color="white" 
              class="btnCast"            >
            <a href="#" class="btnLink">
              <span class="btnTxt">Узнать</span>
            </a>
          </q-btn>
        </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <img :src="require('../assets/slide-img/img4.png')" name="style" alt="Изображение 4">
          <div class="q-mt-md ">
            <p class="red">ЗАЙТИ</p>
            <p><span class="red">В </span> <span class="white">АРХИВ</span></p>
            <p class="red">И НАЙТИ<span class="white">.</span></p>
          </div>
          <div>
            <q-btn
              color="secondary" 
              text-color="white" 
              class="btnCast"            >
            <a href="#" class="btnLink">
              <span class="btnTxt">К записям</span>
            </a>
          </q-btn>
        </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      slide: ref('style'),

    }
  }
}
</script>

<style scoped>
p {
  line-height: 1;
  margin-left: -10vh;
}
.slide-text {
  font-family: Geologica; 
  font-size: 56px;
}
.red {
  font-family: Geologica; 
  font-size: 56px;
  color: #D8315B !important; 
}
.white {
  font-family: Geologica; 
  font-size: 56px;
  color: white !important;
}
.btnLink {
  text-decoration: none;
  color: #FFFAFF;
  text-align: center;
  font-family: Manrope;
}
.btnTxt {
  font-size: 24px;
  font-weight: 700;
}
.btnCast {
  width: 240px;
  height: 60px;
}

</style>
       