export enum MasterDataTableEnum {
  department = "Department",
  languages = "Language",
  currency = "Currency",
  BusinessUnits = "BusinessUnits",
  Facilities = "Facility",
  Organizations = "Organizations",
}

export enum IsactiveactionType {
  activate = "activate",
  deactivate = "deactivate",
}

export enum TemplateActionEnum {
  DataEntry = 4,
  Query = 3,
  Approval = 5,
  ApiIntegeration = 2,
  Email = 1,
}

export enum DataTyeEnum {
  LookUp = "LookUp",
}
export enum TemplateStageApprovalEnum {
  Completed = 1,
  Error = 2,
  QueryRaised = 3,
  Rejected = 4,
  Success = 5,
  Pending = 6,
  Yettostart = 7,
  Approved = 8,
  Expired = 9,
  Responded = 10,
  Publish = 11,
  New = 12,
  InProgress = 13,
}

export enum homeRoute {
  home = "/home/dashboard",
}
export enum RoleEnum {
  Admin = 10,
  PowerUser = 11,
  SocialUser = 22,
  GovernanceUser = 23,
  Approver = 24,
  Auditor = 7,
  SuperAdmin = 1,
  SocialAdmin = 31,
  EnvironmentAdmin = 29,
  GovernanceAdmin = 30,
  DataReviewer = 8,
}

export enum metricValidationEnum {
  required = 4,
  mobileNumber = 5,
  email = 1,
}
export enum metricDataType {
  Boolean = 1,
  Percentage = 2,
  Paragraph = 3,
  NumberField = 4,
  TextArea = 5,
  TextField = 6,
  Quill = 7,
  Price = 8,
  File = 9,
  Image = 10,
  CheckBox = 11,
  LookUp = 12,
  Measurements = 13,
  MultiSelect = 14,
  Identity = 15,
  DateTime = 16,
  RadioButton = 17,
  SimpleSelect = 18,
  Email = 19,
}
export enum locationtype {
  Country = 1,
  State = 2,
  Zone = 3,
  District = 4,
  City = 5,
}
export const AppuserEnum = {
  environment: [55, 7],
  governence: [58, 5],
  social: [57, 4],
};

export enum TailwindBgColor {
  Black = "bg-black",
  Slate = "bg-slate-200",
  Gray = "bg-gray-200",
  Zinc = "bg-zinc-200",
  Neutral = "bg-neutral-200",
  Stone = "bg-stone-200",
  Red = "bg-red-200",
  Orange = "bg-orange-200",
  Amber = "bg-amber-200",
  Yellow = "bg-yellow-200",
  Lime = "bg-lime-200",
  Green = "bg-green-200",
  Emerald = "bg-emerald-200",
  Teal = "bg-teal-200",
  Cyan = "bg-cyan-200",
  Sky = "bg-sky-200",
  Blue = "bg-blue-200",
  Indigo = "bg-indigo-200",
  Violet = "bg-violet-200",
  Purple = "bg-purple-200",
  Fuchsia = "bg-fuchsia-200",
  Pink = "bg-pink-200",
  Rose = "bg-rose-200",
}

export const TemplateStageApproval: { [key: number]: any } = {
  1: "Completed",
  6: "Pending",
  8: "Approved",
  11: "Published",
  12: "New",
  13: "InProgress",
  4: "Rejected",
};

export const Approverstatus: { [key: number]: any } = {
  1: "DataEntry",
  2: "Approval",
  3: "Review",
};

export const LookUpType: { [key: number]: any } = {
  1: "uom",
  2: "fuelname",
  3: "vehicletype",
};
