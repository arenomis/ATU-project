<template>
  <div>
    <ArchiveTable />
    <TodayTable />
    <PlannedTable />
  </div>
</template>

<script>
import ArchiveTable from "../components/ArchiveTable.vue";
import TodayTable from "../components/TodayTable.vue";
import PlannedTable from "../components/PlannedTable.vue";

export default {
  components: {
    ArchiveTable,
    TodayTable,
    PlannedTable,
  },
};
</script>
<style>
.q-table .q-td:hover {
  color: #d8315b;
}
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
    width: 90vw;
  }
  .archive-button.active {
    border-radius: 4px;
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
