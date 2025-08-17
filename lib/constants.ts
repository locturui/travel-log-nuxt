import type { LngLatLike } from "maplibre-gl";

export const INNO = [48.744618, 55.752085] as LngLatLike;

export const LOCATION_PAGES = new Set(["dashboard", "dashboard-add"]);

export const CURRENT_LOCATION_PAGES = new Set([
  "dashboard-location-slug",
  "dashboard-location-slug-edit",
  "dashboard-location-slug-add",
]);

export const EDIT_PAGES = new Set([
  "dashboard-add",
  "dashboard-location-slug-edit",
  "dashboard-location-slug-add",
]);
