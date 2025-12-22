import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUniversalData } from "@/lib/useUniversalStore";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data } = useUniversalData();
  const branding = data?.branding;
  const identity = data?.identity;

  const scrollToSection = (id: string) => {
    // Remove # if present in url
    const elementId = id.replace('#', '');
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const renderMenuItem = (item: any, index: number, mobile = false) => {
    let url = item.url;
    // Handle potential data issue where CMS adds leading slash to external links
    if (url && url.startsWith("/http")) {
      url = url.substring(1);
    }

    const isExternal = url && (url.startsWith("http") || url.startsWith("https"));

    const className = mobile
      ? "text-left text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
      : "text-sm font-medium text-foreground/80 hover:text-primary transition-colors";

    if (isExternal) {
      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          onClick={() => mobile && setIsMenuOpen(false)}
        >
          {item.label}
        </a>
      );
    }

    return (
      <button
        key={index}
        onClick={() => scrollToSection(url)}
        className={className}
      >
        {item.label}
      </button>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {identity?.logoUrl ? (
              <img src={identity.logoUrl} alt={identity.siteName || branding?.title || "Logo"} className="h-14 w-auto" />
            ) : (
              <h1 className="text-2xl font-heading font-semibold text-foreground">
                {identity?.siteName || branding?.title}
              </h1>
            )}
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {(branding?.menu || []).map((item: any, index: number) => 
              renderMenuItem(item, index)
            )}
            <Button
              onClick={() => scrollToSection("contato")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft"
            >
              Agendar
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 animate-slide-up">
            <nav className="flex flex-col gap-4">
              {(branding?.menu || []).map((item: any, index: number) => 
                renderMenuItem(item, index, true)
              )}
              <Button
                onClick={() => scrollToSection("contato")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft w-full"
              >
                Agendar
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
