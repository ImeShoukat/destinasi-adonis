import router from '@adonisjs/core/services/router'
import { HttpContext } from '@adonisjs/core/http'

import { UserController } from '#controllers/users_controller'
import { KotaController } from '#controllers/kotas_controller'
import { KategoriController } from '#controllers/kategoris_controller'
import { UlasanController } from '#controllers/ulasans_controller'
import WisatasController from '#controllers/wisatas_controller'

// Home Page
router.get('/', async ({ view }: HttpContext) => {
  return view.render('pages/home')
})

// Wisata Resource Routes
router.resource('wisata', WisatasController)

// Kota Resource Routes
router.resource('kota', KotaController)

// Kategori Resource Routes
router.resource('kategori', KategoriController)

// User Resource Routes (admin only)
router.resource('user', UserController)

// Ulasan Routes
router.post('/ulasan', [UlasanController, 'store'])


// Catch-all 404
router.any('*', async ({ response }: HttpContext) => {
  return response.status(404).send('Page not found')
})

export default router
