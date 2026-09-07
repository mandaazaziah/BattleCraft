export type Question = {
  id: number;
  category: "literasi" | "numerasi";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: string[];
  correct: number;
};

export const sampleQuestions: Question[] = [
  // ==================== LITERASI (1 - 30) ====================
  { id: 1, category: "literasi", difficulty: "easy", question: "Kata yang memiliki makna sama (sinonim) dengan 'cerdas' adalah...", options: ["Lambat", "Pandai", "Lelah", "Keras"], correct: 1 },
  { id: 2, category: "literasi", difficulty: "easy", question: "Lawan kata (antonim) dari 'besar' adalah...", options: ["Tinggi", "Lebar", "Kecil", "Panjang"], correct: 2 },
  { id: 3, category: "literasi", difficulty: "easy", question: "Gagasan utama atau inti dari sebuah paragraf disebut...", options: ["Judul", "Ide pokok", "Kalimat penjelas", "Kata kunci"], correct: 1 },
  { id: 4, category: "literasi", difficulty: "easy", question: "Teks yang berisi petunjuk langkah-langkah membuat sesuatu disebut teks...", options: ["Prosedur", "Narasi", "Puisi", "Deskripsi"], correct: 0 },
  { id: 5, category: "literasi", difficulty: "easy", question: "Kata 'rajin' berlawanan makna dengan kata...", options: ["Giat", "Tekun", "Malas", "Cepat"], correct: 2 },
  { id: 6, category: "literasi", difficulty: "medium", question: "Tanda baca yang digunakan di akhir kalimat tanya adalah...", options: ["Titik (.)", "Koma (,)", "Tanda Seru (!)", "Tanda Tanya (?)"], correct: 3 },
  { id: 7, category: "literasi", difficulty: "medium", question: "Ungkapan 'besar kepala' memiliki arti...", options: ["Pintar", "Sombong", "Kepala besar", "Suka menolong"], correct: 1 },
  { id: 8, category: "literasi", difficulty: "medium", question: "Tokoh yang memiliki sifat jahat dalam cerita disebut...", options: ["Protagonis", "Antagonis", "Tritagonis", "Figuran"], correct: 1 },
  { id: 9, category: "literasi", difficulty: "medium", question: "Kisah dongeng tentang dunia binatang yang bertingkah seperti manusia disebut...", options: ["Mite", "Fabel", "Legenda", "Sage"], correct: 1 },
  { id: 10, category: "literasi", difficulty: "medium", question: "Huruf kapital digunakan pada awal penulisan...", options: ["Nama orang dan kota", "Kata sifat", "Kata sambung", "Tanda baca"], correct: 0 },
  { id: 11, category: "literasi", difficulty: "medium", question: "Sinonim dari kata 'sukacita' adalah...", options: ["Duka", "Gembira", "Sedih", "Marah"], correct: 1 },
  { id: 12, category: "literasi", difficulty: "medium", question: "Cerita rakyat asal-usul Danau Toba termasuk jenis cerita...", options: ["Fabel", "Mite", "Legenda", "Cerpen"], correct: 2 },
  { id: 13, category: "literasi", difficulty: "medium", question: "Peribahasa 'Air tenang menghanyutkan' bermakna orang yang diam tetapi...", options: ["Berbahaya/banyak ilmu", "Suka berenang", "Sombong", "Pemalas"], correct: 0 },
  { id: 14, category: "literasi", difficulty: "medium", question: "Bagian surat yang berisi salam pembuka adalah...", options: ["Dengan hormat,", "Salam sejahtera selalu", "Kepada Yth.", "Wassalam"], correct: 0 },
  { id: 15, category: "literasi", difficulty: "medium", question: "Kata dasar dari 'menuliskan' adalah...", options: ["Menulis", "Tulis", "Tuliskan", "Penulis"], correct: 1 },
  { id: 16, category: "literasi", difficulty: "hard", question: "Kalimat yang menggunakan kata penghubung sebab-akibat adalah...", options: ["Ibu memasak dan mencuci.", "Budi sakit karena kehujanan.", "Ayah membaca koran tadi pagi.", "Adik bermain bola di lapangan."], correct: 1 },
  { id: 17, category: "literasi", difficulty: "hard", question: "Pesan moral yang ingin disampaikan pengarang dalam cerita disebut...", options: ["Alur", "Tema", "Amanat", "Latar"], correct: 2 },
  { id: 18, category: "literasi", difficulty: "hard", question: "Teks yang menggambarkan suatu objek secara rinci dan jelas adalah...", options: ["Teks Deskripsi", "Teks Eksplanasi", "Teks Berita", "Teks Negosiasi"], correct: 0 },
  { id: 19, category: "literasi", difficulty: "hard", question: "Kalimat efektif memiliki ciri utama yaitu...", options: ["Sangat panjang", "Hemat kata dan jelas maknanya", "Banyak kata kiasan", "Menggunakan bahasa gaul"], correct: 1 },
  { id: 20, category: "literasi", difficulty: "hard", question: "Makna peribahasa 'Tong kosong nyaring bunyinya' adalah...", options: ["Orang pandai yang pendiam", "Orang bodoh banyak bicaranya", "Orang kaya yang dermawan", "Orang jujur"], correct: 1 },
  { id: 21, category: "literasi", difficulty: "hard", question: "Majas yang membandingkan benda mati seolah hidup bernyawa disebut...", options: ["Personifikasi", "Metafora", "Hiperbola", "Litotes"], correct: 0 },
  { id: 22, category: "literasi", difficulty: "hard", question: "Susunan struktur teks laporan hasil observasi yang benar adalah...", options: ["Deskripsi bagian - Pernyataan umum", "Pernyataan umum - Deskripsi bagian - Simpulan", "Orientasi - Komplikasi - Resolusi", "Tesis - Argumentasi"], correct: 1 },
  { id: 23, category: "literasi", difficulty: "hard", question: "Sinonim kata 'inovasi' adalah...", options: ["Peniruan", "Pembaruan/penemuan baru", "Kerusakan", "Penyimpanan"], correct: 1 },
  { id: 24, category: "literasi", difficulty: "hard", question: "Ringkasan intisari dari suatu bacaan disebut...", options: ["Sinopsis/Rangkuman", "Daftar pustaka", "Kata pengantar", "Indeks"], correct: 0 },
  { id: 25, category: "literasi", difficulty: "hard", question: "Kata baku yang tepat di bawah ini adalah...", options: ["Apotik", "Apotek", "Apotik/k", "Afotek"], correct: 1 },

  // ==================== NUMERASI (26 - 50) ====================
  { id: 26, category: "numerasi", difficulty: "easy", question: "8 × 7 = ...", options: ["54", "56", "64", "72"], correct: 1 },
  { id: 27, category: "numerasi", difficulty: "easy", question: "45 ÷ 5 = ...", options: ["7", "8", "9", "10"], correct: 2 },
  { id: 28, category: "numerasi", difficulty: "easy", question: "125 + 375 = ...", options: ["450", "500", "525", "600"], correct: 1 },
  { id: 29, category: "numerasi", difficulty: "easy", question: "100 - 47 = ...", options: ["53", "57", "63", "43"], correct: 0 },
  { id: 30, category: "numerasi", difficulty: "easy", question: "Hasil dari 12 × 12 adalah...", options: ["124", "134", "144", "154"], correct: 2 },
  { id: 31, category: "numerasi", difficulty: "medium", question: "Jika 3 pensil seharga Rp6.000, maka harga 5 pensil adalah...", options: ["Rp8.000", "Rp9.000", "Rp10.000", "Rp12.000"], correct: 2 },
  { id: 32, category: "numerasi", difficulty: "medium", question: "Luas persegi dengan panjang sisi 8 cm adalah...", options: ["16 cm²", "32 cm²", "64 cm²", "80 cm²"], correct: 2 },
  { id: 33, category: "numerasi", difficulty: "medium", question: "Keliling persegi panjang dengan panjang 10 cm dan lebar 6 cm adalah...", options: ["16 cm", "32 cm", "60 cm", "40 cm"], correct: 1 },
  { id: 34, category: "numerasi", difficulty: "medium", question: "2 jam 30 menit sama dengan berapa menit?", options: ["120 menit", "150 menit", "180 menit", "230 menit"], correct: 1 },
  { id: 35, category: "numerasi", difficulty: "medium", question: "25% dari 240 adalah...", options: ["40", "50", "60", "80"], correct: 2 },
  { id: 36, category: "numerasi", difficulty: "medium", question: "Bentuk desimal dari pecahan 3/4 adalah...", options: ["0,25", "0,50", "0,75", "0,80"], correct: 2 },
  { id: 37, category: "numerasi", difficulty: "medium", question: "Sebuah kubus memiliki panjang rusuk 5 cm. Volume kubus tersebut adalah...", options: ["25 cm³", "100 cm³", "125 cm³", "150 cm³"], correct: 2 },
  { id: 38, category: "numerasi", difficulty: "medium", question: "FPB dari 12 dan 18 adalah...", options: ["2", "3", "6", "12"], correct: 2 },
  { id: 39, category: "numerasi", difficulty: "medium", question: "KPK dari 4 dan 6 adalah...", options: ["12", "18", "24", "36"], correct: 0 },
  { id: 40, category: "numerasi", difficulty: "medium", question: "Hasil dari -15 + 28 adalah...", options: ["-13", "13", "43", "-43"], correct: 1 },
  { id: 41, category: "numerasi", difficulty: "hard", question: "Perbandingan uang Ali dan Budi adalah 2 : 3. Jika jumlah uang mereka Rp50.000, uang Ali adalah...", options: ["Rp20.000", "Rp30.000", "Rp25.000", "Rp15.000"], correct: 0 },
  { id: 42, category: "numerasi", difficulty: "hard", question: "Sebuah mobil melaju dengan kecepatan 60 km/jam selama 2,5 jam. Jarak yang ditempuh adalah...", options: ["120 km", "140 km", "150 km", "160 km"], correct: 2 },
  { id: 43, category: "numerasi", difficulty: "hard", question: "Rata-rata (mean) dari nilai: 7, 8, 9, 6, 10 adalah...", options: ["7,5", "8,0", "8,5", "9,0"], correct: 1 },
  { id: 44, category: "numerasi", difficulty: "hard", question: "3/5 + 1/2 = ...", options: ["4/7", "11/10", "4/10", "1/5"], correct: 1 },
  { id: 45, category: "numerasi", difficulty: "hard", question: "Harga baju Rp100.000 mendapat diskon 20%. Berapa yang harus dibayar?", options: ["Rp70.000", "Rp80.000", "Rp85.000", "Rp90.000"], correct: 1 },
  { id: 46, category: "numerasi", difficulty: "hard", question: "Sudut siku-siku memiliki besar sudut sebesar...", options: ["45°", "90°", "180°", "360°"], correct: 1 },
  { id: 47, category: "numerasi", difficulty: "hard", question: "Hasil dari 15² - 10² adalah...", options: ["125", "150", "225", "100"], correct: 0 },
  { id: 48, category: "numerasi", difficulty: "hard", question: "Jika x + 7 = 15, maka nilai x adalah...", options: ["6", "7", "8", "9"], correct: 2 },
  { id: 49, category: "numerasi", difficulty: "hard", question: "Sebuah lingkaran berdiameter 14 cm. Kelilingnya adalah... (π = 22/7)", options: ["22 cm", "44 cm", "88 cm", "154 cm"], correct: 1 },
  { id: 50, category: "numerasi", difficulty: "hard", question: "Dalam kantong terdapat 3 bola merah dan 2 bola biru. Peluang terambil bola merah adalah...", options: ["2/5", "3/5", "1/2", "3/2"], correct: 1 },
];