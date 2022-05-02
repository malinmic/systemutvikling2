<template>
    <v-container>
        <HeaderComponent text="Registrer ny bruker" />
        <v-row>
            <v-col>
                <create-user-component />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import CreateUserComponent from "@/components/user/CreateUserComponent.vue"
import HeaderComponent from "@/components/HeaderComponent.vue"

export default defineComponent({
    name: "CreateUserView",

    components: {
        CreateUserComponent,
        HeaderComponent,
    },
})
</script>
