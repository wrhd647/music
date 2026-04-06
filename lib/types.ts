export interface MusicPost {
  id: string
  title: string
  youtubeId: string
  audioUrl?: string
  thumbnailUrl: string
  uploaderNickname: string
  uploaderAvatar?: string
  description?: string
  tags: string[]
  likeCount: number
  commentCount: number
  createdAt: string
}

export interface Comment {
  id: string
  nickname: string
  avatar?: string
  text: string
  timestamp: string
}

export interface User {
  id: string
  nickname: string
  email: string
  avatar?: string
  joinDate: string
}

export interface PlayerState {
  currentTrack: MusicPost | null
  isPlaying: boolean
  volume: number
  progress: number
  duration: number
}
