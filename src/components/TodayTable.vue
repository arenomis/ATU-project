<template>
  <div class="q-pa-md container">
    <q-btn
      @click="toggleTable"
      :class="{ active: showTable }"
      class="archive-button q-mb-md"
      label="Сегодня"
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
        },
        {
          Time: "09.11.2023 19:00",
          CarNumber: "E222EE222",
          CarType: "газель",
          Stage: "выполнено",
        },
        {
          Time: "09.11.2023 14:45",
          CarNumber: "E333EE333",
          CarType: "грузовой",
          Stage: "выполнено",
        },
        {
          Time: "09.11.2023 14:55",
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
      return [...this.rows].sort((a, b) => {
        const dateA = this.convertToDateObject(a.Time);
        const dateB = this.convertToDateObject(b.Time);

        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;

        const timeA = this.convertToTimeObject(a.Time);
        const timeB = this.convertToTimeObject(b.Time);

        if (timeA < timeB) return -1;
        if (timeA > timeB) return 1;

        return 0;
      });
    },
  },
  methods: {
    toggleTable() {
      this.showTable = !this.showTable;
    },
    convertToDateObject(dateTime) {
      const [datePart, timePart] = dateTime.split(" ");
      const [day, month, year] = datePart.split(".");
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      return new Date(`${formattedDate}T${timePart}`);
    },
    convertToTimeObject(dateTime) {
      const [datePart, timePart] = dateTime.split(" ");
      return timePart;
    },
  },
};
</script>
