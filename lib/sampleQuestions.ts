export type Question = {
  id: number;
  category: "literasi" | "numerasi";
  question: string;
  options: string[];
  correct: number;
};

export const sampleQuestions: Question[] = [

  // ==================== LITERASI FASE B (1 - 25) ====================

  {
    id: 1,
    category: "literasi",
    question: "Bacalah kalimat berikut! \"Rani selalu membantu ibu merapikan rumah.\" Sifat Rani adalah...",
    options: ["Malas", "Rajin", "Sombong", "Pemarah"],
    correct: 1
  },

  {
    id: 2,
    category: "literasi",
    question: "Sinonim dari kata \"gembira\" adalah...",
    options: ["Sedih", "Marah", "Senang", "Takut"],
    correct: 2
  },

  {
    id: 3,
    category: "literasi",
    question: "Antonim dari kata \"tinggi\" adalah...",
    options: ["Panjang", "Rendah", "Besar", "Lebar"],
    correct: 1
  },

  {
    id: 4,
    category: "literasi",
    question: "Bacalah kalimat berikut! \"Dina membawa payung karena langit terlihat mendung.\" Mengapa Dina membawa payung?",
    options: [
      "Karena ingin bermain",
      "Karena ingin membeli payung",
      "Karena kemungkinan akan turun hujan",
      "Karena payungnya baru"
    ],
    correct: 2
  },

  {
    id: 5,
    category: "literasi",
    question: "Gagasan utama dalam sebuah paragraf disebut...",
    options: ["Ide pokok", "Kata tanya", "Judul buku", "Kalimat penutup"],
    correct: 0
  },

  {
    id: 6,
    category: "literasi",
    question: "Bacalah teks berikut! \"Setiap pagi, Edo memberi makan ikan di kolam. Ia juga membersihkan kolam setiap hari Minggu. Ikan-ikannya terlihat sehat dan aktif.\" Apa yang membuat ikan Edo tetap sehat?",
    options: [
      "Kolam dibiarkan kotor",
      "Edo tidak memberi makan ikan",
      "Edo merawat dan memberi makan ikan",
      "Ikan Edo tidak pernah bergerak"
    ],
    correct: 2
  },

  {
    id: 7,
    category: "literasi",
    question: "Kalimat yang menggunakan tanda tanya dengan tepat adalah...",
    options: [
      "Siapa nama gurumu?",
      "Tolong tutup pintu!",
      "Ibu membeli sayur.",
      "Wah, indah sekali."
    ],
    correct: 0
  },

  {
    id: 8,
    category: "literasi",
    question: "Kalimat yang menggunakan tanda seru dengan tepat adalah...",
    options: [
      "Di mana rumahmu?",
      "Tolong ambilkan buku itu!",
      "Ayah pergi ke kantor.",
      "Kapan kamu datang?"
    ],
    correct: 1
  },

  {
    id: 9,
    category: "literasi",
    question: "Bacalah teks berikut! \"Pagi itu hujan turun dengan deras. Jalanan menjadi basah dan beberapa orang menggunakan payung.\" Peristiwa yang terjadi dalam teks adalah...",
    options: [
      "Hari sangat panas",
      "Hujan turun dengan deras",
      "Orang-orang bermain di lapangan",
      "Jalanan menjadi berdebu"
    ],
    correct: 1
  },

  {
    id: 10,
    category: "literasi",
    question: "Kata yang tepat untuk melengkapi kalimat \"Adik ... susu sebelum tidur\" adalah...",
    options: ["meminum", "berlari", "membaca", "menulis"],
    correct: 0
  },

  {
    id: 11,
    category: "literasi",
    question: "Urutan yang tepat untuk mencuci tangan adalah...",
    options: [
      "Mengeringkan tangan - membasahi tangan - memakai sabun",
      "Membasahi tangan - memakai sabun - membilas tangan",
      "Memakai sabun - mengeringkan tangan - membasahi tangan",
      "Membilas tangan - mengeringkan tangan - memakai sabun"
    ],
    correct: 1
  },

  {
    id: 12,
    category: "literasi",
    question: "Teks yang berisi langkah-langkah melakukan atau membuat sesuatu disebut teks...",
    options: ["Cerita", "Deskripsi", "Prosedur", "Puisi"],
    correct: 2
  },

  {
    id: 13,
    category: "literasi",
    question: "Bacalah kalimat berikut! \"Kucing itu berlari mengejar bola.\" Kata yang menunjukkan kegiatan adalah...",
    options: ["Kucing", "Itu", "Berlari", "Bola"],
    correct: 2
  },

  {
    id: 14,
    category: "literasi",
    question: "Bacalah cerita berikut! \"Andi menemukan pensil milik Budi di bawah meja. Andi kemudian memberikan pensil tersebut kepada Budi.\" Sikap Andi menunjukkan bahwa ia...",
    options: ["Jujur", "Pemalas", "Sombong", "Ceroboh"],
    correct: 0
  },

  {
    id: 15,
    category: "literasi",
    question: "Pesan yang dapat diambil dari sebuah cerita disebut...",
    options: ["Tokoh", "Amanat", "Latar", "Alur"],
    correct: 1
  },

  {
    id: 16,
    category: "literasi",
    question: "Tokoh yang mengalami berbagai peristiwa dalam sebuah cerita disebut...",
    options: ["Tokoh", "Judul", "Paragraf", "Penulis"],
    correct: 0
  },

  {
    id: 17,
    category: "literasi",
    question: "Bacalah kalimat berikut! \"Burung-burung terbang di langit.\" Kata yang menunjukkan tempat adalah...",
    options: ["Burung-burung", "Terbang", "Di", "Langit"],
    correct: 3
  },

  {
    id: 18,
    category: "literasi",
    question: "Manakah kalimat yang menggunakan huruf kapital dengan benar?",
    options: [
      "siti pergi ke Surabaya.",
      "Siti pergi ke surabaya.",
      "Siti pergi ke Surabaya.",
      "siti pergi ke surabaya."
    ],
    correct: 2
  },

  {
    id: 19,
    category: "literasi",
    question: "Bacalah teks berikut! \"Kelinci memiliki telinga yang panjang. Hewan ini suka memakan wortel dan sayuran.\" Teks tersebut terutama membahas tentang...",
    options: ["Wortel", "Kelinci", "Sayuran", "Telinga"],
    correct: 1
  },

  {
    id: 20,
    category: "literasi",
    question: "Kata \"hemat\" memiliki arti...",
    options: [
      "Menggunakan sesuatu secara berlebihan",
      "Menggunakan sesuatu sesuai kebutuhan",
      "Membuang semua barang",
      "Membeli semua yang diinginkan"
    ],
    correct: 1
  },

  {
    id: 21,
    category: "literasi",
    question: "Perhatikan kalimat berikut! \"Matahari tersenyum menyinari pagi.\" Kalimat tersebut menggambarkan matahari seolah-olah dapat...",
    options: ["Berjalan", "Berbicara", "Tersenyum", "Berlari"],
    correct: 2
  },

  {
    id: 22,
    category: "literasi",
    question: "Bacalah teks berikut! \"Menjaga kebersihan kelas merupakan tanggung jawab semua siswa. Kelas yang bersih membuat kegiatan belajar menjadi nyaman.\" Apa manfaat menjaga kebersihan kelas?",
    options: [
      "Belajar menjadi nyaman",
      "Kelas menjadi lebih sempit",
      "Siswa tidak perlu belajar",
      "Buku menjadi lebih berat"
    ],
    correct: 0
  },

  {
    id: 23,
    category: "literasi",
    question: "Judul yang paling sesuai untuk teks tentang cara merawat tanaman adalah...",
    options: [
      "Bermain di Taman",
      "Cara Merawat Tanaman",
      "Makanan Kesukaan Saya",
      "Pergi ke Sekolah"
    ],
    correct: 1
  },

  {
    id: 24,
    category: "literasi",
    question: "Bacalah kalimat berikut! \"Rina membaca buku di perpustakaan.\" Di manakah Rina membaca buku?",
    options: ["Di kelas", "Di rumah", "Di perpustakaan", "Di taman"],
    correct: 2
  },

  {
    id: 25,
    category: "literasi",
    question: "Jika sebuah cerita mengajarkan kita untuk selalu berkata jujur, sikap yang sebaiknya kita lakukan adalah...",
    options: [
      "Berbohong ketika takut",
      "Menyembunyikan kesalahan",
      "Berkata jujur",
      "Menyalahkan teman"
    ],
    correct: 2
  },


// ==================== NUMERASI FASE B (26 - 50) ====================

{
  id: 26,
  category: "numerasi",
  question: "Bilangan 3.475 dibaca...",
  options: [
    "Tiga ribu empat ratus tujuh puluh lima",
    "Tiga ribu tujuh ratus empat puluh lima",
    "Tiga ratus empat puluh tujuh lima",
    "Tiga ribu empat puluh tujuh"
  ],
  correct: 0
},

{
  id: 27,
  category: "numerasi",
  question: "Nilai tempat angka 6 pada bilangan 4.682 adalah...",
  options: [
    "Satuan",
    "Puluhan",
    "Ratusan",
    "Ribuan"
  ],
  correct: 2
},

{
  id: 28,
  category: "numerasi",
  question: "Bilangan manakah yang paling besar?",
  options: [
    "2.345",
    "2.435",
    "2.354",
    "2.405"
  ],
  correct: 1
},

{
  id: 29,
  category: "numerasi",
  question: "Hasil dari 2.345 + 1.275 adalah...",
  options: [
    "3.520",
    "3.620",
    "3.720",
    "3.820"
  ],
  correct: 1
},

{
  id: 30,
  category: "numerasi",
  question: "Hasil dari 5.000 - 2.375 adalah...",
  options: [
    "2.525",
    "2.625",
    "2.725",
    "2.825"
  ],
  correct: 1
},

{
  id: 31,
  category: "numerasi",
  question: "Satu kotak berisi 24 pensil. Jika ada 4 kotak, berapa jumlah semua pensil?",
  options: [
    "72 pensil",
    "86 pensil",
    "96 pensil",
    "104 pensil"
  ],
  correct: 2
},

{
  id: 32,
  category: "numerasi",
  question: "Ibu memiliki 48 kue. Kue tersebut dibagikan sama rata kepada 6 anak. Setiap anak mendapat...",
  options: [
    "6 kue",
    "7 kue",
    "8 kue",
    "9 kue"
  ],
  correct: 2
},

{
  id: 33,
  category: "numerasi",
  question: "Perpustakaan memiliki 1.250 buku. Kemudian mendapat tambahan 375 buku. Berapa jumlah buku sekarang?",
  options: [
    "1.525 buku",
    "1.625 buku",
    "1.725 buku",
    "1.825 buku"
  ],
  correct: 1
},

{
  id: 34,
  category: "numerasi",
  question: "Rani mempunyai uang Rp20.000. Ia membeli buku seharga Rp12.500. Berapa uang Rani yang tersisa?",
  options: [
    "Rp5.500",
    "Rp6.500",
    "Rp7.500",
    "Rp8.500"
  ],
  correct: 2
},

{
  id: 35,
  category: "numerasi",
  question: "Ayah membeli 3 kg apel. Harga 1 kg apel adalah Rp8.000. Berapa uang yang harus dibayar ayah?",
  options: [
    "Rp16.000",
    "Rp20.000",
    "Rp24.000",
    "Rp28.000"
  ],
  correct: 2
},

{
  id: 36,
  category: "numerasi",
  question: "Pecahan yang menunjukkan 3 bagian dari 8 bagian yang sama besar adalah...",
  options: [
    "3/6",
    "3/7",
    "3/8",
    "8/3"
  ],
  correct: 2
},

{
  id: 37,
  category: "numerasi",
  question: "Manakah pecahan yang lebih besar?",
  options: [
    "1/4",
    "1/2",
    "1/8",
    "1/10"
  ],
  correct: 1
},

{
  id: 38,
  category: "numerasi",
  question: "Hasil dari 2/5 + 1/5 adalah...",
  options: [
    "1/5",
    "2/5",
    "3/5",
    "4/5"
  ],
  correct: 2
},

{
  id: 39,
  category: "numerasi",
  question: "Ibu memotong sebuah kue menjadi 8 bagian sama besar. Adi memakan 3 bagian. Pecahan kue yang masih tersisa adalah...",
  options: [
    "3/8",
    "4/8",
    "5/8",
    "6/8"
  ],
  correct: 2
},

{
  id: 40,
  category: "numerasi",
  question: "Sebuah pita panjangnya 2 meter. Berapa sentimeter panjang pita tersebut?",
  options: [
    "20 cm",
    "100 cm",
    "200 cm",
    "2.000 cm"
  ],
  correct: 2
},

{
  id: 41,
  category: "numerasi",
  question: "Sebuah botol berisi 1 liter air. Jika digunakan 500 mL, berapa mL air yang tersisa?",
  options: [
    "250 mL",
    "400 mL",
    "500 mL",
    "750 mL"
  ],
  correct: 2
},

{
  id: 42,
  category: "numerasi",
  question: "Sebuah kegiatan dimulai pukul 08.00 dan selesai pukul 10.30. Berapa lama kegiatan tersebut berlangsung?",
  options: [
    "1 jam 30 menit",
    "2 jam",
    "2 jam 30 menit",
    "3 jam"
  ],
  correct: 2
},

{
  id: 43,
  category: "numerasi",
  question: "Sebuah persegi memiliki panjang sisi 6 cm. Berapa keliling persegi tersebut?",
  options: [
    "12 cm",
    "18 cm",
    "24 cm",
    "36 cm"
  ],
  correct: 2
},

{
  id: 44,
  category: "numerasi",
  question: "Sebuah persegi panjang memiliki panjang 8 cm dan lebar 5 cm. Berapa luasnya?",
  options: [
    "13 cm²",
    "26 cm²",
    "40 cm²",
    "45 cm²"
  ],
  correct: 2
},

{
  id: 45,
  category: "numerasi",
  question: "Bangun datar yang memiliki 3 sisi adalah...",
  options: [
    "Persegi",
    "Segitiga",
    "Lingkaran",
    "Persegi panjang"
  ],
  correct: 1
},

{
  id: 46,
  category: "numerasi",
  question: "Perhatikan pola bilangan berikut: 5, 10, 15, 20, ... Bilangan berikutnya adalah...",
  options: [
    "21",
    "23",
    "25",
    "30"
  ],
  correct: 2
},

{
  id: 47,
  category: "numerasi",
  question: "Perhatikan pola berikut: 100, 90, 80, 70, ... Bilangan berikutnya adalah...",
  options: [
    "50",
    "60",
    "65",
    "75"
  ],
  correct: 1
},

{
  id: 48,
  category: "numerasi",
  question: "Data jumlah buku yang dibaca siswa dalam satu minggu: Andi 4 buku, Budi 6 buku, Citra 3 buku, dan Dika 5 buku. Siapa yang membaca buku paling banyak?",
  options: [
    "Andi",
    "Budi",
    "Citra",
    "Dika"
  ],
  correct: 1
},

{
  id: 49,
  category: "numerasi",
  question: "Berdasarkan data pada soal sebelumnya, berapa jumlah seluruh buku yang dibaca keempat siswa?",
  options: [
    "16 buku",
    "17 buku",
    "18 buku",
    "19 buku"
  ],
  correct: 2
},

{
  id: 50,
  category: "numerasi",
  question: "Di sebuah kelas terdapat 32 siswa. Sebanyak 18 siswa menyukai sepak bola dan sisanya menyukai bulu tangkis. Berapa siswa yang menyukai bulu tangkis?",
  options: [
    "12 siswa",
    "14 siswa",
    "16 siswa",
    "18 siswa"
  ],
  correct: 1
},
]