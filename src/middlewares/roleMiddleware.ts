// src/middlewares/roleMiddleware.ts
import { Response, NextFunction } from 'express';
import type { AuthRequest } from './authMiddleware';

export enum UserRole {
  MORADOR = 'Morador',
  PORTEIRO = 'Porteiro',
  ADMINISTRADOR = 'Administrador',
  SINDICO = 'Síndico',
}

// Hierarquia de permissões: Síndico > Administrador > Porteiro > Morador
const roleHierarchy: Record<UserRole, number> = {
  [UserRole.MORADOR]: 1,
  [UserRole.PORTEIRO]: 2,
  [UserRole.ADMINISTRADOR]: 3,
  [UserRole.SINDICO]: 4,
};

/**
 * Middleware para verificar se o usuário tem uma das roles permitidas
 */
export const requireRole = (...allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.userRole) {
      return res.status(401).json({ erro: 'Usuário não autenticado' });
    }

    const userRole = req.userRole as UserRole;

    if (allowedRoles.includes(userRole)) {
      return next();
    }

    return res.status(403).json({ 
      erro: 'Acesso negado', 
      detalhes: `Esta ação requer uma das seguintes permissões: ${allowedRoles.join(', ')}`,
      seuNivel: userRole 
    });
  };
};

/**
 * Middleware para verificar se o usuário tem nível mínimo de permissão
 */
export const requireMinRole = (minRole: UserRole) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.userRole) {
      return res.status(401).json({ erro: 'Usuário não autenticado' });
    }

    const userRole = req.userRole as UserRole;
    const userLevel = roleHierarchy[userRole] || 0;
    const requiredLevel = roleHierarchy[minRole];

    if (userLevel >= requiredLevel) {
      return next();
    }

    return res.status(403).json({ 
      erro: 'Acesso negado', 
      detalhes: `Esta ação requer nível mínimo de: ${minRole}`,
      seuNivel: userRole 
    });
  };
};

/**
 * Middleware para verificar se o usuário é dono do recurso OU tem permissão administrativa
 */
export const requireOwnerOrAdmin = (userIdField: string = 'IdUsuario') => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.userId || !req.userRole) {
      return res.status(401).json({ erro: 'Usuário não autenticado' });
    }

    const resourceUserId = req.body[userIdField] || req.params[userIdField];
    const userRole = req.userRole as UserRole;

    // Se for Administrador ou Síndico, pode acessar qualquer recurso
    if (userRole === UserRole.ADMINISTRADOR || userRole === UserRole.SINDICO) {
      return next();
    }

    // Se for o dono do recurso
    if (resourceUserId && parseInt(resourceUserId) === req.userId) {
      return next();
    }

    return res.status(403).json({ 
      erro: 'Acesso negado', 
      detalhes: 'Você só pode modificar seus próprios recursos ou precisa ser Administrador/Síndico' 
    });
  };
};

/**
 * Verifica se usuário pode modificar status de denúncia
 */
export const canModifyDenunciaStatus = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.userRole) {
    return res.status(401).json({ erro: 'Usuário não autenticado' });
  }

  const userRole = req.userRole as UserRole;

  // Apenas Porteiro, Administrador e Síndico podem alterar status
  if ([UserRole.PORTEIRO, UserRole.ADMINISTRADOR, UserRole.SINDICO].includes(userRole)) {
    return next();
  }

  return res.status(403).json({ 
    erro: 'Acesso negado', 
    detalhes: 'Apenas Porteiro, Administrador ou Síndico podem alterar o status de denúncias' 
  });
};

/**
 * Verifica se usuário pode criar avisos
 */
export const canCreateAviso = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.userRole) {
    return res.status(401).json({ erro: 'Usuário não autenticado' });
  }

  const userRole = req.userRole as UserRole;

  // Porteiro, Administrador e Síndico podem criar avisos
  if ([UserRole.PORTEIRO, UserRole.ADMINISTRADOR, UserRole.SINDICO].includes(userRole)) {
    return next();
  }

  return res.status(403).json({ 
    erro: 'Acesso negado', 
    detalhes: 'Apenas Porteiro, Administrador ou Síndico podem criar avisos' 
  });
};

/**
 * Verifica se usuário pode gerenciar outros usuários
 */
export const canManageUsers = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.userRole) {
    return res.status(401).json({ erro: 'Usuário não autenticado' });
  }

  const userRole = req.userRole as UserRole;

  // Apenas Administrador e Síndico podem gerenciar usuários
  if ([UserRole.ADMINISTRADOR, UserRole.SINDICO].includes(userRole)) {
    return next();
  }

  return res.status(403).json({ 
    erro: 'Acesso negado', 
    detalhes: 'Apenas Administrador ou Síndico podem gerenciar usuários' 
  });
};
