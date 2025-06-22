import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { auth, response, session } = ctx

    await auth.check()

    if (auth.user?.role !== 'admin') {
      session.flash('error', 'Anda tidak punya akses ke halaman ini.')
      return response.redirect().toRoute('home')
    }

    const output = await next()
    return output
  }
}