<template>
  <div style="margin: 0; padding: 0; width: 100vw !important; left: 0; position: relative;  background-color: #f9f9f9; ">
    <v-layout
      id="upute"
      row
      style="margin-left: auto; margin-right: auto;"
    >
      <v-flex
        xs12
        lg6
        class="left"
      >
        <v-simple-table class="ui celled table podsjetnik_tablica">
          <thead>
            <tr>
              <th colspan="3">
                Matematičke funkcije
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="collapsing">
                abs(x)
              </td>
              <td>Apsolutna vrijednost broja <i>x</i></td>
            </tr>
            <tr>
              <td>exp(x)</td>
              <td><i>e<sup>x</sup></i></td>
            </tr>
            <tr>
              <td>ln(x)</td>
              <td>Prirodni logaritam broja <i>x</i></td>
            </tr>
            <tr>
              <td>power(x, y)</td>
              <td>Potencija <i>x</i> na <i>y</i></td>
            </tr>
            <tr>
              <td>sqrt(x)</td>
              <td>Drugi korijen iz <i>x</i></td>
            </tr>
            <tr>
              <td>sin(x), cos(x)</td>
              <td>Trigonometrijske funkcije</td>
            </tr>
            <tr>
              <td>asin(x), acos(x)</td>
              <td>Arkus funkcije</td>
            </tr>
            <tr>
              <td>mod(n, m)</td>
              <td>Ostatak pri dijeljenju <i>n</i> s <i>m</i></td>
            </tr>
            <tr>
              <td>round(x)</td>
              <td>Najbliži cijeli broj broju <i>x</i></td>
            </tr>
            <tr>
              <td>sign(x)</td>
              <td>Vraća -1, 0 ili 1 ovisno o tome je li <i>x</i> negativan, jednak nuli, ili pozitivan</td>
            </tr>
            <tr>
              <td>rand(x)</td>
              <td>Vraća slučajan broj iz segmenta [0, 1]</td>
            </tr>
          </tbody>
        </v-simple-table>

        <div class="ui hidden divider" />



        <div class="ui hidden divider" />

        <v-simple-table class="ui celled table podsjetnik_tablica">
          <template v-slot:default>
            <thead>
              <tr>
                <th colspan="3">
                  Vrijeme i datum
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="collapsing">
                  dayofweek(d)
                </td>
                <td>Redni broj dana u tjednu za datum <i>d</i> (u bazi fakultet brojanje počinje od nedjelje: nedjelja = 1, ponedjeljak = 2, ..., subota = 7) </td>
              </tr>
              <tr>
                <td>dayofyear(d)</td>
                <td>Redni broj dana unutar godine za datum <i>d</i> (prvi siječnja = 1 itd.) </td>
              </tr>
              <tr>
                <td>day(d), month(d), year(d)</td>
                <td>Komponente datuma <i>d</i></td>
              </tr>
              <tr>
                <td>week(d)</td>
                <td>Redni broj tjedna (u godini) kojem pripada datum <i>d</i></td>
              </tr>
              <tr>
                <td>curdate()</td>
                <td>Današnji datum</td>
              </tr>
              <tr>
                <td>curtime()</td>
                <td>Trenutno vrijeme</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <v-simple-table class="ui celled striped table podsjetnik_tablica">
          <thead>
            <tr>
              <th colspan="3">
                Razne funkcije
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="collapsing">
                database()
              </td>
              <td>Ime trenutne baze podataka</td>
            </tr>
            <tr>
              <td>version()</td>
              <td>Verzija MySQL servera</td>
            </tr>
            <tr>
              <td>user()</td>
              <td>Vaše korisničko ime</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-flex>

      <v-flex
        xs12
        lg1
      >
&nbsp;
      </v-flex>

      <v-flex
        xs12
        lg5
        class="right"
      >
        <v-simple-table class="ui celled striped table podsjetnik_tablica">
          <thead>
            <tr>
              <th colspan="3">
                Tekstualne funkcije
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="collapsing">
                concat(s<sub>1</sub>, s<sub>2</sub>, ...)
              </td>
              <td>Konkatenacija (spajanje, nadovezivanje) stringova s<sub>1</sub>, s<sub>2</sub>, ... </td>
            </tr>
            <tr>
              <td>length(s)</td>
              <td>Duljina stringa <i>s</i></td>
            </tr>
            <tr>
              <td>locate(s, t)</td>
              <td>Redni broj znaka kojim započinje prva pojave stringa <i>s</i> u stringu <i>t</i></td>
            </tr>
            <tr>
              <td>repeat(s, n)</td>
              <td>String <i>s</i> nadovezan sam na sebe <i>n</i> puta</td>
            </tr>
            <tr>
              <td>lpad(s, n, t)</td>
              <td>Na string <i>s</i> slijeva nadovezuje string <i>t</i>, dok broj znakova ne postane točno <i>n</i></td>
            </tr>
            <tr>
              <td>rpad(s, n, t)</td>
              <td>Na string <i>s</i> zdesna nadovezuje string <i>t</i>, dok broj znakova ne postane točno <i>n</i></td>
            </tr>
            <tr>
              <td>substring(s, i, d)</td>
              <td>Vraća dio stringa <i>s</i> koji počinje na rednom broju <i>i</i> te je duljine <i>d</i></td>
            </tr>
            <tr>
              <td>ltrim(s)</td>
              <td>Uklanja bjeline (razmake, tabulatore, nove redove) s lijeve strane stringa <i>s</i></td>
            </tr>
            <tr>
              <td>rtrim(s)</td>
              <td>Uklanja bjeline (razmake, tabulatore, nove redove) s desne strane stringa <i>s</i></td>
            </tr>
            <tr>
              <td>space(n)</td>
              <td>Vraća string sastavljen od <i>n</i> nadovezanih razmaka</td>
            </tr>
            <tr>
              <td>replace(s, a, b)</td>
              <td>U stringu <i>s</i> sve pojave stringa <i>a</i> mijenja u <i>b</i></td>
            </tr>
            <tr>
              <td>lower(s)</td>
              <td>Vraća string u kojem su velika slova zamijenjena malima</td>
            </tr>
            <tr>
              <td>upper(s)</td>
              <td>Vraća string u kojem su mala slova zamijenjena velikima</td>
            </tr>
          </tbody>
        </v-simple-table>

        <div class="ui hidden divider" />

        <v-simple-table class="ui celled striped table podsjetnik_tablica">
          <thead>
            <tr>
              <th colspan="3">
                Grupirajuće funkcije
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="collapsing">
                count(*)
              </td>
              <td>Broj svih redaka unutar grupe</td>
            </tr>
            <tr>
              <td>count(I)</td>
              <td>Broj redaka unutar grupe za koje izraz <code>I</code> nije NULL</td>
            </tr>
            <tr>
              <td>count(distinct I)</td>
              <td>Broj različitih ne-NULL vrijednosti izraza <code>I</code> unutar grupe</td>
            </tr>
            <tr>
              <td>avg(I)</td>
              <td>
                Srednja vrijednost svih ne-NULL vrijednosti izraza <code>I</code> unutar grupe.<br>
                Ako ne postoji niti jedna ne-NULL vrijednost, onda vraća NULL
              </td>
            </tr>
            <tr>
              <td>min(I)</td>
              <td>Kao prethodno, ali minimalna vrijednost</td>
            </tr>
            <tr>
              <td>max(I)</td>
              <td>Kao prethodno, ali maksimalna vrijednost</td>
            </tr>
            <tr>
              <td>sum(I)</td>
              <td>Kao prethodno, ali suma vrijednosti</td>
            </tr>
            <tr>
              <td>std(I)</td>
              <td>Kao prethodno, ali standardna devijacija</td>
            </tr>
            <tr>
              <td>group_concat(I)</td>
              <td>Nadovezuje sve vrijednosti izraza <code>I</code> kao stringove odvojene separatorom (zarez po defaultu)</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
    // import VSimpleTable from 'vuetify/lib'
    export default {
        name: "Instructions_hr",
        // components: { VSimpleTable },
    }
</script>

<style>
    .podsjetnik_tablica tr td:first-child {
        white-space: nowrap;
        font-family: monospace;
    }

    .podsjetnik_tablica * {
        background-color: #f9f9f9;
    }

    .podsjetnik_tablica {
        width: 100%;
        margin-bottom: 5ex;
    }

    #upute {
        margin-top: 5ex;
        max-width: 1600px !important;
    }


</style>
