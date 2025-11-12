// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET: string = process.env.JWT_SECRET || 'uni7-secret-key-2024';

export interface AuthRequest extends Request {
  userId?: number;
  userRole?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ erro: 'Token não fornecido' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      return res.status(401).json({ erro: 'Token malformado' });
    }

    const [scheme, token] = parts;

    if (!scheme || !/^Bearer$/i.test(scheme) || !token) {
      return res.status(401).json({ erro: 'Token malformado' });
    }

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ erro: 'Token inválido ou expirado' });
      }

      req.userId = decoded.id;
      req.userRole = decoded.role;
      return next();
    });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao validar token' });
  }
};

export const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next();
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      return next();
    }

    const [scheme, token] = parts;

    if (!scheme || !/^Bearer$/i.test(scheme) || !token) {
      return next();
    }

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (!err) {
        req.userId = decoded.id;
        req.userRole = decoded.role;
      }
      return next();
    });
  } catch (error) {
    return next();
  }
};
