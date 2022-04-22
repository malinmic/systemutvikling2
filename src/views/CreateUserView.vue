<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h3 class="text-h3 text-center">Registrer Bruker</h3>
            </v-col>
            <v-col>
                <create-user-component />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue"

// Components
import CreateUserComponent from "@/components/CreateUserComponent.vue"

export default defineComponent({
    name: "CreateUserView",

    components: {
        CreateUserComponent,
    },
})
</script>
