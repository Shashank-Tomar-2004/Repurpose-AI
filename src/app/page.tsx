"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LeftPanel from "../components/LeftPanel";
import Tabs from "../components/Tabs";
import EditableCard from "../components/EditableCard";
import EmptyState from "../components/EmptyState";

export interface AIResponse {
  linkedin: string[];
  twitter_hooks: string[];
  meta_description: string;
  youtube: {
    title: string;
    description: string;
  };
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [tone, setTone] = useState("Professional B2B");
  const [depth, setDepth] = useState("Standard");
  const [cta, setCta] = useState("No CTA");
  const [hashtags, setHashtags] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [data, setData] = useState<AIResponse | null>(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<
    "linkedin" | "twitter" | "seo" | "youtube"
  >("linkedin");

  const [history, setHistory] = useState<any[]>([]);
  const [originalContent, setOriginalContent] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("history");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const handleGenerate = async () => {
    if (!url) {
      setError("Please enter a blog URL.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setLoadingStep("Extracting article...");

      const extractRes = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const extractData = await extractRes.json();
      if (!extractRes.ok) throw new Error(extractData.error);

      setOriginalContent(extractData.content);

      setLoadingStep("Generating AI content...");

      const generateRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: extractData.content,
          tone,
          depth,
          cta,
          hashtags,
        }),
      });

      const generateData = await generateRes.json();
      if (!generateRes.ok) throw new Error(generateData.error);

      setData(generateData);

      const newHistory = [
        { url, date: new Date().toLocaleString(), data: generateData },
        ...history,
      ].slice(0, 5);

      setHistory(newHistory);
      localStorage.setItem("history", JSON.stringify(newHistory));

      showToast("Content generated successfully");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  };

  const handleRegenerate = async () => {
    if (!originalContent) return;

    try {
      setLoading(true);
      setLoadingStep("Regenerating variations...");

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: originalContent,
          tone,
          depth,
          cta,
          hashtags,
        }),
      });

      const newData = await res.json();
      if (!res.ok) throw new Error(newData.error);

      setData(newData);
      showToast("Regenerated successfully");
    } catch {
      setError("Regeneration failed.");
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  };

  const copyAll = () => {
    if (!data) return;

    const text = `
LINKEDIN:
${data.linkedin.join("\n\n")}

TWITTER:
${data.twitter_hooks.join("\n\n")}

META DESCRIPTION:
${data.meta_description}

YOUTUBE TITLE:
${data.youtube.title}

YOUTUBE DESCRIPTION:
${data.youtube.description}
`;

    navigator.clipboard.writeText(text);
    showToast("All content copied");
  };

  const downloadTxt = () => {
    if (!data) return;

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "text/plain",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "repurposed-content.txt";
    link.click();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        hasData={!!data}
        onCopyAll={copyAll}
        onDownload={downloadTxt}
        onRegenerate={handleRegenerate}
        history={history}
        onSelectHistory={(item: any) => {
          setData(item.data);
          setUrl(item.url);
        }}
        onRemoveHistory={(index: number) => {
          const updated = history.filter((_, i) => i !== index);
          setHistory(updated);
          localStorage.setItem("history", JSON.stringify(updated));
        }}
      />

      {toast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-2 rounded-xl shadow-lg text-sm">
          {toast}
        </div>
      )}

      <main className="max-w-[1600px] mx-auto px-8 xl:px-16 py-10 grid lg:grid-cols-12 gap-12">
        {/* LEFT */}
        <div className="lg:col-span-4 space-y-8">
          {/* Sticky Controls */}
          <div className="lg:sticky lg:top-24">
            <LeftPanel
              url={url}
              setUrl={setUrl}
              tone={tone}
              setTone={setTone}
              depth={depth}
              setDepth={setDepth}
              cta={cta}
              setCta={setCta}
              hashtags={hashtags}
              setHashtags={setHashtags}
              loading={loading}
              loadingStep={loadingStep}
              onGenerate={handleGenerate}
              error={error}
              history={[]} // remove history from here
              onSelectHistory={() => {}}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-8 space-y-8">
          {!data ? (
            <div className="min-h-[500px] flex items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white">
              <EmptyState />
            </div>
          ) : (
            <>
              {/* TABS */}
              <div className="sticky top-24 z-20 bg-white pt-3 pb-3 border-b border-slate-200">
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
              </div>

              {/* CONTENT */}
              <div className="space-y-6 pt-4">
                {activeTab === "linkedin" &&
                  data.linkedin.map((item, i) => (
                    <EditableCard
                      key={i}
                      title={`Variation ${i + 1}`}
                      content={item}
                      charLimit={3000}
                    />
                  ))}

                {activeTab === "twitter" &&
                  data.twitter_hooks.map((item, i) => (
                    <EditableCard
                      key={i}
                      title={`Hook ${i + 1}`}
                      content={item}
                      charLimit={280}
                    />
                  ))}

                {activeTab === "seo" && (
                  <EditableCard
                    title="Meta Description"
                    content={data.meta_description}
                    charLimit={160}
                    showWarning
                  />
                )}

                {activeTab === "youtube" && (
                  <>
                    <EditableCard
                      title="Video Title"
                      content={data.youtube.title}
                    />
                    <EditableCard
                      title="Description"
                      content={data.youtube.description}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
