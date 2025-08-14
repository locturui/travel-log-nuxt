import type { RouteLocationRaw } from "vue-router";

import type { UserWithId } from "./auth";

declare module "h3" {
  // eslint-disable-next-line ts/consistent-type-definitions
  interface H3EventContext {
    user?: UserWithId;
  }
}

export type PointItem = {
  lat: number;
  long: number;
};

export type MapPoint = {
  id: number;
  name: string;
  description: string | null;
  to?: RouteLocationRaw;
  toLabel?: string;
} & PointItem;

export type NominatimRes = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
};
