import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

interface UseFileUploadOptions {
  bucket: string
  folder?: string
  allowedTypes?: string[]
  maxSize?: number // in MB
}

export const useFileUpload = ({
  bucket,
  folder,
  allowedTypes = ['image/*', 'audio/*', 'video/*', 'application/pdf'],
  maxSize = 10
}: UseFileUploadOptions) => {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const uploadFile = async (file: File, customPath?: string): Promise<string | null> => {
    if (!file) {
      toast.error('Nie wybrano pliku')
      return null
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`Plik jest za duży. Maksymalny rozmiar: ${maxSize}MB`)
      return null
    }

    // Check file type
    const isAllowed = allowedTypes.some(type => {
      if (type.endsWith('/*')) {
        const category = type.split('/')[0]
        return file.type.startsWith(category + '/')
      }
      return file.type === type
    })

    if (!isAllowed) {
      toast.error('Nieprawidłowy typ pliku')
      return null
    }

    setUploading(true)
    setProgress(0)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('Musisz być zalogowany aby przesłać plik')
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = customPath || `${folder ? folder + '/' : ''}${user.id}/${fileName}`

      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      toast.success('Plik został przesłany pomyślnie')
      return publicUrl

    } catch (error: any) {
      console.error('Error uploading file:', error)
      toast.error('Błąd podczas przesyłania pliku: ' + error.message)
      return null
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const deleteFile = async (filePath: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath])

      if (error) {
        throw error
      }

      toast.success('Plik został usunięty')
      return true
    } catch (error: any) {
      console.error('Error deleting file:', error)
      toast.error('Błąd podczas usuwania pliku: ' + error.message)
      return false
    }
  }

  return {
    uploadFile,
    deleteFile,
    uploading,
    progress
  }
}