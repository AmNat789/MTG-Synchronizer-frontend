export interface MtgCard {
  scryfall_id: string;
  full_name: string;
  name_front: string;
  name_back?: string;

  total_recurrences?: number;

  types: string[];

  colors: string[];
  cmc: number;
  keywords: string[];
  rarity: string;

  img_uris_small: string[];
  img_uris_normal: string[];

  price_usd: number;
  price_usd_foil?: number;
  price_eur?: number;
  price_tix?: number;

  legality_standard?: string;
  legality_future?: string;
  legality_historic?: string;
  legality_timeless?: string;
  legality_gladiator?: string;
  legality_pioneer?: string;
  legality_explorer?: string;
  legality_modern?: string;
  legality_legacy?: string;
  legality_pauper?: string;
  legality_vintage?: string;
  legality_penny?: string;
  legality_commander?: string;
  legality_oathbreaker?: string;
  legality_standardbrawl?: string;
  legality_brawl?: string;
  legality_alchemy?: string;
  legality_paupercommander?: string;
  legality_duel?: string;
  legality_oldschool?: string;
  legality_premodern?: string;
}