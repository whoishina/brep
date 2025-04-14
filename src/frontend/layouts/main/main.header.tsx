import MainNav from "./main.nav";

export default function MainHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="flex h-14 items-center justify-between">
          <MainNav />
        </div>
      </div>
    </header>
  );
}
