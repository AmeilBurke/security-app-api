"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAlertDetailDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_alert_detail_dto_1 = require("./create-alert-detail.dto");
class UpdateAlertDetailDto extends (0, mapped_types_1.PartialType)(create_alert_detail_dto_1.CreateAlertDetailDto) {
}
exports.UpdateAlertDetailDto = UpdateAlertDetailDto;
//# sourceMappingURL=update-alert-detail.dto.js.map