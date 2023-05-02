interface Entity {
  id: string;
  createdAt: string;
  name: string;
  parentId: string;
}

interface Company extends Entity {}

interface Children extends Entity {
  cost: number;
  Children: Children[];
}

interface CompanyWithChildren extends Company {
  cost: number;
  children: Children[];
}

export { Company, Children, CompanyWithChildren };
