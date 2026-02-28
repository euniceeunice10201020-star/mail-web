"use client";

import { useMemo, useState } from "react";

interface Entity {
  id: string;
  name: string;
  tradingName?: string;
  registrationNumber?: string;
  country?: string;
  dateOfIncorporation?: string;
  legalForm?: string;
  registeredAddress?: string;
  operatingAddress?: string;
  websiteUrl?: string;
  keyPerson?: {
    fullName?: string;
    dateOfBirth?: string;
    nationality?: string;
    countryOfResidence?: string;
    roleSummary?: string;
    ownershipPercentage?: number;
    idDocumentType?: string;
    idDocumentNumber?: string;
  };
  taxInfo?: {
    taxId?: string;
    vatNumber?: string;
  };
  banking?: {
    bankName?: string;
    bankAddress?: string;
    accountName?: string;
    ibanOrAccountNumber?: string;
    swift?: string;
    settlementCurrency?: string;
  };
  businessCompliance?: {
    businessDescription?: string;
    productsServices?: string;
    businessModel?: string;
    targetMarkets?: string;
    expectedMonthlyVolume?: string;
    averageTransactionSize?: string;
    chargebackRatio?: string;
    complianceStatement?: string;
  };
  updatedAt?: string;
}

type TabKey =
  | "basic"
  | "keyPerson"
  | "taxInfo"
  | "banking"
  | "businessCompliance"
  | "files";

const initialEntities: Entity[] = [
  {
    id: "ent_1",
    name: "Northwind Trading Ltd",
    country: "United Kingdom",
    registrationNumber: "12345678",
    legalForm: "Private Limited Company",
    websiteUrl: "https://northwind.example.com",
    taxInfo: { taxId: "GB123456789", vatNumber: "GB999999973" },
    banking: { settlementCurrency: "USD" },
    updatedAt: new Date().toISOString()
  },
  {
    id: "ent_2",
    name: "Sunrise Imports LLC",
    country: "United States",
    registrationNumber: "SR-556723",
    legalForm: "Limited Liability Company",
    banking: { settlementCurrency: "USD" },
    updatedAt: new Date().toISOString()
  }
];

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "basic", label: "Basic Info" },
  { key: "keyPerson", label: "Key Person" },
  { key: "taxInfo", label: "Tax Info" },
  { key: "banking", label: "Banking Info" },
  { key: "businessCompliance", label: "Business & Compliance" },
  { key: "files", label: "Files" }
];

const inputClass =
  "mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none";
const labelClass = "block text-sm font-medium text-slate-700";
const sectionTitleClass = "text-base font-semibold text-slate-900";

function createBlankEntity(): Entity {
  return {
    id: `ent_${typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Date.now()}`,
    name: "New Entity",
    banking: { settlementCurrency: "USD" },
    updatedAt: new Date().toISOString()
  };
}

export default function Page() {
  const [entities, setEntities] = useState<Entity[]>(initialEntities);
  const [selectedEntityId, setSelectedEntityId] = useState<string>(initialEntities[0].id);
  const [activeTab, setActiveTab] = useState<TabKey>("basic");

  const selectedEntity = useMemo(
    () => entities.find((entity) => entity.id === selectedEntityId),
    [entities, selectedEntityId]
  );

  const updateSelectedEntity = (updater: (entity: Entity) => Entity) => {
    setEntities((prev) =>
      prev.map((entity) =>
        entity.id === selectedEntityId
          ? {
              ...updater(entity),
              updatedAt: new Date().toISOString()
            }
          : entity
      )
    );
  };

  const addEntity = () => {
    const newEntity = createBlankEntity();
    setEntities((prev) => [...prev, newEntity]);
    setSelectedEntityId(newEntity.id);
    setActiveTab("basic");
  };

  if (!selectedEntity) {
    return <main className="p-6">No entity selected.</main>;
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[300px_1fr]">
        <aside className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-lg font-semibold">Entities</h1>
            <button
              className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
              onClick={addEntity}
              type="button"
            >
              Add entity
            </button>
          </div>

          <ul className="space-y-2">
            {entities.map((entity) => {
              const isSelected = entity.id === selectedEntityId;
              return (
                <li key={entity.id}>
                  <button
                    className={`w-full rounded border p-3 text-left ${
                      isSelected ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:bg-slate-50"
                    }`}
                    onClick={() => setSelectedEntityId(entity.id)}
                    type="button"
                  >
                    <p className="text-sm font-semibold text-slate-900">{entity.name || "Untitled entity"}</p>
                    <p className="text-xs text-slate-600">{entity.country || "No country"}</p>
                    <p className="text-xs text-slate-500">
                      Reg #: {entity.registrationNumber || "Not provided"}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <section className="rounded-lg border border-slate-200 bg-white p-4">
          <header className="mb-4 border-b border-slate-200 pb-3">
            <h2 className="text-xl font-semibold text-slate-900">{selectedEntity.name || "Untitled entity"}</h2>
            <p className="text-xs text-slate-500">
              Last updated: {selectedEntity.updatedAt ? new Date(selectedEntity.updatedAt).toLocaleString() : "-"}
            </p>
          </header>

          <nav className="mb-4 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`rounded px-3 py-1.5 text-sm ${
                  tab.key === activeTab
                    ? "bg-slate-900 text-white"
                    : "border border-slate-300 bg-white text-slate-700"
                }`}
                onClick={() => setActiveTab(tab.key)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {activeTab === "basic" && (
            <div className="grid gap-4 md:grid-cols-2">
              <label className={labelClass}>
                Legal Entity Name
                <input
                  className={inputClass}
                  value={selectedEntity.name || ""}
                  onChange={(e) => updateSelectedEntity((entity) => ({ ...entity, name: e.target.value }))}
                />
              </label>
              <label className={labelClass}>
                Trading Name
                <input
                  className={inputClass}
                  value={selectedEntity.tradingName || ""}
                  onChange={(e) => updateSelectedEntity((entity) => ({ ...entity, tradingName: e.target.value }))}
                />
              </label>
              <label className={labelClass}>
                Registration Number
                <input
                  className={inputClass}
                  value={selectedEntity.registrationNumber || ""}
                  onChange={(e) =>
                    updateSelectedEntity((entity) => ({ ...entity, registrationNumber: e.target.value }))
                  }
                />
              </label>
              <label className={labelClass}>
                Country
                <input
                  className={inputClass}
                  value={selectedEntity.country || ""}
                  onChange={(e) => updateSelectedEntity((entity) => ({ ...entity, country: e.target.value }))}
                />
              </label>
              <label className={labelClass}>
                Date of Incorporation
                <input
                  className={inputClass}
                  type="date"
                  value={selectedEntity.dateOfIncorporation || ""}
                  onChange={(e) =>
                    updateSelectedEntity((entity) => ({ ...entity, dateOfIncorporation: e.target.value }))
                  }
                />
              </label>
              <label className={labelClass}>
                Legal Form
                <input
                  className={inputClass}
                  value={selectedEntity.legalForm || ""}
                  onChange={(e) => updateSelectedEntity((entity) => ({ ...entity, legalForm: e.target.value }))}
                />
              </label>
              <label className={labelClass}>
                Website URL
                <input
                  className={inputClass}
                  value={selectedEntity.websiteUrl || ""}
                  onChange={(e) => updateSelectedEntity((entity) => ({ ...entity, websiteUrl: e.target.value }))}
                />
              </label>
              <label className={labelClass}>
                Registered Address
                <textarea
                  className={inputClass}
                  rows={3}
                  value={selectedEntity.registeredAddress || ""}
                  onChange={(e) =>
                    updateSelectedEntity((entity) => ({ ...entity, registeredAddress: e.target.value }))
                  }
                />
              </label>
              <label className={labelClass}>
                Operating Address
                <textarea
                  className={inputClass}
                  rows={3}
                  value={selectedEntity.operatingAddress || ""}
                  onChange={(e) =>
                    updateSelectedEntity((entity) => ({ ...entity, operatingAddress: e.target.value }))
                  }
                />
              </label>
            </div>
          )}

          {activeTab === "keyPerson" && (
            <div>
              <h3 className={sectionTitleClass}>Key Person Details</h3>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                <label className={labelClass}>
                  Full Name
                  <input
                    className={inputClass}
                    value={selectedEntity.keyPerson?.fullName || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        keyPerson: { ...entity.keyPerson, fullName: e.target.value }
                      }))
                    }
                  />
                </label>
                <label className={labelClass}>
                  Date of Birth
                  <input
                    className={inputClass}
                    type="date"
                    value={selectedEntity.keyPerson?.dateOfBirth || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        keyPerson: { ...entity.keyPerson, dateOfBirth: e.target.value }
                      }))
                    }
                  />
                </label>
                <label className={labelClass}>
                  Nationality
                  <input
                    className={inputClass}
                    value={selectedEntity.keyPerson?.nationality || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        keyPerson: { ...entity.keyPerson, nationality: e.target.value }
                      }))
                    }
                  />
                </label>
                <label className={labelClass}>
                  Country of Residence
                  <input
                    className={inputClass}
                    value={selectedEntity.keyPerson?.countryOfResidence || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        keyPerson: { ...entity.keyPerson, countryOfResidence: e.target.value }
                      }))
                    }
                  />
                </label>
                <label className={labelClass}>
                  Ownership Percentage
                  <input
                    className={inputClass}
                    type="number"
                    min="0"
                    max="100"
                    value={selectedEntity.keyPerson?.ownershipPercentage ?? ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        keyPerson: {
                          ...entity.keyPerson,
                          ownershipPercentage: e.target.value === "" ? undefined : Number(e.target.value)
                        }
                      }))
                    }
                  />
                </label>
                <label className={labelClass}>
                  ID Document Type
                  <input
                    className={inputClass}
                    value={selectedEntity.keyPerson?.idDocumentType || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        keyPerson: { ...entity.keyPerson, idDocumentType: e.target.value }
                      }))
                    }
                  />
                </label>
                <label className={labelClass}>
                  ID Document Number
                  <input
                    className={inputClass}
                    value={selectedEntity.keyPerson?.idDocumentNumber || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        keyPerson: { ...entity.keyPerson, idDocumentNumber: e.target.value }
                      }))
                    }
                  />
                </label>
                <label className={`${labelClass} md:col-span-2`}>
                  Role Summary
                  <textarea
                    className={inputClass}
                    rows={3}
                    value={selectedEntity.keyPerson?.roleSummary || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        keyPerson: { ...entity.keyPerson, roleSummary: e.target.value }
                      }))
                    }
                  />
                </label>
              </div>
            </div>
          )}

          {activeTab === "taxInfo" && (
            <div>
              <h3 className={sectionTitleClass}>Tax Details</h3>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                <label className={labelClass}>
                  Tax ID / TIN / EIN / UTR
                  <input
                    className={inputClass}
                    value={selectedEntity.taxInfo?.taxId || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        taxInfo: { ...entity.taxInfo, taxId: e.target.value }
                      }))
                    }
                  />
                </label>
                <label className={labelClass}>
                  VAT / GST Number
                  <input
                    className={inputClass}
                    value={selectedEntity.taxInfo?.vatNumber || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        taxInfo: { ...entity.taxInfo, vatNumber: e.target.value }
                      }))
                    }
                  />
                </label>
              </div>
            </div>
          )}

          {activeTab === "banking" && (
            <div>
              <h3 className={sectionTitleClass}>Banking Details</h3>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                <label className={labelClass}>
                  Bank Name
                  <input
                    className={inputClass}
                    value={selectedEntity.banking?.bankName || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        banking: { ...entity.banking, bankName: e.target.value }
                      }))
                    }
                  />
                </label>
                <label className={labelClass}>
                  Bank Address
                  <input
                    className={inputClass}
                    value={selectedEntity.banking?.bankAddress || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        banking: { ...entity.banking, bankAddress: e.target.value }
                      }))
                    }
                  />
                </label>
                <label className={labelClass}>
                  Account Name
                  <input
                    className={inputClass}
                    value={selectedEntity.banking?.accountName || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        banking: { ...entity.banking, accountName: e.target.value }
                      }))
                    }
                  />
                </label>
                <label className={labelClass}>
                  IBAN / Account Number
                  <input
                    className={inputClass}
                    value={selectedEntity.banking?.ibanOrAccountNumber || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        banking: { ...entity.banking, ibanOrAccountNumber: e.target.value }
                      }))
                    }
                  />
                </label>
                <label className={labelClass}>
                  SWIFT
                  <input
                    className={inputClass}
                    value={selectedEntity.banking?.swift || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        banking: { ...entity.banking, swift: e.target.value }
                      }))
                    }
                  />
                </label>
                <label className={labelClass}>
                  Settlement Currency
                  <input
                    className={inputClass}
                    value={selectedEntity.banking?.settlementCurrency || "USD"}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        banking: { ...entity.banking, settlementCurrency: e.target.value }
                      }))
                    }
                  />
                </label>
              </div>
            </div>
          )}

          {activeTab === "businessCompliance" && (
            <div>
              <h3 className={sectionTitleClass}>Business & Compliance</h3>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                <label className={`${labelClass} md:col-span-2`}>
                  Business Description
                  <textarea
                    className={inputClass}
                    rows={3}
                    value={selectedEntity.businessCompliance?.businessDescription || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        businessCompliance: {
                          ...entity.businessCompliance,
                          businessDescription: e.target.value
                        }
                      }))
                    }
                  />
                </label>
                <label className={labelClass}>
                  Products / Services
                  <input
                    className={inputClass}
                    value={selectedEntity.businessCompliance?.productsServices || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        businessCompliance: {
                          ...entity.businessCompliance,
                          productsServices: e.target.value
                        }
                      }))
                    }
                  />
                </label>
                <label className={labelClass}>
                  Business Model
                  <input
                    className={inputClass}
                    value={selectedEntity.businessCompliance?.businessModel || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        businessCompliance: {
                          ...entity.businessCompliance,
                          businessModel: e.target.value
                        }
                      }))
                    }
                  />
                </label>
                <label className={labelClass}>
                  Target Markets
                  <input
                    className={inputClass}
                    value={selectedEntity.businessCompliance?.targetMarkets || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        businessCompliance: {
                          ...entity.businessCompliance,
                          targetMarkets: e.target.value
                        }
                      }))
                    }
                  />
                </label>
                <label className={labelClass}>
                  Expected Monthly Volume
                  <input
                    className={inputClass}
                    value={selectedEntity.businessCompliance?.expectedMonthlyVolume || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        businessCompliance: {
                          ...entity.businessCompliance,
                          expectedMonthlyVolume: e.target.value
                        }
                      }))
                    }
                  />
                </label>
                <label className={labelClass}>
                  Average Transaction Size
                  <input
                    className={inputClass}
                    value={selectedEntity.businessCompliance?.averageTransactionSize || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        businessCompliance: {
                          ...entity.businessCompliance,
                          averageTransactionSize: e.target.value
                        }
                      }))
                    }
                  />
                </label>
                <label className={labelClass}>
                  Chargeback Ratio
                  <input
                    className={inputClass}
                    value={selectedEntity.businessCompliance?.chargebackRatio || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        businessCompliance: {
                          ...entity.businessCompliance,
                          chargebackRatio: e.target.value
                        }
                      }))
                    }
                  />
                </label>
                <label className={`${labelClass} md:col-span-2`}>
                  Compliance Statement
                  <textarea
                    className={inputClass}
                    rows={3}
                    value={selectedEntity.businessCompliance?.complianceStatement || ""}
                    onChange={(e) =>
                      updateSelectedEntity((entity) => ({
                        ...entity,
                        businessCompliance: {
                          ...entity.businessCompliance,
                          complianceStatement: e.target.value
                        }
                      }))
                    }
                  />
                </label>
              </div>
            </div>
          )}

          {activeTab === "files" && (
            <div className="rounded border border-dashed border-slate-300 p-6 text-sm text-slate-600">
              Files section placeholder. We can implement uploads and document management later.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
