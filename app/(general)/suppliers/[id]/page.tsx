import { getSupplier } from "@/app/actions/suppliers";
import SupplierForm from "@/components/suppliers/SupplierForm";

export default async function EditSupplierPage({
  params,
}: {
  params: { id: string };
}) {
  const supplier = await getSupplier(params.id);

  return (
    <div className="p-6">
      <SupplierForm supplier={supplier} />
    </div>
  );
}
