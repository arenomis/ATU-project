<template>
  <div class="q-pa-md container-table-kard">
    <q-btn
      @click="toggleTable"
      :class="{ active: showTable }"
      class="today-plan-button q-mb-md"
      label="В работе"
    />

    <div
      v-if="showTable"
      class="q-gutter-md"
      style="display: flex; justify-content: center"
    >
      <q-card
        v-for="(row, index) in filteredRows"
        :key="index"
        flat
        bordered
        class="my-card-plan row"
        style="cursor: pointer"
        @click="toggleStatusSelection(row)"
      >
        <q-card-section :horizontal="!isMobile">
          <div class="col section-time-date">
            <div class="text-subtitle2 q-table__grid-item-title">Дата:</div>
            <div>
              {{ row.Date }}
            </div>

            <div class="text-subtitle2 q-table__grid-item-title">Время:</div>
            <div>
              {{ row.Time }}
            </div>
          </div>
        </q-card-section>

        <q-separator v-if="!isMobile" vertical />
        <div>
          <q-card-section>
            <div class="col">
              <div class="text-subtitle2 q-table__grid-item-title">
                Номер машины:
              </div>
              <div>
                {{ row.CarNumber }}
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            <div class="text-subtitle2 q-table__grid-item-title">
              Тип машины:
            </div>
            <div>
              {{ row.CarType }}
            </div>
            <div class="text-subtitle2 q-table__grid-item-title">Этап:</div>
            <div>
              {{ row.Stage }}
            </div>
          </q-card-section>
        </div>
        <div
          class="worker-section"
          v-if="isSelectedRow(row)"
          @click.stop
          style="background: white"
        >
          <q-select
            v-model="selectedStatus"
            :options="statusOptions"
            label="Выберите новый статус"
            outlined
            dense
            @input="changeStatus(row, $event)"
          />
          <q-btn @click="changeStatus(row)" label="Применить" />
        </div>
      </q-card>
    </div>
    <!---------------------------------------------------------------------------------->
    <q-btn
      @click="toggleTable"
      :class="{ active: showTable }"
      class="today-plan-button q-mb-md"
      label="Ожидает"
      style="margin-top: 2vh"
    />
    <div
      v-if="showTable"
      class="q-gutter-md"
      style="display: flex; justify-content: center"
    >
      <q-card
        v-for="(row, index) in filteredRows2"
        :key="index"
        flat
        bordered
        class="my-card-plan row"
        style="cursor: pointer"
        @click="toggleStatusSelection(row)"
      >
        <q-card-section :horizontal="!isMobile">
          <div class="col section-time-date">
            <div class="text-subtitle2 q-table__grid-item-title">Дата:</div>
            <div>
              {{ row.Date }}
            </div>

            <div class="text-subtitle2 q-table__grid-item-title">Время:</div>
            <div>
              {{ row.Time }}
            </div>
          </div>
        </q-card-section>

        <q-separator v-if="!isMobile" vertical />
        <div>
          <q-card-section>
            <div class="col">
              <div class="text-subtitle2 q-table__grid-item-title">
                Номер машины:
              </div>
              <div>
                {{ row.CarNumber }}
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            <div class="text-subtitle2 q-table__grid-item-title">
              Тип машины:
            </div>
            <div>
              {{ row.CarType }}
            </div>
            <div class="text-subtitle2 q-table__grid-item-title">Этап:</div>
            <div>
              {{ row.Stage }}
            </div>
            <div
              class="worker-section"
              v-if="isSelectedRow(row)"
              @click.stop
              style="background: white"
            >
              <q-select
                v-model="selectedStatus"
                :options="statusOptions"
                label="Выберите новый статус"
                outlined
                dense
                @input="changeStatus(row, $event)"
              />
              <q-btn @click="changeStatus(row)" label="Применить" />
            </div>
          </q-card-section>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  data() {
    return {
      isMobile: false,
      isHovered: false,
      hoveredRow: null,
      showTable: true,
      selectedRow: null,
      selectedStatus: null,
      statusOptions: ["Выполнено", "В работе", "Отменить"],

      rows: [
        {
          Date: "2024-01-08",
          Time: "14:30",
          CarNumber: "E111EE111",
          CarType: "легковой",
          Stage: "Выполнено",
        },
        {
          Date: "2024-01-08",
          Time: "15:00",
          CarNumber: "E222EE222",
          CarType: "газель",
          Stage: "В работе",
        },
        {
          Date: "2024-01-08",
          Time: "17:45",
          CarNumber: "E333EE333",
          CarType: "грузовой",
          Stage: "Ожидает",
        },
        {
          Date: "2024-01-08",
          Time: "14:45",
          CarNumber: "E343EE344",
          CarType: "грузовой",
          Stage: "Ожидает",
        },
        {
          Date: "2024-01-08",
          Time: "14:55",
          CarNumber: "E444EE444",
          CarType: "грузовой+прицеп",
          Stage: "В работе",
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
          return dateTimeB - dateTimeA;
        });
    },
    filteredRows() {
      const filtered = this.sortedRows.filter((row) =>
        this.isCompleted(row.Stage)
      );
      return filtered;
    },
    filteredRows2() {
      const filtered = this.sortedRows.filter((row) =>
        this.isCompleted2(row.Stage)
      );
      return filtered;
    },
  },
  methods: {
    toggleTable() {
      this.showTable = !this.showTable;
    },
    async fetchData() {
      try {
        const response = await axios.get("**_сервер/путь_к_API");
        this.rows = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    toggleRow(row) {
      if (this.selectedRow === row) {
        this.selectedRow = null;
      } else {
        this.selectedRow = row;
        this.selectedStatus = row.Stage;
      }
    },
    toggleStatusSelection(row) {
      if (this.selectedRow === row) {
        this.selectedRow = null;
      } else {
        this.selectedRow = row;
        this.selectedStatus = row.Stage;
      }
    },

    isSelectedRow(row) {
      return this.selectedRow === row;
    },
    changeStatus(row) {
      try {
        if (this.selectedStatus) {
          const index = this.rows.findIndex((r) => r === row);

          if (index !== -1) {
            this.rows[index].Stage = this.selectedStatus;
          }

          this.selectedRow = null;
        }
      } catch (error) {
        console.error("Error during changeStatus:", error);
      }
    },

    isCompleted(stage) {
      return stage.toLowerCase() === "в работе";
    },

    isCompleted2(stage) {
      return stage.toLowerCase() === "ожидает";
    },
  },
  mounted() {
    this.isMobile = window.innerWidth <= 600;
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>
