<template>
    <v-container fluid>
        <v-row dense>
            <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
                <v-card color="#385F73" dark>
                    <v-card-title class="headline">Unlimited music now</v-card-title>

                    <v-card-subtitle>asdfasfdasdfListen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>

                    <v-card-actions>
                        <v-btn text dark @click="confirms">{{ $t('common.CONFIRM') }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data: () => ({
        cards: [{}, {}, {}],
    }),
    methods: {
        confirms() {
            console.log('confirm!');
        },
    },
};
</script>
