import {dataset1} from "./dataset";
import {OutputVideoType} from "../input-output/video-types";

export type DBtype = {
    videos: any[


        ]
}

export const db: DBtype = {
    videos:[
        {
            id: 1734281270946.5266,
            title: 'video',
            author: 'a17342812709460.7943407542925982',
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: '2024-12-15T16:47:50.946Z',
            publicationDate: '2024-12-15T16:47:50.946Z'
        }
    ]
}

export const setDB = (dataset?: Partial<DBtype>
) =>{
    if(!dataset){
        db.videos = []
        return
    }
    db.videos = dataset.videos || db.videos;

}
