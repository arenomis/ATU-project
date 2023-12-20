<template>
  <div class="q-pa-md container-table-kard">
    <q-btn
      @click="toggleTable"
      :class="{ active: showTable }"
      class="today-plan-button q-mb-md"
      label="Сегодня"
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
        class="my-card row"
        :style="{
          backgroundColor: isCompleted(row.Stage) ? '#A3A3A5' : '',
        }"
        @mouseenter="handleRowMouseOver(row)"
        @mouseleave="handleRowMouseLeave"
      >
        <q-card-section>
          <div class="col">
            <div class="text-subtitle2 q-table__grid-item-title">Время:</div>
            <div>
              {{ row.Time }}
            </div>
            <div class="text-subtitle2 q-table__grid-item-title">
              Номер машины:
            </div>
            <div>
              {{ row.CarNumber }}
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

        <q-card-section>
          <div class="text-subtitle2 q-table__grid-item-title">Тип машины:</div>
          <div>
            {{ row.CarType }}
          </div>
          <div class="text-subtitle2 q-table__grid-item-title">Этап:</div>
          <div
            :style="{
              color: isCompleted(row.Stage) ? '#30e3ca' : '',
            }"
          >
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
      rows: [
        {
          Date: "2023-12-18",
          Time: "14:30",
          CarNumber: "E111EE111",
          CarType: "легковой",
          Stage: "Выполнено",
        },
        {
          Date: "2023-12-18",
          Time: "15:00",
          CarNumber: "E222EE222",
          CarType: "газель",
          Stage: "Ожидает",
        },
        {
          Date: "2023-12-18",
          Time: "14:45",
          CarNumber: "E333EE333",
          CarType: "грузовой",
          Stage: "Ожидает",
        },
        {
          Date: "2023-12-15",
          Time: "14:55",
          CarNumber: "E444EE444",
          CarType: "грузовой+прицеп",
          Stage: "Выполнено",
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
      this.isMobile = window.innerWidth <= 600;
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
    handleStageClick(row) {
      const stage = row;
      console.log(`Нажатие на этап: ${row}`);
      // Ваш код для обработки нажатия на этап
    },
    isCompleted(stage) {
      return stage === "Выполнено";
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
