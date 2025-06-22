import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const RegistersController = () => import('#controllers/auth/registers_controller')
const SessionsController = () => import('#controllers/auth/sessions_controller')
const WisatasController = () => import('#controllers/wisatas_controller')
const UlasansController = () => import('#controllers/ulasans_controller')

router.get('/', async ({ response }) => {
  return response.redirect().toRoute('wisata.index')
}).as('home')

// router.get('/', [WisatasController, 'index']).as('home')

// Rute Publik lainnya
router.get('/wisata', [WisatasController, 'index']).as('wisata.index')
router.get('/wisata/:id', [WisatasController, 'show']).as('wisata.show')
router.get('/populer', [WisatasController, 'populer']).as('wisata.populer')

// --- Grup untuk Rute Tamu (GUEST) ---
// Middleware 'guest' HANYA berlaku untuk rute di dalam grup ini
router
  .group(() => {
    router.get('/register', [RegistersController, 'show']).as('register.show')
    router.post('/register', [RegistersController, 'store']).as('register.store')
    router.get('/login', [SessionsController, 'show']).as('login.show')
    router.post('/login', [SessionsController, 'store']).as('login.store')
  })
  .prefix('auth')
  .use(middleware.guest()) // Hanya grup ini yang menggunakan 'guest'
  .as('auth')

// --- Rute yang Membutuhkan Login (AUTH) ---
router.delete('/auth/logout', [SessionsController, 'destroy']).as('auth.logout').use(middleware.auth())
router.post('/ulasan', [UlasansController, 'store']).as('ulasan.store').use(middleware.auth())

// --- Rute Admin (AUTH dan ADMIN) ---
router
  .group(() => {
    router.get('/', ({ response }) => response.redirect().toRoute('admin.wisata.index')).as('dashboard')
    router.resource('kota', '#controllers/admin/kotas_controller')
    router.resource('kategori', '#controllers/admin/kategoris_controller')
    router.resource('wisata', '#controllers/admin/wisatas_controller')
  })
  .prefix('/admin')
  .use([middleware.auth(), middleware.admin()])
  .as('admin')