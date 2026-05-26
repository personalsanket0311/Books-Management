import React from "react";

export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-[#E2E8F0]" style={{ boxShadow: "0px 4px 12px rgba(0,0,0,0.05)" }}>
      <div className="skeleton h-56 w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="pt-4 mt-4 border-t border-outline-variant flex justify-between items-center">
          <div className="skeleton h-3 w-16" />
          <div className="flex gap-2">
            <div className="skeleton h-8 w-8 rounded" />
            <div className="skeleton h-8 w-8 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
