interface Company {
  id: string;
  createdAt: string;
  name: string;
  parentId: string;
}

interface Children {
  id: string;
  createdAt: string;
  name: string;
  parentId: string;
  cost: number;
  Children: Children[];
}

export { Company, Children };
