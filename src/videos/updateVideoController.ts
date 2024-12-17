import { db } from "../db/db";
import { Request, Response } from "express";
import { inputValidation } from "./createVideoController";

export const updateVideoController = (req: Request, res: Response) => {
    try {
        const foundVideo = db.videos.find((video) => video.id === +req.params.id);
        if (!foundVideo) {
            return res.status(404).json({ message: `No video with id ${req.params.id}` });
        }
        const errors = inputValidation(req.body);
        if (errors.errorsMessages.length > 0) {
            return res.status(400).send(errors);
        }
        Object.assign(foundVideo, req.body);
        return res.sendStatus(204);
    } catch (error) {
        console.error("Error updating video:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
