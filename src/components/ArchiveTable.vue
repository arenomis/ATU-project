<template>
  <div class="q-pa-md container-table-kard">
    <q-btn
      @click="toggleTable"
      :class="{ active: showTable }"
      class="archive-button q-mb-md"
      label="Архив"
    />
    <!--для соеденения с беком :rows="filteredRow"-->
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

<script>
import moment from "moment";
import axios from "axios";

export default {
  data() {
    return {
      showTable: false,
      //rows: [],  Здесь будут храниться данные из базы данных, убрать заполненный
      rows: [
        {
          Date: "2022-11-30",
          Time: "16:30",
          CarNumber: "B123BB456",
          CarType: "легковой",
          Stage: "выполнено",
        },
        {
          Date: "2023-11-15",
          Time: "10:00",
          CarNumber: "B789BB012",
          CarType: "газель",
          Stage: "выполнено",
        },
        {
          Date: "2024-01-30",
          Time: "12:15",
          CarNumber: "C123CC456",
          CarType: "грузовой+прицеп",
          Stage: "выполнено",
        },
        {
          Date: "2022-12-29",
          Time: "14:45",
          CarNumber: "B456BB789",
          CarType: "грузовой",
          Stage: "выполнено",
        },
        {
          Date: "2024-01-30",
          Time: "19:30",
          CarNumber: "C789CC012",
          CarType: "автобус",
          Stage: "выполнено",
        },
      ],
      columns: [
        {
          name: "Date",
          required: true,
          label: "Дата",
          align: "left",
          field: "Date",
          format: (val) => {
            return moment(val).format("DD.MM.YYYY");
          },
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
      ],
    };
  },
  computed: {
    sortedRows() {
      return this.rows
        .filter((row) => {
          const today = moment().startOf("day");
          const rowDate = moment(row.Date, "YYYY-MM-DD");
          return rowDate.isBefore(today, "day");
        })
        .sort((a, b) => {
          const dateTimeA = moment(`${a.Date} ${a.Time}`, "YYYY-MM-DD HH:mm");
          const dateTimeB = moment(`${b.Date} ${b.Time}`, "YYYY-MM-DD HH:mm");
          return dateTimeA - dateTimeB;
        });
    },
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get("**_сервер/путь_к_API");
        this.rows = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    toggleTable() {
      if (this.showTable) {
        this.fetchData(); // Загрузка данных при первом отображении таблицы
      }
      this.showTable = !this.showTable;
    },
  },
};
</script>
