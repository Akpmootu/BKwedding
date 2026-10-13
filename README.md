# 🌸 เว็บการ์ดแต่งงานออนไลน์ระดับพรีเมียม (E-Wedding Card)
### The Wedding of Beau & Kim (#BeauKimEverAfter)

เว็บไซต์การ์ดแต่งงานออนไลน์ระดับพรีเมียม สไตล์ **Luxury Botanical** โทนชมพู-เขียว ออกแบบด้วยแนวคิด **Mobile-First** ลื่นไหล สวยงาม เปิดดูบน LINE ได้สมบูรณ์แบบ รองรับการ Deploy บน Vercel, Netlify และ GitHub Pages ได้ทันที

---

## 📋 ไฮไลต์การปรับแต่งล่าสุด (Latest Updates)

1. **หน้าปกการ์ดเชิญ (Opening Envelope Cover):**
   - ใช้ภาพ `S__122060825_0.jpg` (ภาพคู่บ่าวสาวในสนามหญ้าพร้อมตรา `nw 20 . 11 . 26`) แสดงเป็นภาพปกแบบเต็มจอ สวยงามตระการตา
   - ป้ายชื่อแขก `เรียน คุณสมชาย` (ดึงจากลิงก์ `?to=...` อัตโนมัติ)
   - ตราประทับครั่ง Wax Seal พร้อมแอนิเมชันเปิดการ์ด และเริ่มเล่นเพลงพื้นหลัง
2. **หน้าแรกหลังเปิดการ์ด (First Section):**
   - แสดงภาพการ์ดแต่งงานทางการแผ่นหลัง `S__122060826_0.jpg` ในกรอบ Rose Gold สวยหรู
   - มีปุ่มแตะเพื่อซูมดูการ์ดขนาดเต็มจอ (Full-screen Lightbox)
3. **รูปภาพคั่นระหว่าง Section (Random Image Dividers):**
   - นำภาพถ่ายพรีเวดดิ้งจาก `pre-wedding` มาแสดงเป็นภาพแบนเนอร์คั่นในแต่ละช่วงของหน้าเว็บ
4. **Countdown & Add to Calendar:**
   - นับถอยหลังสู่วันที่ **20 พฤศจิกายน พ.ศ. 2569** (วัน : ชั่วโมง : นาที)
   - รวมปุ่ม **"บันทึกลง Google Calendar"** และปุ่มดาวน์โหลดไฟล์ **`.ics`** สำหรับผู้ใช้ iPhone ไว้ใน Section นี้
5. **Wedding Schedule (ไทม์ไลน์สไตล์ Journey to Marriage):**
   - กำหนดการวันงาน (แห่ขันหมาก 08.09 น., หลั่งน้ำพระพุทธมนต์ 09.39 น., ฉลองมงคลสมรส 18.00 น.) พร้อมเรื่องราวความรัก ออกแบบเป็นไทม์ไลน์แนวตั้งประดับโบว์ริบบิ้น SVG ตามสไตล์ภาพอ้างอิง `9.png`
6. **Wedding Venue:**
   - แผนที่ Google Maps แบบฝัง พร้อมปุ่ม **"เปิดแผนที่ Google Maps"** ไปยังโรงแรมคริสตัล หาดใหญ่
7. **Pre-Wedding Gallery (ระบบอินเทอร์แอคทีฟครบวงจร):**
   - แสดงภาพพรีเวดดิ้งจากโฟลเดอร์ `pre-wedding`
   - แตะดูภาพขนาดเต็ม (Lightbox)
   - **กดไลค์รูปภาพ (Like Counter):** มีหัวใจสีแดงและนับจำนวนไลค์
   - **ดาวน์โหลดรูปภาพ:** ปุ่มบันทึกภาพความละเอียดสูง
   - **คอมเมนต์รูปภาพ:** มีช่องให้แขกเขียนข้อความแสดงความยินดีในแต่ละรูปภาพได้
8. **Special Gift (ซองดิจิทัล & อัปโหลดสลิป):**
   - QR Code พร้อมเพย์ + ธนาคารกรุงศรีอยุธยา + ปุ่มคัดลอกเลขพร้อมเพย์
   - ฟอร์ม **"แจ้งการโอนเงิน & ส่งของขวัญ"** สำหรับอัปโหลดภาพสลิป พร้อมระบุชื่อ ยอดเงิน และคำอวยพร
   - สลิปจะถูกบันทึกเข้า **Google Drive** และข้อมูลจะถูกบันทึกลง **Google Sheets** ของคุณ `akaporn1234@gmail.com`
9. **Contact Us:**
   - การ์ดติดต่อพร้อมภาพถ่าย Portrait ของเจ้าสาว (โบ) และเจ้าบ่าว (คิม)
10. **เครดิตผู้จัดทำ:**
    - เครดิต `powered by.mootu` แนบลิงก์ไปยัง [https://www.facebook.com/Mootu00/](https://www.facebook.com/Mootu00/)

---

## ☁️ ขั้นตอนการตั้งค่า Google Sheets & Google Drive (เมลล์ akaporn1234@gmail.com)

เพื่อให้ระบบ RSVP, คำอวยพร Guestbook, คอมเมนต์รูปภาพ และการอัปโหลดภาพสลิป บันทึกลงในบัญชี Google ของคุณ `akaporn1234@gmail.com`:

### ขั้นตอนที่ 1: สร้าง Google Sheets
1. ล็อกอินเข้า Google ด้วยบัญชี **`akaporn1234@gmail.com`**
2. ไปที่ [Google Sheets](https://sheets.new) และสร้าง Spreadsheet ใหม่ (ตั้งชื่อ เช่น *"Beau & Kim Wedding RSVP"*)
3. ที่เมนูด้านบน คลิก **ส่วนขยาย (Extensions)** > **Apps Script**

### ขั้นตอนที่ 2: วางโค้ด Backend
1. ลบโค้ดเริ่มต้นใน Apps Script ออก
2. เปิดไฟล์ **`apps-script/Code.gs`** ในโปรเจกต์นี้ คัดลอกโค้ดทั้งหมดไปวางลงใน Apps Script
3. กดบันทึก (ไอคอนแผ่นดิสก์ 💾)

### ขั้นตอนที่ 3: Deploy เป็น Web App
1. คลิกปุ่มสีน้ำเงิน **ทำให้ใช้งานได้ (Deploy)** > **การทำให้ใช้งานได้ใหม่ (New deployment)**
2. คลิกไอคอนฟันเฟือง ⚙️ ด้านซ้าย เลือกประเภทเป็น **เว็บแอป (Web app)**
3. ตั้งค่าดังนี้:
   - **คำอธิบาย (Description):** Wedding API v1
   - **ดำเนินการในฐานะ (Execute as):** **ฉัน (Me - akaporn1234@gmail.com)**
   - **ผู้ที่มีสิทธิ์เข้าถึง (Who has access):** **ทุกคน (Anyone)** *(สำคัญมาก ต้องเลือก Anyone เพื่อให้หน้าเว็บส่งข้อมูลเข้ามาได้)*
4. คลิก **ทำให้ใช้งานได้ (Deploy)**
5. กดยอมรับสิทธิ์การเข้าถึง (Authorize Access) และเลือกบัญชี `akaporn1234@gmail.com`
6. คัดลอก **URL ของเว็บแอป (Web App URL)** ที่ลงท้ายด้วย `/exec`

### ขั้นตอนที่ 4: เชื่อมต่อกับเว็บ
เปิดไฟล์ **`js/config.js`** แล้ววาง URL ที่คัดลอกมาลงในช่อง `appsScriptUrl`:
```javascript
appsScriptUrl: "https://script.google.com/macros/s/AKfycb.../exec",
```

> **หมายเหตุการทำงานของ Google Drive:**  
> เมื่อแขกอัปโหลดภาพสลิป ระบบจะสร้างโฟลเดอร์ชื่อ **`Wedding_BeauKim_Slips`** ใน Google Drive ของคุณ `akaporn1234@gmail.com` ให้อัตโนมัติ และบันทึกลิงก์ของไฟล์สลิปนั้นลงในชีต **`Gifts & Slips`** ทันทีครับ

---

## 🚀 ขั้นตอนการนำขึ้น GitHub และ Deploy บน Vercel

### วิธีที่ 1: ผ่าน Git CLI (แนะนำ)
1. เปิด Terminal ในโฟลเดอร์ `d:\BKwedding`:
   ```bash
   git init
   git add .
   git commit -m "Initial release of Beau & Kim Wedding Card"
   ```
2. สร้าง Repository ใหม่บน [GitHub.com](https://github.com/new) (เช่นชื่อ `bkwedding`)
3. เชื่อมต่อและ Push โค้ด:
   ```bash
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/bkwedding.git
   git branch -M main
   git push -u origin main
   ```
4. เข้าไปที่ [Vercel.com](https://vercel.com) ล็อกอินด้วยบัญชี GitHub
5. คลิก **Add New...** > **Project** แล้วกด **Import** โปรเจกต์ `bkwedding`
6. ไม่ต้องเปลี่ยนค่าใดๆ (Framework Preset: Other) แล้วกด **Deploy**
7. เว็บไซต์จะออนไลน์พร้อมใช้งานได้ทันที เช่น `https://bkwedding.vercel.app`

---

## 💌 การสร้างลิงก์เชิญแขกส่วนตัว (?to=...)

สามารถส่งลิงก์ระบุชื่อแขกใน LINE / Messenger เพื่อให้ชื่อแขกปรากฏบนซองจดหมายหน้าแรก:

* `https://your-domain.vercel.app/?to=คุณสมชาย`
* `https://your-domain.vercel.app/?to=พี่เบิร์ดและครอบครัว`
* `https://your-domain.vercel.app/?to=เพื่อนๆแก๊งมหาวิทยาลัย`

---

## 💻 การทดสอบในเครื่องคอมพิวเตอร์
รันคำสั่ง:
```bash
npm run dev
```
เปิดดูได้ที่ `http://localhost:3000/?to=คุณสมชาย`

---
© 2026 Beau & Kim Wedding (#BeauKimEverAfter) | Powered by. Mootu
