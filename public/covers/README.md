# Dossier des images de couverture

Placez vos images de couverture personnalisées dans ce dossier.

## Format recommandé :
- **Format** : JPG, PNG ou WEBP
- **Dimensions** : 1280x720 px (16:9) ou supérieur
- **Poids** : < 500 KB pour des performances optimales

## Exemples de noms :
- `single-1.jpg`
- `freestyle-1.png`
- `sai-vol-1.webp`

## Utilisation :
Dans le fichier `src/data/realisations.js`, référencez l'image ainsi :

```javascript
{
  type: "Single",
  title: "Mon Single",
  youtubeId: "abc123",
  coverImage: "/covers/single-1.jpg", // ✅ Chemin relatif au dossier public
  color: "red"
}
```

> **Note** : Si `coverImage` est `null`, la thumbnail YouTube sera automatiquement utilisée.
