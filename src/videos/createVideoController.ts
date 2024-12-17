import { Request, Response } from "express";
import { db } from "../db/db";
import {InputVideoType, OutputVideoType, Resolutions} from "../input-output/video-types";

export const InputValidation = (video: InputVideoType) => {
    const errors: { errorsMessage: { message: string; field: string }[] } = { errorsMessage: [] };

    if (!video.title || video.title.trim() === "") {
        errors.errorsMessage.push({
            message: "Title is required and must be a non-empty string",
            field: "title"
        });
    }

    if (!video.author  || video.author.trim() === "") {
        errors.errorsMessage.push({
            message: "Author is required and must be a non-empty string",
            field: "author"
        });
    }

    if (
        !Array.isArray(video.availableResolution) ||
        video.availableResolution.some(res => !Object.values(Resolutions).includes(res))
    ) {
        errors.errorsMessage.push({
            message: "Invalid resolution(s). Must be one of: " + Object.values(Resolutions).join(", "),
            field: "availableResolutions"
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
        id: Date.now(),
        title: req.body.title,
        author: req.body.author,
        availableResolution: req.body.availableResolution,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
    };

    db.videos.push(newVideo);
    res.status(201).json(newVideo);
};