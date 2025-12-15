import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  text: string;
  image: string;
}

interface TestimonialsSectionProps {
  data: Testimonial[];
}

const TestimonialsSection = ({ data }: TestimonialsSectionProps) => {
  return (
    <section id="depoimentos" className="py-20 lg:py-32 bg-gradient-to-b from-transparent via-secondary/30 to-transparent relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-rose-delicate rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-champagne-soft rounded-full blur-3xl opacity-20" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 animate-slide-up">
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Histórias de Transformação
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            O que outras mulheres dizem sobre sua experiência
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {data.map((testimonial, index) => (
            <div
              key={index}
              className="group hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="glass rounded-3xl p-8 h-full shadow-soft hover:shadow-medium transition-all duration-300">
                {/* Quote Icon */}
                <div className="w-12 h-12 rounded-full bg-gradient-rose flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Quote className="text-primary-foreground" size={20} />
                </div>

                {/* Testimonial Text */}
                <p className="text-foreground/80 leading-relaxed mb-8 italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                  {testimonial.image ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-border/50">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-champagne flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">👤</span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">Paciente</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <p className="text-sm text-muted-foreground">
            Todos os depoimentos são reais e compartilhados com autorização
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
