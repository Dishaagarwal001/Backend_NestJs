"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const typeOrm_config_1 = require("../typeorm/typeOrm.config");
const datasource = new typeorm_1.DataSource(typeOrm_config_1.dataSourceOptions);
exports.default = datasource;
//# sourceMappingURL=datasource.js.map