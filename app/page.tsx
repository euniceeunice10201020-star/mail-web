const mailboxes = [
  { name: "bd@company.com", unread: 12 },
  { name: "ops@company.com", unread: 4 },
  { name: "sales@company.com", unread: 7 },
  { name: "ceo.office@company.com", unread: 1 },
  { name: "support@company.com", unread: 9 }
];

const selectedMail = {
  from: "alice@partner.com",
  to: "bd@company.com",
  subject: "Q1 合作排期确认",
  time: "2026-02-13 10:20",
  body: `你好，

我们已经整理好了 Q1 的合作排期，想和你确认以下事项：
1. 联合活动上线时间
2. 合同签署节点
3. 对外发布素材

如果你方便，今天下午我们可以快速开个 15 分钟电话。

谢谢！`
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Mail Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Unified Mail Overview</p>
        </header>

        <section className="grid gap-6 md:grid-cols-[320px_1fr]">
          <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-800">Mailboxes</h2>
              <span className="text-xs text-slate-500">5 Accounts</span>
            </div>

            <ul className="space-y-2">
              {mailboxes.map((mailbox, index) => (
                <li
                  key={mailbox.name}
                  className={`flex items-center justify-between rounded-xl border px-3 py-2 ${
                    index === 0
                      ? "border-blue-200 bg-blue-50"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <span className="truncate pr-2 text-sm font-medium text-slate-700">{mailbox.name}</span>
                  <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white">
                    {mailbox.unread}
                  </span>
                </li>
              ))}
            </ul>
          </aside>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 border-b border-slate-200 pb-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Mail Preview</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-900">{selectedMail.subject}</h3>
              <div className="mt-2 space-y-1 text-sm text-slate-600">
                <p>
                  <span className="font-medium text-slate-700">From:</span> {selectedMail.from}
                </p>
                <p>
                  <span className="font-medium text-slate-700">To:</span> {selectedMail.to}
                </p>
                <p>
                  <span className="font-medium text-slate-700">Time:</span> {selectedMail.time}
                </p>
              </div>
            </div>

            <pre className="whitespace-pre-wrap text-sm leading-6 text-slate-700">{selectedMail.body}</pre>
          </article>
        </section>
      </div>
    </main>
  );
}
