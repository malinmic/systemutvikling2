<template>
    <div class="v-alert-container" v-if="alerts.length > 0">
        <v-alert
            v-for="alert in alerts"
            :key="alert"
            :type="alert.type"
            class="v-alert"
            :title="alert.title"
        >
            {{ alert.message }}</v-alert
        >
    </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex"
import { onMounted, ref } from "vue"

const store = useStore()

const alerts = ref([])

onMounted(() => {
    alerts.value = store.getters.alerts
})
</script>

<style scoped>
.v-alert-container {
    position: fixed;
    right: 50px;
    bottom: 50px;
    width: 80%;
    max-width: 900px;
    z-index: 9999;
    margin: 0 auto;
}

.v-alert {
    margin-bottom: 10px;
}
</style>
