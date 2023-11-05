<template>
  <div style="width:80vh; height:100%; display: block; text-align: center; margin-left: auto; margin-right: auto; margin-top: 20px;">
    <button @click="toggleTable" class="archive-button">
      Сегодня
    </button>
    <q-table
      v-if="showTable"
      :rows="rows"
      :columns="columns"
      row-key="index"
    />
  </div>
</template>

<style>
/* Стили для кнопки "Архив" */
.archive-button {
  background-color: white;
  color: black;
  border: none;
  width: 100%;
  padding: 0;
  font-size: inherit;
  text-align: center;
  cursor: pointer;
  outline: none;
}
</style>

<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      showTable: true, // Исходно отображаем таблицу "Архив"
      rows: [
        {
          Time: '26.10.2023',
          CarNumber: 'A123AA456',
          CarType: 'легковая',
          Stage: 'выполнено',
          index: 1
        },
        {
          Time: '26.11.2023',
          CarNumber: 'A789AA012',
          CarType: 'грузовая',
          Stage: 'отменено',
          index: 2
        },
        {
          Time: '29.12.2023',
          CarNumber: 'A456AA789',
          CarType: 'Грузовая с прицепом',
          Stage: 'Начать',
          index: 3
        },
        // Добавьте дополнительные строки данных, если необходимо
      ],
      columns: [
        {
          name: 'index',
          label: '',
          field: 'index'
        },
        {
          name: 'Time',
          required: true,
          label: 'Время',
          align: 'left',
          field: 'Time',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'CarNumber',
          label: 'Номер машины',
          align: 'left',
          field: 'CarNumber',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'CarType',
          label: 'Тип машины',
          align: 'left',
          field: 'CarType',
          sortable: true
        },
        {
          name: 'Stage',
          label: 'Этап',
          align: 'left',
          field: 'Stage',
          sortable: true
        },
      ],
    };
  },
  methods: {
    toggleTable() {
      this.showTable = !this.showTable;
    },
  },
};
</script>