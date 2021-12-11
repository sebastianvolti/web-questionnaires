import { Request, Response } from "express";

import { User } from "../../db/models/user.model";

export async function logout(req: Request, res: Response): Promise<any> {
  try {
    req.logout();
    res.status(200).send({
      success: true,
      message: "User successfully logged out",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.toString(),
    });
  }
}

export async function getUser(req: Request, res: Response): Promise<any> {
  try {
    res.status(201).send({
      success: true,
      message: "User reached",
      data: await User.findByPk(req.session.passport.user),
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.toString(),
    });
  }
}
