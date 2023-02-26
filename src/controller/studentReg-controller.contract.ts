import { Request, Response } from "express";

export interface StudentRegControllerContract {
  getAllAction(req: Request, res: Response): Promise<void>;
  postAction(req: Request, res: Response): Promise<void>;
  deleteAction(req: Request, res: Response): Promise<void>;
}
