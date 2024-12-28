"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVenueManagerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_venue_manager_dto_1 = require("./create-venue-manager.dto");
class UpdateVenueManagerDto extends (0, mapped_types_1.PartialType)(create_venue_manager_dto_1.CreateVenueManagerDto) {
}
exports.UpdateVenueManagerDto = UpdateVenueManagerDto;
//# sourceMappingURL=update-venue-manager.dto.js.map