import { Request, Response } from "express";
import { db } from "../db/db";
import { InputVideoType, OutputVideoType, Resolutions } from "../input-output/video-types";

export const inputValidation = (video: InputVideoType) => {
    const errors: { errorsMessage: { message: string; field: string }[] } = { errorsMessage: [] };
    if (!video.title || typeof video.title !== "string" || video.title.trim() === "") {
        errors.errorsMessage.push({
            message: "Title is required and must be a non-empty string",
            field: "title"
        });
    } else if (video.title.length > 40) {
        errors.errorsMessage.push({
            message: "Title must not exceed 40 characters",
            field: "title"
        });
    }
    if (!video.author || typeof video.author !== "string" || video.author.trim() === "") {
        errors.errorsMessage.push({
            message: "Author is required and must be a non-empty string",
            field: "author"
        });
    } else if (video.author.length > 20) {
        errors.errorsMessage.push({
            message: "Author must not exceed 20 characters",
            field: "author"
        });
    }
    if (video.availableResolutions === null) {
    } else if (!Array.isArray(video.availableResolutions) || video.availableResolutions.length === 0) {
        errors.errorsMessage.push({
            message: "At least one resolution should be added",
            field: "availableResolutions"
        });
    } else if (
        video.availableResolutions.some(
            (res) => !Object.values(Resolutions).includes(res)
        )
    ) {
        errors.errorsMessage.push({
            message: "Invalid resolution(s). Must be one of: " + Object.values(Resolutions).join(", "),
            field: "availableResolutions"
        });
    }

    return errors;
};

export const createVideoController = (req: Request<any, any, InputVideoType>, res: Response) => {
    const errors = inputValidation(req.body);

    if (errors.errorsMessage.length > 0) {
        res.status(400).send(errors);
        return;
    }

    const newVideo: OutputVideoType = {
        id: Date.now(),
        title: req.body.title,
        author: req.body.author,
        availableResolutions: req.body.availableResolutions || [],
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(), // +1 dzień
    };

    db.videos.push(newVideo);
    res.status(201).json(newVideo);
};
