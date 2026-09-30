/**
 * คำนวณค่าโดยสารรถ NGV ในมหาวิทยาลัย
 * @param {number} distanceKm - ระยะทาง (กิโลเมตร)
 * @returns {number} ค่าโดยสาร (บาท)
 */
const calcFare = (distanceKm) => {
  // ตรวจสอบความถูกต้องของข้อมูล (ไม่ใช่ตัวเลข หรือ ระยะทางติดลบ)
  if (typeof distanceKm !== 'number' || isNaN(distanceKm) || distanceKm < 0) {
    return 0;
  }

  // ปัดเศษของกิโลเมตรขึ้น
  const roundedKm = Math.ceil(distanceKm);

  // กรณีไม่เกิน 2 กม. แรก
  if (roundedKm <= 2) {
    return 10;
  }

  // กรณีเกิน 2 กม. แรก: 10 บาท + (ระยะทางส่วนที่เกิน × 2 บาท)
  return 10 + (roundedKm - 2) * 2;
};

// ทดสอบ 3 กรณีตามเงื่อนไข
console.log('1.5 km:', calcFare(1.5)); // คาดหวัง: 10 (ปัดเป็น 2 กม. แรก)
console.log('2 km:', calcFare(2));     // คาดหวัง: 10 (2 กม. แรกพอดี)
console.log('7.2 km:', calcFare(7.2)); // คาดหวัง: 22 (ปัดเป็น 8 กม. -> 10 + (6 * 2))