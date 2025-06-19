import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Kategori from '#models/kategori'
import Wisata from '#models/wisata'
import User from '#models/user'
import Ulasan from '#models/ulasan'
import Kota from '#models/kota'

export default class extends BaseSeeder {
  async run() {
    const kota1 = await Kota.create({ namaKota: 'Yogyakarta' })
    const kota2 = await Kota.create({ namaKota: 'Bandung' })

    const kategori1 = await Kategori.create({ namaKategori: 'Pantai' })
    const kategori2 = await Kategori.create({ namaKategori: 'Pegunungan' })

    const user1 = await User.create({ fullName: 'Budi', email: 'budi@example.com' })
    const user2 = await User.create({ fullName: 'Siti', email: 'siti@example.com' })

    const wisata1 = await Wisata.create({
      nama: 'Pantai Parangtritis',
      deskripsi: 'Pantai legendaris di Yogyakarta',
      kotaId: kota1.id,
      kategoriId: kategori1.id,
      biayaMasuk: 15000
    })

    const wisata2 = await Wisata.create({
      nama: 'Gunung Tangkuban Perahu',
      deskripsi: 'Gunung berapi terkenal di Bandung',
      kotaId: kota2.id,
      kategoriId: kategori2.id,
      biayaMasuk: 20000
    })

    await Ulasan.create({ wisataId: wisata1.id, userId: user1.id, rating: 5, ulasan: 'Sangat bagus!' })
    await Ulasan.create({ wisataId: wisata1.id, userId: user2.id, rating: 4, ulasan: 'Bagus tapi ramai.' })
    await Ulasan.create({ wisataId: wisata2.id, userId: user1.id, rating: 3, ulasan: 'Pemandangan oke.' })
  }
}
