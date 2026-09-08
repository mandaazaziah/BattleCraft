## Setup Database Supabase

1. Buat project baru di [Supabase](https://supabase.com/), lalu buka **SQL Editor**.
2. Buka file `supabase/schema.sql` di project ini.
3. Salin seluruh isinya ke SQL Editor, kemudian klik **Run**.
4. Pastikan tabel berikut muncul di menu **Table Editor**:
	- `questions`
	- `battles`
	- `team_members`
	- `battle_questions`
	- `penalties`
5. Salin `.env.example` menjadi `.env.local`, lalu isi dari **Project Settings > API**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

6. Jalankan ulang aplikasi dengan `npm run dev`.

Skrip SQL aman dijalankan ulang karena index, trigger, policy, dan data hukuman dibuat secara idempotent. Data soal bawaan aplikasi saat ini masih berada di `lib/sampleQuestions.ts`; tabel `questions` sudah siap dipakai untuk migrasi soal ke Supabase.

### Catatan keamanan

Policy pada `supabase/schema.sql` sengaja membuka akses `anon` agar aplikasi demo yang masih memakai login `sessionStorage` dapat membaca dan menyimpan data. Sebelum dipakai sungguhan, gunakan Supabase Auth dan ubah policy menjadi akses khusus pengguna admin.
