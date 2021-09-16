<template>
    <CRow>
        <CCol lg="12">
            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol lg="5">
                            <v-date-picker v-model="form" color="red" is-range>
                                <template v-slot="{ inputValue, inputEvents }">
                                    <div class="flex justify-center items-center">
                                    <label style="position:absolute;">BEGINNING</label>
                                    <input
                                        :value="inputValue.start"
                                        v-on="inputEvents.start"
                                        class="border px-2 py-1 mt-4 w-32 rounded focus:outline-none focus:border-indigo-300"
                                    />
                                    <svg
                                        class="w-1 h-1 mx-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        style="width:30px;"
                                    >
                                        <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                    <label style="position:absolute;">ENDING</label>
                                    <input
                                        :value="inputValue.end"
                                        v-on="inputEvents.end"
                                        class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"
                                    />
                                    </div>
                                </template>
                            </v-date-picker>
                        </CCol>
                        <CCol lg="3">
                            <CButton @click="searchInventory" size="sm" style="margin-top:27px; margin-left:-20px;" color="primary">SEARCH</CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <table class="custom-table">
                        <tr>
                            <th width="30%">Item</th>
                            <th>Brand</th>
                            <th>Group</th>
                            <th>Unit</th>
                            <th>Unit cost</th>
                            <th>Stockin</th>
                            <th>Stockout</th>
                            <th>Stock On Hand</th>
                            <th>Stock Available</th>
                            <th>Selling Price</th>
                            <th>Total Selling Price</th>
                        </tr>
                        <template v-if="inventory != ''">
                            <tr v-for="inv in inventory" :key="inv.id">
                                <td>{{inv.item}}</td>
                                <td>{{inv.brand}}</td>
                                <td>{{inv.group.group_name}}</td>
                                <td>{{inv.unit}}</td>
                                <td>{{inv.unit_cost}}</td>
                                <td>
                                    <CLink
                                    v-c-tooltip="'Click to show stockin details'"
                                    @click="stockinModalData = new Date()"
                                    >
                                    {{countStockin(inv.stockin_temp)}}
                                    </CLink>
                                </td>
                                <td>
                                    <CLink
                                    v-c-tooltip="'Click to show stockout details'"
                                    @click="stockinModalData = new Date()"
                                    >
                                    {{countStockout(inv.stockout_temp)}}
                                    </CLink>
                                </td>
                                <td>{{countStockOnHand(inv)}}</td>
                                <td>{{inv.qty}}</td>
                                <td>₱{{inv.price}}</td>
                                <td>₱{{multiplySellingPrice(inv.qty, inv.price)}}</td>
                            </tr>
                        </template>
                        <template v-else>
                            <tr>
                                <td colspan="11" class="text-center">NO DATA FOUND</td>
                            </tr>
                        </template>
                    </table>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            form: {
                start: new Date(),
                end: new Date(),
            },
            stockinModalData: ''
        };
    },
    computed: {
        ...mapGetters({ 
            inventory: "inventory/inventory",
            stockout: "inventory/stockout"
        }),
    },
    methods: {
        searchInventory(){
            const params = {
                beginning: this.form.start.toLocaleDateString(),
                ending: this.form.end.toLocaleDateString(),
            };
            
            this.$store.dispatch('inventory/findInventory', params).then(() => {

            });
        },
        countStockin(data){
            let sum = 0;
            data.forEach(item => {
                sum += item.qty
            })
            return sum;
        },
        countStockout(data){
            let sum = 0;
            data.forEach(item => {
                sum += item.qty
            })
            return sum;
        },
        countStockOnHand(data){
            let sum = 0;
            if(this.stockout.length != 0){
                this.stockout.forEach(item => {
                    item.stockout_temps.forEach(temp => {
                        console.log(temp.item_id + ' ' + data.id);
                        if(temp.item_id == data.id){
                            sum += parseInt(temp.qty);
                        }
                    })
                });
                return sum + data.qty;
            }else{
                return sum + data.qty;
            }
        },
        multiplySellingPrice(qty, price){
            const totalSellingPrice = qty * price;
            return totalSellingPrice.toLocaleString()
        }
    },
    created(){
        this.$store.commit('inventory/SET_INVENTORY' , []);
    }
}
</script>