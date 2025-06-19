import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export class UserController {
  async index({ view }: HttpContext) {
    const data = await User.all()
    return view.render('pages/user/index', { data })
  }
  async create({ view }: HttpContext) { 
    return view.render('pages/user/create')
  }

  async store({ request, response }: HttpContext) {
    await User.create(request.only(['nama', 'email', 'password']))
    return response.redirect('/user')
  }

  async edit({ params, view }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return view.render('pages/user/edit', { user })
  }

  async update({ params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    user.merge(request.only(['nama', 'email', 'password']))
    await user.save()
    return response.redirect('/user')
  }

  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return response.redirect('/user')
  }
}

// Note: The User model should be defined in the models directory as #models/user.ts
// and should include the necessary fields like nama, email, and password. 
// Ensure that you have the appropriate validation and hashing for passwords in place.