export type Question = {
  id: number; category: "literasi"|"numerasi"; difficulty: "easy"|"medium"|"hard";
  question: string; options: string[]; correct: number;
};

export const sampleQuestions: Question[] = [
  {id:1,category:"literasi",difficulty:"easy",question:"Kata yang memiliki makna sama dengan 'cerdas' adalah...",options:["Lambat","Pandai","Lelah","Keras"],correct:1},
  {id:2,category:"literasi",difficulty:"easy",question:"Antonim dari kata 'besar' adalah...",options:["Tinggi","Lebar","Kecil","Panjang"],correct:2},
  {id:3,category:"literasi",difficulty:"medium",question:"Gagasan utama sebuah paragraf disebut...",options:["Judul","Ide pokok","Kalimat penjelas","Kata kunci"],correct:1},
  {id:4,category:"literasi",difficulty:"medium",question:"Teks yang bertujuan menjelaskan suatu proses disebut teks...",options:["Prosedur","Narasi","Puisi","Dialog"],correct:0},
  {id:5,category:"literasi",difficulty:"hard",question:"Kesimpulan yang baik harus sesuai dengan...",options:["Pendapat pembaca","Isi bacaan","Judul saja","Jumlah paragraf"],correct:1},
  {id:6,category:"numerasi",difficulty:"easy",question:"8 × 7 = ...",options:["54","56","64","72"],correct:1},
  {id:7,category:"numerasi",difficulty:"easy",question:"45 ÷ 5 = ...",options:["7","8","9","10"],correct:2},
  {id:8,category:"numerasi",difficulty:"medium",question:"Jika 3 pensil seharga Rp6.000, harga 5 pensil adalah...",options:["Rp8.000","Rp9.000","Rp10.000","Rp12.000"],correct:2},
  {id:9,category:"numerasi",difficulty:"medium",question:"Luas persegi dengan sisi 8 cm adalah...",options:["16 cm²","32 cm²","64 cm²","80 cm²"],correct:2},
  {id:10,category:"numerasi",difficulty:"hard",question:"25% dari 240 adalah...",options:["40","50","60","80"],correct:2},
];