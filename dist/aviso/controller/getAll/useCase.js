"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllAvisoUseCase = void 0;
class GetAllAvisoUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute() {
        return await this.repository.findAll();
    }
}
exports.GetAllAvisoUseCase = GetAllAvisoUseCase;
//# sourceMappingURL=useCase.js.map