# Wizja projektu Symulator Studenta

## Założenia

1. Gra terenowa
2. Korzystanie z kodów QR w celu brania udziału w rozgrywce
3. Angażowanie użytkownika do aktywności w prawdziwym świecie

## Opis aplikacji

Aplikacja polega na przemierzeniu wydziału D17 i szukaniu kodów QR. 
W charakterystycznych salach znajdują się kody QR, które przenoszą nas do specjalnej minigry związanej z jednym przedmiotem dla każdego semestru.
Minigra jest ściśle związana z jednym przedmiotem i tematyką nawiązuje do przedmiotu aby można było w przyjemny sposób zaprezentować tok naszych studiów.
Za przejście każdej z unikalnych minigier otrzymuje się jeden z 6 fragmentów pracy inżynierskiej.
Po przejściu 6 mini gier, odpowiadającym 6 pierwszym semestrom studiów gracz w ramach 7 semestru może złożyć swoją inżynierkę z częsci.
Po złożeniu inżynierki gracz dostaje humorystyczny dyplom.

## Opis minigierek

1. UNIX - w pierwszej kolejności musimy zeskanować kod QR, 
który odsyła nas na telefonie do krótkiego tutoriala obsługi terminala oraz do specjalnego pola, 
w którym musimy wpisać specjalny kod, dzięki któremu zaliczymy gierkę. Kod zdobywa się korzystając z komputera pracowni, 
komputer w pracowni zawiera bash script, który tworzy cały układ katalogów i związaną z nim zagadkę. 
Następnie wśród wszystkich katalogów trzeba znaleźć "kolosa", jego zawartość będzie odpowiedzą, 
którą trzeba wpisać do wcześniej wymieniegonego pola np. zawartość 3 linijki.
2. ASD - minigra polega na przejściu ludzikiem ze startu do mety na gridzie zrobiony z kwadracików, 
gracz ma za zadanie przy pomocy klocków z poleceniami (à la scratch) dojść ze startu do mety, 
po drodzę między startem a metą są obiekty blokujące (kolce, ściany). 
Gracz może uzyskać więcej bloczków z poleceniami dzięki wpisywaniu kodów schowanych po sali. 
Dodatkowo gracz musi się zmieścić w określonej ilości bloczków, aby zaprezentować w prosty sposób złożoność obliczeniową. 
3. Bazy Danych - minigra oparta w lekkim stopniu na duolingo. Po zeskanowaniu kodu QR otwiera się ekran, 
w którym musimy złożyć proste zapytanie SQL z bloczków. Na samym początku nie mamy do dyspozycji żadnych bloczków,
natomiast w pracowni są komputery, które wyświetlają kody QR, które po zeskanowaniu dodają nam bloczki, 
fragmenty zapytania SQL, które dla ułatwienia są w pierwszej kolejności w języku PL, następnie niżej jest napisane w SQL
w celu zwiększenia świadomości gracza.
4. Cyfrówka - po zeskanowaniu kodu QR, ukazuje się prosty widok, w którym mamy na wejśćiu, po lewej stronie kolorowe kable,
które mogą mieć wartość 0 albo 1 reprezentującą wartość przepływającego prądu, po prawej stronie mamy leda określonego koloru,
dodatkowo gracz ma standardowe bramki logiczne (które powinen znać z logiki, na matematyce).
Gracz musi wykorzystać każdą bramkę by doprowadzić prąd do leda, musi przemyśleć podłaczenie kabli o konkretnych stanach,
do konkretnych bramek, by wyjściowo uzyskać prąd w ledzie.
5. Sieci - 
6. Inżynieria oprogramowania - minigra jest dwuosobowa, w sali znajdują się kod QR, po zeskanowaniu przenosi gracza do lobby,
w którym muszą się sprować podając sobie kody gry, które same układają. Po sparowaniu obu graczom wyświetla się board z jiry,
ze standardowymi 4 kolumanmi: TODO, In Progress, In Review, DONE. 
Każda kolumna ma na samej górze określoną jakąś startową wartość liczbową, oraz docelową wartością liczbową,
która jest na dole kolumny. Oprócz niej mamy określoną ilość tasków. Każdy task zawiera swoją nazwę oraz operację liczbową. 
Oboje graczy mają taki sam zestaw tasków, ale znają po połowie operacji tasków.
Ich zadaniem jest komunikując się, bez patrzenia w ekran przeciwnego gracza ułożyć taski w taki sposób aby kolejne operację, 
wykonywane na kolejno od poczatkowej wartości kolumny, doprowadziły do wartości końcowej kolumny.

## Zakończenie
Za przejście każdej minigry dostaje się fragment inżynierki. Po zebraniu wszystkich 6 otwiera się ekran, w którym gracz
musi ułożyć z fragmentów swoją pracę inżynierską. Po ułożeniu dostaje humorystyczny dyplom, który może następnie wydrukować
i powiesić go sobie na ścianie w pokoju jako pamiątkę z drzwi otwartych :).