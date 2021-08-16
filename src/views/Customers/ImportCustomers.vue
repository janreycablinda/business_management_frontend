<template>
    <div>
        <CCard>
            <CCardHeader>
                <CButton color="primary">DOWNLOAD SAMPLE</CButton>
            </CCardHeader>
            <CCardBody>
                <small>1. Your CSV data should be in the format below. The first line of your CSV file should be the column headers as in the table example. Also make sure that your file is UTF-8 to avoid unnecessary encoding problems.</small><br>
                <small>2. If the column you are trying to import is date make sure that is formatted in format Y-m-d (2021-08-05).</small><br>
                <small class="text-danger">3. Duplicate email rows won't be imported.</small>

                <SampleTable/>
                <CForm>
                    <CRow>
                        <CCol lg="3">
                            <CInputFile
                                label="Choose CSV File"
                            />
                        </CCol>
                    </CRow>
                </CForm>
            </CCardBody>
            <CCardFooter>
                <CButton color="primary">SAVE</CButton>
            </CCardFooter>
        </CCard>
    </div>
</template>
<script>
import SampleTable from './SampleTable';
export default {
    components: {
        SampleTable
    }
}
</script>