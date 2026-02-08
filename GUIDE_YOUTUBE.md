# Guide de mise à jour des réalisations YouTube

## Comment ajouter ou modifier les liens YouTube

Tous les liens YouTube sont configurés dans le fichier : `src/data/realisations.js`

### Étapes pour mettre à jour un lien :

1. **Trouver l'ID de la vidéo YouTube**
   - URL YouTube : `https://youtube.com/watch?v=dQw4w9WgXcQ`
   - L'ID est la partie après `v=` : **dQw4w9WgXcQ**

2. **Ouvrir le fichier** `src/data/realisations.js`

3. **Remplacer "XXXXXXX" par l'ID réel**
   
   Avant :
   ```javascript
   {
     type: "Single",
     title: "Single 1",
     description: "Premier single de la discographie",
     youtubeId: "XXXXXXX", // ❌ À remplacer
     coverImage: null,
     color: "red"
   }
   ```
   
   Après :
   ```javascript
   {
     type: "Single",
     title: "Mon Titre de Single",
     description: "Description de mon single",
     youtubeId: "dQw4w9WgXcQ", // ✅ ID YouTube réel
     coverImage: null, // ou "/covers/mon-image.jpg" pour une image personnalisée
     color: "red"
   }
   ```

4. **Personnaliser le titre et la description** selon le contenu réel

---

## 🎨 Ajouter une image de couverture personnalisée

### Option 1 : Utiliser la thumbnail YouTube (par défaut)

Si `coverImage: null`, la miniature YouTube sera automatiquement utilisée.

```javascript
{
  youtubeId: "abc123",
  coverImage: null // ✅ Utilise la thumbnail YouTube
}
```

### Option 2 : Utiliser une image personnalisée

1. **Placez votre image** dans le dossier `public/covers/`
   - Format recommandé : JPG, PNG ou WEBP
   - Dimensions : 1280x720 px (16:9) minimum
   - Poids : < 500 KB

2. **Référencez l'image** dans `realisations.js` :

```javascript
{
  type: "Single",
  title: "Élévation",
  description: "Premier single officiel",
  youtubeId: "abc123",
  coverImage: "/covers/elevation.jpg", // ✅ Image personnalisée
  color: "red"
}
```

### Exemples de structure :

```
public/
  covers/
    ├── single-1.jpg
    ├── single-2.png
    ├── freestyle-1.jpg
    ├── sai-vol-1.webp
    └── README.md
```

---

### Types de réalisations disponibles :

- **Singles** → Couleur rouge
- **Freestyles** → Couleur verte
- **Projets** (Série Saï) → Couleur émeraude

### Exemple complet :

```javascript
{
  type: "Single",
  title: "Élévation",
  description: "Premier single officiel - L'éveil musical",
  youtubeId: "AbC123XyZ", // ID de la vidéo YouTube
  color: "red"
}
```

### Ajouter une nouvelle réalisation :

Copier-coller cette structure à la fin de la liste dans `realisations.js` :

```javascript
{
  type: "Single", // ou "Freestyle" ou "Projet"
  title: "Titre de la chanson",
  description: "Description courte",
  youtubeId: "ID_YOUTUBE",
  coverImage: null, // ou "/covers/mon-image.jpg"
  color: "red" // "red" pour Single, "green" pour Freestyle, "emerald" pour Projet
}
```

> **Note** : N'oubliez pas de mettre une virgule après chaque élément, sauf le dernier !

---

## 📋 Récapitulatif

| Élément | Obligatoire | Exemple |
|---------|-------------|---------|
| `type` | ✅ Oui | `"Single"`, `"Freestyle"`, `"Projet"` |
| `title` | ✅ Oui | `"Élévation"` |
| `description` | ✅ Oui | `"Premier single officiel"` |
| `youtubeId` | ✅ Oui | `"dQw4w9WgXcQ"` |
| `coverImage` | ❌ Non | `null` ou `"/covers/image.jpg"` |
| `color` | ✅ Oui | `"red"`, `"green"`, `"emerald"` |

---

## ✨ Astuces

1. **Priorité des images** : Si `coverImage` est défini, il sera utilisé à la place de la thumbnail YouTube
2. **Thumbnail YouTube** : Automatiquement récupérée si `coverImage` est `null`
3. **Performance** : Optimisez vos images avant de les ajouter (compression, format WebP)
4. **Nommage** : Utilisez des noms de fichiers clairs (ex: `sai-vol-1.jpg` plutôt que `IMG_001.jpg`)

---

**Besoin d'aide ?** Contactez le développeur.
