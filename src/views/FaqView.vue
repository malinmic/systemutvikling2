<template>
    <v-container>
        <v-row>
            <v-col>
                <HeaderComponent text="Ofte stilte spørsmål" />
                <v-expansion-panels>
                    <v-expansion-panel
                        v-for="entry in entries"
                        :key="entry.question"
                        :title="entry.question"
                        :text="entry.answer"
                    ></v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue"
const entries = [
    {
        question: "Fungerer det?",
        answer: "Ja bro.",
    },
]
</script>
