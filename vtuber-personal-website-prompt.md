# Build Prompt: VTuber Personal Website — "ดวงจันทร์และผีเสื้อ" (Dreamy Blue Theme)

> ใช้เอกสารนี้เป็น prompt ป้อนให้ AI coding agent (เช่น Claude Code, v0, Cursor ฯลฯ) เพื่อ build เว็บไซต์ personal สำหรับ VTuber โทนสีฟ้า-น้ำเงิน บรรยากาศฝันๆ ดึงแรงบันดาลใจจากโบสถ์กอทิกและผีเสื้อกลางคืน

---

## 1. ภาพรวมโปรเจกต์

สร้างเว็บไซต์ personal page สำหรับ VTuber คนหนึ่ง โทนธีม **"คืนพระจันทร์สีน้ำเงินในมหาวิหารดอกไม้"** — หรูหรา ฝันๆ ลึกลับนิดๆ (dreamcore / fantasy) ไม่ใช่สไตล์ corporate/portfolio ทั่วไป เว็บต้องมี:

- Animation ที่สวยงาม นุ่มนวล ไม่รก (ผีเสื้อบิน, ประกายดาวกระพริบ, ฝุ่นลอย, พระจันทร์เปล่งแสง)
- Hero section ที่มีตัวละคร VTuber เป็นจุดเด่น
- เครื่องเล่นเพลงแบบลอย (floating music widget)
- ระบบ Admin หลังบ้านแก้ไขข้อมูลได้ทุกส่วนโดยไม่ต้อง redeploy โค้ด
- Deploy ขึ้น Vercel ได้ทันทีแบบ out-of-the-box

**อ้างอิงสไตล์จาก `example.jfif`** — ไม่ใช่ copy ตรงๆ แต่ให้ดึงองค์ประกอบเหล่านี้มาปรับใช้:
- การ์ดเครื่องเล่นเพลงมุมขวาบน (cover art, ชื่อเพลง/ศิลปิน, ปุ่ม play/pause, progress bar)
- แถบสี palette 3 วงกลมด้านซ้ายบน (โทนฟ้า-น้ำเงินไล่เฉด)
- ข้อความคำคม overlay สไตล์ตัวเอียง เช่น "Stars can't shine without darkness"
- โลโก้ตัวอักษรตัวใหญ่แบบ bubble outline (คล้ายคำว่า "Chunxià") พร้อม element ประดับ (ดาว, ใบไม้)
- แถบไอคอนกลมลอย (dock) ด้านล่างสำหรับโซเชียล/เมนู
- ปุ่ม Follow / Message แบบ rounded pill
- ตัวละครที่ตัดขอบ (cutout) วางเยื้องขวา เลยขอบจอ

---

## 2. Design Token System

*(ตาม design principle: ต้องมี "signature element" ที่จำได้ ไม่ใช่ template ทั่วไป)*

**Signature element ของเว็บนี้:** ซุ้มโค้งกอทิกจาก `bg.png` ที่มีพวงดอกไม้ห้อยพาดผ่าน — ใช้เป็นกรอบแบ่ง section ซ้ำๆ ทั่วเว็บ ผสานกับลวดลายพระจันทร์เสี้ยว+ผีเสื้อที่ไล่ตามกันตลอดหน้า (แทนการใช้ numbered marker/emoji ทั่วไป)

**Color (โทนอ้างอิงจากภาพที่ส่งมา ปรับ hex ได้ตอน implement):**
- `--moon-white` #F7F8FC (พื้นตัวอักษร/การ์ด)
- `--sky-light` #A9C6EC (ฟ้าอ่อน)
- `--periwinkle` #5B7FC4 (ฟ้ากลาง — สีหลักปุ่ม/ลิงก์)
- `--midnight` #1C2A52 (กรมท่าเข้ม — พื้นหลังเข้ม/ตัวอักษร)
- `--violet-glow` #6A4FC2 (ม่วงจากแสงกระจกสีในโบสถ์ ใช้เป็น gradient accent)
- `--gold-accent` #C9A24B (จากปีกผีเสื้อทอง ใช้จุดเน้นเล็กๆ เท่านั้น ห้ามใช้เกลื่อน)

**Typography:**
- Display/โลโก้: ฟอนต์กลมมนแบบ bubble (เช่น Baloo 2 / Fredoka) — ใช้กับชื่อ VTuber เท่านั้น
- Body: ฟอนต์ sans อ่านง่าย โค้งมน (เช่น Quicksand / Poppins)
- Accent/คำคม: ฟอนต์ script หรือ serif italic (เช่น Playfair Display Italic) ใช้เฉพาะ tagline

**Layout concept:** เว็บแบบ single-page scroll ผ่าน "ซุ้มโบสถ์" ทีละช่วง แต่ละ section คือหนึ่งซุ้มโค้ง มี parallax เบาๆ ระหว่างเลื่อน

---

## 3. พื้นหลัง (Background)

ใช้ `bg.png` (ภาพภายในมหาวิหารกอทิกโทนฟ้า-ม่วง มีพวงดอกไม้ห้อย) เป็นพื้นหลังหลักแบบ full-bleed:

- Blur พื้นหลัง ~8–14px + ใส่ overlay สีเข้ม/desaturate เล็กน้อย ให้ตัวอักษรและ element อื่นอ่านง่าย
- เพิ่ม layer ฝุ่น/dust motes ลอยเบาๆ (canvas หรือ CSS particles) สีขาว/ฟ้าอ่อน opacity ต่ำ ลอยขึ้นช้าๆ แบบสุ่ม เพื่อให้ได้ atmosphere ขลังๆ
- อาจทำ parallax เล็กน้อยตอน scroll เพื่อความมีมิติ

---

## 4. ตัวละคร VTuber (Hero)

ใช้ไฟล์ `vtuber.png` และ `vtuber2.png` (ภาพตัวละครเต็มตัว/ครึ่งตัว 2 ท่า):

- วาง hero character เยื้องด้านหนึ่งของจอ (คล้าย example.jfif) มี glow นุ่มๆ ด้านหลัง
- Idle animation: float ขึ้นลงเบาๆ วนลูป (translateY amplitude น้อยๆ)
- ทำสลับภาพระหว่าง `vtuber.png` ↔ `vtuber2.png` ได้ เช่น hover/คลิกเพื่อ "เปลี่ยนชุด/มุม" หรือ crossfade ตาม section ที่ scroll ถึง

---

## 5. รายการรูป Element ทั้งหมด (ใช้ชื่อไฟล์ตามที่แนบเป๊ะๆ)

### กลุ่มเส้นดำ → **ต้องถมสีขาว** (ใช้ CSS filter เช่น `filter: brightness(0) invert(1)` เพราะเป็นภาพ transparent PNG เส้นดำล้วน) เพื่อให้ตัดกับพื้นหลังเข้ม:

| ไฟล์ | ลักษณะ | การใช้งานแนะนำ |
|---|---|---|
| `Moon_Computer_Icons_PNG-removebg-preview.png` | พระจันทร์เสี้ยว+เมฆ+ดาว | ไอคอนหลักมุมหนึ่งของ hero, เปล่งแสง glow pulse |
| `Sparkles_Decal___Vinyl_Car_Decal___Window_Decal___Laptop_Decal___Vinyl_Sticker-removebg-preview.png` | กลุ่มประกายดาว (ไม่สมมาตร) | กระจายประดับรอบตัวละคร กระพริบ (opacity/scale pulse) |
| `download__10_-removebg-preview.png` | กลุ่มประกายดาว 3 ดวง | ใช้แทรกระหว่าง section เป็นตัวคั่น |
| `download__11_-removebg-preview.png` | พระจันทร์เสี้ยว+ดาวห้อยแบบ dreamcatcher | เหมาะเป็น decorative element ท้ายหน้า/footer |
| `download__12_-removebg-preview.png` | พระจันทร์เสี้ยว+ผีเสื้อ+ดาว | โมทีฟหลักซ้ำในหลาย section (ตัวแทน signature) |
| `download__13_-removebg-preview.png` | ภาพเส้น แมวเล่นกับผีเสื้อ | ใช้ใน section About/เกร็ดเล็กเกร็ดน้อย ให้ความเป็นกันเอง |
| `download__14_-removebg-preview.png` | โน้ตดนตรี+ดาว สไตล์ doodle | ใช้ประดับรอบ music player widget |

### กลุ่มสี (คงสีเดิม ห้ามถมขาว):

| ไฟล์ | ลักษณะ | การใช้งานแนะนำ |
|---|---|---|
| `Free_Blue_Floral_Watercolor_PNG_Clipart-removebg-preview.png` | ช่อดอกไม้สีน้ำเงิน-ทอง | มุมกรอบ section / ตัวคั่นหัวข้อ |
| `mq__blue__butterfly__animal__flying__fall_-_Swallowtail_Butterfly__HD_Png_Download_1024x1024__-_PngFind-removebg-preview.png` | ฝูงผีเสื้อสีฟ้ากระจายตัว | บินลอยผ่านจอแบบสุ่มเส้นทาง ต่อเนื่องทั้งเว็บ |
| `Download_premium_png_of_Blue_butterfly_png_border__watercolor_collage_element__transparent_background_by_Aew_about_butterfly_png__blue_butterfly_png__blue_butterfly__flying_butterfly_png__and_butterfl.png` | กลุ่มผีเสื้อสีฟ้าสไตล์ monarch | ใช้เป็นกรอบขอบภาพ gallery หรือ transition ระหว่าง section |

**ข้อกำหนดสำคัญ:** เก็บชื่อไฟล์ทั้งหมดตรงตามต้นฉบับ 100% (รวม path ใน `/public/images/`) เพื่อให้ผู้ใช้ลากไฟล์แทนที่ได้โดยไม่ต้องแก้โค้ด

---

## 6. Animation & Interaction Checklist

- [ ] ผีเสื้อสี (colored) บินลอยข้ามจอเป็น loop เส้นทางหลากหลาย ความเร็วต่างกัน กระพือปีกเบาๆ (scale/skew pulse)
- [ ] ประกายดาว (ขาว หลังถมสี) กระพริบ opacity/scale พร้อม delay สุ่มไม่พร้อมกัน
- [ ] พระจันทร์: glow pulse เบาๆ + หมุน/ลอยขึ้นลงช้าๆ
- [ ] ฝุ่น dust พื้นหลัง: ลอยขึ้นช้าๆ วนลูป opacity ต่ำ
- [ ] Music player: แถบ equalizer เต้นตอนเล่นเพลง, progress bar เคลื่อนตามเวลาเพลง
- [ ] Section เข้าจอ (scroll reveal): fade + slide-up นุ่มๆ (Framer Motion `whileInView`)
- [ ] ตัวละคร VTuber: float idle + (ถ้าต้องการ) parallax เอียงตามเมาส์เบาๆ
- [ ] เคารพ `prefers-reduced-motion` — ปิด/ลด animation อัตโนมัติสำหรับผู้ใช้ที่ตั้งค่านี้

---

## 7. โครงสร้างหน้าเว็บ (Sections)

1. **Hero** — โลโก้ชื่อ VTuber (bubble font), tagline คำคม, ตัวละครหลัก, element ลอยรอบๆ, ปุ่ม Follow/Message, แถบไอคอนโซเชียลแบบ dock ด้านล่าง
2. **About** — bio, วันเกิด, ส่วนสูง, นิสัย, สิ่งที่ชอบ/ไม่ชอบ (ทุก field แก้ผ่าน admin ได้)
3. **Music Player** — widget ลอยแบบ persistent (ติดตามตอน scroll) เล่น/หยุด, playlist หลายเพลง
4. **Gallery** — `vtuber.png` / `vtuber2.png` + ภาพแฟนอาร์ต/สตรีม ในกรอบผีเสื้อ/ดอกไม้
5. **Schedule** — ตารางไลฟ์/กิจกรรม
6. **Socials** — ไอคอนลิงก์ (X, YouTube, Twitch, Instagram, Discord ฯลฯ) สไตล์ dock กลม
7. **Footer** — เครดิต, ลิขสิทธิ์, ลิงก์กลับด้านบน

---

## 8. ระบบ Admin / CMS

- Route แยก `/admin` มี login (password เดียวพอสำหรับ MVP หรือใช้ NextAuth ถ้าต้องการปลอดภัยขึ้น)
- แก้ไขได้ทุกส่วนโดยไม่ต้อง redeploy:
  - ชื่อเว็บ/โลโก้ข้อความ, tagline/คำคม
  - เนื้อหา About (bio, วันเกิด, นิสัย ฯลฯ)
  - ลิงก์โซเชียลทั้งหมด + ไอคอน
  - Playlist เพลง (ชื่อเพลง, ศิลปิน, ไฟล์เสียง/URL, cover art)
  - ตาราง schedule/กิจกรรม
  - ภาพ gallery (upload/ลบ)
  - โทนสี palette (3 สีหลัก) และภาพพื้นหลัง/ตัวละครหลัก
  - เปิด/ปิด element ตกแต่งแต่ละชิ้น
- เก็บข้อมูลด้วยระบบที่ใช้งานได้บน Vercel serverless (เช่น Vercel KV, Vercel Postgres, หรือ Supabase) — **หลีกเลี่ยงการเขียนไฟล์ local/SQLite แบบตรงๆ** เพราะ filesystem บน Vercel เป็น read-only/ephemeral
- บันทึกแล้วเว็บหน้าบ้านอัปเดตทันที (revalidate/ISR หรือ fetch จาก DB ตรงๆ)

---

## 9. Tech Stack & Deployment

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion (+ Canvas/CSS สำหรับ dust particles)
- **Data:** Vercel KV หรือ Supabase (ระบุ .env ที่ต้องใช้ใน `.env.example`)
- **Deploy target:** Vercel — ต้อง build/deploy ได้ทันทีหลัง `vercel deploy` โดยไม่ต้องแก้ config เพิ่ม
- ต้องมี `README.md` อธิบายขั้นตอน setup, ตัวแปร env ที่ต้องตั้งใน Vercel dashboard, และวิธีเข้าถึง `/admin`

**โครงสร้างไฟล์ที่แนะนำ:**
```
/public/images/
  example.jfif
  bg.png
  vtuber.png
  vtuber2.png
  Free_Blue_Floral_Watercolor_PNG_Clipart-removebg-preview.png
  Moon_Computer_Icons_PNG-removebg-preview.png
  mq__blue__butterfly__animal__flying__fall_-_Swallowtail_Butterfly__HD_Png_Download_1024x1024__-_PngFind-removebg-preview.png
  Sparkles_Decal___Vinyl_Car_Decal___Window_Decal___Laptop_Decal___Vinyl_Sticker-removebg-preview.png
  download__10_-removebg-preview.png
  download__11_-removebg-preview.png
  download__12_-removebg-preview.png
  download__13_-removebg-preview.png
  download__14_-removebg-preview.png
  Download_premium_png_of_Blue_butterfly_png_border__watercolor_collage_element__transparent_background_by_Aew_about_butterfly_png__blue_butterfly_png__blue_butterfly__flying_butterfly_png__and_butterfl.png
/app
  /(site)/page.tsx        ← หน้าแรก
  /admin/...               ← ระบบหลังบ้าน
  /api/...                 ← API routes สำหรับ CMS
```

---

## 10. ข้อควรระวัง (ตาม design principle)

- อย่าให้หน้าตาออกมาเป็น template AI ทั่วไป (พื้นครีม+ส้มอิฐ, พื้นดำ+เขียวนีออน, หรือ layout หนังสือพิมพ์เส้นบางๆ) — ต้อง "ฝันๆ กอทิก-ฟ้า" ตามภาพอ้างอิงจริง
- Animation ต้อง "พอดี" ไม่ล้นจนรก — เลือก 1 signature moment (เช่น hero) ให้เด่นสุด ที่เหลือให้เบาและนิ่ง
- รองรับ responsive ถึงมือถือ, มี visible keyboard focus, และเคารพ `prefers-reduced-motion`
