import axios from 'axios'
import { getAuth, User } from 'firebase/auth'

let isInitialized = false // To prevent redundant initialization

const backendApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Replace with your backend URL
})

backendApiClient.interceptors.request.use(
  async config => {
    // Check if the user is authenticated
    const currentUser: User | null = getAuth().currentUser

    if (!isInitialized) {
      isInitialized = true
      await new Promise(resolve => {
        const unsubscribe = getAuth().onAuthStateChanged(user => {
          if (user) resolve(user)
        })
      })
    }

    if (currentUser) {
      const token = await currentUser.getIdToken()
      config.headers['Authorization'] = `Bearer ${token}`
    } else {
      console.warn('No user authenticated. Skipping token addition.')
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default backendApiClient
