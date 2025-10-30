import { supabase } from './supabase'

export const thoughtsApi = {
  async list(sortOrder = '-entry_date') {
    try {
      const isDescending = sortOrder.startsWith('-')
      const column = sortOrder.replace('-', '')
      
      const { data, error } = await supabase
        .from('thoughts')
        .select('*')
        .order(column, { ascending: !isDescending })
      
      if (error) {
        console.error('Error fetching thoughts:', error)
        throw error
      }

      console.log('Fetched thoughts:', data)
      return data || []
    } catch (error) {
      console.error('Failed to fetch thoughts:', error)
      return []
    }
  },

  async create(thoughtData) {
    try {
      console.log('Creating thought:', thoughtData)

      const { data, error } = await supabase
        .from('thoughts')
        .insert([thoughtData])
        .select()
        .single()
      
      if (error) {
        console.error('Error creating thought:', error)
        throw error
      }

      console.log('Created thought:', data)
      return data
    } catch (error) {
      console.error('Failed to create thought:', error)
      throw error
    }
  }
}
