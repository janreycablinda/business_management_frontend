<template>
    <CRow>
        <CCol col="12">
            <CCard>
                <CCardBody>
                    <CRow>
                        <CCol sm="12" lg="6">
                            <label>Customer</label>
                            <v-select
                                :options="$options.multiselectOptions" 
                                placeholder="Select customer"
                                append-to-body
                                :calculate-position="withPopper"
                            />
                        </CCol>
                        <CCol lg="6">
                            <label><CIcon name="cil-tag"/>Tags</label>
                            <vue-tags-input
                                v-model="tag"
                                :tags="tags"
                                @tags-changed="newTags => tags = newTags"
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol sm="12" lg="6">
                            <hr>
                            <dl class="row">
                                <dt class="col-sm-6">Bill to</dt>
                                <dt class="col-sm-6">Ship to</dt>
                                <dd class="col-sm-6">
                                    <span>--</span>
                                </dd>
                                <dd class="col-sm-6">
                                    <span>--</span>
                                </dd>
                                <dd class="col-sm-6">
                                    <span>--, --</span>
                                </dd>
                                <dd class="col-sm-6">
                                    <span>--, --</span>
                                </dd>
                                <dd class="col-sm-6">
                                    <span>--, --</span>
                                </dd>
                                <dd class="col-sm-6">
                                    <span>--, --</span>
                                </dd>
                            </dl>
                            <label> Invoice Number
                                <CLink
                                v-c-tooltip="'If the invoice is saved as draft, the number wont be applied, instead, the next invoice number will be given when the invoice is sent to the customer or is marked as sent.'"
                                >
                                 <CIcon height="12" name="cil-info"/>
                                </CLink>
                                </label>
                            <CInput>
                                <template #prepend-content>INV-</template>
                            </CInput>
                            <CRow>
                                <CCol lg="6">
                                    <CInput
                                    type="date"
                                    label="Invoice Date"
                                    autocomplete="email"
                                    />
                                </CCol>
                                <CCol lg="6">
                                    <CInput
                                    type="date"
                                    label="Due Date"
                                    autocomplete="email"
                                    />
                                </CCol>
                            </CRow>
                        </CCol>
                        <CCol lg="6">
                            <label>Allowed payment modes for this invoice</label>
                            <CMultiSelect
                                :options="options"
                                :selected="[]"
                                search
                                searchPlaceholder="..."
                                selectionType="text"
                            >
                            </CMultiSelect>
                            <CRow>
                                <CCol lg="6">
                                    <CSelect
                                        label="Recurring Invoice"
                                        :options="['No', 'Every 1 month', 'Every 2 months']"
                                    />
                                </CCol>
                                <CCol lg="6">
                                    <CSelect
                                        label="Discount Type"
                                        :options="['No discount', 'Before Tax', 'After Tax']"
                                    />
                                </CCol>
                            </CRow>
                            <CTextarea
                                label="Admin Note"
                                
                                rows="5"
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>
        <CCol lg="12">
            <CCard>
                <CCardBody>
                    <CRow>
                        <CCol lg="4">
                            <v-select
                                :options="$options.multiselectOptions" 
                                placeholder="Select Item"
                                append-to-body
                                :calculate-position="withPopper"
                            >
                            <template #append>
                                <CButton color="primary">Go!</CButton>
                            </template>
                            </v-select>
                        </CCol>
                        <CCol lg="1">
                            <CInput
                            type="number"
                            placeholder="Qty"
                            />
                        </CCol>
                        <CCol lg="2">
                            <CButton color="primary">ADD ITEM</CButton>
                        </CCol>
                    </CRow>
                    <table class="custom-table mt-2">
                        <tr>
                            <th>Item</th>
                            <th>Description</th>
                            <th>Qty</th>
                            <th>Rate</th>
                            <th>Tax</th>
                            <th>Amount</th>
                            <th width="2%"><CIcon name="cil-cog"/></th>
                        </tr>
                        <tr>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                            <td>test</td>
                            <td><CButton size="sm" color="primary"><CIcon name="cil-pencil"/></CButton></td>
                        </tr>
                    </table>
                    <!-- <CRow class="mt-4">
                        <CCol lg="2">
                            <CTextarea
                                placeholder="Item"
                                rows="2"
                            />
                        </CCol>
                        <CCol lg="2">
                            <CTextarea
                                placeholder="Long description"
                                rows="2"
                            />
                        </CCol>
                        <CCol lg="1">
                            <CInput
                            type="number"
                            placeholder="Qty"
                            autocomplete="email"
                            />
                        </CCol>
                        <CCol lg="2">
                            <CInput
                            type="number"
                            placeholder="Rate"
                            autocomplete="email"
                            />
                        </CCol>
                        <CCol lg="2">
                            <CSelect
                                placeholder="Tax"
                                :options="['No discount', 'Before Tax', 'After Tax']"
                            />
                        </CCol>
                        <CCol lg="1">
                           <span>amount</span>
                        </CCol>
                        <CCol lg="2">
                           <CButton color="primary">ADD ITEM</CButton>
                        </CCol>
                    </CRow> -->
                    <!-- <ItemTable/> -->
                    <CRow align="right" class="mt-5">
                        <CCol lg="11">
                            Sub Total :
                        </CCol>
                        <CCol lg="1">
                            ₱0.00
                        </CCol>
                    </CRow>
                    <CRow align="right" class="mt-3">
                        <CCol lg="9">
                            Discount
                        </CCol>
                        <CCol lg="2">
                            <CInput
                            type="number"
                            autocomplete="email"
                            >
                            <template #append>
                                <CDropdown
                                togglerText="%"
                                color="primary"
                                right
                                >
                                    <CDropdownItem>%</CDropdownItem>
                                    <CDropdownItem>Fixed Amount</CDropdownItem>
                                </CDropdown>
                            </template>
                            </CInput>
                        </CCol>
                        <CCol lg="1">
                            ₱0.00
                        </CCol>
                    </CRow>
                    <CRow align="right">
                        <CCol lg="11">
                            <b>Total :</b>
                        </CCol>
                        <CCol lg="1">
                            <b>₱0.00</b>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>
        <CCol lg="12">
            <CCard>
                <CCardBody>
                    <CRow>
                        <CCol lg="12">
                            <CTextarea
                                label="Client Note"
                                rows="3"
                            />
                            <CTextarea
                                label="Terms & Conditions"
                                rows="3"
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>
        <CCol lg="12">
            <CCard>
                <CCardBody>
                    <CRow>
                        <CCol>
                            <CButton color="primary">SAVE</CButton>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script>
import vSelect from 'vue-select'
import { createPopper } from '@popperjs/core'
import VueTagsInput from '@johmun/vue-tags-input';

export default {
    components: {
        vSelect,
        VueTagsInput,
    },
    data(){
        return {
            placement: 'top',
            tag: '',
            tags: [],
            options: [
                {
                value: 0,
                text: 'enhancement'
                },
                {
                value: 1,
                text: 'bug',
                // selected: true
                },
            ],
            selected: []
        }
    },
    methods: {
        withPopper(dropdownList, component, { width }) {
        /**
         * We need to explicitly define the dropdown width since
         * it is usually inherited from the parent with CSS.
         */
        dropdownList.style.width = width

        /**
         * Here we position the dropdownList relative to the $refs.toggle Element.
         *
         * The 'offset' modifier aligns the dropdown so that the $refs.toggle and
         * the dropdownList overlap by 1 pixel.
         *
         * The 'toggleClass' modifier adds a 'drop-up' class to the Vue Select
         * wrapper so that we can set some styles for when the dropdown is placed
         * above.
         */
        const popper = createPopper(component.$refs.toggle, dropdownList, {
            placement: this.placement,
            modifiers: [
            {
                name: 'offset',
                options: {
                offset: [0, -1],
                },
            },
            {
                name: 'toggleClass',
                enabled: true,
                phase: 'write',
                fn({ state }) {
                component.$el.classList.toggle(
                    'drop-up',
                    state.placement === 'top'
                )
                },
            },
            ],
        })

        /**
         * To prevent memory leaks Popper needs to be destroyed.
         * If you return function, it will be called just before dropdown is removed from DOM.
         */
        return () => popper.destroy()
        },
    },
    multiselectOptions: [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AS', label: 'American Samoa', $isDisabled: true },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'DC', label: 'District Of Columbia' },
    { value: 'FM', label: 'Federated States Of Micronesia' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'GU', label: 'Guam' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
  ]
}
</script>
<style>
.custom-table {
    width:100%;
}
.custom-table th{
    background:#415164;
    color:#fff;
    padding:8px 15px;
}
.custom-table td{
    padding:8px 15px;
}
</style>