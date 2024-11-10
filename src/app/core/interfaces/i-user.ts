export interface IUser {
  readonly id: number;
  NameBatch: string;
  TotalBudget: number | null;
  AllocatedBudget: number | null;
  IsActive: boolean;
  IsDeleted: boolean;
  IDTalent: number | null;

  // readonly created: string;
  // readonly updated: string;
  // readonly owner: number;
}

