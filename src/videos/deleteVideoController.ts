import {db} from "../db/db";

import {Request, Response} from "express";

export const deleteVideoController = (req: Request, res: Response) => {
    let foundVideo = db.videos
    for(let i=0; i < foundVideo.length; i++) {
        if(foundVideo[i].id === +req.params.id) {
            foundVideo.splice(i, 1);
            res.status(204).send()
            return
        }

    }
    res.status(404).send('No video with id ' + +req.params.id)
}
