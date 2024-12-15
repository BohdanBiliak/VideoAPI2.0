import { Request, Response } from "express";
import { db } from "../db/db";
import { InputVideoType, Resolutions, OutputVideoType } from "../input-output/video-types";

const InputValidation = (video: InputVideoType) => {
    const errors: { errorsMessage: { message: string }[] } = { errorsMessage: [] };
    if (!video.title.trim()) {
        errors.errorsMessage.push({
            message: "Title is required and must be a non-empty string"
        });
    }
    if (!video.author.trim()) {
        errors.errorsMessage.push({
            message: "Author is required and must be a non-empty string"
        });
    }
    if (
        !Array.isArray(video.availableResolution) ||
        video.availableResolution.some(res => !Object.values(Resolutions).includes(res))
    ) {
        errors.errorsMessage.push({
            message: "Invalid Resolution"
        });
    }

    return errors;
};

export const createVideoController = (req: Request<any, any, InputVideoType>, res: Response) => {
    const errors = InputValidation(req.body);

    if (errors.errorsMessage.length > 0) {
        res.status(400).send(errors);
        return;
    }

    const newVideo: OutputVideoType = {
        id: Date.now(), // Unique ID
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(Date.now() + 86400000).toISOString(),
        availableResolution: req.body.availableResolution
    };

    db.videos.push(newVideo);
    res.status(201).json(newVideo);
};