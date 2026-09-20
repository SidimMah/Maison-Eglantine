export type DeliveryTariff = {
  wilaya: string;
  zone: number;
  home: number;
  desk: number;
};

// Tarifs e-commerce fournis pour les expéditions au départ d'Oran.
// home = livraison à domicile ; desk = retrait en Stop Desk.
export const deliveryTariffs: DeliveryTariff[] = [
  { wilaya: 'Oran', zone: 0, home: 590, desk: 450 },
  { wilaya: 'Alger', zone: 1, home: 700, desk: 550 },
  { wilaya: 'Sidi Bel Abbès', zone: 1, home: 700, desk: 550 },
  { wilaya: 'Mostaganem', zone: 1, home: 700, desk: 550 },
  { wilaya: 'Mascara', zone: 1, home: 700, desk: 550 },
  { wilaya: 'Aïn Témouchent', zone: 1, home: 700, desk: 550 },

  { wilaya: 'Chlef', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Oum El Bouaghi', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Batna', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Béjaïa', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Blida', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Bouira', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Tlemcen', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Tiaret', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Tizi Ouzou', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Jijel', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Sétif', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Saïda', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Skikda', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Annaba', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Guelma', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Constantine', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Médéa', zone: 2, home: 900, desk: 650 },
  { wilaya: "M'Sila", zone: 2, home: 900, desk: 650 },
  { wilaya: 'Bordj Bou Arreridj', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Boumerdès', zone: 2, home: 900, desk: 650 },
  { wilaya: 'El Tarf', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Tissemsilt', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Khenchela', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Souk Ahras', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Tipaza', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Mila', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Aïn Defla', zone: 2, home: 900, desk: 650 },
  { wilaya: 'Relizane', zone: 2, home: 900, desk: 650 },

  { wilaya: 'Laghouat', zone: 3, home: 950, desk: 750 },
  { wilaya: 'Biskra', zone: 3, home: 950, desk: 750 },
  { wilaya: 'Béchar', zone: 3, home: 950, desk: 750 },
  { wilaya: 'Tébessa', zone: 3, home: 950, desk: 750 },
  { wilaya: 'Djelfa', zone: 3, home: 950, desk: 750 },
  { wilaya: 'Ouargla', zone: 3, home: 950, desk: 750 },
  { wilaya: 'El Oued', zone: 3, home: 950, desk: 750 },
  { wilaya: 'Ghardaïa', zone: 3, home: 950, desk: 750 },
  { wilaya: 'Ouled Djellal', zone: 3, home: 950, desk: 750 },
  { wilaya: 'Béni Abbès', zone: 3, home: 950, desk: 750 },
  { wilaya: 'Touggourt', zone: 3, home: 950, desk: 750 },
  { wilaya: "El M'Ghair", zone: 3, home: 950, desk: 750 },
  { wilaya: 'El Menia', zone: 3, home: 950, desk: 750 },

  { wilaya: 'Adrar', zone: 4, home: 1050, desk: 850 },
  { wilaya: 'El Bayadh', zone: 4, home: 1050, desk: 850 },
  { wilaya: 'Naâma', zone: 4, home: 1050, desk: 850 },
  { wilaya: 'Timimoun', zone: 4, home: 1050, desk: 850 },
  { wilaya: 'Bordj Badji Mokhtar', zone: 4, home: 1050, desk: 850 },

  { wilaya: 'Tamanrasset', zone: 5, home: 1600, desk: 1400 },
  { wilaya: 'Illizi', zone: 5, home: 1600, desk: 1400 },
  { wilaya: 'Tindouf', zone: 5, home: 1600, desk: 1400 },
  { wilaya: 'In Salah', zone: 5, home: 1600, desk: 1400 },
  { wilaya: 'In Guezzam', zone: 5, home: 1600, desk: 1400 },
  { wilaya: 'Djanet', zone: 5, home: 1600, desk: 1400 }
];

export const getDeliveryTariff = (wilaya: string) =>
  deliveryTariffs.find((item) => item.wilaya === wilaya);
