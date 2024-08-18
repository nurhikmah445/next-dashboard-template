# Bab 8

## Static and Dynamic Rendering
Pada bab sebelumnya, Anda mengambil data untuk halaman Ikhtisar Dashboard. Namun, kami secara singkat membahas dua keterbatasan dari pengaturan saat ini:

- Permintaan data menciptakan waterfall yang tidak disengaja.
- Dashboard bersifat statis, sehingga pembaruan data tidak akan tercermin pada aplikasi Anda.

### Dalam bab ini...
Berikut adalah topik yang akan kita bahas:
- Apa itu static rendering dan bagaimana hal itu dapat meningkatkan performa aplikasi Anda.
- Apa itu dynamic rendering dan kapan menggunakannya.
- Pendekatan berbeda untuk membuat dashboard Anda dinamis.
- Mensimulasikan pengambilan data yang lambat untuk melihat apa yang terjadi.

### Apa itu Static Rendering?
Dengan static rendering, pengambilan dan rendering data terjadi di server pada saat build (ketika Anda menyebarkan) atau saat melakukan revalidasi data.

Setiap kali pengguna mengunjungi aplikasi Anda, hasil yang di-cache disajikan. Ada beberapa manfaat dari static rendering:

- **Situs Web Lebih Cepat** - Konten yang sudah dirender sebelumnya dapat di-cache dan didistribusikan secara global. Ini memastikan bahwa pengguna di seluruh dunia dapat mengakses konten situs web Anda dengan lebih cepat dan andal.
- **Mengurangi Beban Server** - Karena konten di-cache, server Anda tidak perlu membuat konten secara dinamis untuk setiap permintaan pengguna.
- **SEO** - Konten yang sudah dirender sebelumnya lebih mudah diindeks oleh perayap mesin pencari, karena konten sudah tersedia saat halaman dimuat. Ini dapat meningkatkan peringkat mesin pencari.

Static rendering berguna untuk UI tanpa data atau data yang dibagikan di seluruh pengguna, seperti posting blog statis atau halaman produk. Ini mungkin tidak cocok untuk dashboard yang memiliki data yang dipersonalisasi dan diperbarui secara teratur.

Kebalikan dari static rendering adalah dynamic rendering.

### Apa itu Dynamic Rendering?
Dengan dynamic rendering, konten dirender di server untuk setiap pengguna pada saat permintaan (ketika pengguna mengunjungi halaman). Ada beberapa manfaat dari dynamic rendering:

- **Data Real-Time** - Dynamic rendering memungkinkan aplikasi Anda menampilkan data real-time atau yang sering diperbarui. Ini ideal untuk aplikasi di mana data sering berubah.
- **Konten Spesifik Pengguna** - Lebih mudah untuk menyajikan konten yang dipersonalisasi, seperti dashboard atau profil pengguna, dan memperbarui data berdasarkan interaksi pengguna.
- **Informasi Waktu Permintaan** - Dynamic rendering memungkinkan Anda mengakses informasi yang hanya dapat diketahui pada saat permintaan, seperti cookie atau parameter pencarian URL.

### Mensimulasikan Pengambilan Data yang Lambat
Aplikasi dashboard yang kita bangun adalah dinamis.

Namun, masih ada satu masalah yang disebutkan di bab sebelumnya. Apa yang terjadi jika satu permintaan data lebih lambat dari yang lain?

Mari kita simulasikan pengambilan data yang lambat. Di file data.js Anda, uncomment console.log dan setTimeout di dalam fetchRevenue():

```javascript
// /app/lib/data.js
export async function fetchRevenue() {
  try {
    // Kami sengaja menunda respons untuk tujuan demo.
    // Jangan lakukan ini di produksi :)
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));
 
    const data = await sql<Revenue>`SELECT * FROM revenue`;
 
    console.log('Data fetch completed after 3 seconds.');
 
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}
```

Sekarang buka http://localhost:3000/dashboard/ di tab baru dan perhatikan bagaimana halaman memerlukan waktu lebih lama untuk dimuat. Di terminal Anda, Anda juga harus melihat pesan berikut:

```
Fetching revenue data...
Data fetch completed after 3 seconds.
```

Di sini, Anda menambahkan penundaan buatan selama 3 detik untuk mensimulasikan pengambilan data yang lambat. Hasilnya adalah sekarang seluruh halaman Anda terblokir dari menampilkan UI kepada pengunjung saat data sedang diambil. Ini membawa kita ke tantangan umum yang harus diselesaikan oleh pengembang:

Dengan dynamic rendering, aplikasi Anda hanya secepat pengambilan data yang paling lambat.
