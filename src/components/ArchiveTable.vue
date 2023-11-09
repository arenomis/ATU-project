<template>
  <div style="width:80vh; height:100%; display: block; text-align: center; margin-left: auto; margin-right: auto; margin-top: 20px;" >
    <button @click="toggleTable" :class="{'active': showTable}" class="archive-button">
        Архив
    </button>
    <q-table
      v-if="showTable"
      :rows="rows"
      :columns="columns"
      row-key="index"
      style="border-top-left-radius: 0; border-top-right-radius: 0;"
      hide-bottom
      virtual-scroll
    />
  </div>
</template>

<style>
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
  border-radius: 4px;
}
.archive-button.active {
  border-bottom-left-radius: 0; 
  border-bottom-right-radius: 0;
}
</style>

<script>
import { ref, onMounted } from 'vue';

export default {
  data() {
    return {
      showTable: true,
      rows: [
        {
          Time: '27.10.2023 16:30',
          CarNumber: 'B123BB456',
          CarType: 'легковой',
          Stage: 'ожидание',
          index: 1
        },
        {
          Time: '28.11.2023 10:00',
          CarNumber: 'B789BB012',
          CarType: 'газель',
          Stage: 'в процессе',
          index: 2
        },
        {
          Time: '29.12.2023 14:45',
          CarNumber: 'B456BB789',
          CarType: 'грузовой',
          Stage: 'выполнено',
          index: 3
        },
        {
          Time: '30.01.2024 12:15',
          CarNumber: 'C123CC456',
          CarType: 'грузовой+прицеп',
          Stage: 'ожидание',
          index: 4
        },
        {
          Time: '22.02.2024 09:30',
          CarNumber: 'C789CC012',
          CarType: 'автобус ',
          Stage: 'в процессе',
          index: 5
        },
        {
          Time: '01.03.2024 16:00',
          CarNumber: 'C456CC789',
          CarType: 'автобус+салон',
          Stage: 'в процессе',
          index: 6
        },
        {
          Time: '01.04.2024 08:30',
          CarNumber: 'D123DD456',
          CarType: 'техника',
          Stage: 'ожидание',
          index: 7
        },
      ],
      columns: [
        {
          name: 'index',
          label: '',
          field: 'index',
          sortable: false
        },
        {
          name: 'Time',
          required: true,
          label: 'Время',
          align: 'left',
          field: 'Time',
          
          sortable: true
        },
        {
          name: 'CarNumber',
          label: 'Номер машины',
          align: 'left',
          field: 'CarNumber',
          sortable: false
        },
        {
          name: 'CarType',
          label: 'Тип машины',
          align: 'left',
          field: 'CarType',
          sortable: false
        },
        {
          name: 'Stage',
          label: 'Этап',
          align: 'left',
          field: 'Stage',
          sortable: false
        },
      ],
    };
  },
  methods: {
    toggleTable() {
      this.showTable = !this.showTable;
    },
  },
  mounted() {
    this.rows.sort((a, b) => {
      const getDateFromString = (str) => {
        const [datePart, timePart] = str.split(' ');
        const [day, month, year] = datePart.split('.');
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        return new Date(`${formattedDate}T${timePart}`);
      };

      const dateA = getDateFromString(a.Time);
      const dateB = getDateFromString(b.Time);

      return dateA.getTime() - dateB.getTime();
    });
  },
};
</script>