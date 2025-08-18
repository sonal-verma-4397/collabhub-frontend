import Header from "./components/Header";
import Footer from "./components/Footer";
import NavItems from "./components/NavItems";

export default function Sidebar() {
  return (
    <aside className="dark:bg-[#131416] flex flex-col pb-3">
      <Header />
      <NavItems />
      <Footer />
    </aside>
  );
}
