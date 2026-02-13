"use client";

import { Linkedin, Search, Youtube } from "lucide-react";

export default function Tabs({ activeTab, setActiveTab }: any) {
  const tabs = [
    { key: "linkedin", label: "LinkedIn", icon: <Linkedin size={16} /> },
    {
      key: "twitter",
      label: "X",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M18.244 2H21l-6.56 7.5L22 22h-6.828l-5.345-6.992L3.8 22H1l7.028-8.028L2 2h6.828l4.82 6.315L18.244 2z" />
        </svg>
      ),
    },
    { key: "seo", label: "SEO & Meta", icon: <Search size={16} /> },
    { key: "youtube", label: "YouTube", icon: <Youtube size={16} /> },
  ];

  return (
    <div className="flex gap-2 bg-slate-100 p-1.5 rounded-xl w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${
              activeTab === tab.key
                ? "bg-white shadow-sm border border-slate-200"
                : "text-slate-500 hover:text-slate-900 hover:bg-white/70"
            }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
