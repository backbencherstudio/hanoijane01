"use client";
import { Button } from "@/components/ui/button";
import { standPackages } from "@/data/standPackages";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import PriceCardDashboard from "./_components/PriceCardDashboard";
import CreateStandPriceModal, {
  StandPriceData,
} from "./_components/CreateStandPriceModal";
import EditStandPriceModal from "./_components/EditStandPriceModal";

const StandPriceManagementPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStandId, setSelectedStandId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setSelectedStandId(id);
    setIsEditModalOpen(true);
  };

  const handleSubmit = (data: StandPriceData) => {
    console.log("New Stand Price:", data);
    // Here you can transform data to match your API expectation
    // For now, we just log it
  };

  return (
    <div>
      {/* heading */}
      <div className="w-full flex flex-col gap-4 sm:flex-row justify-between items-center">
        <div className="w-full">
          <h2 className="text-text-primary text-xl md:text-2xl font-semibold">
            Price Management
          </h2>
          <p className="text-sm text-[#64748B] mt-3">
            Industry Expo 2027, Overview for Wednesday, 10 June 2026
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus />
          Create New
        </Button>
      </div>
      {/* content */}
      <div className="mt-9">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">
          {standPackages.map((standPackage) => (
            <PriceCardDashboard
              standPackage={standPackage}
              key={standPackage.id}
              onEdit={() => handleEdit(standPackage.id)}
            />
          ))}
        </div>
      </div>
      {/* add new stand price modal */}
      <CreateStandPriceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
      <EditStandPriceModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        standId={selectedStandId || ""}
        onUpdate={(data) => {
          console.log("Updated data:", data);
          // Update the standPackages state or refetch
        }}
      />
    </div>
  );
};

export default StandPriceManagementPage;
