import axios from 'axios'

const scryfallApiClient = axios.create({
  // baseURL: 'https://api.scryfall.com',
  headers: {
    'User-Agent': process.env.NEXT_PUBLIC_USER_AGENT,
    Accept: 'application/json;q=0.9,*/*;q=0.8',
    'Content-Type': 'application/json',
  },
})

export default scryfallApiClient
