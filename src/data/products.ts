export type Product = {
  slug: string;
  name: string;
  category: 'traditionnel' | 'pret-a-porter';
  price: number;
  description: string;
  colors: string[];
  sizes: string[];
  featured?: boolean;
  cover: string;
  images: Record<string, string[]>;
};

const base = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : import.meta.env.BASE_URL + '/';

export const assetUrl = (path: string) => base + path.replace(/^\//, '');

export const products: Product[] = [
  {
    slug: 'caftan-alaline',
    name: 'Caftan Alaline',
    category: 'traditionnel',
    price: 29500,
    description: 'Caftan en velours de soie, orné de broderies délicates et d’une ceinture élégante. Une pièce raffinée aux finitions soignées, disponible en Vert Bouteille et Bleu Nuit.',
    colors: ['Vert Bouteille', 'Bleu Nuit'],
    sizes: ['S', 'M', 'L'],
    cover: '/images/products/caftan-alaline/vert-bouteille/01.webp',
    images: {
      'Vert Bouteille': [
        '/images/products/caftan-alaline/vert-bouteille/01.webp',
        '/images/products/caftan-alaline/vert-bouteille/02.webp',
        '/images/products/caftan-alaline/vert-bouteille/03.webp',
        '/images/products/caftan-alaline/vert-bouteille/04.webp'
      ],
      'Bleu Nuit': [
        '/images/products/caftan-alaline/bleu-nuit/01.webp',
        '/images/products/caftan-alaline/bleu-nuit/02.webp',
        '/images/products/caftan-alaline/bleu-nuit/03.webp',
        '/images/products/caftan-alaline/bleu-nuit/04.webp',
        '/images/products/caftan-alaline/bleu-nuit/05.webp'
      ]
    },
    featured: true
  },
  {
    slug: 'lady-andalous',
    name: 'Lady Andalous',
    category: 'traditionnel',
    price: 25000,
    description: 'Lady Andalous revisite l’élégance traditionnelle dans un esprit résolument contemporain. Son haut en velours brodé, associé à une jupe fluide sublimée par un voile léger, crée une silhouette raffinée et singulière. Une pièce de caractère pensée pour celles qui aiment conjuguer héritage et modernité.',
    colors: ['Noir'],
    sizes: ['S', 'M', 'L'],
    cover: '/images/products/lady-andalous/noir/01.webp',
    images: {
      'Noir': [
        '/images/products/lady-andalous/noir/01.webp',
        '/images/products/lady-andalous/noir/02.webp',
        '/images/products/lady-andalous/noir/03.webp',
        '/images/products/lady-andalous/noir/04.webp'
      ]
    },
    featured: true
  },
  {
    slug: 'kemkha',
    name: 'Kemkha',
    category: 'traditionnel',
    price: 12000,
    description: 'Kemkha est une pièce fluide et élégante, sublimée par une texture délicate, des finitions soignées et une ceinture assortie qui souligne la silhouette avec finesse. Disponible en Vert, Gris et Noir.',
    colors: ['Vert', 'Gris', 'Noir'],
    sizes: ['S', 'M', 'L'],
    cover: '/images/products/kemkha/gris/01.webp',
    images: {
      'Vert': [
        '/images/products/kemkha/vert/01.webp',
        '/images/products/kemkha/vert/02.webp',
        '/images/products/kemkha/vert/03.webp',
        '/images/products/kemkha/vert/04.webp'
      ],
      'Gris': [
        '/images/products/kemkha/gris/01.webp',
        '/images/products/kemkha/gris/02.webp',
        '/images/products/kemkha/gris/03.webp',
        '/images/products/kemkha/gris/04.webp',
        '/images/products/kemkha/gris/05.webp'
      ],
      'Noir': [
        '/images/products/kemkha/noir/01.webp',
        '/images/products/kemkha/noir/02.webp',
        '/images/products/kemkha/noir/03.webp',
        '/images/products/kemkha/noir/04.webp',
        '/images/products/kemkha/noir/05.webp'
      ]
    },
    featured: true
  },
  {
    slug: 'summer-elegance',
    name: 'Summer Elegance',
    category: 'pret-a-porter',
    price: 2800,
    description: 'Summer Elegance est une robe-chemise légère et fluide, pensée pour les journées estivales. Sa coupe décontractée, sa ceinture ajustable et ses manches courtes offrent une silhouette simple, confortable et élégante. Disponible en Noir, Fuchsia et Orange.',
    colors: ['Noir', 'Fuchsia', 'Orange'],
    sizes: ['S', 'M', 'L'],
    cover: '/images/products/summer-elegance/fuchsia/01.webp',
    images: {
      'Noir': [
        '/images/products/summer-elegance/noir/01.webp',
        '/images/products/summer-elegance/noir/02.webp',
        '/images/products/summer-elegance/noir/03.webp'
      ],
      'Fuchsia': [
        '/images/products/summer-elegance/fuchsia/01.webp',
        '/images/products/summer-elegance/fuchsia/02.webp',
        '/images/products/summer-elegance/fuchsia/03.webp',
        '/images/products/summer-elegance/fuchsia/04.webp'
      ],
      'Orange': [
        '/images/products/summer-elegance/orange/01.webp',
        '/images/products/summer-elegance/orange/02.webp',
        '/images/products/summer-elegance/orange/03.webp',
        '/images/products/summer-elegance/orange/04.webp',
        '/images/products/summer-elegance/orange/05.webp'
      ]
    },
    featured: true
  }
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('fr-DZ').format(value) + ' DA';
