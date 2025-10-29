import { getSuppliers } from "@/app/actions/suppliers";
import SupplierTable from "@/components/suppliers/SupplierTable";
import Link from "next/link";

export default async function SuppliersPage() {
  const suppliers = await getSuppliers();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Proveedores</h1>
        <Link
          href="/suppliers/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Nuevo
        </Link>
      </div>
      <SupplierTable suppliers={suppliers} />
    </div>
  );
}
