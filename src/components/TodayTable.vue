<template>
  <div class="q-pa-md container">
    <q-btn
      @click="toggleTable"
      :class="{ active: showTable }"
      class="archive-button q-mb-md"
      label="Сегодня"
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

<style>
.container {
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
</style>

<script>
import moment from "moment";
import axios from "axios";

export default {
  data() {
    return {
      showTable: true,
      //rows: [],  Здесь будут храниться данные из базы данны, убрать заполненный
      rows: [
        {
          Date: "2023-11-30",
          Time: "16:30",
          CarNumber: "E111EE111",
          CarType: "легковой",
          Stage: "выполнено",
        },
        {
          Date: "2023-11-30",
          Time: "19:00",
          CarNumber: "E222EE222",
          CarType: "газель",
          Stage: "выполнено",
        },
        {
          Date: "2023-11-30",
          Time: "14:45",
          CarNumber: "E333EE333",
          CarType: "грузовой",
          Stage: "выполнено",
        },
        {
          Date: "2023-11-30",
          Time: "14:55",
          CarNumber: "E444EE444",
          CarType: "грузовой+прицеп",
          Stage: "выполнено",
        },
      ],
      columns: [
        {
          name: "Time",
          required: true,
          label: "Время",
          align: "left",
          field: "Time",
          format: (val) => {
            if (val.match(/\d{2}:\d{2}/)) {
              return val.match(/\d{2}:\d{2}/)[0];
            }
            return "Invalid Time";
          },
          sortable: true,
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
      return this.rows
        .filter((row) => {
          const today = moment().startOf("day");
          const rowDate = moment(row.Date, "YYYY-MM-DD");
          return rowDate.isSame(today, "day");
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
