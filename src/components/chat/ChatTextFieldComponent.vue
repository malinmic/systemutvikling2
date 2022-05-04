<template>
    <form @submit.prevent="sendMessage">
        <div class="d-flex">
            <input
                v-model="message"
                type="text"
                class="input w-100 text-secondary border pl-2"
                height="40"
                placeholder="Aa"
            />

            <v-btn
                class="text-primary-c ml-2"
                type="submit"
                height="40"
                width="55"
                rounded="lg"
                color="primary"
                icon="mdi-send"
            >
            </v-btn>
        </div>
    </form>
</template>

<script setup>
import { defineProps, ref } from "vue"
import { useStore } from "vuex"

const props = defineProps({
    sendMessageCallback: Function,
})

const store = useStore()

const message = ref("")

const sendMessage = () => {
    props.sendMessageCallback(message.value).then(() => {
        message.value = ""
    })
}
</script>

<style scoped>
.input {
    height: 40px;
    border-radius: 12px;
}
</style>
