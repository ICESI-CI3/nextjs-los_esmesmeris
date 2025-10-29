"use server";

import { revalidatePath } from "next/cache";
import { apiFetch } from "../../lib/api";
import { Supplier } from "../../types/supplier";

export async function getSuppliers(): Promise<Supplier[]> {
  return apiFetch<Supplier[]>("/suppliers");
}

export async function getSupplier(id: string): Promise<Supplier> {
  return apiFetch<Supplier>(`/suppliers/${id}`);
}

export async function createSupplier(data: Omit<Supplier, "id">) {
  await apiFetch<Supplier>("/suppliers", {
    method: "POST",
    body: JSON.stringify(data),
  });
  revalidatePath("/suppliers");
}

export async function updateSupplier(id: string, data: Partial<Supplier>) {
  await apiFetch<Supplier>(`/suppliers/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  revalidatePath("/suppliers");
}

export async function deleteSupplier(id: string) {
  await apiFetch(`/suppliers/${id}`, { method: "DELETE" });
  revalidatePath("/suppliers");
}
