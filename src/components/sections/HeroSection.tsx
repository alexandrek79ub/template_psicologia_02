import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

interface HeroSectionProps {
  data: {
    title: string;
    subtitle: string;
    cta: string;
    image: string;
  };
}

const HeroSection = ({ data }: HeroSectionProps) => {
  const scrollToContact = () => {
    const element = document.getElementById("contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${data.image || heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/80" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-rose-delicate rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-champagne-soft rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Glass Card */}
          <div className="glass rounded-[2.5rem] p-8 lg:p-16 shadow-strong animate-fade-in">
            <div className="text-center space-y-8">
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight animate-slide-up">
                {data.title}
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
                {data.subtitle}
              </p>

              {/* CTA Button */}
              <div className="pt-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <Button
                  size="lg"
                  onClick={scrollToContact}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-6 rounded-full shadow-medium hover:shadow-strong hover:scale-105 transition-all duration-300 group"
                >
                  {data.cta}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </div>

              {/* Trust Badge */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>CRP 06/123456</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>+8 anos de experiência</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Atendimento presencial e online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
