import Header from "@/components/Header";
import Featured from "@/components/Featured";
import Materials from "@/components/Materials";
import Providers from "@/Providers";
import Modals from "@/components/Modals";

export default function Home() {
  return (
    <Providers>
      <Header />
      <main>
        <Featured />
        <Materials />
      </main>
      <Modals />
    </Providers>
  );
}
