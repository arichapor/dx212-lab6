// 1. แยก Roles ออกเป็น Constant Object ป้องกันการพิมพ์ผิด (Magic Strings)
const ROLES = {
  PO: "PO",
  DEV: "Dev",
  SM: "SM",
};

const team = [
  { name: "ฟ้า", role: ROLES.PO, tasksDone: 5 },
  { name: "ต้น", role: ROLES.DEV, tasksDone: 8 },
  { name: "มายด์", role: ROLES.SM, tasksDone: 3 },
  { name: "เจ", role: ROLES.DEV, tasksDone: 6 },
];

// 1) map: รายชื่อ "ชื่อ (บทบาท)"
const nameList = team.map((member) => `${member.name} (${member.role})`);
console.log("1) map:", nameList);

// 2) filter: เฉพาะ Dev (ใช้ ROLES.DEV แทนการพิมพ์ "Dev" ตรงๆ)
const devs = team.filter((member) => member.role === ROLES.DEV);
console.log("2) filter (Dev):", devs);

// 3) reduce: รวม tasksDone ทั้งทีม
const totalTasks = team.reduce((sum, member) => sum + member.tasksDone, 0);
console.log("3) reduce (รวมทั้งทีม):", totalTasks);

// 4) ต่อท่า: รวม tasksDone เฉพาะ Dev
const devTasksTotal = team
  .filter((member) => member.role === ROLES.DEV)
  .reduce((sum, member) => sum + member.tasksDone, 0);
console.log("4) filter+reduce (รวมเฉพาะ Dev):", devTasksTotal);