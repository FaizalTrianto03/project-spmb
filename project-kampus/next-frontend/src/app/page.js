// src/app/page.js
import MainPage from "@/components/views/mainPage";
import InformasiPengumuman from "@/components/views/informasiPengumuman";
import HeroAbout from "@/components/views/heroAbout";

export default function Home() {
  return (
    <div>
      <HeroAbout />
      <MainPage />
      <InformasiPengumuman />
    </div>
  );
}
