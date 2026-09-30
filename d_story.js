// ข้อมูลจำลอง: รายการเมนู
const menu = [
  { id: 1, name: "ข้าวผัดหมู", price: 45, category: "จานเดียว" },
  { id: 2, name: "กะเพราไก่ไข่ดาว", price: 50, category: "จานเดียว" },
  { id: 3, name: "ก๋วยเตี๋ยวเรือ", price: 35, category: "เส้น" },
  { id: 4, name: "ชานมเย็น", price: 30, category: "เครื่องดื่ม" },
  { id: 5, name: "สเต็กหมู", price: 89, category: "จานพิเศษ" },
];

// กรองเมนูที่ราคาไม่เกินงบ เรียงราคาน้อยไปมาก
const filterMenuByBudget = (items, budget) => {
  // งบไม่ใช่ตัวเลข หรือติดลบ ให้คืน array ว่าง
  if (typeof budget !== "number" || isNaN(budget) || budget < 0) {
    return [];
  }
  return items
    .filter((item) => item.price <= budget)
    .sort((a, b) => a.price - b.price);
};

// กรณีที่ 1: งบปกติ 50 บาท
console.log("งบ 50:", filterMenuByBudget(menu, 50).map((m) => m.name));

// กรณีที่ 2: งบเท่ากับราคาพอดี 35 บาท (ต้องนับรวม)
console.log("งบ 35:", filterMenuByBudget(menu, 35).map((m) => m.name));

// กรณีขอบ: งบติดลบ / ไม่ใช่ตัวเลข / ถูกกว่าทุกเมนู
console.log("งบ -10:", filterMenuByBudget(menu, -10));
console.log("งบ 'abc':", filterMenuByBudget(menu, "abc"));
console.log("งบ 10:", filterMenuByBudget(menu, 10));