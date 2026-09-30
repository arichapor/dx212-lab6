# Prompts Log - Lab 6

## Part A1 - prompt แย่

**Prompt:** เขียนฟังก์ชันคำนวณค่ารถให้หน่อย

**ผลลัพธ์ย่อ:** AI ไม่เขียนโค้ดทันที แต่ถามกลับ 2 ข้อ คือ (1) โจทย์คำนวณค่ารถเป็นแบบไหน (2) อยากให้เขียนด้วยภาษาอะไร เพราะ prompt ไม่ระบุภาษา อัตราค่าโดยสาร และเงื่อนไขใด ๆ เลย

**ตรวจแล้ว:** ไม่ได้รันโค้ด (ตามที่ชีทกำหนด) — prompt สั้นเกินไป AI จึงไม่มีข้อมูลพอจะเขียนโค้ดที่ใช้ได้จริง

## Part A2 - calcFare

**Prompt:**

```
คุณคือนักพัฒนา JavaScript อาวุโส

เขียนฟังก์ชัน calcFare(distanceKm)

สำหรับแอปรถ NGV ในมหาวิทยาลัย: 2 กม.แรก 10 บาท กม.ถัดไปคิด กม.ละ 2 บาท
เศษของกิโลเมตรปัดขึ้น ระยะทางติดลบหรือไม่ใช่ตัวเลขให้คืน 0

ใช้ ES6 arrow function, ไม่ใช้ library ภายนอก, มี comment ภาษาไทยสั้น ๆ

ตอบเป็นโค้ดอย่างเดียว ตามด้วย console.log ทดสอบ 3 กรณี: 1.5, 2, 7.2
```

**ผลลัพธ์ย่อ:** ได้ฟังก์ชัน `calcFare` แบบ arrow function ตรวจข้อมูลที่ไม่ใช่ตัวเลข/ติดลบแล้วคืน 0, ใช้ `Math.ceil` ปัดเศษขึ้น, ไม่เกิน 2 กม. คิด 10 บาท, เกินจากนั้นคิด 10 + (กม.ที่เกิน × 2) พร้อม console.log ทดสอบ 3 กรณี

```javascript
const calcFare = (distanceKm) => {
  if (typeof distanceKm !== 'number' || isNaN(distanceKm) || distanceKm < 0) {
    return 0;
  }
  const roundedKm = Math.ceil(distanceKm);
  if (roundedKm <= 2) {
    return 10;
  }
  return 10 + (roundedKm - 2) * 2;
};

console.log('1.5 km:', calcFare(1.5));
console.log('2 km:', calcFare(2));
console.log('7.2 km:', calcFare(7.2));
```

**ตรวจแล้ว:** ใช้ได้ — รัน `node a_fare.js` แล้วได้ผลตรงกับที่คำนวณด้วยมือทั้ง 3 กรณี
1.5 km: 10
2 km: 10
7.2 km: 22

**รอบที่ iterate:** 1 — ได้ผลถูกตั้งแต่รอบแรก ไม่ต้องแก้

**ข้อสังเกต:** A2 ต่างจาก A1 ตรงที่ระบุครบ 5 ส่วน (บทบาท งาน บริบท ข้อจำกัด รูปแบบ) โดยเฉพาะ **บริบท** (อัตราค่าโดยสาร กฎปัดเศษ กรณี input ผิด) ทำให้ได้โค้ดที่ใช้ได้ทันที

## Part B1 - อธิบายโค้ด

**Prompt:** อธิบายโค้ดนี้ทีละบรรทัดให้นักศึกษาปี 2 ที่เพิ่งเรียน map/filter/reduce เข้าใจ

ตอบเป็นภาษาไทย รูปแบบ: ตาราง 2 คอลัมน์ (บรรทัดโค้ด | ทำอะไร) ไม่เกิน 10 แถว

const team = [
  { name: "ฟ้า", role: "PO", tasksDone: 5 },
  { name: "ต้น", role: "Dev", tasksDone: 8 },
  { name: "มายด์", role: "SM", tasksDone: 3 },
  { name: "เจ", role: "Dev", tasksDone: 6 },
];

// 1) map: รายชื่อ "ชื่อ (บทบาท)"
const nameList = team.map((member) => `${member.name} (${member.role})`);
console.log("1) map:", nameList);

// 2) filter: เฉพาะ Dev
const devs = team.filter((member) => member.role === "Dev");
console.log("2) filter (Dev):", devs);

// 3) reduce: รวม tasksDone ทั้งทีม
const totalTasks = team.reduce((sum, member) => sum + member.tasksDone, 0);
console.log("3) reduce (รวมทั้งทีม):", totalTasks);

// 4) ต่อท่า: รวม tasksDone เฉพาะ Dev
const devTasksTotal = team
  .filter((member) => member.role === "Dev")
  .reduce((sum, member) => sum + member.tasksDone, 0);
console.log("4) filter+reduce (รวมเฉพาะ Dev):", devTasksTotal);

**ผลลัพธ์ย่อ:** Aiพยายามอธิบายโค้ดบรรทัดต่างๆว่ามีหน้าที่อะไร

**ตรวจแล้ว:** ตรวจถูกแล้ว

## Part B2 - รีวิวโค้ด

**Prompt:** รีวิวโค้ดนี้ในฐานะ senior developer: บอกจุดที่ควรปรับปรุง 3 ข้อ เรียงตามความสำคัญ พร้อมเหตุผลและโค้ดที่แก้แล้ว

**ผลลัพธ์ย่อ:** 1. หลีกเลี่ยง Magic Strings (ความสำคัญอันดับ 1 - Critical Risk)  2. ลดการคำนวณซ้ำซ้อนด้วย Single-pass Reduction (ความสำคัญอันดับ 2 - Performance) 3. ประกาศ Type/Structure ของข้อมูลให้ชัดเจนด้วย JSDoc หรือ TypeScript (ความสำคัญอันดับ 3 - Developer Experience)

**ตรวจแล้ว:** ตรวจถูกแล้ว

## Part C - ดีบัก

**สิ่งที่ฉันเดาก่อนถาม AI:** ควรได้ ["NGV-2", "NGV-3"] และ ควรได้ 145

**Prompt:** โค้ดของฉันรันแล้วได้ผลไม่ตรงที่คาด



(1) ผลที่ได้จริงจาก terminal:

สายที่มาสาย: []

ผู้โดยสารรวม: [object Object]6238



(2) โค้ดทั้งไฟล์:

const buses = [

  { route: "NGV-1", passengers: 45, late: false },

  { route: "NGV-2", passengers: 62, late: true },

  { route: "NGV-3", passengers: 38, late: true },

];



const lateRoutes = buses.filter(b => { b.late }).map(b => b.route);

const total = buses.reduce((sum, b) => sum + b.passengers);



console.log("สายที่มาสาย:", lateRoutes);   // ควรได้ ["NGV-2", "NGV-3"]

console.log("ผู้โดยสารรวม:", total);      // ควรได้ 145



(3) ผลที่คาดหวัง:

สายที่มาสาย ควรได้ ["NGV-2", "NGV-3"] และผู้โดยสารรวม ควรได้ 145



(4) สิ่งที่ฉันเดาไว้:

ไม่มี ปีกกา { }  และ ใน buses.reduce ไม่ได้ใส่ค่าเริ่มต้น 



อธิบายสาเหตุก่อน แล้วค่อยให้โค้ดที่แก้ อย่าเปลี่ยนส่วนที่ไม่เกี่ยว

**ผลลัพธ์ย่อ:** 1. ใน buses.filter มีการใช้ปีกกา { } แต่ไม่มีคีย์เวิร์ด return 2. ใน buses.reduce ไม่ได้ใส่ค่าเริ่มต้น (Initial Value) 

**ตรวจแล้ว:** รันแล้วได้ตามคอมเม้น

**เดาถูกกี่จุด:** ถูก2จุด