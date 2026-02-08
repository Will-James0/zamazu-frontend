# Exemple complet de configuration

Voici un exemple concret avec toutes les options :

## Exemple 1 : Utilisation de la thumbnail YouTube

```javascript
{
  type: "Single",
  title: "Éveil Sonore",
  description: "Premier single de ZAMAZU - L'éveil musical de l'œuvre d'esprit",
  youtubeId: "dQw4w9WgXcQ",
  coverImage: null, // ← Utilise la thumbnail YouTube automatiquement
  color: "red"
}
```

**Résultat** : L'image affichée sera `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`

---

## Exemple 2 : Utilisation d'une image personnalisée

```javascript
{
  type: "Projet",
  title: "Saï - Volume 1",
  description: "Premier volume de la série légendaire Saï",
  youtubeId: "xyz789ABC",
  coverImage: "/covers/sai-vol-1.jpg", // ← Image personnalisée
  color: "emerald"
}
```

**Résultat** : L'image affichée sera celle dans `public/covers/sai-vol-1.jpg`

---

## Exemple 3 : Configuration complète

```javascript
export const realisations = [
  // Singles avec images personnalisées
  {
    type: "Single",
    title: "Conscience Éveillée",
    description: "L'art de l'éveil par le son",
    youtubeId: "abc123def",
    coverImage: "/covers/conscience-eveillee.jpg",
    color: "red"
  },
  {
    type: "Single",
    title: "Lumière Intérieure",
    description: "Exploration des profondeurs",
    youtubeId: "ghi456jkl",
    coverImage: "/covers/lumiere.png",
    color: "red"
  },

  // Freestyles avec thumbnails YouTube
  {
    type: "Freestyle",
    title: "Freestyle Session #1",
    description: "Première session d'improvisation",
    youtubeId: "mno789pqr",
    coverImage: null, // Thumbnail YouTube
    color: "green"
  },

  // Projets Saï avec mix d'images
  {
    type: "Projet",
    title: "Saï - Vol. 1",
    description: "Genèse de la série",
    youtubeId: "stu012vwx",
    coverImage: "/covers/sai-1.webp", // Image personnalisée
    color: "emerald"
  },
  {
    type: "Projet",
    title: "Saï - Vol. 2",
    description: "Suite de l'évolution",
    youtubeId: "yza345bcd",
    coverImage: null, // Thumbnail YouTube
    color: "emerald"
  }
];
```

---

## Cas d'usage courants

### Quand utiliser une image personnalisée ?
- ✅ Vous avez un artwork professionnel
- ✅ Vous voulez une cohérence visuelle
- ✅ La thumbnail YouTube n'est pas de qualité

### Quand utiliser la thumbnail YouTube ?
- ✅ Gain de temps (automatique)
- ✅ Pas besoin de gérer les fichiers
- ✅ La vidéo YouTube a déjà une belle miniature

---

## Workflow recommandé

1. **Commencez avec `coverImage: null`** pour tous les items
2. **Récupérez les IDs YouTube** et testez
3. **Ajoutez progressivement** vos images personnalisées si nécessaire
4. **Optimisez les images** avant de les ajouter

---

## Outils recommandés pour optimiser les images

- [TinyPNG](https://tinypng.com/) - Compression PNG/JPG
- [Squoosh](https://squoosh.app/) - Conversion/compression WebP
- [ImageOptim](https://imageoptim.com/) - Outil de compression

---

🎵 **ZAMAZU - L'éveil musical de l'œuvre d'esprit**
