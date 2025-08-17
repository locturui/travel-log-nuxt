import { and, eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";

import db from "~/lib/db";

import type { InsertLocation } from "../schema";

import { location } from "../schema";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);

export async function findLocationByName(existing: InsertLocation, userId: number) {
  return db.query.location.findFirst({
    where: and(
      eq(location.name, existing.name),
      eq(location.userId, userId),
    ),
  });
}

export async function findLocationBySlug(slug: string) {
  return db.query.location.findFirst({ where: eq(location.slug, slug) });
}

export async function findUniqueSlug(slug: string) {
  let existing = !!(await findLocationBySlug(slug));

  while (existing) {
    const random = nanoid();
    const idSlug = `${slug}-${random}`;
    existing = !!(await findLocationBySlug(idSlug));
    if (!existing) {
      return idSlug;
    }
  }
  return slug;
}

export async function insertLocation(newLocation: InsertLocation, slug: string, userId: number) {
  const [created] = await db.insert(location).values({
    ...newLocation,
    slug,
    userId,
  }).returning();
  return created;
}

export async function getLocations(userId: number) {
  return db.query.location.findMany({
    where: eq(location.userId, userId),
  });
}

export async function getLocation(slug: string, userId: number) {
  return db.query.location.findFirst({
    where: and(
      eq(location.userId, userId),
      eq(location.slug, slug),
    ),
    with: {
      locationLogs: true,
    },
  });
}

export async function updateLocationBySlug(
  updates: InsertLocation,
  slug: string,
  userId: number,
) {
  const [updated] = await db.update(location).set(updates).where(and(
    eq(location.slug, slug),
    eq(location.userId, userId),
  )).returning();
  return updated;
}
