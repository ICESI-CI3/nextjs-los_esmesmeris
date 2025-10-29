"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupplier, updateSupplier } from "@/app/actions/suppliers";
import { Supplier } from "@/app/types/supplier";

export default function SupplierForm({ supplier }: { supplier?: Supplier }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: supplier?.name || "",
    contact: supplier?.contact || "",
    phone: supplier?.phone || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (supplier) await updateSupplier(supplier.id, form);
    else await createSupplier(form);
    router.push("/suppliers");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-700">
        {supplier ? "Editar proveedor" : "Nuevo proveedor"}
      </h2>
      <input
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
      />
      <input
        name="contact"
        placeholder="Contacto"
        value={form.contact}
        onChange={handleChange}
        required
        className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
      />
      <input
        name="phone"
        placeholder="Teléfono"
        value={form.phone}
        onChange={handleChange}
        required
        className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {supplier ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
}
