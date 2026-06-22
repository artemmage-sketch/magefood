import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const sections = [
  {
    title: "1. General Provisions",
    content: [
      "1.1. This Privacy Policy (hereinafter — the «Policy») defines the procedure for collecting, processing, storing and protecting personal data of users of the Mage Food mobile application (hereinafter — the «Application»).",
      "1.2. The personal data owner is:\nFOP Sukach Nika Oleksiivna\nTIN: 3489207889\nAddress: Ukraine, 46025, Ternopil region, Ternopil, 3 Bohdana Khmelnytskoho St., apt. 13\nPhone: +380689238487",
      "1.3. Personal data processing is carried out in accordance with the Law of Ukraine «On Personal Data Protection» dated 01.06.2010 No. 2297-VI and the Law of Ukraine «On Electronic Commerce» dated 03.09.2015 No. 675-VIII.",
      "1.4. By using the Application, the user confirms that they have read this Policy and consent to the processing of their personal data under the conditions defined herein.",
    ],
  },
  {
    title: "2. Data We Collect",
    intro: "To provide services, the Application collects the following categories of personal data:",
    list: [
      "Full name",
      "Phone number",
      "Email address",
      "Delivery address (street, building, entrance, floor, apartment)",
      "Order and payment history",
      "Geolocation data (subject to permission — to determine the delivery address)",
      "Device technical data (push token for sending notifications)",
    ],
  },
  {
    title: "3. Purpose of Personal Data Processing",
    intro: "Personal data is processed exclusively for:",
    list: [
      "Processing and fulfilling user orders;",
      "Communicating with the user regarding order status;",
      "Sending notifications about orders, promotions and loyalty program;",
      "Cashback accrual, promo code processing and referral program;",
      "Improving the quality of the Application;",
      "Compliance with applicable Ukrainian legislation.",
    ],
  },
  {
    title: "4. Legal Grounds for Processing",
    intro: "Personal data processing is carried out on the basis of:",
    list: [
      "User consent given during registration in the Application;",
      "Necessity to perform a contract (order placement) between the user and the data owner;",
      "Compliance with Ukrainian legislation requirements.",
    ],
  },
  {
    title: "5. Transfer of Data to Third Parties",
    content: [
      "5.1. Personal data may be transferred to:",
    ],
    list: [
      "Food establishments — Application partners, exclusively to the extent necessary to fulfill the order (name, phone, order composition, delivery address);",
      "Courier services — to carry out order delivery;",
      "Payment systems — to process order payment;",
      "Government authorities — in cases provided for by Ukrainian legislation.",
    ],
    after: "5.2. The data owner does not sell or transfer users' personal data to third parties for marketing purposes without separate user consent.",
  },
  {
    title: "6. Data Storage and Protection",
    content: [
      "6.1. Personal data is stored for the period necessary to achieve the purpose of its processing, or until the user deletes their account.",
      "6.2. The data owner takes organizational and technical measures to protect personal data from unauthorized access, loss, destruction or disclosure.",
    ],
  },
  {
    title: "7. User Rights",
    intro: "In accordance with the Law of Ukraine «On Personal Data Protection», the user has the right to:",
    list: [
      "Receive information about the processing of their personal data;",
      "Request correction of inaccurate data;",
      "Withdraw consent to the processing of personal data;",
      "Request deletion of their personal data (account deletion);",
      "File complaints regarding personal data processing with the Ukrainian Parliament Commissioner for Human Rights.",
    ],
    after: "To exercise these rights, the user may contact using the details specified in section 1.2 of this Policy, or through the «User Support» section in the Application.",
  },
  {
    title: "8. Cookies and Similar Technologies",
    content: [
      "The Application may use technical identifiers (push tokens, session identifiers) exclusively to ensure the correct operation of the Application's functions.",
    ],
  },
  {
    title: "9. Changes to the Policy",
    content: [
      "The data owner reserves the right to make changes to this Policy. The current version is always available in the «Other» section of the Application. In case of significant changes, users will be notified through the Application.",
    ],
  },
  {
    title: "10. Contact Information",
    content: [
      "For questions regarding personal data processing, please contact:\nFOP Sukach Nika Oleksiivna\nPhone: +380689238487\nAddress: Ukraine, 46025, Ternopil region, Ternopil, 3 Bohdana Khmelnytskoho St., apt. 13",
    ],
  },
];

export default function PrivacyEnPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f6efff" }}>
      <Navbar />

      <section style={{ padding: "80px 24px 100px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: 48 }}>
            <p style={{ color: "#7c3aed", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
              Legal Information
            </p>
            <h1 style={{ fontFamily: "Instrument Serif, serif", fontSize: "clamp(32px, 5vw, 48px)", color: "#1a1025", marginBottom: 16, fontWeight: 400 }}>
              Privacy Policy
            </h1>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid rgba(120,80,180,0.15)", borderRadius: 100, padding: "6px 16px" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span>
              <span style={{ fontSize: 13, color: "#6b5b8a" }}>Effective date: 19.06.2026</span>
            </div>
          </div>

          {/* Sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {sections.map((s, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid rgba(120,80,180,0.1)", borderRadius: 20, padding: "28px 32px" }}>
                <h2 style={{ fontFamily: "Instrument Serif, serif", fontSize: 22, color: "#1a1025", marginBottom: 16, fontWeight: 400 }}>
                  {s.title}
                </h2>

                {s.content?.map((p, j) => (
                  <p key={j} style={{ color: "#6b5b8a", fontSize: 15, lineHeight: 1.8, marginBottom: 12, whiteSpace: "pre-line" }}>
                    {p}
                  </p>
                ))}

                {s.intro && (
                  <p style={{ color: "#6b5b8a", fontSize: 15, lineHeight: 1.8, marginBottom: 12 }}>{s.intro}</p>
                )}

                {s.list && (
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px" }}>
                    {s.list.map((item, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "#6b5b8a", fontSize: 15, lineHeight: 1.8, marginBottom: 8 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c3aed", flexShrink: 0, marginTop: 9 }}></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {s.after && (
                  <p style={{ color: "#6b5b8a", fontSize: 15, lineHeight: 1.8, marginTop: 4 }}>{s.after}</p>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
