import Footer from "@/components/layout/footer";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="bg-background-dark relative overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-white/20"></div>
        <div className="absolute bottom-0 left-0 -mb-24 -ml-24 h-48 w-48 rounded-full bg-white/10"></div>
      </div>

      <section className="py-24 lg:py-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="bg-primary text-background-dark relative overflow-hidden rounded-xl p-10 md:p-20">
            <div className="absolute right-0 top-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-white/20"></div>
            <div className="absolute bottom-0 left-0 -mb-24 -ml-24 h-48 w-48 rounded-full bg-white/10"></div>
            <div className="relative z-10">
              <span className="mb-4 block text-sm font-bold uppercase tracking-widest">
                Start
              </span>
              <h1 className="font-display text-5xl font-black leading-[1.1] tracking-tight md:text-7xl lg:text-8xl">
                Toller <span className="italic opacity-60">Link-Shortener</span>{" "}
                jaja
              </h1>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/dashboard"
                  className="bg-background-dark text-primary inline-flex h-14 items-center justify-center rounded-full px-8 text-lg font-bold transition-all hover:shadow-lg"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer className="py-6" />
    </main>
  );
}
