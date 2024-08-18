# Bab 5

## Navigating Between Pages

Pada bab sebelumnya, Anda telah membuat layout dan halaman dashboard. Sekarang, mari tambahkan beberapa tautan agar pengguna dapat menavigasi antara rute dashboard.

### Dalam bab ini...

Berikut adalah topik yang akan kita bahas:

- Cara menggunakan komponen next/link.
- Cara menampilkan tautan aktif dengan hook usePathname().
- Cara kerja navigasi di Next.js.

### Mengapa Mengoptimalkan Navigasi?

Untuk menautkan antar halaman, Anda biasanya menggunakan elemen HTML `<a>`. Saat ini, tautan sidebar menggunakan elemen `<a>`, tetapi perhatikan apa yang terjadi saat Anda menavigasi antara halaman home, invoices, dan customers di browser Anda.

Apakah Anda melihatnya?

Ada penyegaran halaman penuh pada setiap navigasi halaman!

### Komponen `<Link>`

Di Next.js, Anda dapat menggunakan Komponen `<Link />` untuk menautkan antar halaman di aplikasi Anda. `<Link>` memungkinkan Anda melakukan navigasi sisi klien dengan JavaScript.

Untuk menggunakan komponen `<Link />`, buka `/app/ui/dashboard/nav-links.jsx`, dan impor komponen Link dari `next/link`. Kemudian, ganti tag `<a>` dengan `<Link>`:

```javascript
// /app/ui/dashboard/nav-links.jsx
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

// ...

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
```

Seperti yang Anda lihat, komponen Link mirip dengan menggunakan tag `<a>`, tetapi alih-alih `<a href="…">`, Anda menggunakan `<Link href="…">`.

Simpan perubahan Anda dan periksa apakah berfungsi di localhost Anda. Sekarang Anda harus dapat menavigasi antara halaman tanpa melihat penyegaran penuh. Meskipun bagian dari aplikasi Anda dirender di server, tidak ada penyegaran halaman penuh, membuatnya terasa seperti aplikasi web. Mengapa begitu?

### Pembagian Kode Otomatis dan Prefetching

Untuk meningkatkan pengalaman navigasi, Next.js secara otomatis membagi kode aplikasi Anda berdasarkan segmen rute. Ini berbeda dari SPA React tradisional, di mana browser memuat semua kode aplikasi Anda pada muatan awal.

Membagi kode berdasarkan rute berarti halaman menjadi terisolasi. Jika halaman tertentu melempar kesalahan, sisa aplikasi tetap berfungsi.

Selain itu, di produksi, setiap kali komponen `<Link>` muncul di viewport browser, Next.js secara otomatis melakukan prefetching kode untuk rute yang ditautkan di latar belakang. Pada saat pengguna mengklik tautan, kode untuk halaman tujuan sudah dimuat di latar belakang, dan inilah yang membuat transisi halaman hampir instan!

Pelajari lebih lanjut tentang cara kerja navigasi.

### Pola: Menampilkan Tautan Aktif

Pola UI umum adalah menampilkan tautan aktif untuk menunjukkan kepada pengguna halaman mana yang sedang mereka kunjungi. Untuk melakukan ini, Anda perlu mendapatkan path pengguna saat ini dari URL. Next.js menyediakan hook bernama usePathname() yang dapat Anda gunakan untuk memeriksa path dan mengimplementasikan pola ini.

Karena usePathname() adalah hook, Anda perlu mengubah `nav-links.jsx` menjadi Komponen Klien. Tambahkan direktif "use client" React ke bagian atas file, lalu impor usePathname() dari `next/navigation`:

```javascript
// /app/ui/dashboard/nav-links.jsx
"use client";

import {
  UserGroupIcon,
  HomeIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ...
```

Selanjutnya, tetapkan path ke variabel bernama pathname di dalam komponen `<NavLinks />` Anda:

```javascript
// /app/ui/dashboard/nav-links.jsx
export default function NavLinks() {
  const pathname = usePathname();
  // ...
}
```

Anda dapat menggunakan pustaka clsx yang diperkenalkan di bab tentang CSS styling untuk secara kondisional menerapkan nama kelas saat tautan aktif. Ketika link.href cocok dengan pathname, tautan harus ditampilkan dengan teks biru dan latar belakang biru muda.

Berikut adalah kode akhir untuk `nav-links.jsx`:

```javascript
// /app/ui/dashboard/nav-links.jsx
"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// ...

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
```

Simpan dan periksa localhost Anda. Sekarang Anda harus melihat tautan aktif disorot dalam warna biru.
