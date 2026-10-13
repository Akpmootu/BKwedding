/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT: E-WEDDING CARD BACKEND (RSVP, GUESTBOOK & SLIP UPLOAD)
 * Wedding of Beau & Kim (#BeauKimEverAfter)
 * Target Account: akaporn1234@gmail.com
 * ==============================================================================
 * โค้ดนี้ใช้ติดตั้งใน Google Sheets > Extensions > Apps Script
 * รองรับ:
 * 1. บันทึก RSVP ลงชีต "RSVP"
 * 2. บันทึกคำอวยพร Guestbook ลงชีต "Wishes"
 * 3. บันทึกคอมเมนต์รูปภาพแกลเลอรี ลงชีต "PhotoComments"
 * 4. รับไฟล์ภาพสลิปโอนเงิน (Special Gift) บันทึกลง Google Drive โฟลเดอร์ "Wedding_BeauKim_Slips"
 *    และบันทึกข้อมูลพร้อมลิงก์ไฟล์ลงชีต "Gifts & Slips"
 * 5. คืนค่า JSON พร้อมจัดการ CORS สำหรับ Vercel และ GitHub Pages
 */

const SHEET_NAME_RSVP = "RSVP";
const SHEET_NAME_WISHES = "Wishes";
const SHEET_NAME_GIFTS = "Gifts & Slips";
const SHEET_NAME_PHOTO_COMMENTS = "PhotoComments";
const DRIVE_FOLDER_NAME = "Wedding_BeauKim_Slips";

/**
 * Handle POST Requests from Wedding Website
 */
function doPost(e) {
  try {
    let data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const type = data.type || "rsvp";
    const timestamp = new Date();

    // 1. RSVP SUBMISSION
    if (type === "rsvp") {
      let rsvpSheet = ss.getSheetByName(SHEET_NAME_RSVP);
      if (!rsvpSheet) {
        rsvpSheet = ss.insertSheet(SHEET_NAME_RSVP);
        rsvpSheet.appendRow([
          "วัน-เวลา (Timestamp)",
          "ชื่อ-นามสกุล",
          "เบอร์โทรศัพท์",
          "การเข้าร่วมงาน",
          "จำนวนผู้ติดตาม (คน)",
          "ฝ่ายแขก",
          "อาหารที่แพ้/มังสวิรัติ",
          "คำอวยพร"
        ]);
        rsvpSheet.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#F8D8E8");
      }

      rsvpSheet.appendRow([
        timestamp,
        data.name || "-",
        data.phone || "-",
        data.attendance === "attend" ? "ยินดีเข้าร่วมงาน" : "ไม่สะดวกเข้าร่วมงาน",
        data.followers || "0",
        data.side || "-",
        data.diet || "-",
        data.wishes || "-"
      ]);

      if (data.wishes && data.wishes.trim() !== "" && data.wishes.trim() !== "-") {
        saveWishToSheet(ss, timestamp, data.name, data.wishes);
      }

      return createJsonResponse({
        status: "success",
        message: "RSVP recorded successfully"
      });

    // 2. GUESTBOOK WISH
    } else if (type === "wish") {
      saveWishToSheet(ss, timestamp, data.name, data.message || data.wishes);
      return createJsonResponse({
        status: "success",
        message: "Wish recorded successfully"
      });

    // 3. PHOTO COMMENT
    } else if (type === "photo_comment") {
      let pcSheet = ss.getSheetByName(SHEET_NAME_PHOTO_COMMENTS);
      if (!pcSheet) {
        pcSheet = ss.insertSheet(SHEET_NAME_PHOTO_COMMENTS);
        pcSheet.appendRow([
          "วัน-เวลา (Timestamp)",
          "รหัสรูปภาพ (Photo ID)",
          "ชื่อผู้คอมเมนต์",
          "ข้อความคอมเมนต์"
        ]);
        pcSheet.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#E8F0E5");
      }

      pcSheet.appendRow([
        timestamp,
        data.photoId || "photo",
        data.name || "แขกผู้มีเกียรติ",
        data.comment || ""
      ]);

      return createJsonResponse({
        status: "success",
        message: "Photo comment recorded successfully"
      });

    // 4. GIFT SLIP UPLOAD (บันทึกรูปสลิปลง Google Drive + บันทึกลง Sheet)
    } else if (type === "slip_upload") {
      let fileUrl = "";

      // บันทึกไฟล์ภาพสลิปลง Google Drive
      if (data.slipBase64) {
        try {
          const folder = getOrCreateFolder(DRIVE_FOLDER_NAME);
          const base64Data = data.slipBase64.replace(/^data:image\/\w+;base64,/, "");
          const decodedBytes = Utilities.base64Decode(base64Data);
          const fileName = `Slip_${Utilities.formatDate(timestamp, "Asia/Bangkok", "yyyyMMdd_HHmmss")}_${(data.name || "Guest").replace(/\s+/g, "_")}.jpg`;
          const blob = Utilities.newBlob(decodedBytes, data.mimeType || "image/jpeg", fileName);
          
          const file = folder.createFile(blob);
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          fileUrl = file.getUrl();
        } catch (driveErr) {
          fileUrl = "Error saving file: " + driveErr.toString();
        }
      }

      // บันทึกลงในชีต Gifts & Slips
      let giftSheet = ss.getSheetByName(SHEET_NAME_GIFTS);
      if (!giftSheet) {
        giftSheet = ss.insertSheet(SHEET_NAME_GIFTS);
        giftSheet.appendRow([
          "วัน-เวลา (Timestamp)",
          "ชื่อผู้โอน",
          "จำนวนเงิน (บาท)",
          "ลิงก์ไฟล์สลิป (Google Drive)",
          "คำอวยพร"
        ]);
        giftSheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#FDF1F5");
      }

      giftSheet.appendRow([
        timestamp,
        data.name || "-",
        data.amount || "-",
        fileUrl || "-",
        data.message || "-"
      ]);

      // หากมีคำอวยพร ส่งต่อไปยังชีต Wishes ด้วย
      if (data.message && data.message.trim() !== "" && data.message.trim() !== "-") {
        saveWishToSheet(ss, timestamp, data.name, data.message);
      }

      return createJsonResponse({
        status: "success",
        message: "Slip and gift information recorded successfully",
        fileUrl: fileUrl
      });
    }

    return createJsonResponse({
      status: "error",
      message: "Unknown request type"
    });

  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

/**
 * Handle GET Requests (ดึงคำอวยพร และคอมเมนต์ล่าสุด)
 */
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const type = e.parameter.type || "wishes";

    if (type === "wishes") {
      const wishSheet = ss.getSheetByName(SHEET_NAME_WISHES);
      if (!wishSheet) return createJsonResponse({ status: "success", wishes: [] });

      const rows = wishSheet.getDataRange().getValues();
      if (rows.length <= 1) return createJsonResponse({ status: "success", wishes: [] });

      const dataRows = rows.slice(1).reverse().slice(0, 50);
      const wishes = dataRows.map(row => ({
        timestamp: row[0] instanceof Date ? Utilities.formatDate(row[0], "Asia/Bangkok", "yyyy-MM-dd HH:mm") : String(row[0]),
        name: row[1] || "แขกผู้มีเกียรติ",
        message: row[2] || ""
      }));

      return createJsonResponse({ status: "success", wishes: wishes });

    } else if (type === "photo_comments") {
      const pcSheet = ss.getSheetByName(SHEET_NAME_PHOTO_COMMENTS);
      if (!pcSheet) return createJsonResponse({ status: "success", comments: [] });

      const rows = pcSheet.getDataRange().getValues();
      if (rows.length <= 1) return createJsonResponse({ status: "success", comments: [] });

      const photoId = e.parameter.photoId;
      let dataRows = rows.slice(1).reverse();
      if (photoId) {
        dataRows = dataRows.filter(r => String(r[1]) === String(photoId));
      }

      const comments = dataRows.slice(0, 50).map(row => ({
        timestamp: row[0] instanceof Date ? Utilities.formatDate(row[0], "Asia/Bangkok", "yyyy-MM-dd HH:mm") : String(row[0]),
        photoId: row[1] || "",
        name: row[2] || "แขกผู้มีเกียรติ",
        comment: row[3] || ""
      }));

      return createJsonResponse({ status: "success", comments: comments });
    }

    return createJsonResponse({ status: "success", message: "OK" });

  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

/**
 * ฟังก์ชันช่วยบันทึกคำอวยพรลงชีต Wishes
 */
function saveWishToSheet(ss, timestamp, name, message) {
  let wishSheet = ss.getSheetByName(SHEET_NAME_WISHES);
  if (!wishSheet) {
    wishSheet = ss.insertSheet(SHEET_NAME_WISHES);
    wishSheet.appendRow([
      "วัน-เวลา (Timestamp)",
      "ชื่อผู้ส่ง",
      "ข้อความอวยพร"
    ]);
    wishSheet.getRange(1, 1, 1, 3).setFontWeight("bold").setBackground("#DFE7DC");
  }

  wishSheet.appendRow([
    timestamp,
    name || "แขกผู้มีเกียรติ",
    message || ""
  ]);
}

/**
 * ฟังก์ชันหาหรือสร้างโฟลเดอร์ใน Google Drive
 */
function getOrCreateFolder(folderName) {
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(folderName);
}

/**
 * สร้าง JSON Response ที่รองรับ CORS
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
