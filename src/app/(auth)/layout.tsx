export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex min-h-screen items-center justify-center">
      {children}
    </section>
  );
}
