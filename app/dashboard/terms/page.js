"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { ChevronLeft, Printer, ChevronDown, ChevronUp } from "lucide-react";

const sections = [
    { id: "agreement", title: "Service Agreement" },
    { id: "booking", title: "Booking & Payment" },
    { id: "customer", title: "Customer Responsibilities" },
    { id: "insurance", title: "Insurance & Liability" },
    { id: "cancellation", title: "Cancellation & Refund" },
    { id: "delays", title: "Delays & Rescheduling" },
    { id: "prohibited", title: "Prohibited Items" },
    { id: "privacy", title: "Privacy Policy" },
    { id: "dispute", title: "Dispute Resolution" },
    { id: "contact", title: "Contact Information" },
];

export default function TermsPage() {
    const router = useRouter();
    // track which accordion is open; default all open in large screens? We'll close by default
    const [openAccordion, setOpenAccordion] = useState(null);

    const toggleAccordion = (id) => {
        setOpenAccordion((prev) => (prev === id ? null : id));
        // smooth scroll to section anchor on toggle for better UX
        const el = document.getElementById(id);
        if (el) {
            setTimeout(() => {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        }
    };

    const handlePrint = () => window.print();

    return (
        <div className="flex flex-col min-h-screen bg-neutral-50 text-neutral-900">
            {/* Page header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-white border border-gray-200 hover:bg-gray-50 shadow-sm"
                        >
                            <ChevronLeft size={16} />
                            Back
                        </button>

                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold">Terms &amp; Conditions</h1>
                            <p className="text-sm text-gray-600">Relax Packers &amp; Movers</p>
                        </div>
                    </div>

                    
                </div>
            </header>

            {/* Main content area with TOC */}
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* TOC / Sidebar */}
                    <aside className="md:col-span-3">
                        <nav className="sticky top-24 hidden md:block">
                            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">On this page</h3>
                                <ul className="space-y-2 text-sm">
                                    {sections.map((s) => (
                                        <li key={s.id}>
                                            <a
                                                href={`#${s.id}`}
                                                className="block p-2 rounded-md hover:bg-gray-50 text-gray-700"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const el = document.getElementById(s.id);
                                                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                                                }}
                                            >
                                                {s.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-4 text-xs text-gray-500">
                                    Last updated: <span className="font-medium">{new Date().getFullYear()}</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <a
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const el = document.getElementById("contact");
                                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                                    }}
                                    className="block w-full text-center px-3 py-2 rounded-md bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow"
                                >
                                    Contact Us
                                </a>
                            </div>
                        </nav>

                        {/* Mobile TOC quick actions */}
                        <div className="md:hidden mb-6">
                            <div className="flex gap-2">
                                <button
                                    onClick={handlePrint}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md border bg-white"
                                >
                                    <Printer size={14} /> Print
                                </button>
                                <button
                                    onClick={() => router.back()}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md border bg-white"
                                >
                                    <ChevronLeft size={14} /> Back
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Terms content */}
                    <section className="md:col-span-9">
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                            <div className="prose max-w-none">
                                <p className="text-sm text-gray-600 mb-4">
                                    These Terms &amp; Conditions govern your use of Relax Packers &amp; Movers services.
                                    By booking or using our services, you accept these terms in full. If you do not agree,
                                    please refrain from using our services.
                                </p>

                                {/* Each section rendered as accordion + anchored heading */}
                                <ArticleSection
                                    id="agreement"
                                    title="1. Service Agreement"
                                    open={openAccordion === "agreement"}
                                    onToggle={() => toggleAccordion("agreement")}
                                >
                                    <p>
                                        Relax Packers &amp; Movers provides professional packing, loading, transportation,
                                        unloading and unpacking services. When you confirm a booking, you enter into a
                                        service agreement with Relax Packers &amp; Movers under these Terms &amp; Conditions.
                                    </p>
                                </ArticleSection>

                                <ArticleSection
                                    id="booking"
                                    title="2. Booking & Payment"
                                    open={openAccordion === "booking"}
                                    onToggle={() => toggleAccordion("booking")}
                                >
                                    <p>
                                        Booking confirmation is subject to receipt of advance payment or written
                                        confirmation from our team. The outstanding balance must be settled before
                                        delivery unless otherwise agreed. We accept cash, UPI, bank transfers and other
                                        agreed payment methods. Payment terms will be communicated during booking.
                                    </p>
                                </ArticleSection>

                                <ArticleSection
                                    id="customer"
                                    title="3. Customer Responsibilities"
                                    open={openAccordion === "customer"}
                                    onToggle={() => toggleAccordion("customer")}
                                >
                                    <p>
                                        Customers must provide accurate details about the items to be moved, pickup and
                                        drop locations, and any access constraints (stairs, elevators, parking limits,
                                        narrow gates). Failure to disclose may lead to additional charges or delays.
                                    </p>
                                </ArticleSection>

                                <ArticleSection
                                    id="insurance"
                                    title="4. Insurance & Liability"
                                    open={openAccordion === "insurance"}
                                    onToggle={() => toggleAccordion("insurance")}
                                >
                                    <p>
                                        While reasonable care is exercised during packing and transit, Relax Packers &amp; Movers
                                        is not liable for loss or damage resulting from natural disasters, accidents,
                                        third-party carriers, inadequate packing by the customer, or events beyond our control.
                                        We recommend opting for transit insurance for high-value items.
                                    </p>
                                </ArticleSection>

                                <ArticleSection
                                    id="cancellation"
                                    title="5. Cancellation & Refund"
                                    open={openAccordion === "cancellation"}
                                    onToggle={() => toggleAccordion("cancellation")}
                                >
                                    <p>
                                        Cancellations should be communicated at least 24 hours before the scheduled move.
                                        Refunds, if applicable, will be processed after deducting administrative or booking charges.
                                        Late cancellations may attract partial or no refunds depending on costs already incurred.
                                    </p>
                                </ArticleSection>

                                <ArticleSection
                                    id="delays"
                                    title="6. Delays & Rescheduling"
                                    open={openAccordion === "delays"}
                                    onToggle={() => toggleAccordion("delays")}
                                >
                                    <p>
                                        We strive to meet agreed schedules, but delays due to traffic, weather, strikes,
                                        or other unforeseen circumstances are possible. In such cases, we will keep you informed
                                        and work with you to reschedule if required.
                                    </p>
                                </ArticleSection>

                                <ArticleSection
                                    id="prohibited"
                                    title="7. Prohibited Items"
                                    open={openAccordion === "prohibited"}
                                    onToggle={() => toggleAccordion("prohibited")}
                                >
                                    <p>
                                        Transport of hazardous materials, explosives, flammable liquids, perishable items,
                                        illegal goods, and other restricted items is strictly prohibited. We reserve the right to
                                        refuse carriage of such items.
                                    </p>
                                </ArticleSection>

                                <ArticleSection
                                    id="privacy"
                                    title="8. Privacy Policy"
                                    open={openAccordion === "privacy"}
                                    onToggle={() => toggleAccordion("privacy")}
                                >
                                    <p>
                                        We collect personal information necessary to provide our services. Your data is processed
                                        and stored securely and will not be shared with third parties except as required to fulfill
                                        the service (e.g., transport partners) or by law. Please refer to our full privacy policy
                                        for details.
                                    </p>
                                </ArticleSection>

                                <ArticleSection
                                    id="dispute"
                                    title="9. Dispute Resolution"
                                    open={openAccordion === "dispute"}
                                    onToggle={() => toggleAccordion("dispute")}
                                >
                                    <p>
                                        We will attempt to resolve disputes amicably. Unresolved disputes may be referred to
                                        arbitration or the courts located in Odisha, India, and governed by Indian law.
                                    </p>
                                </ArticleSection>

                                <ArticleSection
                                    id="contact"
                                    title="10. Contact Information"
                                    open={openAccordion === "contact"}
                                    onToggle={() => toggleAccordion("contact")}
                                >
                                    <p>
                                        For queries, support or claims contact us:
                                    </p>
                                    <ul>
                                        <li>📧 Email: <a href="mailto:support@relaxgroup.in" className="text-blue-600 underline">support@relaxgroup.in</a></li>
                                        <li>📞 Phone: <a href="tel:+919777012315" className="text-blue-600 underline">+91 97770 12315</a></li>
                                        <li>🌐 Website: <a href="https://packers.relaxgroup.in" target="_blank" rel="noreferrer" className="text-blue-600 underline">packers.relaxgroup.in</a></li>
                                    </ul>
                                </ArticleSection>

                                <div className="mt-8 text-sm text-gray-600">
                                    <strong>Note:</strong> These terms may be updated occasionally. Continued use of our
                                    services after such updates constitutes acceptance of the revised terms.
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="text-sm text-gray-600">
                                        © {new Date().getFullYear()} Relax Packers &amp; Movers. All Rights Reserved.
                                    </div>
                                    <div className="flex gap-3">
                                        <a
                                            href="/"
                                            className="inline-flex items-center px-4 py-2 rounded-md border hover:bg-gray-50 text-sm"
                                        >
                                            Home
                                        </a>
                                        <a
                                            href="/contact"
                                            className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:brightness-105 text-sm"
                                        >
                                            Get Support
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}

/* ---------- ArticleSection component (local) ---------- */
/* Small accessible accordion + anchored heading used above */
function ArticleSection({ id, title, children, open, onToggle }) {
    return (
        <article id={id} className="mb-6">
            <div className="flex items-start gap-4">
                <h2 className="text-lg font-semibold" style={{ scrollMarginTop: "100px" }}>{title}</h2>
                <button
                    onClick={onToggle}
                    aria-expanded={open ? "true" : "false"}
                    className="ml-auto inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm bg-gray-100 hover:bg-gray-200"
                >
                    {open ? (
                        <>
                            <ChevronUp size={14} /> Collapse
                        </>
                    ) : (
                        <>
                            <ChevronDown size={14} /> Read
                        </>
                    )}
                </button>
            </div>

            <div className={`mt-3 text-sm text-gray-700 transition-all ${open ? "max-h-screen" : "max-h-0 overflow-hidden"}`}>
                <div className="prose max-w-none">{children}</div>
            </div>
        </article>
    );
}
