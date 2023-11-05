<template>
  <div>
    <ArchiveTable />
    <TodayTable />
    <PlannedTable />
  </div>
</template>

<script>
import ArchiveTable from '../components/ArchiveTable.vue';
import TodayTable from '../components/TodayTable.vue'; 
import PlannedTable from '../components/PlannedTable.vue';

export default {
  components: {
    ArchiveTable,
    TodayTable,
    PlannedTable
  }
}
</script>
