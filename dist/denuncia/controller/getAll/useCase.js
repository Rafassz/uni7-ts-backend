"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllDenunciaUseCase = void 0;
class GetAllDenunciaUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        return await this.repository.findAll();
    }
}
exports.GetAllDenunciaUseCase = GetAllDenunciaUseCase;
//# sourceMappingURL=useCase.js.map