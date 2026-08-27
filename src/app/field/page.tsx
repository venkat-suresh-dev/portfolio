import type { Metadata } from "next";

import { FieldChamber } from "@/components/field/FieldChamber";

export const metadata: Metadata = {
  title: "FIELD / 01",
  description:
    "Computational playground. An interactive N-body gravitational system.",
};

export default function FieldPage() {
  return (
    <main id="content" tabIndex={-1} className="field-main">
      <FieldChamber />
    </main>
  );
}
