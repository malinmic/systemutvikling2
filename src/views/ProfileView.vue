<template>
    <v-container>
        <UserCard />
    </v-container>
    <v-container>
        <PersonalListingsComponent />
    </v-container>
</template>
<script>
import UserCard from "../components/user/UserCardComponent"
import PersonalListingsComponent from "../components/listing/PersonalListingsComponent"
export default {
    components: { PersonalListingsComponent, UserCard },
}
</script>
