// Configuration des réalisations de ZAMAZU
// Pour ajouter une vidéo YouTube :
// 1. Remplacer "XXXXXXX" par l'ID de la vidéo YouTube (exemple : si l'URL est https://youtube.com/watch?v=dQw4w9WgXcQ, l'ID est "dQw4w9WgXcQ")
// 2. La thumbnail sera automatiquement générée à partir de l'ID
// 3. (Optionnel) Ajouter une image de couverture personnalisée avec le champ "coverImage"

export const realisations = [
  // SINGLES
  {
    type: "Single",
    title: "Le Moblé",
    description: "ZAMAZU - LeMbolé ( Official Music Video )",
    youtubeId: "yfclfWGqytA", // Remplacer par l'ID YouTube réel
    coverImage: "/covers/le_mbole.avif", // (Optionnel) Chemin vers une image personnalisée dans /public/covers/
    color: "red"
  },
  {
    type: "Single",
    title: "Tramol",
    description: "ZAMAZU - TRAMOL ( Prod. By Mr Just ) Audio Officielle",
    youtubeId: "uj7m2JJHbWc", // Remplacer par l'ID YouTube réel
    coverImage: "/covers/tramol.avif", // (Optionnel) Chemin vers une image personnalisée
    color: "red"
  },
  {
    type: "Single",
    title: "L'eau du Mbolé",
    description: "ZAMAZU - L’EAU DU MBOLE (Prod by sa majesté junior abega & henri_j_on the beat)",
    youtubeId: "Rlknk_yMw-c", // Remplacer par l'ID YouTube réel
    coverImage: null, // (Optionnel) Chemin vers une image personnalisée
    color: "red"
  },
  {
    type: "Single",
    title: "L'enfant de Qui",
    description: "ZAMAZU - LENFANT DE QUI (Clip Officiel)",
    youtubeId: "eg2uTsxdo44", // Remplacer par l'ID YouTube réel
    coverImage: null, // (Optionnel) Chemin vers une image personnalisée
    color: "red"
  },
  {
    type: "Single",
    title: "Guantanamo 117",
    description: "ZAMAZU - GUANTANAMO 117 (Clip Officiel by Mr lambi jr)",
    youtubeId: "E6ZYoRWYICM", // Remplacer par l'ID YouTube réel
    coverImage: "/covers/guantanamo.avif", // (Optionnel) Chemin vers une image personnalisée
    color: "red"
  },
  {
    type: "Single",
    title: "Capitale732",
    description: "ZAMAZU X SIMBA DRAKEN X 45 MOSHINO (Capitale732 Clip officiel)",
    youtubeId: "_gDcexjRLsE", // Remplacer par l'ID YouTube réel
    coverImage: "/covers/capitale732.avif", // (Optionnel) Chemin vers une image personnalisée
    color: "red"
  },
  {
    type: "Single",
    title: "SUZANA",
    description: "ZAMAZU - SUZANA (AP Visual)",
    youtubeId: "qkyO_agP5U8", // Remplacer par l'ID YouTube réel
    coverImage: null, // (Optionnel) Chemin vers une image personnalisée
    color: "red"
  },
  
  // FREESTYLES
  {
    type: "Freestyle",
    title: "Sosie Freestyle",
    description: "ZAMAZU - SOSIE FREESTYLE (PROD BY WIZ Bbeatz)",
    youtubeId: "Q1KZoYy-ou0", // Remplacer par l'ID YouTube réel
    coverImage: null, // (Optionnel) Chemin vers une image personnalisée
    color: "green"
  },
  {
    type: "Freestyle",
    title: "Couronne Freestyle",
    description: "ZAMAZU - COURONNE FREESTYLE (PROD BY WIZ Bbeatz)",
    youtubeId: "d-hqNFxvOQ0", // Remplacer par l'ID YouTube réel
    coverImage: null, // (Optionnel) Chemin vers une image personnalisée
    color: "green"
  },
  {
    type: "Freestyle",
    title: "Ghost Fire Freestyle",
    description: "ZAMAZU - Ghost Fire (Audio Freestyle)",
    youtubeId: "vX6Rn79cg78", // Remplacer par l'ID YouTube réel
    coverImage: null, // (Optionnel) Chemin vers une image personnalisée
    color: "green"
  },
];
