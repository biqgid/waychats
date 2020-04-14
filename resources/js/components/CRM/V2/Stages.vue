<template>
    <v-flex xs2 class="px-3">
        <v-card height="100%" flat>
            <v-card-title class="p-2 text-center">
                <h5 class="w-100 text-center stage-title">{{ stage.name }}</h5>
                <span class="body-1 w-100 text-center">{{ getCount }} сделок {{ getPrice }} сом</span>
            </v-card-title>

            <v-divider class="title-line" :style="{borderColor: stage.color}"></v-divider>

            <v-card-text class="p-0">
                <Transaction v-for="(transaction, index) in stage.transactions"
                             :key="index"
                             :transaction="transaction"></Transaction>
            </v-card-text>
        </v-card>
    </v-flex>
</template>

<script>
    import Transaction from './Transactions';

    export default {
        name: "Stages",
        props: ['stage'],
        components: { Transaction },

        computed: {

            /***
             * get transactions count
             */
            getCount() {
                if (this.stage.transactions && this.stage.transactions.length > 0)
                    return this.stage.transactions.length;
                else
                    return 0;
            },

            /***
             * get transactions price
             */
            getPrice() {
                if (this.stage.transactions && this.stage.transactions.length > 0) {
                    let result = 0;
                    for (let key in this.stage.transactions) {
                        if (this.stage.transactions[key].price !== "Договорная")
                            result += Number(this.stage.transactions[key].price);
                    }
                    return result;
                } else
                    return 0;
            }
        }
    }
</script>

<style scoped>
    .stage-title {
        color: #015a77;
    }
    .title-line {
        margin: 0;
        border-width: 1px;
    }
</style>
