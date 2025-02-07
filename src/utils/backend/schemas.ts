export interface MtgCard {
  scryfall_id: string
  full_name: string
  name_front: string
  name_back?: string

  oracle_texts: string[]

  total_recurrences?: number

  types: string[]

  colors: string[]
  cmc: number
  keywords: string[]
  rarity: string

  img_uris_small: string[]
  img_uris_normal: string[]

  price_usd: number
  price_usd_foil?: number
  price_eur?: number
  price_tix?: number

  legality_standard?: string
  legality_future?: string
  legality_historic?: string
  legality_timeless?: string
  legality_gladiator?: string
  legality_pioneer?: string
  legality_explorer?: string
  legality_modern?: string
  legality_legacy?: string
  legality_pauper?: string
  legality_vintage?: string
  legality_penny?: string
  legality_commander?: string
  legality_oathbreaker?: string
  legality_standardbrawl?: string
  legality_brawl?: string
  legality_alchemy?: string
  legality_paupercommander?: string
  legality_duel?: string
  legality_oldschool?: string
  legality_premodern?: string
}

export interface ResponseCardNode {
  node: MtgCard
}

export interface ResponseCardAndNumOwned extends ResponseCardNode {
  number_owned: number
}

export interface ResponseCardAndSyncScore extends ResponseCardNode {
  sync_score: number
}

interface GetPoolProps {
  name: string
  description: string
  pool_id: number
}

export interface GetPool {
  p: GetPoolProps
}

export interface GetCardClustersResponse {
  community_id: number[]
  nodes: MtgCard[]
  average_synergy: number
}

export interface RequestUpdateCard {
  name?: string
  scryfall_id?: string
}
