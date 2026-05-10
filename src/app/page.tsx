import Link from "next/link";

export default function SocialPublishingLandingPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <section className="relative overflow-hidden border-b">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.10),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.10),transparent_25%)]" />
                <div className="container relative mx-auto px-4 py-24 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            <div>
                                <div className="mb-6 inline-flex items-center rounded-full border bg-background/70 px-3 py-1 text-sm backdrop-blur">
                                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500" />
                                    Publish smarter across every platform
                                </div>

                                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                                    Benaa Social Publisher – Connect, manage, and publish content across multiple platforms.
                                </h1>

                                <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                                    Connect your social accounts, manage publishing workflows, and
                                    publish content directly to platforms like TikTok, Instagram,
                                    Facebook, and YouTube from one clean dashboard using official
                                    platform integrations.
                                </p>

                                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                    <Link
                                        href="/login"
                                        className="inline-flex h-11 items-center justify-center rounded-xl bg-foreground px-6 text-sm font-medium text-background transition hover:opacity-90"
                                    >
                                        Get Started
                                    </Link>

                                    <Link
                                        href="/dashboard"
                                        className="inline-flex h-11 items-center justify-center rounded-xl border px-6 text-sm font-medium transition hover:bg-muted"
                                    >
                                        Go to Dashboard
                                    </Link>

                                    <Link
                                        href="/privacy"
                                        className="inline-flex h-11 items-center justify-center rounded-xl border px-6 text-sm font-medium transition hover:bg-muted"
                                    >
                                        Privacy Policy
                                    </Link>

                                    <Link
                                        href="/terms"
                                        className="inline-flex h-11 items-center justify-center rounded-xl border px-6 text-sm font-medium transition hover:bg-muted"
                                    >
                                        Terms of Service
                                    </Link>
                                </div>

                                <div className="mt-10 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                                    <div className="rounded-2xl border bg-card p-4">
                                        <div className="text-2xl font-bold">4</div>
                                        <div className="mt-1 text-muted-foreground">
                                            Supported platforms
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border bg-card p-4">
                                        <div className="text-2xl font-bold">1</div>
                                        <div className="mt-1 text-muted-foreground">
                                            All-in-one dashboard
                                        </div>
                                    </div>

                                    <div className="col-span-2 rounded-2xl border bg-card p-4 sm:col-span-1">
                                        <div className="text-2xl font-bold">Fast</div>
                                        <div className="mt-1 text-muted-foreground">
                                            Direct publishing flow
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="rounded-3xl border bg-card p-4 shadow-2xl shadow-black/5">
                                    <div className="rounded-2xl border bg-background p-4">
                                        <div className="flex items-center justify-between border-b pb-4">
                                            <div>
                                                <p className="text-sm font-medium">Benaa Social Publisher</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Multi-platform publishing dashboard
                                                </p>
                                            </div>
                                            <div className="rounded-full border px-3 py-1 text-xs">
                                                Live
                                            </div>
                                        </div>

                                        <div className="mt-4 space-y-3">
                                            {[
                                                {
                                                    name: "TikTok",
                                                    status: "Connected",
                                                    account: "@brand.tiktok",
                                                },
                                                {
                                                    name: "Instagram",
                                                    status: "Connected",
                                                    account: "@brand.ig",
                                                },
                                                {
                                                    name: "Facebook",
                                                    status: "Connected",
                                                    account: "Brand Page",
                                                },
                                                {
                                                    name: "YouTube",
                                                    status: "Draft",
                                                    account: "Channel Ready",
                                                },
                                            ].map((item) => (
                                                <div
                                                    key={item.name}
                                                    className="flex items-center justify-between rounded-2xl border p-4"
                                                >
                                                    <div>
                                                        <p className="font-medium">{item.name}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {item.account}
                                                        </p>
                                                    </div>
                                                    <span className="rounded-full bg-muted px-3 py-1 text-xs">
                                                        {item.status}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-4 rounded-2xl border p-4">
                                            <p className="text-sm font-medium">Direct Publishing</p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                Publish approved content directly to connected social
                                                media accounts, including TikTok.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Everything you need to publish with confidence
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            Built for smooth social workflows, account connection, and direct
                            publishing from one place.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {[
                            {
                                title: "Unified account connection",
                                description:
                                    "Connect multiple social media accounts and manage them inside one simple interface.",
                            },
                            {
                                title: "Direct publishing",
                                description:
                                    "Publish approved content directly to supported platforms without juggling separate tools.",
                            },
                            {
                                title: "Creator-friendly workflow",
                                description:
                                    "Keep content organized, prepare drafts, and streamline your posting process.",
                            },
                            {
                                title: "Clean dashboard experience",
                                description:
                                    "Designed for fast navigation, clear account states, and simple publishing actions.",
                            },
                            {
                                title: "Platform-aware posting",
                                description:
                                    "Handle publishing requirements for each platform in a structured way.",
                            },
                            {
                                title: "Built for teams and brands",
                                description:
                                    "Useful for businesses, social managers, and creators who need consistency at scale.",
                            },
                        ].map((feature) => (
                            <div
                                key={feature.title}
                                className="rounded-3xl border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-muted text-lg font-semibold">
                                    ✦
                                </div>
                                <h3 className="text-lg font-semibold">{feature.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-y bg-muted/40">
                <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="mx-auto max-w-2xl text-center">
                            <p className="text-sm font-medium text-muted-foreground">
                                How it works
                            </p>
                            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                                A simple workflow for social publishing
                            </h2>
                        </div>

                        <div className="mt-12 grid gap-6 md:grid-cols-3">
                            {[
                                {
                                    step: "01",
                                    title: "Connect accounts",
                                    description:
                                        "Link your supported social media accounts securely through the platform.",
                                },
                                {
                                    step: "02",
                                    title: "Prepare content",
                                    description:
                                        "Upload media, organize your post details, and review platform-specific requirements.",
                                },
                                {
                                    step: "03",
                                    title: "Publish directly",
                                    description:
                                        "Send approved content directly to connected accounts, including TikTok direct publishing.",
                                },
                            ].map((item) => (
                                <div
                                    key={item.step}
                                    className="rounded-3xl border bg-background p-6"
                                >
                                    <div className="text-sm font-semibold text-muted-foreground">
                                        {item.step}
                                    </div>
                                    <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Why Benaa Social Publisher
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            Professional product presence for platform reviews and real users.
                        </h2>
                        <p className="mt-4 max-w-xl text-muted-foreground">
                            Present a clear product website, explain what your app does, and
                            give users easy access to your dashboard, privacy policy, and
                            terms pages.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            "Clear product branding",
                            "Public-facing homepage",
                            "Fast access to dashboard",
                            "Trust-building legal pages",
                        ].map((item) => (
                            <div key={item} className="rounded-2xl border bg-card p-5">
                                <div className="text-sm font-medium">{item}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl rounded-3xl border bg-card p-8 text-center shadow-sm sm:p-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Ready to manage your social publishing workflow?
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                        Open your dashboard, connect your accounts, and start publishing
                        from one organized platform.
                    </p>
                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Link
                            href="/login"
                            className="inline-flex h-11 items-center justify-center rounded-xl bg-foreground px-6 text-sm font-medium text-background transition hover:opacity-90"
                        >
                            Get Started
                        </Link>
                        <a
                            href="mailto:benaa.social0@gmail.com"
                            className="inline-flex h-11 items-center justify-center rounded-xl border px-6 text-sm font-medium transition hover:bg-muted"
                        >
                            Contact Support
                        </a>
                    </div>
                </div>
            </section>

            <footer className="border-t">
                <div className="container mx-auto flex flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <div>
                        <span className="font-medium text-foreground">
                            Benaa Social Publisher
                        </span>{" "}
                        © 2026. All rights reserved.
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/privacy" className="transition hover:text-foreground">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="transition hover:text-foreground">
                            Terms of Service
                        </Link>
                        <Link href="/dashboard" className="transition hover:text-foreground">
                            Dashboard
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}