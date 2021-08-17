import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store";

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard/View')
const Customers = () => import('@/views/Customers/View')
const NewCustomers = () => import('@/views/Customers/NewCustomers')
const ImportCustomers = () => import('@/views/Customers/ImportCustomers')
const CustomerProfile = () => import('@/views/Customers/CustomerProfile')
const Invoices = () => import('@/views/Sales/Invoices/View')
const Estimates = () => import('@/views/Sales/Estimates/View')
const Payments = () => import('@/views/Sales/Payments/View')
const Credit_Note = () => import('@/views/Sales/Credit Notes/View')
const Expenses = () => import('@/views/Expenses/View')
const Accounting_Dashboard = () => import('@/views/Accounting/Dashboard/View')
const Login = () => import('@/views/Authentication/Login')
const Forgot = () => import('@/views/Authentication/Forgot')

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
      path: '/customers',
      component: TheContainer,
      children: [
        {
            path: '',
            name: 'Customers',
            component: Customers,
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
            meta: {
              breadcrumb: [
                { text: 'Invoices' }
              ]
            }
        },
        {
            path: '/sales/estimates',
            name: 'Estimates',
            component: Estimates,
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
          meta: {
            breadcrumb: [
              { text: 'Credit Note' }
            ]
          }
        }
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
            meta: {
              breadcrumb: [
                { text: 'Dashboard' }
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
