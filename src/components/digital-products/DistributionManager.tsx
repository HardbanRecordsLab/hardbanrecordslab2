import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Music, 
  Globe, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle,
  ExternalLink,
  Loader2,
  RefreshCw
} from 'lucide-react';

interface DistributionChannel {
  id: string;
  name: string;
  type: string;
  supported_formats: string[];
  commission_rate: number;
  is_active: boolean;
}

interface ProductDistribution {
  id: string;
  channel_id: string;
  external_id: string | null;
  status: 'pending' | 'processing' | 'live' | 'failed' | 'removed';
  submitted_at: string;
  published_at: string | null;
  error_message: string | null;
  channel: DistributionChannel;
}

interface DistributionManagerProps {
  productId: string;
  productType: string;
  fileFormat?: string;
}

const statusConfig = {
  pending: { label: 'Oczekuje', color: 'bg-yellow-500', icon: Clock },
  processing: { label: 'Przetwarzanie', color: 'bg-blue-500', icon: Loader2 },
  live: { label: 'Opublikowane', color: 'bg-green-500', icon: CheckCircle },
  failed: { label: 'Błąd', color: 'bg-red-500', icon: XCircle },
  removed: { label: 'Usunięte', color: 'bg-gray-500', icon: AlertCircle },
};

export const DistributionManager: React.FC<DistributionManagerProps> = ({
  productId,
  productType,
  fileFormat
}) => {
  const [channels, setChannels] = useState<DistributionChannel[]>([]);
  const [distributions, setDistributions] = useState<ProductDistribution[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchChannels();
    fetchDistributions();
  }, [productId]);

  const fetchChannels = async () => {
    try {
      const { data, error } = await supabase
        .from('distribution_channels')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;

      // Filter channels based on product type and supported formats
      const filteredChannels = data.filter(channel => {
        if (productType === 'music' || productType === 'beat' || productType === 'sample_pack') {
          return channel.type === 'streaming' && 
                 (!fileFormat || channel.supported_formats.includes(fileFormat.split('/')[1]));
        } else if (productType === 'ebook' || productType === 'audiobook') {
          return channel.type === 'download' && 
                 (!fileFormat || channel.supported_formats.some(format => 
                   fileFormat.includes(format) || format === '*'
                 ));
        } else if (productType === 'course') {
          return channel.type === 'course_platform';
        }
        return channel.type === 'download';
      });

      setChannels(filteredChannels);
    } catch (error) {
      console.error('Error fetching channels:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się pobrać kanałów dystrybucji",
        variant: "destructive",
      });
    }
  };

  const fetchDistributions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('product_distributions')
        .select(`
          *,
          channel:distribution_channels(*)
        `)
        .eq('product_id', productId);

      if (error) throw error;
      setDistributions(data || []);
    } catch (error) {
      console.error('Error fetching distributions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChannelToggle = (channelId: string, checked: boolean) => {
    if (checked) {
      setSelectedChannels(prev => [...prev, channelId]);
    } else {
      setSelectedChannels(prev => prev.filter(id => id !== channelId));
    }
  };

  const submitToChannels = async () => {
    if (selectedChannels.length === 0) {
      toast({
        title: "Błąd",
        description: "Wybierz co najmniej jeden kanał dystrybucji",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const distributionData = selectedChannels.map(channelId => ({
        product_id: productId,
        channel_id: channelId,
        status: 'pending' as const,
      }));

      const { error } = await supabase
        .from('product_distributions')
        .upsert(distributionData, { 
          onConflict: 'product_id,channel_id',
          ignoreDuplicates: false 
        });

      if (error) throw error;

      toast({
        title: "Sukces!",
        description: `Produkt został wysłany do ${selectedChannels.length} kanałów dystrybucji`,
      });

      setSelectedChannels([]);
      fetchDistributions();
    } catch (error) {
      console.error('Error submitting to channels:', error);
      toast({
        title: "Błąd",
        description: "Wystąpił błąd podczas wysyłania do kanałów",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const retryDistribution = async (distributionId: string) => {
    try {
      const { error } = await supabase
        .from('product_distributions')
        .update({ 
          status: 'pending',
          error_message: null 
        })
        .eq('id', distributionId);

      if (error) throw error;

      toast({
        title: "Sukces!",
        description: "Dystrybucja została ponownie wysłana",
      });

      fetchDistributions();
    } catch (error) {
      console.error('Error retrying distribution:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się ponownie wysłać dystrybucji",
        variant: "destructive",
      });
    }
  };

  const removeDistribution = async (distributionId: string) => {
    try {
      const { error } = await supabase
        .from('product_distributions')
        .update({ status: 'removed' })
        .eq('id', distributionId);

      if (error) throw error;

      toast({
        title: "Sukces!",
        description: "Dystrybucja została usunięta",
      });

      fetchDistributions();
    } catch (error) {
      console.error('Error removing distribution:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się usunąć dystrybucji",
        variant: "destructive",
      });
    }
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'streaming':
        return Music;
      case 'download':
        return Globe;
      default:
        return Globe;
    }
  };

  const getDistributionProgress = () => {
    if (distributions.length === 0) return 0;
    const liveCount = distributions.filter(d => d.status === 'live').length;
    return (liveCount / distributions.length) * 100;
  };

  const getDistributionStats = () => {
    const stats = {
      total: distributions.length,
      live: 0,
      pending: 0,
      failed: 0,
      processing: 0,
    };

    distributions.forEach(d => {
      if (d.status in stats) {
        stats[d.status as keyof typeof stats]++;
      }
    });

    return stats;
  };

  const stats = getDistributionStats();

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Status dystrybucji
          </CardTitle>
          <CardDescription>
            Zarządzaj dystrybucją swojego produktu na różnych platformach
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Postęp dystrybucji</span>
              <span className="text-sm text-muted-foreground">
                {stats.live}/{stats.total} platform aktywnych
              </span>
            </div>
            <Progress value={getDistributionProgress()} className="w-full" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.live}</div>
                <div className="text-sm text-muted-foreground">Opublikowane</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.processing}</div>
                <div className="text-sm text-muted-foreground">Przetwarzanie</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                <div className="text-sm text-muted-foreground">Oczekuje</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
                <div className="text-sm text-muted-foreground">Błędy</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Distributions */}
      {distributions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Aktywne dystrybucje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {distributions.map((distribution) => {
                const status = statusConfig[distribution.status];
                const StatusIcon = status.icon;
                const ChannelIcon = getChannelIcon(distribution.channel.type);

                return (
                  <div
                    key={distribution.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <ChannelIcon className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{distribution.channel.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {distribution.channel.type} • Prowizja: {distribution.channel.commission_rate}%
                        </div>
                        {distribution.external_id && (
                          <div className="text-sm text-muted-foreground">
                            ID: {distribution.external_id}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge variant="outline" className="mb-1">
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                        {distribution.published_at && (
                          <div className="text-xs text-muted-foreground">
                            Opubl.: {new Date(distribution.published_at).toLocaleDateString()}
                          </div>
                        )}
                        {distribution.error_message && (
                          <div className="text-xs text-red-600 max-w-xs">
                            {distribution.error_message}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {distribution.status === 'failed' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => retryDistribution(distribution.id)}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {distribution.status === 'live' && distribution.external_id && (
                          <Button size="sm" variant="outline" asChild>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}

                        {distribution.status !== 'removed' && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeDistribution(distribution.id)}
                          >
                            Usuń
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add New Distributions */}
      <Card>
        <CardHeader>
          <CardTitle>Dodaj do nowych platform</CardTitle>
          <CardDescription>
            Wybierz platformy, na które chcesz wysłać swój produkt
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid gap-4">
                {channels
                  .filter(channel => !distributions.some(d => d.channel_id === channel.id))
                  .map((channel) => {
                    const ChannelIcon = getChannelIcon(channel.type);
                    const isSelected = selectedChannels.includes(channel.id);

                    return (
                      <div
                        key={channel.id}
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                          isSelected ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
                        }`}
                        onClick={() => handleChannelToggle(channel.id, !isSelected)}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={isSelected}
                            onChange={() => {}}
                          />
                          <ChannelIcon className="h-8 w-8 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{channel.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {channel.type} • Prowizja: {channel.commission_rate}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Formaty: {channel.supported_formats.join(', ')}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {channels.filter(channel => !distributions.some(d => d.channel_id === channel.id)).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Wszystkie dostępne platformy są już skonfigurowane dla tego produktu
                </div>
              )}

              {selectedChannels.length > 0 && (
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Wybrano {selectedChannels.length} platform
                  </div>
                  <Button
                    onClick={submitToChannels}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Wysyłanie...
                      </>
                    ) : (
                      `Wyślij do ${selectedChannels.length} platform`
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};