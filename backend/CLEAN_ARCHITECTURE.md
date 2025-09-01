# Clean Architecture Implementation

Cette implémentation suit les principes de Clean Architecture d'Uncle Bob et les bonnes pratiques de Clean Code.

## Structure des couches

```
src/
├── domain/                 # Couche Domain (Logique métier)
│   ├── entities/          # Entités métier
│   ├── repositories/      # Interfaces des repositories
│   └── use-cases/         # Cas d'usage métier
├── application/           # Couche Application
│   ├── dtos/             # Data Transfer Objects
│   └── services/         # Services d'application
├── infrastructure/       # Couche Infrastructure
│   ├── database/         # Configuration base de données
│   └── repositories/     # Implémentations des repositories
├── presentation/         # Couche Presentation
│   └── controllers/      # Contrôleurs HTTP
└── shared/              # Code partagé
    ├── exceptions/       # Exceptions personnalisées
    └── interfaces/       # Interfaces communes
```

## Principes appliqués

### Clean Architecture

1. **Inversion de dépendance** : Les couches externes dépendent des couches internes
2. **Séparation des responsabilités** : Chaque couche a un rôle spécifique
3. **Indépendance des frameworks** : La logique métier ne dépend pas de NestJS ou Prisma
4. **Testabilité** : Chaque couche peut être testée indépendamment

### Clean Code

1. **Noms expressifs** : Classes, méthodes et variables ont des noms clairs
2. **Fonctions courtes** : Une responsabilité par fonction
3. **Pas de commentaires** : Le code s'explique de lui-même
4. **Validation des entrées** : Toutes les entrées sont validées
5. **Gestion d'erreurs** : Exceptions spécifiques et messages clairs

## Dépendances entre couches

```
Presentation → Application → Domain
Infrastructure → Domain
```

- **Domain** : Aucune dépendance externe (Pure business logic)
- **Application** : Dépend uniquement du Domain
- **Infrastructure** : Implémente les interfaces du Domain
- **Presentation** : Dépend de l'Application

## Usage

### Créer un nouvel utilisateur

```bash
POST /users
{
  "email": "user@example.com",
  "name": "John Doe"
}
```

### Récupérer un utilisateur

```bash
GET /users/1
```

### Récupérer tous les utilisateurs

```bash
GET /users
```

## Tests

Les tests sont organisés par couche :

- Tests unitaires pour les use cases
- Tests d'intégration pour les repositories
- Tests e2e pour les contrôleurs

```bash
npm run test              # Tests unitaires
npm run test:e2e         # Tests end-to-end
npm run test:cov         # Coverage
```

## Extension

Pour ajouter une nouvelle fonctionnalité :

1. **Créer l'entité** dans `domain/entities/`
2. **Définir le repository** dans `domain/repositories/`
3. **Implémenter les use cases** dans `domain/use-cases/`
4. **Créer les DTOs** dans `application/dtos/`
5. **Implémenter le service** dans `application/services/`
6. **Créer l'implémentation repository** dans `infrastructure/repositories/`
7. **Ajouter le contrôleur** dans `presentation/controllers/`
8. **Configurer les modules** NestJS

## Avantages de cette architecture

1. **Maintenabilité** : Code organisé et facile à comprendre
2. **Testabilité** : Chaque couche peut être testée en isolation
3. **Évolutivité** : Facile d'ajouter de nouvelles fonctionnalités
4. **Flexibilité** : Peut changer de framework ou de base de données facilement
5. **Réutilisabilité** : La logique métier peut être réutilisée dans d'autres contextes
