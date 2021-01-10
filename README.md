# statistikaamet

Tableau Web Data Connector (WDC) võimaldab ühenduda Eesti Statistikaameti andmebaasiga. Näidisrakenduse on kokku pannud Datafruit OÜ.

---
* Tableau WDC Eesti Statistikaameti API jaoks asub siin: [https://https://datafruit-public.github.io/statistikaamet.html](https://https://datafruit-public.github.io/statistikaamet.html)

## WDC kasutamine

#### Arvutis, kus on Tableau Desktop :desktop_computer:
1. Järgi juhiseid "Use a WDC in Tableau Desktop" [https://tableau.github.io/webdataconnector/docs/wdc_use_in_tableau](https://tableau.github.io/webdataconnector/docs/wdc_use_in_tableau).
2. Sammus nr. 2, sisesta URL-na https://datafruit-public.github.io/statistikaamet.html. Sisesta andmetabeli tunnus ning soovitud mõõdik. Hetkel saab pärida andmeid, mis on esitatud **3 muutujaga**, kus var1=valdkond/omanikuliik, vms.; var2=mõõdik; var3=vaatlusperiood.

#### Tableau Serveri kasutus :cloud:
1. Järgi juhiseid "Use a WDC in Tableau Server" [https://tableau.github.io/webdataconnector/docs/wdc_use_in_server](https://tableau.github.io/webdataconnector/docs/wdc_use_in_server).
2. Uus andmeallika lisamisel -> Web Data Connector -> sisesta URL-na https://https://datafruit-public.github.io/statistikaamet.html. Sisesta andmetabeli tunnus ning soovitud mõõdik. Hetkel saab pärida andmeid, mis on esitatud **3 muutujaga**, kus var1=valdkond/omanikuliik, vms.; var2=mõõdik; var3=vaatlusperiood.
3. Lisainfo: [https://onlinehelp.tableau.com/current/server/en-us/datasource_wdc.htm](https://onlinehelp.tableau.com/current/server/en-us/datasource_wdc.htm)

#### Nõuded
* Antud WDC vajab töötamiseks võrguühendust

Data flow:  Eesti Statistikaamet (REST API) <--> WDC (datafruit-public.github.io/statistikaamet) <--> Tableau Server/Desktop
* Andmed liiguvad Eesti Statistikaameti API-st otse Tableau Desktop/Server, Tableau Desktop/Server jaoks peab WDC (datafruit-public.github.io/statistikaamet) olema nähtav. 

### Veahaldus
* Kontrolli, et sisestasid andmetabeli ning mõõdiku korrektselt. Lisainfo [https://andmed.stat.ee/et/stat](https://andmed.stat.ee/et/stat). Juhul kui päring ei ole korrektne, siis Tableau veateadet ei kuva (Tableau jääb vastust ootama).
* Juhul kui WDC on paigaldatud Tableau Serverile, veendu, et see on lisatud nn. safe listi.

###  Teadaolevad kitsaskohad
* Hetkel saab pärida andmeid, mis on esitatud **3 muutujaga**, kus var1=valdkond/omanikuliik, vms.; var2=mõõdik; var3=vaatlusperiood.
* Andmed laaditakse Tableausse stringidena (v.a mõõdiku väärtused), vajadusel tuleb andmetüüp manuaalselt korrigeerida (nt. vaatlusperiood andmestik).
* Statistikaameti API-le on seadistatud kasutamise piiranguid selles osas, kui palju päringuid ühelt ja samalt IP aadressilt teatud ajaühikus lubatakse.

### Tableau Web Data Connector
* Tableau juhend WDC-le [https://tableau.github.io/webdataconnector/docs/wdc_tutorial.html](https://tableau.github.io/webdataconnector/docs/wdc_tutorial.html)

## Viited
* [WDC näited](https://onlinehelp.tableau.com/current/pro/desktop/en-us/examples_web_data_connector.html )
* [WDC dokumentatsioon arendajale](http://tableau.github.io/webdataconnector/docs/)
* [Statistika andmebaasi API juhend](https://andmed.stat.ee/abi/API-juhend.pdf)

## Arendus
* Kristian Allikmaa, kristian@datafruit.ee
* Soovid panustada arenduses? Suurepärane! Saada palun kiri: kristian@datafruit.ee.
* Leidsid vea :bug:? (https://github.com/datafruit-public/statistikaamet/issues)
