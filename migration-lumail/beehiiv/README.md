# Capture des automations Beehiiv — préparation migration Lumail

Capturées le 28/08/2026 depuis l'interface Beehiiv (l'API Beehiiv n'expose ni les
étapes ni le contenu des automations : seulement id, nom, statut, déclencheur).

| Fichier | Automation | Emails | Rythme | Inscrits |
|---|---|---|---|---|
| [calculateur-performance.md](calculateur-performance.md) | CALCULATEUR PERFORMANCE | 5 | J0→J4, 1 j | 2 173 |
| [quizz.md](quizz.md) | QUIZZ | 6 | J0→J5, 1 j | 505 |
| [lead-magnet-nutrition.md](lead-magnet-nutrition.md) | Lead magnet · calculateur nutrition | 1 | J0 | 1 260 |
| [newsletter-signup.md](newsletter-signup.md) | NEWSLETTER SIGN-UP | 6 | J0→J5, 1 j | 99 |

`newsletter-signup.json` = export brut de la première capture, conservé comme source.

## Points à trancher avant de reporter sur Lumail

1. **QUIZZ email 3** part avec l'objet littéral « Email subject » et le preview
   « Email preview text ». 492 personnes l'ont reçu. Son contenu est en plus une
   clôture GF90 datée, hors-sujet dans une séquence evergreen. À réécrire ou supprimer.
2. **CALCULATEUR PERFORMANCE email 5** annonce une promo « -20 € dans quelques jours ».
   Urgence permanente donc fausse. À retirer ou à conditionner.
3. **Trois séquences se terminent par le même email** « Relance ta progression
   aujourd'hui » en deux variantes proches. Candidat à la factorisation.
4. **URLs calculateur incohérentes** : `/calculateur/calculateurlsdc.html` et
   `/lsdc-calculator/calculateurlsdc.html` cohabitent. Vérifier laquelle vit encore.
5. **Coquilles** dans lead-magnet-nutrition (« progressin », « sélectionnez »/« adapté »).
6. **Chevauchement d'audience** : un inscrit quiz + calculateur reçoit deux séquences
   de bienvenue en parallèle. À arbitrer avec les règles de sortie Lumail.
