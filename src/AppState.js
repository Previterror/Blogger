import { reactive } from 'vue'
import { Account } from './models/Account.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /** @type {{name, picture, id}} user info from Auth0*/
  user: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  /** @type {import('./models/Blog.js').Blog[]} */
  blogs: [],

  /** @type {import('./models/Blog.js').Blog} */
  activeBlog: null,

  /** @type {Account} */
  activeProfile: null
})
