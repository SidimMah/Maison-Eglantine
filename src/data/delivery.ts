export type DeliveryRate = {
  wilaya: string;
  zone: number;
  home: number;
  desk: number;
};

const rate = (wilayas: string[], zone: number, home: number, desk: number): DeliveryRate[] =>
  wilayas.map((wilaya) => ({ wilaya, zone, home, desk }));

// Tarifs e-commerce transmis par le transporteur (départ Oran).
export const deliveryRates: DeliveryRate[] = [
  ...rate(['Oran'], 0, 590, 450),
  ...rate(['Alger', 'Sidi Bel Abbès', 'Mostaganem', 'Mascara', 'Aïn Témouchent'], 1, 700, 550),
  ...rate(['Chlef', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Blida', 'Bouira', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Jijel', 'Sétif', 'Saïda', 'Skikda', 'Annaba', 'Guelma', 'Constantine', 'Médéa', "M'Sila", 'Bordj Bou Arreridj', 'Boumerdès', 'El Tarf', 'Tissemsilt', 'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Relizane'], 2, 900, 650),
  ...rate(['Laghouat', 'Biskra', 'Béchar', 'Tébessa', 'Djelfa', 'Ouargla', 'El Oued', 'Ghardaïa', 'Ouled Djellal', 'Béni Abbès', 'Touggourt', "El M'Ghair", 'El Menia'], 3, 950, 750),
  ...rate(['Adrar', 'El Bayadh', 'Naâma', 'Timimoun', 'Bordj Badji Mokhtar'], 4, 1050, 850),
  ...rate(['Tamanrasset', 'Illizi', 'Tindouf', 'In Salah', 'In Guezzam', 'Djanet'], 5, 1600, 1400),
];

// Compatibilité avec les anciens composants du projet.
export const deliveryTariffs = deliveryRates;
export const getDeliveryTariff = (wilaya: string) => deliveryRates.find((item) => item.wilaya === wilaya);
