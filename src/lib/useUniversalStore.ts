import universalData from "@/data/universalAdapter";

/**
 * Hook para acessar dados universais adaptados do V3 para V2
 * Fornece os dados no formato esperado pelos componentes globais
 */
export const useUniversalData = () => {
  // Mapear os dados adaptados para o formato esperado pelos componentes globais legados
  const data = {
    // Identity / Branding
    identity: universalData.identity,
    branding: {
      title: universalData.identity.siteName,
      description: universalData.identity.description,
      logoUrl: universalData.identity.logoUrl,
      faviconUrl: universalData.identity.faviconUrl,
      menu: universalData.menu.items,
      ctaButton: universalData.menu.ctaButton,
    },
    // Site data (contact, social, etc)
    site: {
      contact: universalData.contact,
      phone: universalData.contact.phone,
      whatsapp: universalData.contact.whatsapp,
      email: universalData.contact.email,
      address: universalData.contact.address,
      social: universalData.socialLinks,
    },
    // Footer data
    footer: universalData.footer,
    // All sections
    sections: universalData.sections,
    // Individual section data
    hero: universalData.hero,
    benefits: universalData.benefits,
    services: universalData.services,
    about: universalData.about,
    testimonials: universalData.testimonials,
    cta: universalData.cta,
    faq: universalData.faq,
  };

  return { data };
};

