-- Tabela do przechowywania powiadomień
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    link_to TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Włączenie RLS (Row Level Security)
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Polityka: Użytkownicy mogą widzieć tylko swoje własne powiadomienia
CREATE POLICY "Users can view their own notifications"
ON notifications FOR SELECT
USING (auth.uid() = user_id);

-- Polityka: Użytkownicy mogą oznaczać swoje powiadomienia jako przeczytane
CREATE POLICY "Users can update their own notifications"
ON notifications FOR UPDATE
USING (auth.uid() = user_id);

-- Indeks dla szybszego wyszukiwania powiadomień dla danego użytkownika
CREATE INDEX idx_notifications_user_id ON notifications(user_id);

