import {Request, Response}  from "express";

import {db} from "../db/db";
import {InputVideoType, Resolutions} from "../input-output/video-types";
const InputValidation  = (video: InputVideoType) => {
    const errors: any = {
        errorsMessage:[]
    }

    if(!Array.isArray(video.availableResolution)
        || video.availableResolution.find(p => !Resolutions[p])){
        errors.errorsMessage.push({
            message: "Invalid Resolution"
        })
    }
    return errors
}

export const createVideoController = (req: Request<any, any, InputVideoType>, res: Response) => {
    const errors = InputValidation(req.body)
    if (errors.errorsMessage.length) {
        res.status(400).send(errors)
        return
    }
    if(!req.body.title && !req.body.author && !req.body.availableResolution) {
        console.log('Missing title:', req.body.title);
        console.log('Missing author:', req.body.author);
        console.log('Missing resolution:', req.body.availableResolution);
        res.sendStatus(400)
        return;
    }

    const newVideo: any = {
        ...req.body,
        id: Date.now() + Math.random(),
    }
    db.videos = [...db.videos, newVideo];
    res.status(201).json(newVideo);
}
