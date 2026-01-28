# Test de l'authentification

## ✅ Configuration terminée

Les pages d'authentification sont maintenant connectées au backend.

### Structure de la réponse du backend

```json
{
    "refresh": "eyJhbGc...",
    "access": "eyJhbGc...",
    "user": {
        "code": "83bf4a56-2c8a-45de-b035-83f54b5bcd4c",
        "username": "will",
        "email": "will@gmail.com",
        "first_name": "",
        "last_name": "",
        "image": null,
        "phone": null,
        "role": {
            "code": "owner",
            "name": "Propriétaire"
        }
    },
    "access_expires_in": 3600.0,
    "refresh_expires_in": 86400.0
}
```

### Structure sauvegardée dans localStorage (`zamazu_auth`)

```json
{
    "user": { ... },
    "token": {
        "access": "eyJhbGc...",
        "refresh": "eyJhbGc...",
        "access_expires_in": 3600.0,
        "refresh_expires_in": 86400.0
    },
    "savedAt": 1737936000000
}
```

### Endpoints configurés

- **Login User**: `/auth/login/user/`
- **Login Admin**: `/auth/login/admin/`
- **Register**: `/auth/register/user/`

### Pages connectées

1. **MemberLogin.jsx** → `loginMember()` → `/auth/login/user/`
2. **StaffLogin.jsx** → `loginStaff()` → `/auth/login/admin/`
3. **Register.jsx** → `registerUser()` → `/auth/register/user/`

### Fonctionnalités implémentées

✅ Gestion des états de chargement
✅ Affichage des erreurs
✅ Messages de succès pour l'inscription
✅ Redirection automatique après connexion/inscription
✅ Sauvegarde du token dans localStorage avec timestamp
✅ Validation du token basée sur `access_expires_in`
✅ Gestion cohérente de la clé `zamazu_auth`

### Test manuel

1. Ouvrir http://localhost:3000/auth/member-login
2. Entrer les identifiants
3. Vérifier que la connexion fonctionne
4. Vérifier dans DevTools → Application → Local Storage que `zamazu_auth` contient les bonnes données

### Endpoints API disponibles

Depuis `api.js`, vous avez accès à :

- `authAPI.loginUser(credentials)`
- `authAPI.loginAdmin(credentials)`
- `authAPI.registerUser(userData)`
- `authAPI.logout()`
