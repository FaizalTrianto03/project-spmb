// src/app/page.js
import MainPage from "@/components/ui/mainPage";
import InformasiPengumuman from "@/components/ui/informasiPengumuman";
import HeroAbout from "@/components/ui/heroAbout";

export default function Home() {
  return (
    <div>
      <HeroAbout />
      <MainPage />
      <InformasiPengumuman />
    </div>
  );
}
