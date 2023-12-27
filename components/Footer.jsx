import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative bottom-0 z-10 h-[56px] mt-[160px] bg-dark w-[100%] text-light flex flex-row items-center justify-center px-[16px] md:px-[30px]">
      <Link href={"/"}>
        <picture className="cursor-pointer h-[28px] md:h-[32px] w-auto flex flex-row items-center gap-[8px]">
          <img
            src="/assets/pw_logo.png"
            alt="logo"
            className="h-[28px] md:h-[32px]"
          />
          <h2 className="font-bold tracking-[0.4em] text-sm md:text-base">
            PRINCE&nbsp;<span className="text-primary">&</span>&nbsp;WHITE
          </h2>
        </picture>
      </Link>
    </footer>
  );
};

export default Footer;
