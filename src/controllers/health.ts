import { Request, Response } from "express";
import os from "os";
const startTime = Date.now();

export const getHealthStatus = async (req: Request, res: Response) => {
  const currentTime = Date.now();
  const uptimeInSeconds = Math.floor((currentTime - startTime) / 1000);

  // System Information
  const memoryUsage = process.memoryUsage();
  const serverInfo = {
    platform: os.platform(),
    arch: os.arch(),
    cpu: os.cpus()[0]?.model,
    memory: {
      total: os.totalmem(),
      free: os.freemem(),
      rss: memoryUsage.rss,
      heapTotal: memoryUsage.heapTotal,
      heapUsed: memoryUsage.heapUsed,
    },
  };


  // Environment Variables Check
  const criticalEnvVariables = ["JWT_SECRET_KEY", "DB_HOST"];
  const envStatus = criticalEnvVariables.map((key) => ({
    key,
    present: Boolean(process.env[key]),
  }));

  res.status(200).json({
    status: "success",
    data: {
      uptime: `${uptimeInSeconds} seconds`,
      server_status: "online",
      server_info: serverInfo,
      environment_variables: envStatus,
      timestamp: new Date().toISOString(),
    },
  });
};
