<template>
  <div class="q-pa-md container-table-kard">
    <q-btn
      @click="toggleTable"
      :class="{ active: showTable }"
      class="today-plan-button q-mb-md gray"
      label="Запланировано"
    />
    <div
      v-if="showTable"
      class="q-gutter-md"
      style="display: flex; justify-content: center"
    >
      <q-card
        v-for="(row, index) in sortedRows"
        :key="index"
        flat
        bordered
        class="my-card-plan row"
        @mouseenter="handleRowMouseOver(row)"
        @mouseleave="handleRowMouseLeave"
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
        <q-btn
          v-if="isHovered && hoveredRow === row && isMobile"
          class="absolute-right delete-btn"
          flat
          color="secondary"
          @click="closeRow(row)"
          icon="delete_forever"
        ></q-btn>
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
          <q-btn
            v-if="isHovered && hoveredRow === row && !isMobile"
            class="absolute-right delete-btn"
            flat
            color="secondary"
            @click="closeRow(row)"
            icon="delete_forever"
          ></q-btn>
        </div>
      </q-card>
    </div>
  </div>
</template>
<style scoped></style>
<script>
import moment from "moment";
import axios from "axios";
import { useQuasar } from "quasar";

export default {
  data() {
    return {
      isMobile: false,
      isHovered: false,
      hoveredRow: null,
      showTable: true,
      //rows: [],  Здесь будут храниться данные из базы данных, убрать заполненный
      rows: [
        {
          Date: "2024-01-30",
          Time: "16:30",
          CarNumber: "B123BB456",
          CarType: "легковой",
          Stage: "ожидание",
        },
        {
          Date: "2023-11-30",
          Time: "10:00",
          CarNumber: "B789BB012",
          CarType: "газель",
          Stage: "в процессе",
        },
        {
          Date: "2024-01-30",
          Time: "12:15",
          CarNumber: "C123CC456",
          CarType: "грузовой+прицеп",
          Stage: "ожидание",
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
          Stage: "в процессе",
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
          return rowDate.isAfter(today, "day");
        })
        .sort((a, b) => {
          const dateTimeA = moment(`${a.Date} ${a.Time}`, "YYYY-MM-DD HH:mm");
          const dateTimeB = moment(`${b.Date} ${b.Time}`, "YYYY-MM-DD HH:mm");
          return dateTimeB - dateTimeA;
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
        this.fetchData();
      }
      this.showTable = !this.showTable;
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 700;
    },
    handleRowMouseOver(row) {
      this.isHovered = true;
      this.hoveredRow = row;
    },
    handleRowMouseLeave() {
      this.isHovered = false;
      this.hoveredRow = null;
    },
    closeRow(row) {
      const stage = row;
      console.log(`Нажатие на этап: ${row}`);
      this.$q
        .dialog({
          dark: false,
          title: "Хотите отменить заказ?",
          message: "После отмены вернуть заказ будет невозможно",
          cancel: true,
          persistent: true,
          ok: {
            color: "secondary",
            label: "Да",
          },
          cancel: {
            label: "Отмена",
          },
        })
        .onOk(() => {
          console.log("OK");
          // Ваш код для обработки нажатия OK
        })
        .onCancel(() => {
          // Ваш код для обработки нажатия Cancel
        })
        .onDismiss(() => {
          // Ваш код для обработки закрытия диалога
        });
    },
  },
  mounted() {
    this.isMobile = window.innerWidth <= 700;
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>
