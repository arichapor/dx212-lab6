const buses = [
  { route: "NGV-1", passengers: 45, late: false },
  { route: "NGV-2", passengers: 62, late: true },
  { route: "NGV-3", passengers: 38, late: true },
];

const lateRoutes = buses.filter(b => b.late).map(b => b.route);
const total = buses.reduce((sum, b) => sum + b.passengers, 0);

console.log("สายที่มาสาย:", lateRoutes);   // ["NGV-2", "NGV-3"]
console.log("ผู้โดยสารรวม:", total);      // 145