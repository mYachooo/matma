# 🚀 Jak wdrożyć aplikację „Matematyka – Fiszki" na GitHub Pages

Efekt końcowy: aplikacja dostępna pod adresem `https://TWOJA_NAZWA.github.io/matma/`  
Działa jak natywna apka na telefonie — można ją dodać do ekranu głównego.

---

## 📦 Co masz do wgrania (5 plików)

```
index.html      ← główna aplikacja
sw.js           ← service worker (tryb offline)
manifest.json   ← dane PWA (ikona, nazwa, kolory)
icon-192.png    ← ikona aplikacji
icon-512.png    ← ikona aplikacji (duża)
```

---

## KROK 1 — Utwórz konto GitHub

1. Wejdź na **github.com**
2. Kliknij **Sign up** → wypełnij formularz
3. Potwierdź email

> Jeśli masz już konto — przejdź do Kroku 2.

---

## KROK 2 — Utwórz nowe repozytorium

1. Po zalogowaniu kliknij **zielony przycisk „New"** (lewy panel) lub wejdź na `github.com/new`
2. Wypełnij:
   - **Repository name:** `matma` (lub dowolna nazwa bez spacji)
   - **Visibility:** ✅ **Public** ← *ważne, GitHub Pages działa tylko na publicznych repozytoriach w darmowym planie*
   - Resztę zostaw domyślnie
3. Kliknij **„Create repository"**

---

## KROK 3 — Wgraj pliki

Po utworzeniu repozytorium zobaczysz pustą stronę z instrukcjami.

1. Kliknij link **„uploading an existing file"** (jest w środku strony)
2. Przeciągnij wszystkie 5 plików do okna przeglądarki **LUB** kliknij „choose your files"
3. Pliki do wgrania:
   ```
   index.html
   sw.js
   manifest.json
   icon-192.png
   icon-512.png
   ```
4. Na dole strony kliknij zielony przycisk **„Commit changes"**

---

## KROK 4 — Włącz GitHub Pages

1. Wejdź w zakładkę **⚙️ Settings** (górny pasek repozytorium)
2. W lewym menu kliknij **„Pages"**
3. W sekcji **„Branch"** wybierz:
   - Branch: **main**
   - Folder: **/ (root)**
4. Kliknij **„Save"**

GitHub pokaże komunikat:  
> *„Your site is live at https://TWOJA_NAZWA.github.io/matma/"*

⏳ Poczekaj **1–2 minuty** — strona musi się zbudować.

---

## KROK 5 — Sprawdź na telefonie

1. Otwórz link `https://TWOJA_NAZWA.github.io/matma/` na telefonie
2. Aplikacja powinna się załadować i działać

---

## KROK 6 — Dodaj do ekranu głównego (instalacja PWA)

### Na Androidzie (Chrome):
1. Otwórz link w Chrome
2. Poczekaj chwilę — pojawi się baner „Dodaj Matematykę do ekranu głównego"
3. **LUB** kliknij menu ⋮ → **„Dodaj do ekranu głównego"**
4. Potwierdź → ikona pojawi się jak normalna aplikacja

### Na iPhonie (Safari):
1. Otwórz link w **Safari** (nie Chrome!)
2. Kliknij ikonę **Udostępnij** (prostokąt ze strzałką w górę)
3. Przewiń i wybierz **„Dodaj do ekranu początkowego"**
4. Zmień nazwę jeśli chcesz → kliknij **„Dodaj"**

---

## 🔗 Jak udostępnić innym

Wyślij po prostu link:
```
https://TWOJA_NAZWA.github.io/matma/
```

Działa na każdym telefonie z przeglądarką — nie trzeba nic instalować ze sklepu.

---

## 🌐 Opcjonalnie: własna domena (np. matma.pl)

Jeśli chcesz bardziej profesjonalny adres:

1. Kup domenę (np. w **domeny.pl**, **nazwa.pl** lub **OVH**) — ok. 50–80 zł/rok
2. W ustawieniach domeny (DNS) dodaj rekord **CNAME**:
   ```
   www  →  TWOJA_NAZWA.github.io
   ```
3. W GitHub Pages (Settings → Pages) wpisz swoją domenę w polu **„Custom domain"**
4. Zaznacz ✅ **„Enforce HTTPS"**

Po 10–30 minutach aplikacja będzie dostępna pod własną domeną.

---

## ✅ Podsumowanie

| Co | Koszt | Czas |
|----|-------|------|
| GitHub Pages (bez domeny) | **darmowe** | 10 minut |
| Z własną domeną | ~60 zł/rok | +15 minut |

---

## ❓ Najczęstsze problemy

**Strona pokazuje 404**  
→ Sprawdź czy plik nazywa się dokładnie `index.html` (nie `Index.html`)  
→ Odczekaj 2–3 minuty i odśwież

**Ikona nie pojawia się przy dodawaniu do ekranu**  
→ Upewnij się że wszystkie 5 plików jest wgranych  
→ Na iPhonie musisz używać Safari (nie Chrome)

**Dane graczy znikają po wyczyszczeniu przeglądarki**  
→ To normalne — dane są w localStorage przeglądarki  
→ Rozwiązanie: powiedz mi, a dodam zapisywanie w chmurze (Firebase/Supabase)

---

*Instrukcja przygotowana dla aplikacji Matematyka – Fiszki v1.0*
