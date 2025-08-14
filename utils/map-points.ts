import type { SelectLocation } from "~/lib/db/schema";
import type { MapPoint } from "~/lib/types";

export function createMapPointFromLocation(location: SelectLocation): MapPoint {
  return {
    ...location,
    to: { name: "dashboard-location-slug", params: { slug: location.slug } },
    toLabel: "View",
  };
}

export function isPointSelected(item: Pick<MapPoint, "id" | "lat" | "long"> | null | undefined, selected: MapPoint | null | undefined) {
  if (!item || !selected) {
    return false;
  }
  return item.id === selected.id
    && item.lat === selected.lat
    && item.long === selected.long;
}
