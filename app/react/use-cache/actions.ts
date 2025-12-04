"use server";

import { updateTag } from "next/cache";

export async function revalidateHealth() {
  updateTag("health");
}
