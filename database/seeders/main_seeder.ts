import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Kategori from '#models/kategori'
import Kota from '#models/kota'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    // Dengan mixin, createMany akan otomatis melakukan hashing password
    await User.createMany([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password', // Berikan password teks biasa
        role: 'admin',
      },
      {
        name: 'Regular User',
        email: 'user@example.com',
        password: 'password', // Berikan password teks biasa
        role: 'user',
      },
    ])

    await Kota.createMany([
      { namaKota: 'Jakarta' },
      { namaKota: 'Bandung' },
      { namaKota: 'Yogyakarta' },
    ])

    await Kategori.createMany([
      { namaKategori: 'Alam' },
      { namaKategori: 'Budaya' },
      { namaKategori: 'Kuliner' },
    ])
  }
}