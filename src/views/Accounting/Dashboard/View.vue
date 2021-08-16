<template>
    <div>
        <CCard>
            <CCardHeader>
                Dashboard
                <div>
                    
                </div>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol lg="6">
                        <table class="customize-table">
                            <tr>
                                <th><div style="display:flex; justify-content: space-between;"><div class="text-right">BANK ACCOUNTS</div><div class="text-right"><CBadge color="secondary"> Balance</CBadge></div></div></th>
                            </tr>
                            <tr>
                                <td><div style="display:flex; justify-content: space-between;"><div class="text-right">Cash and cash equivalents</div><div class="text-right"><CBadge color="secondary"> ₱0</CBadge></div></div></td>
                            </tr>
                            <tr>
                                <td><div style="display:flex; justify-content: space-between;"><div class="text-right">Credit Card</div><div class="text-right"><CBadge color="secondary"> ₱0</CBadge></div></div></td>
                            </tr>
                        </table>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    </div>
</template>
<script>
export default {
    
}
</script>