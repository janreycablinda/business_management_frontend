import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store";

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard/View')
const RolePermission = () => import('@/views/RolePermissions/View')
const Customers = () => import('@/views/Customers/View')
const NewCustomers = () => import('@/views/Customers/NewCustomers')
const ImportCustomers = () => import('@/views/Customers/ImportCustomers')
const CustomerProfile = () => import('@/views/Customers/CustomerProfile')
const Invoices = () => import('@/views/Sales/Invoices/View')
const CreateInvoice = () => import('@/views/Sales/Invoices/CreateInvoice')
const Estimates = () => import('@/views/Sales/Estimates/View')
const Payments = () => import('@/views/Sales/Payments/View')
const Credit_Note = () => import('@/views/Sales/Credit Notes/View')
const Expenses = () => import('@/views/Expenses/View')
const Accounting_Dashboard = () => import('@/views/Accounting/Dashboard/View')
const Login = () => import('@/views/Authentication/Login')
const Forgot = () => import('@/views/Authentication/Forgot')
const Profile = () => import('@/views/Profile/View')
const Items = () => import('@/views/Inventory/Items/View')


Vue.use(Router)

export default new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
            path: '',
            name: 'Dashboard',
            component: Dashboard,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Dashboard' }
              ]
            }
        }
      ]
    },
    {
      path: '/role_permission',
      component: TheContainer,
      children: [
        {
            path: '',
            name: 'RolePermission',
            component: RolePermission,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Role & Permissions' }
              ]
            }
        }
      ]
    },
    {
      path: '/customers',
      component: TheContainer,
      children: [
        {
            path: '',
            name: 'Customers',
            component: Customers,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Customers' }
              ]
            }
        },
        {
          path: '/customers/new-customer',
          name: 'New Customer',
          component: NewCustomers,
          beforeEnter: (to, from, next) => {
            if (!store.getters["auth/authenticated"]) {
              next({
                name: "Login"
              });
            }
            next();
          },
          meta: {
            breadcrumb: [
              { text: 'Customers', to: '/customers' },
              { text: 'New Customer' }
            ]
          }
        },
        {
          path: '/customers/import-customers',
          name: 'Import Customers',
          component: ImportCustomers,
          beforeEnter: (to, from, next) => {
            if (!store.getters["auth/authenticated"]) {
              next({
                name: "Login"
              });
            }
            next();
          },
          meta: {
            breadcrumb: [
              { text: 'Customers', to: '/customers' },
              { text: 'Import Customers' }
            ]
          }
        },
        {
          path: '/customers/customer-profile',
          name: 'Customer Profile',
          component: CustomerProfile,
          beforeEnter: (to, from, next) => {
            if (!store.getters["auth/authenticated"]) {
              next({
                name: "Login"
              });
            }
            next();
          },
          meta: {
            breadcrumb: [
              { text: 'Customers', to: '/customers' },
              { text: 'Customer Profile' }
            ]
          }
        }
      ]
    },
    {
      path: '/sales',
      component: TheContainer,
      children: [
        {
            path: '/sales/invoices',
            name: 'Invoices',
            component: Invoices,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Invoices' }
              ]
            }
        },
        {
            path: '/sales/invoices/create-invoice',
            name: 'Invoices',
            component: CreateInvoice,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Invoices', to: '/sales/invoices' },
                { text: 'Create Invoice' }
              ]
            }
        },
        {
            path: '/sales/estimates',
            name: 'Estimates',
            component: Estimates,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Estimates' }
              ]
            }
        },
        {
          path: '/sales/payments',
          name: 'Payments',
          component: Payments,
          beforeEnter: (to, from, next) => {
            if (!store.getters["auth/authenticated"]) {
              next({
                name: "Login"
              });
            }
            next();
          },
          meta: {
            breadcrumb: [
              { text: 'Payments' }
            ]
          }
        },
        {
          path: '/sales/credit_note',
          name: 'Credit Note',
          component: Credit_Note,
          beforeEnter: (to, from, next) => {
            if (!store.getters["auth/authenticated"]) {
              next({
                name: "Login"
              });
            }
            next();
          },
          meta: {
            breadcrumb: [
              { text: 'Credit Note' }
            ]
          }
        }
      ]
    },
    {
      path: '/inventory',
      component: TheContainer,
      children: [
        {
            path: '/inventory/items',
            name: 'Items',
            component: Items,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Items' }
              ]
            }
        },
      ]
    },
    {
      path: '/expenses',
      component: TheContainer,
      children: [
        {
            path: '',
            name: 'Expenses',
            component: Expenses,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Expenses' }
              ]
            }
        },
      ]
    },
    {
      path: '/acounting',
      component: TheContainer,
      children: [
        {
            path: '/accounting/dashboard',
            name: 'Account Dashboard',
            component: Accounting_Dashboard,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Dashboard' }
              ]
            }
        },
      ]
    },
    {
      path: '/profile',
      component: TheContainer,
      children: [
        {
            path: '',
            name: 'Profile',
            component: Profile,
            beforeEnter: (to, from, next) => {
              if (!store.getters["auth/authenticated"]) {
                next({
                  name: "Login"
                });
              }
              next();
            },
            meta: {
              breadcrumb: [
                { text: 'Profile' }
              ]
            }
        },
      ]
    },
    {
      path: '/',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '',
          name: 'Login',
          component: Login
        },
      ]
    },
    {
      path: '/',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: 'forgot',
          name: 'Forgot',
          component: Forgot
        },
      ]
    }
  ]
})
