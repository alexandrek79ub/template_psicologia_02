import { Heart, Sparkles, Shield, Calendar, AlertCircle, Info } from "lucide-react";

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface BenefitsSectionProps {
  data: Benefit[];
}

const iconMap: Record<string, any> = {
  Heart,
  Sparkles,
  Shield,
  Calendar,
  Avisos: AlertCircle,
};

const BenefitsSection = ({ data }: BenefitsSectionProps) => {
  return (
    <section id="beneficios" className="py-20 lg:py-32 relative">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-rose-delicate rounded-full blur-3xl opacity-20" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 animate-slide-up">
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Por que escolher este espaço?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Um ambiente seguro, acolhedor e profissional para sua jornada de autoconhecimento
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {data.map((benefit, index) => {
            const Icon = iconMap[benefit.icon] || Info;
            return (
              <div
                key={index}
                className="group hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="glass rounded-3xl p-8 h-full shadow-soft hover:shadow-medium transition-all duration-300">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-rose flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-primary-foreground" size={24} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
