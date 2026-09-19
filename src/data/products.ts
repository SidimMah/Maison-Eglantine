export type Product = {
  slug: string;
  name: string;
  category: 'traditionnel' | 'pret-a-porter';
  price: number;
  description: string;
  colors: string[];
  sizes: string[];
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: 'caftan-alaline',
    name: 'Caftan Alaline',
    category: 'traditionnel',
    price: 29500,
    description: 'Caftan en velours de soie, orné de broderies délicates et d’une ceinture élégante. Une pièce raffinée aux finitions soignées, disponible en Vert Bouteille et Bleu Nuit.',
    colors: ['Vert Bouteille', 'Bleu Nuit'],
    sizes: ['S', 'M', 'L'],
    featured: true
  },
  {
    slug: 'lady-andalous',
    name: 'Lady Andalous',
    category: 'traditionnel',
    price: 25000,
    description: 'Lady Andalous revisite l’élégance traditionnelle dans un esprit résolument contemporain. Son haut en velours brodé, associé à une jupe fluide sublimée par un voile léger, crée une silhouette raffinée et singulière.',
    colors: ['Noir'],
    sizes: ['S', 'M', 'L'],
    featured: true
  },
  {
    slug: 'kemkha',
    name: 'Kemkha',
    category: 'pret-a-porter',
    price: 12000,
    description: 'Kemkha est une pièce fluide et élégante, sublimée par une texture délicate, des finitions soignées et une ceinture assortie qui souligne la silhouette avec finesse.',
    colors: ['Vert', 'Gris', 'Noir'],
    sizes: ['S', 'M', 'L'],
    featured: true
  },
  {
    slug: 'summer-elegance',
    name: 'Summer Elegance',
    category: 'pret-a-porter',
    price: 2800,
    description: 'Summer Elegance est une robe-chemise légère et fluide, pensée pour les journées estivales. Sa coupe décontractée, sa ceinture ajustable et ses manches courtes offrent une silhouette simple, confortable et élégante.',
    colors: ['Noir', 'Fuchsia', 'Orange'],
    sizes: ['S', 'M', 'L'],
    featured: true
  }
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('fr-DZ').format(value) + ' DA';
