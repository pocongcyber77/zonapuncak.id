# zonapuncak.id — Website Design Rules

Dokumen ini berisi semua formula desain yang wajib diikuti di seluruh codebase.
Setiap elemen baru, komponen baru, atau perubahan UI harus mematuhi semua aturan di bawah ini.

---

## F1 — Inner Radius

```
Inner radius = Outer radius – Padding
```

Sudut dalam harus selalu lebih kecil dari sudut luar, sesuai jarak padding-nya.

**Aturan:**
- Hitung: `r_inner = r_outer – padding`
- Jika hasil negatif → gunakan minimum `rounded` (4px)
- `rounded-full` (pill/avatar) dikecualikan — bukan nested, tidak perlu mengikuti formula

**Referensi cepat:**

| Outer | Padding | Inner |
|---|---|---|
| `rounded-3xl` (24px) | `p-5` (20px) | `rounded` (4px) |
| `rounded-2xl` (16px) | `p-4` (16px) | `rounded` (4px) |
| `rounded-2xl` (16px) | `p-3` (12px) | `rounded-sm` (4px) |
| `rounded-xl` (12px) | `px-4 py-3` (~16px) | `rounded` (4px) |
| `rounded-lg` (8px) | `p-2` (8px) | `rounded-sm` (4px) |

---

## F2 — Line Height

```
Line Height = Font size × 1.4 to 1.6
```

Setiap teks yang perlu dibaca harus memiliki line height cukup untuk kenyamanan baca.

**Aturan:**
- Gunakan `leading-[1.4]` hingga `leading-[1.6]` untuk semua teks body dan heading
- Gunakan `leading-normal` (1.5) sebagai default umum
- `leading-none` / `leading-tight` hanya boleh untuk teks dekoratif / single-line display

**Mapping Tailwind:**

| Tailwind class | Nilai | Keterangan |
|---|---|---|
| `leading-none` | 1.0 | Dekoratif saja |
| `leading-tight` | 1.25 | Hindari untuk body |
| `leading-snug` | 1.375 | Di bawah batas, hindari |
| `leading-normal` | 1.5 | ✓ Default aman |
| `leading-relaxed` | 1.625 | ✓ Untuk body panjang |
| `leading-[1.4]` | 1.4 | ✓ Minimum untuk heading |

---

## F3 — Font Size Scale

```
Next size = Current size × 1.25
```

Setiap ukuran font harus berada di dalam tangga skala ini, dibulatkan ke kelipatan 4px terdekat.

**Skala wajib (px):**

```
16 → 20 → 24 → 32 → 40 → 48 → 60 → 72
```

**Mapping Tailwind:**

| Pixel | Tailwind | Digunakan untuk |
|---|---|---|
| 16px | `text-base` | Body / label default |
| 20px | `text-xl` | Sub-label / emphasis |
| 24px | `text-2xl` | Sub-heading kecil |
| 32px | `text-[32px]` | Section heading |
| 40px | `text-[40px]` | Page heading |
| 48px | `text-5xl` | Hero sub |
| 60px | `text-[60px]` | Hero title medium |
| 72px | `text-[72px]` | Hero title besar |

> Hindari `text-lg` (18px), `text-3xl` (30px), `text-4xl` (36px) — tidak ada di skala.

---

## F4 — Spacing Scale

```
All spacing = multiples of 4px
```

Semua padding, margin, gap, dan dimensi spasial harus kelipatan 4px.

**Nilai yang dilarang:**

| Class | Nilai | Ganti dengan |
|---|---|---|
| `p-0.5` | 2px | `p-1` (4px) |
| `py-1.5` | 6px | `py-2` (8px) |
| `px-2.5` | 10px | `px-3` (12px) |
| `py-2.5` | 10px | `py-3` (12px) |
| `p-3.5` | 14px | `p-4` (16px) |
| `gap-0.5` | 2px | `gap-1` (4px) |
| `gap-1.5` | 6px | `gap-2` (8px) |
| `mt-0.5` | 2px | `mt-1` (4px) |
| `mt-1.5` | 6px | `mt-2` (8px) |
| `mb-1.5` | 6px | `mb-2` (8px) |

> Nilai `.5` dan `odd` dalam Tailwind (3, 5, 7, 9, 11, 13, 14...) umumnya tidak kelipatan 4 — periksa sebelum pakai.

---

## F5 — Touch Target Size

```
Minimum touch target = 44 × 44px
```

Setiap elemen interaktif (tombol, link, ikon klik) harus bisa disentuh dengan jari.

Referensi: Apple Human Interface Guidelines (44px), Google Material Design (48dp).

**Aturan:**
- Semua `<button>`, `<a>`, dan elemen interaktif → `min-w-[44px] min-h-[44px]`
- Untuk tombol teks: pastikan `py-` menghasilkan total tinggi ≥ 44px
- Untuk ikon kecil: tambahkan padding invisible atau wrapper `min-w-[44px] min-h-[44px] flex items-center justify-center`
- Elemen dekoratif (bukan klik) dikecualikan

**Kalkulasi tinggi tombol teks:**

| `py-` | Line height `text-sm` | Total |
|---|---|---|
| `py-2` (8px) | 20px | 36px ✗ |
| `py-3` (12px) | 20px | **44px ✓** |
| `py-4` (16px) | 20px | 52px ✓ |

> `h-11` di Tailwind = 44px — shortcut untuk dimensi tetap.

---

## F6 — Color Contrast

```
Contrast ratio = (L1 + 0.05) / (L2 + 0.05)
di mana L1 = luminance warna lebih terang, L2 = warna lebih gelap
```

**Standar minimum:**

| Konteks | Rasio minimum | Keterangan |
|---|---|---|
| Teks (body, label, heading) | **4.5:1** | WCAG AA |
| Ikon / UI element | **3:1** | WCAG AA Large |
| Background / dekoratif | Fleksibel | Tidak ada minimum ketat |

**Rasio warna utama (pada bg gelap `#000–#111`):**

| Token | Warna | Rasio pada hitam | Status |
|---|---|---|---|
| `text-primary` | `#FFFFFF` | 21:1 | ✓ |
| `text-secondary` | `#D1D5DB` | ~12.9:1 | ✓ |
| `text-muted` | `#9CA3AF` | ~7.8:1 | ✓ |
| `text-gold` | `#D6A75F` | ~9.96:1 | ✓ |
| `text-forest-text` | `#5AA88E` | ~7.7:1 | ✓ Gunakan untuk teks |
| `text-forest` | `#2F5D50` | ~2.8–3.1:1 | ✗ Hanya bg/fill saja |
| `text-white/50` | rgba(255,255,255,0.5) | ~5.84:1 | ✓ |
| `text-white/35` | rgba(255,255,255,0.35) | ~3.32:1 | ✗ Jangan untuk teks |
| `text-white/30` | rgba(255,255,255,0.3) | ~2.76:1 | ✗ |

**Aturan penggunaan forest:**
- `bg-forest`, `border-forest`, `fill-forest` → boleh pakai `#2F5D50`
- `text-forest` untuk teks/ikon yang harus terbaca → **gunakan `text-forest-text` (`#5AA88E`)**
- Hover state (`hover:text-forest`) → boleh tetap forest karena transient

---

## Ringkasan Cepat

| Formula | Aturan | Ingat |
|---|---|---|
| F1 Inner Radius | `r_inner = r_outer – padding` | Minimum 4px jika negatif |
| F2 Line Height | `leading × 1.4–1.6` | `leading-normal` untuk default |
| F3 Font Scale | `×1.25`, skala: 16→20→24→32→40→48→60→72 | Hindari `text-lg`, `text-3xl`, `text-4xl` |
| F4 Spacing | Kelipatan 4px | Hindari `.5` classes |
| F5 Touch Target | Min 44×44px | `py-3` untuk tombol teks, `min-h-[44px]` untuk ikon |
| F6 Contrast | Teks ≥4.5:1, Ikon ≥3:1 | Pakai `text-forest-text`, bukan `text-forest` |
