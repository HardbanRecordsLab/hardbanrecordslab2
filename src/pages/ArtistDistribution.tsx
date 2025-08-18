import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { DistributionManager } from "@/components/digital-products/DistributionManager";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Globe, Music, Loader2, Info } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  title: string;
  product_type: string;
  file_format: string | null;
}
export default function ArtistDistribution() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('digital_products')
        .select('id, title, product_type, file_format')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectedProduct = products.find(p => p.id === selectedProductId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dystrybucja</h1>
          <p className="text-muted-foreground mt-1">
            Zarządzaj dystrybucją swoich produktów na globalnych platformach.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : products.length === 0 ? (
        <Card className="text-center py-12">
          <CardHeader>
            <CardTitle>Nie masz jeszcze żadnych produktów</CardTitle>
            <CardDescription>
              Aby zarządzać dystrybucją, musisz najpierw dodać produkt.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <Button asChild>
              <Link to="/artist">Dodaj swój pierwszy produkt</Link>
                    </Button>
            </CardContent>
          </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Wybierz produkt do zarządzania</CardTitle>
            <CardDescription>
              Wybierz utwór, album lub inny produkt, aby zobaczyć i edytować jego status dystrybucji.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-md">
              <Select onValueChange={setSelectedProductId}>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz produkt z listy..." />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      <div className="flex items-center gap-2">
                        <Music className="w-4 h-4 text-muted-foreground" />
                        <span>{product.title}</span>
    </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedProduct ? (
        <DistributionManager
          key={selectedProduct.id}
          productId={selectedProduct.id}
          productType={selectedProduct.product_type}
          fileFormat={selectedProduct.file_format || undefined}
        />
      ) : (
        !loading && products.length > 0 && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Wybierz produkt</AlertTitle>
            <AlertDescription>
              Wybierz produkt z listy powyżej, aby rozpocząć zarządzanie dystrybucją.
            </AlertDescription>
          </Alert>
  )
      )}
    </div>
  );
}