import {db} from "../db/db";
import {Request, Response} from "express";
export const updateVideoController = (req: Request, res: Response) => {

    let foundVideo = db.videos.find((video) => video.id === +req.params.id)
    if (!foundVideo) {
        res.status(404).send('No video with id ' + +req.params.id)
    }else{
        if(foundVideo){
            Object.assign(foundVideo, req.body);
            res.sendStatus(204).send(foundVideo)
        }else{
            res.status(404)
        }
    }
}
