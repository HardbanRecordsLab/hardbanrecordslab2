import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Calendar, CreditCard, Loader2 } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Price {
  id: string;
  unit_amount: number;
  currency: string;
  interval: string;
  product: Product;
}

interface Product {
  id: string;
  name: string;
  description: string;
  features?: string[]; // Assuming features are stored as a JSON array in your products table
}

interface Subscription {
  id: string;
  status: string;
  current_period_end: string;
  price: Price;
}

export default function SubscriptionManagement() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSubscriptionAndProducts();
    }
  }, [user]);

  const fetchSubscriptionAndProducts = async () => {
    setLoading(true);
    try {
      // Fetch user's active subscription
      const { data: subData, error: subError } = await supabase
        .from('subscriptions')
        .select(`
          id,
          status,
          current_period_end,
          price:prices (
            id,
            unit_amount,
            currency,
            interval,
            product:products (
              id,
              name,
              description,
              features
            )
          )
        `)
        .eq('user_id', user!.id)
        .in('status', ['trialing', 'active'])
        .single();

      if (subError && subError.code !== 'PGRST116') { // PGRST116 = no rows found
        throw subError;
      }
      setSubscription(subData as Subscription | null);
      
      // Fetch all active products if no subscription is found
      if (!subData) {
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select(`
            id,
            name,
            description,
            features,
            prices (
              id,
              unit_amount,
              currency,
              interval
            )
          `)
          .eq('active', true);
        
        if (productsError) throw productsError;
        setProducts(productsData as Product[]);
      }

    } catch (error) {
      console.error('Error fetching subscription data:', error);
      toast({
        title: 'Błąd',
        description: 'Nie udało się pobrać danych o subskrypcji.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status: string) => {
    if (['active', 'trialing'].includes(status)) return 'default';
    return 'secondary';
  };

  const getStatusLabel = (status: string) => {
    const statusMap: { [key: string]: string } = {
      active: 'Aktywna',
      trialing: 'Okres próbny',
      past_due: 'Zaległa płatność',
      canceled: 'Anulowana',
    };
    return statusMap[status] || 'Nieaktywna';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Zarządzanie Subskrypcją</h1>
        <p className="text-muted-foreground">
          Zarządzaj swoim planem, metodami płatności i historią rachunków.
        </p>
      </div>

      {subscription ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Twój Aktualny Plan</CardTitle>
                <CardDescription>Szczegóły Twojej subskrypcji</CardDescription>
              </div>
              <Badge variant={getStatusVariant(subscription.status)}>
                {getStatusLabel(subscription.status)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6 p-6 border rounded-lg">
              <div>
                <h3 className="text-lg font-semibold">{subscription.price.product.name}</h3>
                <p className="text-2xl font-bold">
                  {(subscription.price.unit_amount / 100).toFixed(2)} {subscription.price.currency.toUpperCase()}
                  <span className="text-sm font-normal text-muted-foreground"> / {subscription.price.interval}</span>
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <p>
                    Następne odnowienie: {new Date(subscription.current_period_end).toLocaleDateString('pl-PL')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <p>Metoda płatności: Visa **** 1234 (placeholder)</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Funkcje Twojego planu:</h4>
              <ul className="grid grid-cols-2 gap-2">
                {(subscription.price.product.features || []).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Button className="flex-1">Zarządzaj w Stripe</Button>
              <Button variant="destructive" className="flex-1">Anuluj Subskrypcję</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Wybierz Plan Idealny dla Siebie</CardTitle>
            <CardDescription>Nie masz aktywnej subskrypcji. Wybierz plan, aby zacząć.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {products.map(product => (
              <div key={product.id} className="p-6 border rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                  <ul className="mt-4 space-y-2">
                    {(product.features || []).map((feature, index) => (
                       <li key={index} className="flex items-center gap-2">
                         <CheckCircle className="w-4 h-4 text-green-500" />
                         <span className="text-sm">{feature}</span>
                       </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center">
                  {/* Assuming one price per product for simplicity */}
                  {/* <p className="text-3xl font-bold">
                    {(product.prices[0].unit_amount / 100).toFixed(2)} {product.prices[0].currency.toUpperCase()}
                  </p>
                  <p className="text-muted-foreground">/ {product.prices[0].interval}</p> */}
                  <Button size="lg" className="mt-4">Wybierz Plan</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
