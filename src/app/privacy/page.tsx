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
            Benaa Social Publisher is a web-based social media management platform
            that allows users to connect social media accounts and publish content
            through official platform APIs including Facebook and TikTok.
          </p>

          <p>
            This Privacy Policy explains how Benaa Social Publisher collects, uses,
            and protects user information when using the platform and connected
            social media integrations.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">
            Information We Access
          </h2>

          <div className="space-y-4">
            <p>
              When users connect social media accounts through OAuth authorization,
              we may access only the minimum information necessary to provide the
              requested functionality.
            </p>

            <p>This may include:</p>

            <ul className="list-disc space-y-2 pl-6">
              <li>Basic profile information such as name and profile image</li>
              <li>Authorization tokens required for API access</li>
              <li>Page or account information required for publishing</li>
              <li>Publishing-related information selected by the user</li>
            </ul>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">
            How We Use Information
          </h2>

          <div className="space-y-4">
            <p>Benaa Social Publisher uses this information only to:</p>

            <ul className="list-disc space-y-2 pl-6">
              <li>Authenticate users through official OAuth systems</li>
              <li>Display connected account information inside the dashboard</li>
              <li>Allow users to create and publish content manually</li>
              <li>Publish content after explicit user action</li>
              <li>Maintain account connection functionality</li>
            </ul>

            <p>
              Benaa Social Publisher does not perform unauthorized actions,
              background publishing, or automatic posting without direct user
              interaction.
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Data Sharing</h2>

          <div className="space-y-4">
            <p>
              Benaa Social Publisher does not sell, rent, trade, or share user data
              with third parties for advertising or marketing purposes.
            </p>

            <p>
              We communicate only with official platform APIs as necessary to
              provide publishing and account connection functionality requested by
              the user.
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Data Retention</h2>

          <div className="space-y-4">
            <p>
              We retain only the information reasonably necessary to operate the
              platform and maintain connected account functionality.
            </p>

            <p>
              Users may disconnect their connected accounts at any time through the
              platform or through their social media account settings.
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Security</h2>

          <div className="space-y-4">
            <p>
              Benaa Social Publisher takes reasonable technical and organizational
              measures to protect user information and secure communication with
              third-party APIs.
            </p>

            <p>
              Although no system can guarantee absolute security, we work to reduce
              risks and protect user data handled by the platform.
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">User Responsibilities</h2>

          <p>
            Users are responsible for the content they upload, manage, and publish
            using Benaa Social Publisher and for ensuring compliance with applicable
            laws and platform policies.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Policy Updates</h2>

          <p>
            Benaa Social Publisher may update this Privacy Policy from time to time.
            Continued use of the platform after updates are published may constitute
            acceptance of the updated policy.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Contact Information</h2>

          <p>
            If you have any questions regarding this Privacy Policy, you may contact
            us at{" "}
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