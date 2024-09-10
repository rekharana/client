import {Photo} from "./photo";

export interface Member {
    id: number
    username: string
    age: number
    photoUrl: string
    knownAs: string
    createdDate: Date
    lastActivity: Date
    gender: string
    introduction: string
    interests: string
    lookingFor: string
    city: string
    country: string
    photos: Photo[]
  }
  

  