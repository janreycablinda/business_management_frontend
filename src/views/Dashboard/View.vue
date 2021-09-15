<template>
  <div>
    <CRow>
        <CCol col="12" sm="6" lg="4">
            <CWidgetIcon
            header="₱0"
            text="Sales"
            color="gradient-primary"
            :icon-padding="false"
            >
            <img src="/img/icons/philippines-peso-currency-symbol.svg" name="cil-settings" width="24"/>
            </CWidgetIcon>
        </CCol>
        <CCol col="12" sm="6" lg="4">
            <CWidgetIcon
            header="₱0"
            text="Cash Collected"
            color="gradient-primary"
            :icon-padding="false"
            >
            <img src="/img/icons/cash.svg" name="cil-settings" width="24"/>
            </CWidgetIcon>
        </CCol>
        <CCol col="12" sm="6" lg="4">
            <CWidgetIcon
            header="₱0"
            text="Expenses"
            color="gradient-primary"
            :icon-padding="false"
            >
            <img src="/img/icons/expenses.svg" name="cil-settings" width="24"/>
            </CWidgetIcon>
        </CCol>
    </CRow>
    <CRow>
        <CCol col="12" sm="12" lg="8">
            <BarChart/>
        </CCol>
        <CCol col="12" sm="12" lg="4">
            <CCard>
                <CCardHeader>
                    My To Do Items
                    <div class="card-header-actions">
                        <CLink
                        class="card-header-action btn-setting">
                            New To Do
                        </CLink>
                        |
                        <CLink
                        class="card-header-action btn-setting">
                            View All
                        </CLink>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <div class="text-warning bold">
                        <span><CIcon height="12" name="cil-warning"/> Latest to do's</span>
                    </div>
                    <small>No todos found</small>
                    <div class="text-success bold">
                        <span><CIcon height="12" name="cil-check-alt"/> Latest finished to do's</span>
                    </div>
                    <small>No finished todos found</small>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
  </div>
</template>

<script>
import BarChart from './BarChart'

export default {
  name: 'Dashboard',
  components: {
      BarChart
  }
}
</script>
