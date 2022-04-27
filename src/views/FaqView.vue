<template>
    <v-container>
        <v-row>
            <v-col>
                <h3 class="text-h3 mb-5">Ofte stilte spørsmål</h3>
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
const entries = [
    {
        question: "Fungerer det?",
        answer: "Ja bro.",
    },
]
</script>
