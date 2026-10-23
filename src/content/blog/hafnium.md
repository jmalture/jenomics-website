---
title: 'Hafnium-Exploits'
date: 2021-03-11
category: Jenomics
image: /media/blog/hafnium.webp
image_w: 300
excerpt: 'Alleine in Deutschland waren mehrere zehntausend Unternehmen von dem Exchange-Server-Hack “Hafnium” betroffen. Durch Sicherheitslücken in Microsoft-Exchange-Server Produkten haben die Angreifer Zugriff auf E-Mail Konten und andere sensible Daten erhalten, laut BSI waren auch Bundesbehörden betroffen. Auch wenn Microsoft mittlerweile Patches für die Sicherheitslücken veröffentlicht hat, bleibt die Frage: Wie kann ich mich zukünftig vor solchen Angriffen schützen?'
source: https://www.jenomics.de/hafnium/
---

Alleine in Deutschland waren mehrere zehntausend Unternehmen von dem Exchange-Server-Hack “Hafnium” betroffen. Durch Sicherheitslücken in Microsoft-Exchange-Server Produkten haben die Angreifer Zugriff auf E-Mail Konten und andere sensible Daten erhalten, laut BSI waren auch Bundesbehörden betroffen. Auch wenn Microsoft mittlerweile Patches für die Sicherheitslücken veröffentlicht hat, bleibt die Frage: Wie kann ich mich zukünftig vor solchen Angriffen schützen?

![](/media/blog/hafnium-1.webp#cut)

Was bereits im [Januar 2021 begann](https://krebsonsecurity.com/2021/03/a-basic-timeline-of-the-exchange-mass-hack/), entpuppte sich im März 2021 als mittelschwere Katastrophe. Eine Hackergruppe mit dem Namen “Hafnium” hat sich hier sogenannte Zero-Day-Exploits zu Nutze gemacht, Schwachstellen, die bisher nicht öffentlich bekannt sind und für die noch keine Sicherheitsupdates zur Verfügung stehen. Zunächst galten die Angriffe vor allem Forschungseinrichtungen und Behörden in den USA, doch innerhalb weniger Tage weiteten sich die Attacken auch auf deutsche Unternehmen aus. [Betroffen waren Server, die über per Webzugriff über den Port 443 erreichbar sind,](https://www.werning.com/artikel/aktuelle-exchange-sicherheitsluecke-hafnium/) z.B. bei der Nutzung von Outlook Web Access ohne eine sichere VPN-Verbindung und Dienste wie ActiveSync, Unified Messaging oder ECP (Exchange Control Panel). Danach war es möglich, E-Mails von Postfächern auszulesen, Dateien zu schreiben bzw. auszulesen und einen beliebigen Programmcode auszuführen. Ein datenschutztechnischer Super-GAU.

![](/media/blog/hafnium-2.webp#cut)

#### Was bedeutet das nun für Unternehmen?

Unternehmen, die von einem Hafnium Angriff betroffen waren, stehen nun vor der Aufarbeitung des Angriffs, denn ein einfaches Einspielen der neuen Sicherheitspatches reicht nicht aus. Je nachdem, welche Daten abgeflossen sind, können sich die Angreifer sowohl auf dem Exchange-Server selbst als auch auf dritten Systemen nachhaltigen Zugriff sichern. Zudem kann eine Meldung bei der Datenschutzbehörde notwendig sein. Tatsächlich war ein aktives Vorbeugen dieser gezielten Angriffe nicht möglich. Gerade deswegen ist es enorm wichtig, einen gut funktionierenden Incident Response Plan (Vorfallreaktionsplan) zu haben. Ein gezieltes Monitoring relevanter Systeme hilft, schnell und effizient auf solche Vorfälle reagieren zu können. So lässt sich der Schaden begrenzen und eine weitere Ausbreitung verhindern.
