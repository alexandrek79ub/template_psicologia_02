import { Check } from "lucide-react";

interface AboutData {
  name: string;
  title: string;
  description: string;
  highlights: string[];
  image: string;
}

interface AboutSectionProps {
  data: AboutData;
}

const AboutSection = ({ data }: AboutSectionProps) => {
  return (
    <section id="sobre" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Image Side */}
          <div className="order-2 lg:order-1 animate-fade-in">
            <div className="relative">
              {/* Glass Frame */}
              <div className="glass rounded-3xl p-3 shadow-strong">
                <div className="aspect-[3/4] rounded-2xl bg-gradient-champagne overflow-hidden relative group">
                  <div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
                    {data.image ? (
                      <img
                        src={data.image}
                        alt={data.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="text-center space-y-4 p-8">
                        <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
                          <span className="text-4xl">👩‍⚕️</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Foto profissional da psicóloga
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-rose-delicate rounded-full blur-2xl opacity-40 -z-10" />
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2 space-y-8 animate-slide-up">
            {/* Header */}
            <div>
              <h2 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                {data.name}
              </h2>
              <p className="text-lg text-primary font-medium mb-6">
                {data.title}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              {data.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                    <Check className="text-primary" size={14} />
                  </div>
                  <span className="text-foreground/80 leading-relaxed">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="glass rounded-2xl p-6 border-l-4 border-primary mt-8">
              <p className="text-foreground/80 italic leading-relaxed">
                "Meu objetivo é criar um espaço onde você se sinta acolhida para explorar suas emoções,
                reconhecer suas potências e construir uma vida com mais leveza e autenticidade."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
