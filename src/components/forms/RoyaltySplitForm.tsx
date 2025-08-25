// src/components/forms/RoyaltySplitForm.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axiosClient from "@/lib/axiosClient";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Definicja schematu walidacji formularza przy użyciu Zod
const formSchema = z.object({
  email: z.string().email({
    message: "Proszę podać poprawny adres e-mail.",
  }),
  share_percentage: z.coerce.number()
    .gt(0, "Wartość musi być większa od 0.")
    .lte(100, "Wartość nie może być większa od 100."),
});

interface RoyaltySplitFormProps {
  releaseId: number;
  onSuccess: () => void; // Funkcja do wywołania po sukcesie, np. zamknięcie modala
}

export function RoyaltySplitForm({ releaseId, onSuccess }: RoyaltySplitFormProps) {
  const queryClient = useQueryClient();

  // Inicjalizacja formularza z react-hook-form i walidacją Zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      share_percentage: 0,
    },
  });

  // Funkcja obsługująca wysłanie formularza
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const promise = axiosClient.post(`/music/releases/${releaseId}/royalty-splits`, values);

    toast.promise(promise, {
      loading: 'Dodawanie podziału...',
      success: () => {
        // Unieważniamy zapytanie, aby odświeżyć listę wydawnictw
        queryClient.invalidateQueries({ queryKey: ['userReleases'] });
        onSuccess(); // Wywołujemy funkcję zwrotną
        return `Podział dla ${values.email} został pomyślnie dodany.`;
      },
      error: (error) => {
        const errorMessage = error.response?.data?.detail || "Wystąpił nieznany błąd.";
        return `Błąd: ${errorMessage}`;
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email współtwórcy</FormLabel>
              <FormControl>
                <Input placeholder="imie@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="share_percentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Udział procentowy (%)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="np. 50.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Dodawanie..." : "Dodaj podział"}
        </Button>
      </form>
    </Form>
  );
}