import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Upload, File, X } from 'lucide-react'
import { useFileUpload } from '@/hooks/useFileUpload'

interface FileUploadProps {
  bucket: string
  folder?: string
  allowedTypes?: string[]
  maxSize?: number
  onUploadComplete?: (url: string, fileName: string) => void
  onUploadError?: (error: string) => void
  className?: string
  multiple?: boolean
}

export const FileUpload = ({
  bucket,
  folder,
  allowedTypes,
  maxSize,
  onUploadComplete,
  onUploadError,
  className,
  multiple = false
}: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const { uploadFile, uploading, progress } = useFileUpload({
    bucket,
    folder,
    allowedTypes,
    maxSize
  })

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (multiple) {
      setSelectedFiles(files)
    } else {
      setSelectedFiles(files.slice(0, 1))
    }
  }

  const handleUpload = async () => {
    if (!selectedFiles.length) return

    try {
      for (const file of selectedFiles) {
        const url = await uploadFile(file)
        if (url) {
          onUploadComplete?.(url, file.name)
        } else {
          onUploadError?.(`Błąd przesyłania pliku: ${file.name}`)
        }
      }
      setSelectedFiles([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error: any) {
      onUploadError?.(error.message)
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex gap-2">
        <Input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          multiple={multiple}
          accept={allowedTypes?.join(',')}
          className="flex-1"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="shrink-0"
        >
          <Upload className="w-4 h-4 mr-2" />
          Wybierz pliki
        </Button>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Wybrane pliki:</h4>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-2">
                  <File className="w-4 h-4" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => removeFile(index)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {uploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Przesyłanie...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={uploading || selectedFiles.length === 0}
            className="w-full"
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? 'Przesyłanie...' : `Prześlij ${selectedFiles.length} plik${selectedFiles.length > 1 ? 'i' : ''}`}
          </Button>
        </div>
      )}
    </div>
  )
}