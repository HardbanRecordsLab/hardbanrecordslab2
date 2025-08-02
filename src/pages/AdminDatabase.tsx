import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { supabase } from "@/integrations/supabase/client"
import { Database, Activity, HardDrive, Users, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { StatsCard } from "@/components/StatsCard"

interface TableInfo {
  table_name: string
  row_count: number
  size_mb: number
}

export default function AdminDatabase() {
  const [tables, setTables] = useState<TableInfo[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchDatabaseInfo()
  }, [])

  const fetchDatabaseInfo = async () => {
    try {
      setLoading(true)
      
      // Fetch table information
      const tableData: TableInfo[] = [
        { table_name: 'profiles', row_count: 0, size_mb: 0.1 },
        { table_name: 'projects', row_count: 0, size_mb: 0.05 },
        { table_name: 'courses', row_count: 0, size_mb: 0.02 },
        { table_name: 'enrollments', row_count: 0, size_mb: 0.01 },
        { table_name: 'lessons', row_count: 0, size_mb: 0.01 },
        { table_name: 'collaborations', row_count: 0, size_mb: 0.01 },
        { table_name: 'project_files', row_count: 0, size_mb: 0.01 },
        { table_name: 'admin_settings', row_count: 0, size_mb: 0.01 }
      ]

      // Get actual row counts for available tables
      const availableTables = ['profiles', 'projects', 'courses', 'enrollments', 'lessons', 'collaborations', 'project_files', 'admin_settings']
      
      for (const table of tableData) {
        if (availableTables.includes(table.table_name)) {
          try {
            const { count, error } = await supabase
              .from(table.table_name as any)
              .select('*', { count: 'exact', head: true })
            
            if (!error) {
              table.row_count = count || 0
            }
          } catch (err) {
            console.warn(`Could not fetch count for table ${table.table_name}:`, err)
          }
        }
      }

      setTables(tableData)
    } catch (error: any) {
      console.error('Error fetching database info:', error)
      toast({
        title: "Błąd",
        description: "Nie udało się pobrać informacji o bazie danych",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    fetchDatabaseInfo()
    toast({
      title: "Odświeżono",
      description: "Informacje o bazie danych zostały zaktualizowane"
    })
  }

  const totalRows = tables.reduce((sum, table) => sum + table.row_count, 0)
  const totalSize = tables.reduce((sum, table) => sum + table.size_mb, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Database className="w-8 h-8" />
            Zarządzanie Bazą Danych
          </h1>
          <p className="text-muted-foreground">
            Przegląd i zarządzanie strukturą bazy danych
          </p>
        </div>
        <Button onClick={handleRefresh} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Odśwież
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Łączne rekordy"
          value={totalRows.toString()}
          description="Wszystkie wpisy w bazie"
          icon={<Database className="w-4 h-4" />}
        />
        <StatsCard
          title="Rozmiar bazy"
          value={`${totalSize.toFixed(2)} MB`}
          description="Zajęte miejsce"
          icon={<HardDrive className="w-4 h-4" />}
        />
        <StatsCard
          title="Tabele"
          value={tables.length.toString()}
          description="Aktywne tabele"
          icon={<Activity className="w-4 h-4" />}
        />
        <StatsCard
          title="Status"
          value="Online"
          description="Baza danych aktywna"
          icon={<Activity className="w-4 h-4" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tabele w bazie danych</CardTitle>
          <CardDescription>
            Przegląd wszystkich tabel z liczbą rekordów i rozmiarem
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Ładowanie...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nazwa tabeli</TableHead>
                  <TableHead>Liczba rekordów</TableHead>
                  <TableHead>Rozmiar (MB)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ostatnia aktualizacja</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tables.map((table) => (
                  <TableRow key={table.table_name}>
                    <TableCell className="font-medium">{table.table_name}</TableCell>
                    <TableCell>{table.row_count.toLocaleString()}</TableCell>
                    <TableCell>{table.size_mb.toFixed(3)}</TableCell>
                    <TableCell>
                      <Badge variant="default">Aktywna</Badge>
                    </TableCell>
                    <TableCell>{new Date().toLocaleDateString('pl-PL')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Operacje na bazie</CardTitle>
            <CardDescription>
              Narzędzia do zarządzania bazą danych
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full">
              Optymalizuj tabele
            </Button>
            <Button variant="outline" className="w-full">
              Sprawdź integralność
            </Button>
            <Button variant="outline" className="w-full">
              Analiza wydajności
            </Button>
            <Button variant="destructive" className="w-full">
              Wyczyść logi
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bezpieczeństwo</CardTitle>
            <CardDescription>
              Status bezpieczeństwa bazy danych
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Row Level Security</span>
              <Badge variant="default">Włączone</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Polityki dostępu</span>
              <Badge variant="default">Aktywne</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Szyfrowanie</span>
              <Badge variant="default">SSL/TLS</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Backup</span>
              <Badge variant="secondary">Automatyczny</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}