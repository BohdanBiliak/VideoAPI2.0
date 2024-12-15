import {Router, Request, Response} from 'express'
import {createVideoController} from "../videos/createVideoController";
import {getVideoByIdController, getVideoController} from "../videos/getVideoController";
import { updateVideoController} from "../videos/updateVideoController";
import {deleteVideoController} from "../videos/deleteVideoController";
export const videoRouter = Router()
const  videoController = {
    getVideos:(req: Request, res: Response) => {getVideoController(req, res)},
    getVideoById:(req: Request, res: Response) => {getVideoByIdController(req, res)},
    createVideo: (req: Request, res: Response) => {createVideoController(req, res)},
    putVideo: (req: Request, res: Response)=> {updateVideoController(req, res)},
    deleteVideo: (req: Request, res: Response) => {deleteVideoController(req, res)},
}
videoRouter.get('/', videoController.getVideos)
videoRouter.post('/', videoController.createVideo)
videoRouter.get('/:id', videoController.getVideoById)
videoRouter.put('/:id', videoController.putVideo)
videoRouter.delete('/:id', videoController.deleteVideo)

