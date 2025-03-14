"use client";

import ReportCardForm from "@/components/forms/ReportCardForm";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import { CiCirclePlus, CiPaperplane } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";

const ReportCardsPage = () => {
  const [isAddingReportCard, setIsAddingReportCard] = useState(false);

  return (
    <>
      <div>
        <div className="text-gray-900 grid grid-cols-4 items-center mt-4 bg-white bg-opacity-70 p-4 rounded-t-lg border-b-2 border-black">
          <div className="font-bold">Nama ujian</div>
          <div className="font-bold text-center">Tanggal ujian</div>
          <div className="font-bold text-center">Status</div>
          <div className="flex justify-end">
            <button
              onClick={() => setIsAddingReportCard(true)}
              className="bg-slate-500 p-2 rounded-lg"
            >
              <CiCirclePlus className="text-white" size={24} />
            </button>
          </div>
        </div>

        <div className="bg-white bg-opacity-70 px-4 rounded-b-lg">
          {reportCardData.map(({ id, name, date, status }) => (
            <div
              className="text-gray-900 py-4 [&:not(:last-child)]:border-b border-black grid grid-cols-4"
              key={id}
            >
              <div>{name}</div>
              <div className="text-center">{new Date(date).toDateString()}</div>
              <div className="text-center">{statusLocale["id"][status]}</div>
              <div className="flex justify-end gap-4">
                <button className="bg-slate-500 p-2 rounded-lg">
                  <IoEyeOutline className="text-white" size={24} />
                </button>
                <button className="bg-slate-500 p-2 rounded-lg">
                  <CiPaperplane className="text-white" size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isAddingReportCard}>
        <ReportCardForm onClose={() => setIsAddingReportCard(false)} />
      </Modal>
    </>
  );
};

type ReportCard = {
  id: string;
  name: string;
  date: number;
  status: "saved" | "sent";
};

const statusLocale = {
  en: {
    saved: "Saved",
    sent: "Sent",
  },
  id: {
    saved: "Tersimpan",
    sent: "Terkirim",
  },
};

const reportCardData: ReportCard[] = [
  {
    id: "a",
    name: "Ujian Tengah Semester",
    date: Date.now(),
    status: "saved",
  },
  {
    id: "b",
    name: "Ujian Tengah Semester",
    date: Date.now(),
    status: "sent",
  },
];

export default ReportCardsPage;
