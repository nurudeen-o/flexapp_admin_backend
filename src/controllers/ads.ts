import { Request, Response, NextFunction } from "express";
import Ad from "../models/ads";
import User from "../models/user";

export const getAllAds = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ads = await Ad.findAll({
        include: [
          { model: User, as: "user", attributes: ["full_name", "address", "nationality"] },
        ],
      });

    res.status(200).json({
      status: "success",
      data: ads,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const ad = await Ad.findOne({
        where: { ad_id: id },
        include: [
          { model: User, as: "user", attributes: ["full_name", "address", "nationality"] },
        ],
      });

    if (!ad) {
      return res.status(404).json({ status: "fail", message: "Ad not found" });
    }

    res.status(200).json({
      status: "success",
      data: ad,
    });
  } catch (error) {
    next(error);
  }
};

export const createAd = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ad = await Ad.create(req.body);
    res.status(201).json({
      status: "success",
      data: ad,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAd = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const [updated] = await Ad.update(req.body, { where: { ad_id: id } });

    if (!updated) {
      return res.status(404).json({ status: "fail", message: "Ad not found" });
    }

    const updatedAd = await Ad.findByPk(id);
    res.status(200).json({
      status: "success",
      data: updatedAd,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAd = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = await Ad.destroy({ where: { ad_id: id } });

    if (!deleted) {
      return res.status(404).json({ status: "fail", message: "Ad not found" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
