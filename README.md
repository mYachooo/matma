# 🧮 Matematyka – Fiszki

Aplikacja PWA do ćwiczenia matematyki dla uczniów klas 1–5 szkoły podstawowej.

**Demo:** https://TWOJA_NAZWA.github.io/matma/

---

## ✨ Funkcje

- **6 kategorii:** tabliczka mnożenia, dzielenie, dodawanie/odejmowanie, nawiasy, ułamki, pola i obwody
- **5 klas × 4 poziomy trudności** (Łatwy / Średni / Trudny / Legenda) — zakres materiału dopasowany do klasy
- **Profile graczy** — osobny postęp dla każdego ucznia
- **System XP i rang** — Uczeń → Adept → Sprawny → Biegły → Ekspert → Mistrz → Geniusz
- **14 odznak** do zdobycia za różne osiągnięcia
- **18 awatarów** odblokowywanych w miarę awansowania
- **Tryb Quiz** (4 odpowiedzi do wyboru) i **Fiszki** (odwracane karty)
- **Tryb 2 graczy** na jednym telefonie
- **Słabe strony** — aplikacja zapamiętuje błędy i proponuje powtórkę
- **Timer** — opcjonalne odliczanie czasu
- **Animacje cząsteczek** przy odpowiedziach
- **Ściągawka geometryczna** z rysunkami SVG i wzorami
- **Działa offline** dzięki Service Worker (PWA)
- **Brak powtórzeń** — system pool zapewnia unikalne pytania w sesji

---

## 📁 Pliki

```
index.html      ← cała aplikacja (jeden plik)
sw.js           ← service worker (tryb offline)
manifest.json   ← konfiguracja PWA
icon-192.png    ← ikona aplikacji
icon-512.png    ← ikona aplikacji (duża)
README.md       ← ten plik
```

---

## 🚀 Wdrożenie na GitHub Pages

### Krok 1 — Utwórz repozytorium

1. Zaloguj się na **github.com**
2. Kliknij **New** → nazwa: `matma` → **Public** → **Create repository**

### Krok 2 — Wgraj pliki

1. Na stronie repozytorium kliknij **„uploading an existing file"**
2. Przeciągnij wszystkie 6 plików z tego folderu
3. Kliknij **„Commit changes"**

### Krok 3 — Włącz GitHub Pages

1. **Settings** → **Pages**
2. Branch: **main**, folder: **/ (root)** → **Save**
3. Poczekaj 1–2 minuty

Twoja aplikacja będzie dostępna pod adresem:
```
https://TWOJA_NAZWA.github.io/matma/
```

---

## 📱 Instalacja na telefonie

### Android (Chrome):
Menu ⋮ → **„Dodaj do ekranu głównego"**

### iPhone (Safari):
Przycisk Udostępnij → **„Dodaj do ekranu początkowego"**

---

## 🌐 Własna domena (opcjonalnie)

1. Kup domenę (np. domeny.pl, OVH) — ok. 50–80 zł/rok
2. W DNS dodaj rekord CNAME: `www → TWOJA_NAZWA.github.io`
3. W GitHub Pages → Custom domain → wpisz swoją domenę
4. Zaznacz „Enforce HTTPS"

---

## 🏅 System odznak

| Odznaka | Warunek |
|---------|---------|
| 🎮 Pierwszy krok | Ukończ pierwszą sesję |
| 💯 Perfekcja | Zdobądź 100% w sesji |
| 🔥 Seria 3 dni | Ćwicz 3 dni z rzędu |
| 🌟 Seria 7 dni | Ćwicz 7 dni z rzędu |
| 📚 Pilny uczeń | Ukończ 5 sesji |
| 🎓 Weteran | Ukończ 20 sesji |
| ⭐ Pierwsze 100 XP | Zdobądź 100 XP |
| 💫 500 XP | Zdobądź 500 XP |
| 🏅 1000 XP | Zdobądź 1000 XP |
| 🌈 Wszechstronny | Zagraj we wszystkie 6 kategorii |
| 👑 Legendarny | Ukończ sesję na poziomie Legenda |
| 🎯 Celny strzał | Sesja bez błędów |
| 💪 Powrót | Popraw słabą stronę do 100% |
| ⚡ Błyskawica | Ukończ sesję z timerem |

---

## 🔓 Awatary do odblokowania

Startowe awatary: 😊 🦁 🐼 🦊 🐸 🦄

Kolejne odblokowują się po awansie rangi:
- **Adept (100 XP):** 🐯 🐙 ⭐ 🚀
- **Sprawny (250 XP):** 🎮 🌈 🦋 🐲
- **Biegły (500 XP):** 🔥 💎 👾 🌟
- **Ekspert (900 XP):** 🦅 🐉 🌙 🎯
- **Mistrz/Geniusz (1400+ XP):** 👑 🏆 ✨ 🎪

---

*Wersja 2.0 — Maj 2026*
