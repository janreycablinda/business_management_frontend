<script>
export default {
  name: 'nav',
  computed: {
    sidebarItems() {
      return [{
        _name: 'CSidebarNav',
        _children: [
          {
            _name: 'CSidebarNavItem',
            name: 'Dashboard',
            to: '/dashboard',
            icon: 'cil-speedometer',
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Customers',
            to: '/customers',
            icon: 'cil-group',
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Roles & Permissions',
            to: '/role_permission',
            icon: 'cil-shield-alt',
          },
          {
            _name: 'CSidebarNavDropdown',
            name: 'Sales',
            route: '/dropdown',
            icon: 'cil-money',
            items: [
              {
                name: 'Invoices',
                to: '/sales/invoices',
              },
              {
                name: 'Estimates',
                to: '/sales/estimates',
              },
              {
                name: 'Payments',
                to: '/sales/payments',
              },
              {
                name: 'Credit Notes',
                to: '/sales/credit_note',
              },
            ]
          },
          {
            _name: 'CSidebarNavDropdown',
            name: 'Inventory',
            route: '/dropdown',
            icon: 'cil-industry',
            items: [
              {
                name: 'Items',
                to: '/inventory/items',
              },
              {
                name: 'Stock In',
                to: '/inventory/stockin',
              },
              {
                name: 'Stock Out',
                to: '/inventory/stockout',
              },
              {
                name: 'Inventory',
                to: '/inventory',
              },
            ]
          },
          {
            _name: 'CSidebarNavDropdown',
            name: 'Accounting',
            route: '/dropdown',
            icon: 'cil-balance-scale',
            items: [
              {
                name: 'Dashboard',
                to: '/accounting/dashboard',
              },
              {
                name: 'Transaction',
                // to: '/dropdown/second',
              },
              {
                name: 'Transfer',
                // to: '/dropdown/second',
              },
              {
                name: 'Chart of Accounts',
                // to: '/dropdown/second',
              },
              {
                name: 'Reconcile',
                // to: '/dropdown/second',
              },
              {
                name: 'Reports',
                // to: '/dropdown/second',
              },
            ]
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Expenses',
            to: '/expenses',
            icon: 'cil-wallet',
          },
          {
            _name: 'CSidebarNavDropdown',
            name: 'Reports',
            route: '/dropdown',
            icon: 'cil-chart-line',
            items: [
              {
                name: 'Sales',
                to: '/report/sales',
              },
              {
                name: 'Expenses',
                // to: '/dropdown/second',
              },
              {
                name: 'Expenses vs Income',
                // to: '/dropdown/second',
              },
            ]
          },
          
        ]
      }]
    }
  }
}
</script>
