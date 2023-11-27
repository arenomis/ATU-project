<template>
  <div class="q-pa-md container">
    <q-btn
      @click="toggleTable"
      :class="{ active: showTable }"
      class="archive-button q-mb-md"
      label="Запланировано"
    />
    <q-table
      v-if="showTable"
      :rows="sortedRows"
      :columns="columns"
      row-key="index"
      style="border-top-left-radius: 0; border-top-right-radius: 0"
      hide-bottom
      :rows-per-page="rows.length"
      class="q-mt-md"
      :rows-per-page-options="[0]"
      :mobile-cols="1" 
    />
  </div>
</template>

<style>
.container{
  width: 80vh;
  display: block;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}

.q-mb-md {
  margin-bottom: var(--q-space-md);
}

.q-mt-md {
  margin-top: var(--q-space-md);
}

.archive-button.active {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media only screen and (max-width: 600px) {
  .container {
    width: 100vw;
  }
  .archive-button {
    background-color: white;
    color: black;
    border: none;
    width: 100%;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
  }
}
</style>
<script>
import moment from "moment";

export default {
  data() {
    return {
      showTable: true,
      rows: [
        {
          Date: "27.11.2023",
          Time: "16:30",
          CarNumber: "B123BB456",
          CarType: "легковой",
          Stage: "ожидание",
        },
        {
          Date: "30.11.2023",
          Time: "10:00",
          CarNumber: "B789BB012",
          CarType: "газель",
          Stage: "в процессе",
        },
        {
          Date: "30.01.2024",
          Time: "12:15",
          CarNumber: "C123CC456",
          CarType: "грузовой+прицеп",
          Stage: "ожидание",
        },
        {
          Date: "29.12.2022",
          Time: "14:45",
          CarNumber: "B456BB789",
          CarType: "грузовой",
          Stage: "выполнено",
        },
        
        {
          Date: "30.01.2024",
          Time: "19:30",
          CarNumber: "C789CC012",
          CarType: "автобус ",
          Stage: "в процессе",
        },
      ],
      columns: [
        {
          name: "Date",
          label: "Дата",
          align: "left",
          field: "Date",
          sortable: false,
        },
        {
          name: "Time",
          label: "Время",
          align: "left",
          field: "Time",
          sortable: false,
        },
        {
          name: "CarNumber",
          label: "Номер машины",
          align: "left",
          field: "CarNumber",
          sortable: false,
        },
        {
          name: "CarType",
          label: "Тип машины",
          align: "left",
          field: "CarType",
          sortable: false,
        },
        {
          name: "Stage",
          label: "Этап",
          align: "left",
          field: "Stage",
          sortable: false,
        },
      ],
    };
  },
  computed: {
    sortedRows() {
      return [...this.rows].sort((a, b) => {
        const dateTimeA = moment(`${a.Date} ${a.Time}`, "DD.MM.YYYY HH:mm");
        const dateTimeB = moment(`${b.Date} ${b.Time}`, "DD.MM.YYYY HH:mm");
        return dateTimeA - dateTimeB;
      });
    },
  },
  methods: {
    toggleTable() {
      this.showTable = !this.showTable;
    },
  },
  
};
</script>
