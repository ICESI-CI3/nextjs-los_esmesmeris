"use client";

import { Supplier } from "@/app/types/supplier";
import { deleteSupplier } from "@/app/actions/suppliers";
import Link from "next/link";
import { useTransition } from "react";

export default function SupplierTable({ suppliers }: { suppliers: Supplier[] }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (confirm("¿Eliminar este proveedor?")) {
      startTransition(() => deleteSupplier(id));
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-xl">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-6 py-3">Nombre</th>
            <th className="px-6 py-3">Contacto</th>
            <th className="px-6 py-3">Teléfono</th>
            <th className="px-6 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">{s.name}</td>
              <td className="px-6 py-4">{s.contact}</td>
              <td className="px-6 py-4">{s.phone}</td>
              <td className="px-6 py-4 text-right">
                <Link
                  href={`/suppliers/${s.id}`}
                  className="text-blue-600 hover:underline mr-3"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(s.id)}
                  disabled={isPending}
                  className="text-red-600 hover:underline disabled:opacity-50"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {suppliers.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-400">
                No hay proveedores registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
