// import {VideoDBType} from '../src/db/video-db-type'
// import {Resolutions} from '../src/input-output-types/video-types'
import {DBtype} from './db'

// готовые данные для переиспользования в тестах

export const video1 /*VideoDBType*/ = {
    id: Date.now() + Math.random(),
    title: 'video',
     author: 'a' + Date.now() + Math.random(),
     canBeDownloaded: true,
     minAgeRestriction: null,
     createdAt: new Date().toISOString(),
     publicationDate: new Date().toISOString(),
     //availableResolution: [Resolutions.P240],
}

// ...

export const dataset1: DBtype = {
    videos: [video1],
}
export const video = {
    title: 'video',
    author: 'student',
    availableResolution: ['P144']
}
// ...