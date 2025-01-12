import { TRoute, TUserPath } from "../types";

export const routeGenerator = (items: TUserPath[]) => {
  const routes = items.reduce((acc: TRoute[], item) => {
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
  return routes;
};
