import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/auth'
import User from '#models/user' // <-- Tambahkan import User model

export default class SessionsController {
  show({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  /**
   * Metode store yang diperbarui untuk menggunakan User.verifyCredentials secara manual
   */
  async store({ request, response, auth, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    try {
      // 1. Verifikasi kredensial secara manual
      const user = await User.verifyCredentials(email, password)

      // 2. Jika verifikasi gagal (user null), kembalikan dengan pesan error
      if (!user) {
        session.flash('error', 'Email atau password salah.')
        return response.redirect().back()
      }

      // 3. Jika verifikasi berhasil, loginkan user ke sesi
      await auth.use('web').login(user)

      // 4. Arahkan ke halaman utama
      return response.redirect().toRoute('home')

    } catch (error) {
      // Blok catch ini sebagai pengaman jika terjadi error tak terduga
      session.flash('error', 'Terjadi kesalahan, silakan coba lagi.')
      return response.redirect().back()
    }
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('home')
  }
}