import { supabase } from './supabase'

export const clearAuthData = async () => {
  // Clear Supabase session
  await supabase.auth.signOut()
  
  // Clear localStorage
  if (typeof window !== 'undefined') {
    localStorage.clear()
  }
  
  // Clear sessionStorage
  if (typeof window !== 'undefined') {
    sessionStorage.clear()
  }
}

export const forceLogout = async () => {
  await clearAuthData()
  window.location.href = '/login'
} 