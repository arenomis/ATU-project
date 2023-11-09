<template>
  <div style="width:80vh; height:100%; display: block; text-align: center; margin-left: auto; margin-right: auto; margin-top: 20px;">
    <button @click="toggleTable" :class="{'active': showTable}" class="archive-button">
      Сегодня
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
  border-radius: 4px;
}
.archive-button.active {
  border-bottom-left-radius: 0; /* Убираем нижнее скругление */
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
  Time: "09.11.2023 16:30",
  CarNumber: "E111EE111",
  CarType: "легковой",
  Stage: "выполнено",
  index: 1
},
{
  Time: "09.11.2023 10:00",
  CarNumber: "E222EE222",
  CarType: "газель",
  Stage: "выполнено",
  index: 2
},
{
  Time: "09.11.2023 14:45",
  CarNumber: "E333EE333",
  CarType: "грузовой",
  Stage: "выполнено",
  index: 3
},
{
  Time: "09.11.2023 12:15",
  CarNumber: "E444EE444",
  CarType: "грузовой+прицеп",
  Stage: "выполнено",
  index: 4
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
          format: (val) => {
            // Проверим, содержит ли значение время
            if (val.match(/\d{2}:\d{2}/)) {
              return val.match(/\d{2}:\d{2}/)[0];
            }
            return 'Invalid Time';
          },
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