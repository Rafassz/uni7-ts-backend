"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUsuarioUseCase = void 0;
class GetAllUsuarioUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        return await this.repository.findAll();
    }
}
exports.GetAllUsuarioUseCase = GetAllUsuarioUseCase;
//# sourceMappingURL=useCase.js.map