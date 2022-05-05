<template>
    <v-container class="w-100">
        <HeaderComponent text="Mine annonser" />
        <v-row>
            <v-container>
                <PersonalListingsComponent />
            </v-container>
        </v-row>
    </v-container>
</template>
<script>
import PersonalListingsComponent from "../components/listing/PersonalListingsComponent"
export default {
    components: { PersonalListingsComponent },
}
</script>
