/**
 * Universal Adapter V3 -> V2
 * Converte os dados do universal.json V3 (português) para o formato
 * esperado pelos componentes (V2 inglês)
 */

import universalDataV3 from './universal.json';

// Types for V3 data
interface V3UniversalData {
  versao: string;
  identidade: {
    nomeSite: string;
    logoUrl: string;
    faviconUrl: string;
    descricao: string;
    palavrasChave: string[];
  };
  menu: {
    itens: Array<{ rotulo: string; url: string }>;
    botaoCTA: { rotulo: string; url: string; destaque: boolean };
  };
  contato: {
    telefone: string;
    whatsapp: string;
    email: string;
    endereco: string;
  };
  redesSociais: {
    instagram: string;
    facebook: string;
  };
  integracoes: {
    googleAnalyticsId: string;
    metaPixelId: string;
    googleAdsId: string;
  };
  secoes: {
    hero: {
      ativo: boolean;
      badge: string;
      titulo: string;
      subtitulo: string;
      imagemFundo: string;
      botaoPrincipal: { rotulo: string; url: string };
      botaoSecundario: { rotulo: string; url: string };
    };
    beneficios: {
      ativo: boolean;
      badge: string;
      titulo: string;
      itens: Array<{ icone: string; titulo: string; descricao: string }>;
    };
    servicos: {
      ativo: boolean;
      badge: string;
      titulo: string;
      descricao: string;
      itens: Array<{ titulo: string; descricao: string; topicos: string[] }>;
    };
    sobre: {
      ativo: boolean;
      badge: string;
      titulo: string;
      descricao: string;
      imagem: string;
      destaques: string[];
    };
    depoimentos: {
      ativo: boolean;
      badge: string;
      titulo: string;
      itens: Array<{ nome: string; texto: string; fotoUrl: string }>;
    };
    faq: {
      ativo: boolean;
      badge: string;
      titulo: string;
      itens: Array<{ pergunta: string; resposta: string }>;
    };
    cta: {
      ativo: boolean;
      titulo: string;
      descricao: string;
      botaoTexto: string;
      botaoUrl: string;
    };
    rodape: {
      descricaoMarca: string;
      copyright: string;
      registroProfissional: string;
      links: Array<{ rotulo: string; url: string }>;
    };
  };
  configuracoes: {
    tema: {
      corPrimaria: string;
      corSecundaria: string;
      corFundo: string;
      modoEscuro: boolean;
    };
    funcionalidades: {
      blogAtivo: boolean;
      avisosAtivos: boolean;
    };
  };
}

// Adapted V2-like interface for components
export interface HeroData {
  title: string;
  subtitle: string;
  cta: string;
  ctaUrl: string;
  image: string;
  badge?: string;
  secondaryButton?: { label: string; url: string };
}

export interface BenefitData {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceData {
  title: string;
  description: string;
  topics: string[];
}

export interface AboutData {
  name: string;
  title: string;
  description: string;
  highlights: string[];
  image: string;
}

export interface TestimonialData {
  name: string;
  text: string;
  image: string;
}

export interface CTAData {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
}

export interface FAQData {
  question: string;
  answer: string;
}

export interface IdentityData {
  siteName: string;
  logoUrl: string;
  faviconUrl: string;
  description: string;
  keywords: string[];
}

export interface ContactData {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
}

export interface SocialLinksData {
  instagram: string;
  facebook: string;
}

export interface MenuItemData {
  label: string;
  url: string;
}

export interface MenuData {
  items: MenuItemData[];
  ctaButton: { label: string; url: string; highlight: boolean };
}

export interface FooterData {
  brandDescription: string;
  copyright: string;
  professionalRegistration: string;
  links: MenuItemData[];
}

export interface UniversalAdaptedData {
  version: string;
  identity: IdentityData;
  menu: MenuData;
  contact: ContactData;
  socialLinks: SocialLinksData;
  hero: HeroData;
  benefits: BenefitData[];
  services: ServiceData[];
  about: AboutData;
  testimonials: TestimonialData[];
  cta: CTAData;
  faq: FAQData[];
  footer: FooterData;
  // Section visibility
  sections: {
    hero: { active: boolean };
    benefits: { active: boolean };
    services: { active: boolean };
    about: { active: boolean };
    testimonials: { active: boolean };
    cta: { active: boolean };
    faq: { active: boolean };
  };
}

/**
 * Adapta os dados do universal.json V3 para o formato V2 esperado pelos componentes
 */
export function adaptV3toV2(v3Data: V3UniversalData): UniversalAdaptedData {
  const { identidade, menu, contato, redesSociais, secoes } = v3Data;

  return {
    version: v3Data.versao,
    
    identity: {
      siteName: identidade.nomeSite,
      logoUrl: identidade.logoUrl,
      faviconUrl: identidade.faviconUrl,
      description: identidade.descricao,
      keywords: identidade.palavrasChave,
    },
    
    menu: {
      items: menu.itens.map(item => ({
        label: item.rotulo,
        url: item.url,
      })),
      ctaButton: {
        label: menu.botaoCTA.rotulo,
        url: menu.botaoCTA.url,
        highlight: menu.botaoCTA.destaque,
      },
    },
    
    contact: {
      phone: contato.telefone,
      whatsapp: contato.whatsapp,
      email: contato.email,
      address: contato.endereco,
    },
    
    socialLinks: {
      instagram: redesSociais.instagram,
      facebook: redesSociais.facebook,
    },
    
    hero: {
      title: secoes.hero.titulo,
      subtitle: secoes.hero.subtitulo,
      cta: secoes.hero.botaoPrincipal.rotulo,
      ctaUrl: secoes.hero.botaoPrincipal.url,
      image: secoes.hero.imagemFundo,
      badge: secoes.hero.badge,
      secondaryButton: {
        label: secoes.hero.botaoSecundario.rotulo,
        url: secoes.hero.botaoSecundario.url,
      },
    },
    
    benefits: secoes.beneficios.itens.map(item => ({
      icon: item.icone,
      title: item.titulo,
      description: item.descricao,
    })),
    
    services: secoes.servicos.itens.map(item => ({
      title: item.titulo,
      description: item.descricao,
      topics: item.topicos,
    })),
    
    about: {
      name: secoes.sobre.titulo,
      title: secoes.sobre.badge,
      description: secoes.sobre.descricao,
      highlights: secoes.sobre.destaques,
      image: secoes.sobre.imagem,
    },
    
    testimonials: secoes.depoimentos.itens.map(item => ({
      name: item.nome,
      text: item.texto,
      image: item.fotoUrl,
    })),
    
    cta: {
      title: secoes.cta.titulo,
      subtitle: secoes.cta.descricao,
      buttonText: secoes.cta.botaoTexto,
      buttonUrl: secoes.cta.botaoUrl,
    },
    
    faq: secoes.faq.itens.map(item => ({
      question: item.pergunta,
      answer: item.resposta,
    })),
    
    footer: {
      brandDescription: secoes.rodape.descricaoMarca,
      copyright: secoes.rodape.copyright,
      professionalRegistration: secoes.rodape.registroProfissional,
      links: secoes.rodape.links.map(link => ({
        label: link.rotulo,
        url: link.url,
      })),
    },
    
    sections: {
      hero: { active: secoes.hero.ativo },
      benefits: { active: secoes.beneficios.ativo },
      services: { active: secoes.servicos.ativo },
      about: { active: secoes.sobre.ativo },
      testimonials: { active: secoes.depoimentos.ativo },
      cta: { active: secoes.cta.ativo },
      faq: { active: secoes.faq.ativo },
    },
  };
}

// Export the adapted data
const universalData = adaptV3toV2(universalDataV3 as V3UniversalData);

export default universalData;
