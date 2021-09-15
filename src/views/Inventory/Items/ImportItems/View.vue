<template>
    <CRow>
        <CCol col="12">
            <CCard>
                <CCardHeader>
                    <CButton @click="exportExcel" size="sm" color="primary" class="ml-1">DOWNLOAD SAMPLE</CButton>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol lg="12">
                            <ul class="no-bullets">
                                <li>
                                    1. Your CSV data should be in the format below. The first line of your CSV file should be the column headers as in the table example. Also make sure that your file is UTF-8 to avoid unnecessary <b>encoding problems</b>
                                </li>
                                <li>
                                    2. Make sure no <b>formula in every column.</b>
                                </li>
                                <li class="text-danger">
                                    3. Duplicate email rows won't be imported.
                                </li>
                            </ul>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <table class="custom-table mt-3">
                                <tr>
                                    <th>Item</th>
                                    <th>Description</th>
                                    <th>Brand</th>
                                    <th>Unit</th>
                                    <th>Price</th>
                                    <th>Unit Cost</th>
                                    <th>Qty</th>
                                    <th>Notifier</th>
                                    <th>Group ID</th>
                                    <th>User ID</th>
                                </tr>
                                <tr>
                                    <td>Sample Data</td>
                                    <td>Sample Data</td>
                                    <td>Sample Data</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td>0
                                        <CLink
                                        v-c-tooltip="'Check Group ID here for the group column entry'"
                                        @click="groupModalData = new Date()"
                                        >
                                        <CIcon height="12" name="cil-info"/>
                                        </CLink>
                                    </td>
                                    <td>{{this.$store.getters['auth/user'].id}}
                                        <CLink
                                        v-c-tooltip="'Dont change this to avoid error!'"
                                        >
                                        <CIcon height="12" name="cil-info"/>
                                        </CLink>
                                    </td>
                                </tr>
                            </table>
                        </CCol>
                    </CRow>
                    <CRow class="mt-3">
                        <CCol lg="4">
                            <label>Choose CSV File *</label>
                            <CInputFile
                                horizontal
                                :placeholder="UploadCSV"
                                style="width:100%; margin-left:0px; border-radius:5px; border:1px solid #787883;"
                                class="py-2"
                                @change="UploadCSVFile"
                            />
                        </CCol>
                    </CRow>
                    <CRow class="mt-3">
                        <CCol lg="3">
                            <CButton id="btn-import-data" @click="submitImport" color="primary">IMPORT</CButton>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>
        <GroupModal
        :groupModalData="groupModalData"
        />
        <export-excel color="info"
            class = "btn btn-info btn-sm invisible"
            :data = "json_data"
            :fields = "json_fields"
            worksheet = "My Worksheet"
            type = "csv"
            name = "sample_import_file.csv"
            ref="export-excel"
        />
    </CRow>
</template>
<script>
import GroupModal from './GroupModal';

export default {
    data(){
        return {
            groupModalData: '',
            UploadCSV: 'No file chosen',
            import_file: '',
            json_fields: {
                    'Item': 'item',
                    'Description': 'description',
                    'Brand': 'brand',
                    'Unit': 'unit',
                    'Price': 'price',
                    'Unit Cost': 'unit_cost',
                    'Qty': 'qty',
                    'Notifier': 'notifier',
                    'Group ID': 'group_id',
                    'User ID': 'user_id',
                },
                json_data: [
                    {
                        'item': 'Sample Data',
                        'description': 'Sample Data',
                        'brand': 'Sample Data',
                        'unit': 'Sample Data',
                        'price': 0,
                        'unit_cost': 0,
                        'qty': 0,
                        'notifier': 0,
                        'group_id': 0,
                        'user_id': this.$store.getters['auth/user'].id,
                    }
                ],
                json_meta: [
                    [
                        {
                            'key': 'charset',
                            'value': 'utf-8'
                        }
                    ]
                ],
            }
    },
    components: {
        GroupModal
    },
    methods: {
        exportExcel(){
            this.$refs['export-excel'].generate();
        },
        UploadCSVFile(files){
            this.import_file = files[0];
            this.UploadCSV = files[0].name;
        },
        submitImport(){
            let formData = new FormData();
            formData.append('import_file', this.import_file);
            const config = {
                    headers: { 'content-type': 'multipart/form-data' }
            }
            const params = {
                config: config,
                formData: formData
            }
            this.$root.btn_load(true, 'btn-import-data', 'IMPORT');
            this.$store.dispatch('import_item/importItem' ,params).then(() => {
                this.$root.btn_load(false, 'btn-import-data', 'IMPORT');
            });
        }
    }
}
</script>