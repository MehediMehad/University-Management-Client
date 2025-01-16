export const adminPaths = [
  {
    index: true,
    element: "AdminDashboard",
  },
  {
    name: "Dashboard",
    path: "dashboard",
    element: "AdminDashboard",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Dashboard",
        path: "create-admin",
        element: "CreateAdmin",
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: "CreateFaculty",
      },
      {
        name: "Create Student",
        path: "create-student",
        element: "CreateStudent",
      },
    ],
  },
];

const newArray = adminPaths.reduce((acc, item) => {
  if (item.path && item.element) {
    acc.push({
      key: item.path,
      label: "NAV",
    });
  }
  if (item.children) {
    acc.push({
      key: item.name,
      label: "NAV",
      children: item.children.map((child) => ({
        key: child.name,
        label: "NAV",
      })),
    });
  }
  return acc;
}, []);

console.dir(newArray, { depth: null });
// console.log(JSON.stringify(newArray, null, 2));

const adminRouts = adminPaths.reduce((acc, item) => {
  if (item.index && item.element) {
    acc.push({
      index: item.index,
      element: item.element,
    });
  }
  if (item.name && item.element && item.path) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }
  if (item.children) {
    item.children.forEach((child) => {
      acc.push({
        path: child.path,
        element: child.element,
      });
    });
  }
  return acc;
}, []);
// console.log(adminRouts);

const data = [
  {
    key: "6789199380e9e7567a2c25f3",
    name: "Fall",
    startMonth: "July",
    endMonth: "June",
    year: "2026",
  },
  {
    key: "6789193b80e9e7567a2c25da",
    name: "Summer",
    startMonth: "July",
    endMonth: "June",
    year: "2028",
  },
  {
    key: "6789188b80e9e7567a2c25d6",
    name: "Fall",
    startMonth: "July",
    endMonth: "June",
    year: "2028",
  },
];

const filters = Array.from(
  new Set(data.map((item) => item.name)) // Get unique `name` values
).map((uniqueName) => ({
  text: uniqueName,
  value: uniqueName,
}));

console.log("xxxsdd", { filters });
