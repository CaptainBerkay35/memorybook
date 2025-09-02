import Header from "../components/Header/Header.tsx";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header></Header>
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-0 py-4 flex flex-col items-center gap-12">
        {children}
      </main>
    </div>
  );
}
