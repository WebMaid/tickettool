import { ILike } from "typeorm";
import { Department } from "../entities/Department";
import { Service } from "../entities/Service";
import { TicketGroup } from "../entities/TicketGroup";
import { User } from "../entities/User";
import { TicketStatusEnum } from "../enums/TicketStatusEnum";
import { TicketTypeEnum } from "../enums/TicketTypeEnum";
import { ValidationError } from "./ValidationError";
import { Validator } from "./Validator";

export class TicketValidator extends Validator {
  static async validate({
    short_description,
    description,
    type,
    status,
    issuer,
    issuer_department,
    service,
    group_id,
    owner_group_id,
  }) {
    let error;
    let errors: ValidationError[] = [];
    if (
      short_description &&
      (error = Validator.validateString(short_description, {
        min: 5,
        max: 64,
      })) != null
    ) {
      errors.push({
        field: "short_description",
        message: "Must contain 5-64 characters!",
      });
    }

    if (
      description &&
      (error = Validator.validateString(description, { min: 5, max: 65535 })) !=
        null
    ) {
      errors.push({
        field: "description",
        message: "Must contain 5-65535 characters!",
      });
    }

    if (type && !Object.values(TicketTypeEnum).includes(type)) {
      errors.push({
        field: "type",
        message: "Invalid type",
        long_message: `Please check your type, it must be one of: "${Object.values(
          TicketTypeEnum
        )}`,
      });
    }

    if (status && !Object.values(TicketStatusEnum).includes(status)) {
      errors.push({
        field: "type",
        message: "Invalid type",
        long_message: `Please check your type, it must be one of: "${Object.values(
          TicketTypeEnum
        )}`,
      });
    }
    if (!issuer || (await User.findOne(issuer)) == null) {
      errors.push({
        field: "issuer",
        message: "User does not exist!",
      });
    }

    if (
      issuer_department &&
      (await Department.findOne({
        where: { name: ILike(issuer_department) },
      })) == null
    ) {
      errors.push({
        field: "issuer_department",
        message: "Department does not exist!",
      });
    }

    if (
      service &&
      (await Service.findOne({ where: { name: ILike(service) } })) == null
    ) {
      errors.push({
        field: "service",
        message: "Service does not exist!",
      });
    }

    if (group_id && (await TicketGroup.findOne(group_id)) == null) {
      errors.push({
        field: "group_id",
        message: "Group does not exist!",
      });
    }

    if (owner_group_id && (await TicketGroup.findOne(owner_group_id)) == null) {
      errors.push({
        field: "owner_group_id",
        message: "Ownergroup does not exist!",
      });
    }

    return errors;
  }
}
