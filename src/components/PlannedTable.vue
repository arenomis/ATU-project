<template>
  <div
    style="
      width: 80vh;
      height: 100%;
      display: block;
      text-align: center;
      margin-left: auto;
      margin-right: auto;
      margin-top: 20px;
    "
  >
    <button
      @click="toggleTable"
      :class="{ active: showTable }"
      class="archive-button"
    >
      Запланировано
    </button>
    <q-table
      v-if="showTable"
      :rows="filteredRows"
      :columns="columns"
      row-key="index"
      style="border-top-left-radius: 0; border-top-right-radius: 0"
      hide-bottom
      virtual-scroll
    >
      <template v-slot:body-cell="props">
        <q-td :props="props">
          <div v-if="props.col.name === 'date'">
            <button @click="toggleDetails(props.row.date)">
              {{ props.row.date }}
            </button>
          </div>
          <div
            v-if="selectedDate === props.row.date && props.col.name !== 'date'"
          >
            {{ props.row[props.col.name] }}
          </div>
        </q-td>
      </template>
    </q-table>
    <div v-if="selectedDate">
      <h2>{{ selectedDate }}</h2>
      <q-table
        :rows="infoRows"
        :columns="infoColumns"
        row-key="index"
        style="border-top-left-radius: 0; border-top-right-radius: 0"
        hide-bottom
        virtual-scroll
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: null,
      showTable: true,
      rows: [
        {
          Time: "27.10.2023 16:30",
          CarNumber: "B123BB456",
          CarType: "легковой",
          Stage: "ожидание",
          index: 1,
        },
        {
          Time: "28.11.2023 10:00",
          CarNumber: "B789BB012",
          CarType: "газель",
          Stage: "в процессе",
          index: 2,
        },
        {
          Time: "29.12.2023 14:45",
          CarNumber: "B456BB789",
          CarType: "грузовой",
          Stage: "выполнено",
          index: 3,
        },
        {
          Time: "27.10.2023 10:00",
          CarNumber: "B789BB012",
          CarType: "газель",
          Stage: "в процессе",
          index: 4,
        },
      ],
      columns: [
        {
          name: "date",
          label: "Дата",
          field: "date",
          sortable: true,
        },
        {
          name: "time",
          label: "Время",
          field: "time",
        },
        {
          name: "number",
          label: "Номер машины",
          field: "number",
        },
        {
          name: "type",
          label: "Тип машины",
          field: "type",
        },
        {
          name: "stage",
          label: "Этап",
          field: "stage",
        },
      ],
      infoColumns: [
        {
          name: "number",
          label: "Номер машины",
          align: "left",
          field: "number",
          sortable: false,
        },
        {
          name: "type",
          label: "Тип машины",
          align: "left",
          field: "type",
          sortable: false,
        },
        {
          name: "stage",
          label: "Этап",
          align: "left",
          field: "stage",
          sortable: false,
        },
      ],
    };
  },
  computed: {
    filteredRows() {
      return this.rows.map((row) => ({
        date: row.Time.split(" ")[0],
        time: row.Time.split(" ")[1],
        number: row.CarNumber,
        type: row.CarType,
        stage: row.Stage,
      }));
    },
    infoRows() {
      return this.rows
        .filter((row) => row.Time.split(" ")[0] === this.selectedDate)
        .map((row) => ({
          number: row.CarNumber,
          type: row.CarType,
          stage: row.Stage,
        }));
    },
  },
  methods: {
    toggleDetails(date) {
      // При нажатии на дату, показываем/скрываем данные
      this.selectedDate = this.selectedDate === date ? null : date;
    },
    toggleTable() {
      this.showTable = !this.showTable;
      this.selectedDate = null; // Скрыть информацию при переключении таблицы
    },
  },
};
</script>

<style>
.date-button {
  margin-right: 8px;
}
</style>
