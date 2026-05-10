export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto max-w-4xl text-gray-800">
        <h1 className="mb-3 text-3xl font-bold tracking-tight">
          Privacy Policy for Benaa Social Publisher
        </h1>
        <p className="mb-8 text-sm text-gray-500">
          Effective date: {new Date().toLocaleDateString()}
        </p>

        <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p>
            Benaa Social Publisher is a web-based social media dashboard that
            allows users to connect their TikTok account and publish video
            content manually through TikTok APIs.
          </p>

          <p>
            This Privacy Policy explains how Benaa Social Publisher collects,
            uses, and protects information when users access the platform and
            use TikTok integration features.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Information We Access</h2>
          <div className="space-y-4">
            <p>
              When a user connects TikTok to Benaa Social Publisher through
              OAuth authorization, we may access only the minimum information
              required to provide the service.
            </p>
            <p>This may include:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Basic profile information such as display name and avatar</li>
              <li>Authorization tokens required for TikTok API access</li>
              <li>
                Video publishing-related information required to upload and
                publish content on behalf of the user
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">How We Use Information</h2>
          <div className="space-y-4">
            <p>Benaa Social Publisher uses this information only to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Authenticate users through TikTok OAuth</li>
              <li>Display connected account information inside the dashboard</li>
              <li>Upload user-selected video content to TikTok</li>
              <li>Publish content only after explicit user action</li>
              <li>Provide account connection and publishing functionality</li>
            </ul>
            <p>
              All publishing actions are initiated manually by the user. Benaa
              Social Publisher does not perform automatic posting, background
              publishing, or unauthorized actions on a user&apos;s TikTok
              account.
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Data Sharing</h2>
          <div className="space-y-4">
            <p>
              Benaa Social Publisher does not sell, rent, trade, or otherwise
              share user data with third parties for marketing or advertising
              purposes.
            </p>
            <p>
              We only communicate with TikTok and other connected platform APIs
              as necessary to provide the publishing features requested by the
              user.
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Data Retention</h2>
          <div className="space-y-4">
            <p>
              We retain only the information reasonably necessary to operate the
              service, maintain connected account functionality, and complete
              publishing requests initiated by users.
            </p>
            <p>
              We do not retain unnecessary TikTok user data beyond what is
              needed for account connection and content publishing features.
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Security</h2>
          <div className="space-y-4">
            <p>
              Benaa Social Publisher takes reasonable technical and
              organizational measures to protect user information and secure
              communication with TikTok APIs.
            </p>
            <p>
              While no system can guarantee absolute security, we work to reduce
              risk and protect data handled by the platform.
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">User Control</h2>
          <div className="space-y-4">
            <p>
              Users control whether they connect their TikTok account and
              whether they publish any content.
            </p>
            <p>
              Users may disconnect their TikTok account from Benaa Social
              Publisher at any time through the platform or TikTok account
              permissions management, where applicable.
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">User Responsibilities</h2>
          <p>
            Users are responsible for the content they upload, manage, and
            publish through Benaa Social Publisher and for ensuring that such
            content complies with applicable laws and TikTok policies.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Policy Updates</h2>
          <p>
            Benaa Social Publisher may update this Privacy Policy from time to
            time. Continued use of the platform after changes are published may
            constitute acceptance of the updated policy.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Contact Information</h2>
          <p>
            If you have any questions about this Privacy Policy, you may contact
            Benaa Social Publisher at{" "}
            <a
              href="mailto:benaa.social0@gmail.com"
              className="font-medium text-blue-600 underline underline-offset-4"
            >
              benaa.social0@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}