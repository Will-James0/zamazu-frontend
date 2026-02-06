import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { musicAPI } from '@/lib/api';

/**
 * Store de gestion du lecteur audio global
 * Gère la lecture, la playlist, le volume, etc.
 */
export const useAudioPlayer = create()(
  devtools(
    (set, get) => ({
      // État du lecteur
      currentTrack: null,
      playlist: [],
      isPlaying: false,
      volume: 0.7,
      currentTime: 0,
      duration: 0,
      isMuted: false,
      isShuffled: false,
      repeatMode: 'none', // 'none', 'one', 'all'
      
      // Audio element (ref)
      audioElement: null,

      // Actions
      setAudioElement: (element) => {
        set({ audioElement: element }, false, 'setAudioElement');
      },

      playTrack: (track) => {
        const { audioElement, currentTrack } = get();
        
        console.log('🎵 playTrack appelé:', track);
        console.log('🎵 audio_file URL:', track.audio_file);
        console.log('🎵 audioElement:', audioElement);
        
        // Si c'est la même track, toggle play/pause
        if (currentTrack?.code === track.code) {
          console.log('🎵 Même track, toggle play/pause');
          get().togglePlay();
          return;
        }

        // Construire l'URL complète si nécessaire
        let audioUrl = track.audio_file;
        if (audioUrl && !audioUrl.startsWith('http')) {
          // Si l'URL est relative, ajouter la base URL du backend
          const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
          // Enlever /api de la base URL si présent
          const mediaBaseUrl = baseUrl.replace('/api', '');
          audioUrl = `${mediaBaseUrl}${audioUrl.startsWith('/') ? audioUrl : '/' + audioUrl}`;
          console.log('🎵 URL complète construite:', audioUrl);
        }

        set({ currentTrack: track, isPlaying: true }, false, 'playTrack');
        
        if (audioElement) {
          console.log('🎵 Chargement de l\'audio:', audioUrl);
          audioElement.src = audioUrl;
          audioElement.load();
          audioElement.play()
            .then(() => {
              console.log('✅ Lecture démarrée avec succès');
              
              // Enregistrer la vue pour cette track
              musicAPI.recordView('track', track.code)
                .then(response => {
                  console.log('👁️ Vue enregistrée:', response);
                })
                .catch(err => {
                  console.error('❌ Erreur lors de l\'enregistrement de la vue:', err);
                });
            })
            .catch(err => {
              console.error('❌ Erreur de lecture:', err);
              set({ isPlaying: false }, false, 'playTrack-error');
            });
        } else {
          console.error('❌ Pas d\'élément audio disponible');
        }
      },

      playPlaylist: (tracks, startIndex = 0) => {
        set({ playlist: tracks }, false, 'playPlaylist');
        if (tracks.length > 0 && tracks[startIndex]) {
          get().playTrack(tracks[startIndex]);
        }
      },

      togglePlay: () => {
        const { audioElement, isPlaying } = get();
        
        if (!audioElement) return;

        if (isPlaying) {
          audioElement.pause();
          set({ isPlaying: false }, false, 'togglePlay-pause');
        } else {
          audioElement.play().catch(err => {
            console.error('Erreur de lecture:', err);
          });
          set({ isPlaying: true }, false, 'togglePlay-play');
        }
      },

      pause: () => {
        const { audioElement } = get();
        if (audioElement) {
          audioElement.pause();
          set({ isPlaying: false }, false, 'pause');
        }
      },

      play: () => {
        const { audioElement } = get();
        if (audioElement && get().currentTrack) {
          audioElement.play().catch(err => {
            console.error('Erreur de lecture:', err);
          });
          set({ isPlaying: true }, false, 'play');
        }
      },

      next: () => {
        const { playlist, currentTrack } = get();
        if (playlist.length === 0) return;

        const currentIndex = playlist.findIndex(t => t.code === currentTrack?.code);
        const nextIndex = (currentIndex + 1) % playlist.length;
        
        get().playTrack(playlist[nextIndex]);
      },

      previous: () => {
        const { playlist, currentTrack, currentTime, audioElement } = get();
        
        // Si on est à plus de 3 secondes, revenir au début
        if (currentTime > 3) {
          if (audioElement) {
            audioElement.currentTime = 0;
          }
          return;
        }

        if (playlist.length === 0) return;

        const currentIndex = playlist.findIndex(t => t.code === currentTrack?.code);
        const prevIndex = currentIndex <= 0 ? playlist.length - 1 : currentIndex - 1;
        
        get().playTrack(playlist[prevIndex]);
      },

      seek: (time) => {
        const { audioElement } = get();
        if (audioElement) {
          audioElement.currentTime = time;
          set({ currentTime: time }, false, 'seek');
        }
      },

      setVolume: (volume) => {
        const { audioElement } = get();
        const clampedVolume = Math.max(0, Math.min(1, volume));
        
        if (audioElement) {
          audioElement.volume = clampedVolume;
        }
        
        set({ volume: clampedVolume, isMuted: clampedVolume === 0 }, false, 'setVolume');
      },

      toggleMute: () => {
        const { audioElement, isMuted, volume } = get();
        
        if (audioElement) {
          if (isMuted) {
            audioElement.volume = volume;
            set({ isMuted: false }, false, 'toggleMute-unmute');
          } else {
            audioElement.volume = 0;
            set({ isMuted: true }, false, 'toggleMute-mute');
          }
        }
      },

      toggleShuffle: () => {
        set(state => ({ isShuffled: !state.isShuffled }), false, 'toggleShuffle');
      },

      cycleRepeatMode: () => {
        const modes = ['none', 'all', 'one'];
        const { repeatMode } = get();
        const currentIndex = modes.indexOf(repeatMode);
        const nextMode = modes[(currentIndex + 1) % modes.length];
        
        set({ repeatMode: nextMode }, false, 'cycleRepeatMode');
      },

      updateTime: (currentTime) => {
        set({ currentTime }, false, 'updateTime');
      },

      updateDuration: (duration) => {
        set({ duration }, false, 'updateDuration');
      },

      handleEnded: () => {
        const { repeatMode, playlist, currentTrack } = get();
        
        if (repeatMode === 'one') {
          get().playTrack(currentTrack);
        } else if (repeatMode === 'all' || playlist.length > 1) {
          get().next();
        } else {
          set({ isPlaying: false }, false, 'handleEnded');
        }
      },

      clearPlaylist: () => {
        set({ 
          playlist: [], 
          currentTrack: null, 
          isPlaying: false,
          currentTime: 0,
          duration: 0
        }, false, 'clearPlaylist');
        
        const { audioElement } = get();
        if (audioElement) {
          audioElement.pause();
          audioElement.src = '';
        }
      }
    }),
    {
      name: 'audio-player-store'
    }
  )
);

// Hooks personnalisés
export const useCurrentTrack = () => useAudioPlayer(state => state.currentTrack);
export const useIsPlaying = () => useAudioPlayer(state => state.isPlaying);
export const usePlaylist = () => useAudioPlayer(state => state.playlist);
