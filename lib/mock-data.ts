import type { MusicPost, Comment } from "./types"

export const mockPosts: MusicPost[] = [
  {
    id: "1",
    title: "Blinding Lights - The Weeknd (Official Video)",
    youtubeId: "4NRXx6U8ABQ",
    thumbnailUrl: "https://img.youtube.com/vi/4NRXx6U8ABQ/maxresdefault.jpg",
    uploaderNickname: "MusicLover23",
    tags: ["pop", "synthwave", "80s"],
    likeCount: 1234,
    commentCount: 89,
    createdAt: "2024-01-15T10:30:00Z",
    description: "One of the best synthwave-inspired pop songs of this decade!",
  },
  {
    id: "2",
    title: "Daft Punk - Around The World",
    youtubeId: "dwDns8x3Jb4",
    thumbnailUrl: "https://img.youtube.com/vi/dwDns8x3Jb4/maxresdefault.jpg",
    uploaderNickname: "ElectroFan",
    tags: ["electronic", "house", "classic"],
    likeCount: 5678,
    commentCount: 234,
    createdAt: "2024-01-14T15:20:00Z",
    description: "A timeless electronic classic that never gets old.",
  },
  {
    id: "3",
    title: "Tame Impala - The Less I Know The Better",
    youtubeId: "2SUwOgmvzK4",
    thumbnailUrl: "https://img.youtube.com/vi/2SUwOgmvzK4/maxresdefault.jpg",
    uploaderNickname: "PsychRock",
    tags: ["psychedelic", "indie", "rock"],
    likeCount: 8901,
    commentCount: 456,
    createdAt: "2024-01-13T08:15:00Z",
    description: "Kevin Parker at his finest. Pure psychedelic bliss.",
  },
  {
    id: "4",
    title: "ODESZA - A Moment Apart",
    youtubeId: "xarC5jAiO7w",
    thumbnailUrl: "https://img.youtube.com/vi/xarC5jAiO7w/maxresdefault.jpg",
    uploaderNickname: "ChillVibes",
    tags: ["electronic", "chill", "ambient"],
    likeCount: 3456,
    commentCount: 123,
    createdAt: "2024-01-12T18:45:00Z",
    description: "Perfect for those late night drives.",
  },
  {
    id: "5",
    title: "Mac DeMarco - Chamber of Reflection",
    youtubeId: "pQsF3pzOc54",
    thumbnailUrl: "https://img.youtube.com/vi/pQsF3pzOc54/maxresdefault.jpg",
    uploaderNickname: "IndieSoul",
    tags: ["indie", "lofi", "chill"],
    likeCount: 7890,
    commentCount: 345,
    createdAt: "2024-01-11T12:00:00Z",
    description: "A song that makes you feel things.",
  },
  {
    id: "6",
    title: "Flume - Never Be Like You ft. Kai",
    youtubeId: "Ly7uj0JwgKg",
    thumbnailUrl: "https://img.youtube.com/vi/Ly7uj0JwgKg/maxresdefault.jpg",
    uploaderNickname: "BassHead",
    tags: ["electronic", "future bass", "vocal"],
    likeCount: 4567,
    commentCount: 178,
    createdAt: "2024-01-10T20:30:00Z",
    description: "Flume's production is unmatched.",
  },
  {
    id: "7",
    title: "Gorillaz - Feel Good Inc.",
    youtubeId: "HyHNuVaZJ-k",
    thumbnailUrl: "https://img.youtube.com/vi/HyHNuVaZJ-k/maxresdefault.jpg",
    uploaderNickname: "AnimatedBeats",
    tags: ["alternative", "hiphop", "classic"],
    likeCount: 12345,
    commentCount: 678,
    createdAt: "2024-01-09T09:00:00Z",
    description: "The song that defined a generation.",
  },
  {
    id: "8",
    title: "Glass Animals - Heat Waves",
    youtubeId: "mRD0-GxqHVo",
    thumbnailUrl: "https://img.youtube.com/vi/mRD0-GxqHVo/maxresdefault.jpg",
    uploaderNickname: "DreamPop",
    tags: ["indie", "pop", "dreamy"],
    likeCount: 9876,
    commentCount: 543,
    createdAt: "2024-01-08T16:15:00Z",
    description: "Late nights in the middle of June...",
  },
  {
    id: "9",
    title: "Dua Lipa - Levitating",
    youtubeId: "TUVcZfQe-Kw",
    thumbnailUrl: "https://img.youtube.com/vi/TUVcZfQe-Kw/maxresdefault.jpg",
    uploaderNickname: "DiscoQueen",
    tags: ["pop", "disco", "dance"],
    likeCount: 6543,
    commentCount: 234,
    createdAt: "2024-01-07T11:45:00Z",
    description: "Pure disco energy!",
  },
  {
    id: "10",
    title: "Khruangbin - Evan Finds The Third Room",
    youtubeId: "QcD_YXCxx4M",
    thumbnailUrl: "https://img.youtube.com/vi/QcD_YXCxx4M/maxresdefault.jpg",
    uploaderNickname: "GrooveMaster",
    tags: ["funk", "psychedelic", "instrumental"],
    likeCount: 2345,
    commentCount: 89,
    createdAt: "2024-01-06T14:30:00Z",
    description: "Khruangbin takes you on a journey.",
  },
]

export const mockComments: Comment[] = [
  {
    id: "c1",
    nickname: "MelodyMaker",
    text: "This song is absolutely incredible! Been listening on repeat all day.",
    timestamp: "2024-01-15T12:30:00Z",
  },
  {
    id: "c2",
    nickname: "BeatDropper",
    text: "The production quality is insane. How do they do it?",
    timestamp: "2024-01-15T11:00:00Z",
  },
  {
    id: "c3",
    nickname: "VinylCollector",
    text: "Classic vibes! This reminds me of the good old days.",
    timestamp: "2024-01-14T18:45:00Z",
  },
  {
    id: "c4",
    nickname: "SynthWizard",
    text: "That synth line at 2:30 is pure magic.",
    timestamp: "2024-01-14T15:20:00Z",
  },
  {
    id: "c5",
    nickname: "NightOwl",
    text: "Perfect for late night coding sessions!",
    timestamp: "2024-01-13T23:00:00Z",
  },
]

export const popularTags = [
  { name: "pop", count: 12500 },
  { name: "electronic", count: 9800 },
  { name: "indie", count: 8700 },
  { name: "hiphop", count: 7600 },
  { name: "rock", count: 6500 },
  { name: "lofi", count: 5400 },
  { name: "chill", count: 4300 },
  { name: "house", count: 3200 },
  { name: "ambient", count: 2100 },
  { name: "jazz", count: 1800 },
]

export function getRecommendedPosts(): MusicPost[] {
  return mockPosts.slice(0, 5)
}

export function getTrendingPosts(): MusicPost[] {
  return [...mockPosts].sort((a, b) => b.likeCount - a.likeCount).slice(0, 5)
}

export function getNewPosts(): MusicPost[] {
  return [...mockPosts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
}

export function getPostById(id: string): MusicPost | undefined {
  return mockPosts.find((post) => post.id === id)
}

export function getPostComments(_postId: string): Comment[] {
  return mockComments
}

export function getFeaturedTrack(): MusicPost {
  // Return the most liked track as featured
  return [...mockPosts].sort((a, b) => b.likeCount - a.likeCount)[0]
}

export function searchPosts(query: string): MusicPost[] {
  const lowerQuery = query.toLowerCase()
  return mockPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      post.uploaderNickname.toLowerCase().includes(lowerQuery)
  )
}
