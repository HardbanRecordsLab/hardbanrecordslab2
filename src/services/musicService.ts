// Pełny kod serwisu muzycznego
import axiosClient from '../lib/axiosClient';

// Definicja typu dla pojedynczego wydania muzycznego, aby zapewnić bezpieczeństwo typów.
// Upewnij się, że pola zgadzają się z tym, co zwraca Twoje API.
export interface Release {
  id: string;
  title: string;
  artist: string;
  release_date: string;
  status: 'published' | 'pending' | 'rejected';
  cover_image_url: string;
}

/**
 * Asynchroniczna funkcja do pobierania listy wydawnictw muzycznych.
 *
 * - Wykorzystuje centralnego klienta `axiosClient`.
 * - Wysyła zapytanie GET na zabezpieczony endpoint `/music/releases`.
 * - Zwraca tablicę obiektów typu `Release`.
 * - W przypadku błędu, Axios automatycznie rzuci wyjątek, który zostanie przechwycony przez React Query.
 * @returns {Promise<Release[]>} Obietnica, która zwraca listę wydawnictw.
 */
export const getArtistReleases = async (): Promise<Release[]> => {
  const response = await axiosClient.get('/music/releases/');
  return response.data;
};