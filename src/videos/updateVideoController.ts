import {db} from "../db/db";
import {Request, Response} from "express";
import {InputValidation} from "./createVideoController"
export const updateVideoController = (req: Request, res: Response) => {
    const foundVideo = db.videos.find((video) => video.id === +req.params.id);
    if (!foundVideo) {
        res.status(404).json({ message: 'No video with id ' + req.params.id });
        return;
    }

    const errors = InputValidation(req.body);
    if (errors.errorsMessage.length > 0) {
        res.status(400).send(errors);
        return;
    }

    Object.assign(foundVideo, req.body);
    res.sendStatus(204);
};